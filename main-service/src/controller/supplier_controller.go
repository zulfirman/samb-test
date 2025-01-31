package controller

import (
	"github.com/labstack/echo/v4"
	"github.com/zulfirman/zhelper"
	"main-service/src/config"
	"main-service/src/model"
)

func GetAllSupplier(c echo.Context) error {
	var supplier []model.M_supplier

	config.DB.Limit(1000).Find(&supplier)

	return zhelper.Rs(c, zhelper.Response{
		Content: supplier,
	})
}
