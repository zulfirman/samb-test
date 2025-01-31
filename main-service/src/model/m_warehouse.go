package model

type M_warehouse struct {
	ID            int64  `json:"id" gorm:"primarykey"`
	WarehouseName string `json:"warehouseName" form:"warehouseName" gorm:"type:varchar(255)"`
	MainModel
}
