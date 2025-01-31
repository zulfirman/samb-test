package controller

import (
	"errors"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/zulfirman/zhelper"
	"gorm.io/gorm"
	"main-service/src/config"
	"main-service/src/model"
	"strconv"
)

func SaveReceiptData(c echo.Context) error {
	var body struct {
		Header    model.T_goods_receipt_field    `json:"header"`
		GoodsList []model.T_goods_receipt_detail `json:"goodsList"`
	}
	err := c.Bind(&body)
	if err != nil {
		return zhelper.RsMessage(c, 400, err.Error())
	}

	// Start a database transaction
	tx := config.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Format the new TrxInNo to 5 digits
	body.Header.TrxInNo, err = getTrxInNumber(tx)
	if err != nil {
		return zhelper.RsMessage(c, 500, err.Error())
	}

	saveModel := model.T_goods_receipt{
		T_goods_receipt_field: body.Header,
		GoodsDetail:           body.GoodsList,
	}

	if err := tx.Save(&saveModel).Error; err != nil {
		tx.Rollback()
		return zhelper.RsMessage(c, 500, "Failed to save goods receipt: "+err.Error())
	}

	// Collect all product IDs and warehouse IDs from the goods receipt
	var productIDs []int64
	var warehouseID int64 = saveModel.WarehouseID
	for _, goodsDetail := range saveModel.GoodsDetail {
		productIDs = append(productIDs, goodsDetail.ProductID)
	}

	// Fetch all relevant stock records in a single query
	var existingStocks []model.T_product_stock_field
	if err := tx.Where("product_id IN ? AND warehouse_id = ?", productIDs, warehouseID).Find(&existingStocks).Error; err != nil {
		tx.Rollback()
		return zhelper.RsMessage(c, 500, "Failed to fetch stock records: "+err.Error())
	}

	// Create a map for quick lookup of existing stock records
	stockMap := make(map[int64]model.T_product_stock_field)
	for _, stock := range existingStocks {
		stockMap[stock.ProductID] = stock
	}

	var newStocks []model.T_product_stock_field
	var updatedStocks []model.T_product_stock_field

	// Update or create stock records
	for _, goodsDetail := range saveModel.GoodsDetail {
		if existingStock, exists := stockMap[goodsDetail.ProductID]; exists {
			// Update existing stock record
			existingStock.BoxQty += goodsDetail.BoxQty
			existingStock.Pcs += goodsDetail.Pcs
			updatedStocks = append(updatedStocks, existingStock)
		} else {
			// Create new stock record
			newStock := model.T_product_stock_field{
				ProductID:   goodsDetail.ProductID,
				BoxQty:      goodsDetail.BoxQty,
				Pcs:         goodsDetail.Pcs,
				WarehouseID: warehouseID,
			}
			newStocks = append(newStocks, newStock)
		}
	}

	// Batch insert new stock records
	if len(newStocks) > 0 {
		if err := tx.Create(&newStocks).Error; err != nil {
			tx.Rollback()
			return zhelper.RsMessage(c, 500, "Failed to create new stock records: "+err.Error())
		}
	}

	// Batch update existing stock records
	if len(updatedStocks) > 0 {
		if err := tx.Save(&updatedStocks).Error; err != nil {
			tx.Rollback()
			return zhelper.RsMessage(c, 500, "Failed to update stock records: "+err.Error())
		}
	}

	// Commit the transaction
	tx.Commit()

	return zhelper.Rs(c, zhelper.Response{
		Content: saveModel,
	})
}

func getTrxInNumber(tx *gorm.DB) (string, error) {
	var latestTrx model.T_goods_receipt
	if err := tx.Order("id DESC").First(&latestTrx).Error; err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			tx.Rollback()
			return "", errors.New("Failed to fetch latest TrxInNo: " + err.Error())
		}
		// If no records exist, start from "00000"
		latestTrx.TrxInNo = "00000"
	}

	// Increment the latest TrxInNo
	latestTrxNo, err := strconv.Atoi(latestTrx.TrxInNo)
	if err != nil {
		tx.Rollback()
		return "", errors.New("Failed to parse TrxInNo: " + err.Error())
	}
	newTrxNo := latestTrxNo + 1

	return fmt.Sprintf("%05d", newTrxNo), nil
}
