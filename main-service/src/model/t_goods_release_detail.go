package model

type T_goods_release_detail struct {
	ID        int64  `json:"id" gorm:"primarykey"`
	TrxOutNo  string `json:"trxOutNo" form:"trxOutNo" gorm:"type:varchar(255)"`
	ProductID int64  `json:"productID" form:"productID"`
	BoxQty    int64  `json:"boxQty" form:"boxQty"`
	Pcs       int64  `json:"pcs" form:"pcs"`
	MainModel
}
