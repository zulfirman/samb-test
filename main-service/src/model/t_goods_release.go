package model

import (
	"github.com/bytedance/sonic"
	"time"
)

type T_goods_release_field struct {
	ID          int64     `json:"id" gorm:"primarykey"`
	TrxOutNo    string    `json:"trxOutNo" form:"trxOutNo" gorm:"type:varchar(255);uniqueIndex"`
	Notes       string    `json:"notes" form:"notes" gorm:"type:varchar(255)"`
	TrxDate     time.Time `json:"trxDate" form:"trxDate"`
	WarehouseID int64     `json:"warehouseID" form:"warehouseID"`
	SupplierID  int64     `json:"supplierID" form:"supplierID"`
	MainModel
}

type T_goods_release struct {
	T_goods_release_field
	GoodsDetail []T_goods_release_detail `json:"goodsDetail" gorm:"foreignKey:TrxOutNo;references:TrxOutNo;constraint:OnDelete:CASCADE;"`
	Warehouse   M_warehouse              `json:"warehouse" gorm:"foreignKey:WarehouseID;constraint:OnDelete:CASCADE;"`
	Supplier    M_supplier               `json:"supplier" gorm:"foreignKey:SupplierID;constraint:OnDelete:CASCADE;"`
}

func (T_goods_release_field) TableName() string {
	return "t_good_release"
}

func (t *T_goods_release_field) UnmarshalJSON(data []byte) error {
	type Alias T_goods_release_field
	aux := &struct {
		TrxDate string `json:"trxDate"`
		*Alias
	}{
		Alias: (*Alias)(t),
	}
	if err := sonic.Unmarshal(data, &aux); err != nil {
		return err
	}
	// Parse the TrxDate string into a time.Time object
	parsedDate, err := time.Parse("2006-01-02", aux.TrxDate)
	if err != nil {
		return err
	}
	t.TrxDate = parsedDate
	return nil
}
