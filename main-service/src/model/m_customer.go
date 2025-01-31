package model

type M_customer struct {
	ID           int64  `json:"id" gorm:"primarykey"`
	CustomerName string `json:"customerName" form:"customerName" gorm:"type:varchar(255)"`
	MainModel
}
