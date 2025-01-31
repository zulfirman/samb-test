package model

type M_supplier struct {
	ID           int64  `json:"id" gorm:"primarykey"`
	SupplierName string `json:"supplierName" form:"supplierName" gorm:"type:varchar(255)"`
	MainModel
}
