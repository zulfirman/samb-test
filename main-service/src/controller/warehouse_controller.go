package controller

import (
	"github.com/labstack/echo/v4"
	"github.com/zulfirman/zhelper"
	"main-service/src/config"
	"main-service/src/model"
)

func GetAllWarehouse(c echo.Context) error {
	var warehouse []model.M_warehouse

	config.DB.Limit(1000).Find(&warehouse)

	return zhelper.Rs(c, zhelper.Response{
		Content: warehouse,
	})
}
