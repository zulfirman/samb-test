package model

type M_product struct {
	ID          int64  `json:"id" gorm:"primarykey"`
	ProductName string `json:"productName" form:"productName" gorm:"type:varchar(255)"`
	MainModel
}
