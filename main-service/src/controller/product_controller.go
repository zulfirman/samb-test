package controller

import (
	"github.com/labstack/echo/v4"
	"github.com/zulfirman/zhelper"
	"main-service/src/config"
	"main-service/src/model"
)

func GetAllProduct(c echo.Context) error {
	var product []model.M_product

	config.DB.Limit(1000).Find(&product)

	return zhelper.Rs(c, zhelper.Response{
		Content: product,
	})
}
