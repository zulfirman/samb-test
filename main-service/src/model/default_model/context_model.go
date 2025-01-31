package default_model

import "github.com/labstack/echo/v4"

type CustomContext struct {
	echo.Context
	UserID   int64
	TypeUser int
}
