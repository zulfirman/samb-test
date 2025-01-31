package route

import (
	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
	"github.com/zulfirman/zhelper"
	"main-service/src/config"
	"main-service/src/controller"
	"main-service/src/middleware"
)

func SetupRouter(main *echo.Echo) *echo.Echo {
	//middleware
	main.Use(middleware.MiddlewareConfig())
	AuthJwt := middleware.AuthJwt
	mainRoute := main.Group("/main")
	mainRoute.Static("/static/upload", "./uploads")
	//middleware

	echo.NotFoundHandler = func(c echo.Context) error {
		return zhelper.Rs(c, zhelper.Response{
			Code: 404,
		})
	}
	echo.MethodNotAllowedHandler = func(c echo.Context) error {
		return zhelper.Rs(c, zhelper.Response{
			Code: 405,
		})
	}
	mainRoute.GET("/swagger/*", echoSwagger.WrapHandler)

	api := mainRoute.Group("/v1")
	api.POST("/alive", config.Alive)
	api.GET("/me", controller.GetMe, AuthJwt)
	api.GET("/migrate", config.MigrateDatabase)

	/*--------------------------------------------------------------------------*/

	//dashboard
	api.POST("/signin", controller.SigninAdmin)

	supplier := api.Group("/supplier", AuthJwt)
	supplier.GET("", controller.GetAllSupplier)

	warehouse := api.Group("/warehouse", AuthJwt)
	warehouse.GET("", controller.GetAllWarehouse)

	product := api.Group("/product", AuthJwt)
	product.GET("", controller.GetAllProduct)

	goodsReceipt := api.Group("/goods-receipt", AuthJwt)
	goodsReceipt.POST("", controller.SaveReceiptData)

	goodsRelease := api.Group("/goods-release", AuthJwt)
	goodsRelease.POST("", controller.SaveReleaseData)

	stock := api.Group("/product-stock", AuthJwt)
	stock.GET("", controller.GetAllProductStock)

	return main
}
