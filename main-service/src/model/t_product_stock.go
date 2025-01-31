package model

type T_product_stock_field struct {
	ID          int64 `json:"id" gorm:"primarykey"`
	ProductID   int64 `json:"productID"`
	BoxQty      int64 `json:"boxQty" form:"boxQty"`
	Pcs         int64 `json:"pcs" form:"pcs"`
	WarehouseID int64 `json:"warehouseID" form:"pcs"`
	MainModel
}

type T_product_stock struct {
	T_product_stock_field
	Product   M_product   `json:"product" gorm:"foreignKey:ProductID;constraint:OnDelete:CASCADE;"`
	Warehouse M_warehouse `json:"warehouse" gorm:"foreignKey:WarehouseID;constraint:OnDelete:CASCADE;"`
}

func (T_product_stock_field) TableName() string {
	return "t_product_stock"
}
