package controller

import (
	"github.com/labstack/echo/v4"
	"github.com/zulfirman/zhelper"
	"main-service/src/config"
	"main-service/src/model"
)

func GetAllProductStock(c echo.Context) error {
	var stock []model.T_product_stock
	field := zhelper.GetParamPagination(c)
	warehouseID := c.QueryParam("warehouseID")
	mainQry := config.DB.Model(&stock).Joins("Product").Joins("Warehouse").Where("warehouse_id = ?", warehouseID)

	var total int64
	mainQry.Count(&total)

	qry, paging := zhelper.Paginate(field, mainQry, total)
	qry.Find(&stock)

	return zhelper.Rs(c, zhelper.Response{
		Content: zhelper.H{
			"data":       stock,
			"pagination": paging,
		},
	})
}
