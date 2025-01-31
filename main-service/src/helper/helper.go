package helper

import (
	"crypto/sha256"
	"encoding/hex"
	"github.com/labstack/echo/v4"
	"github.com/zulfirman/zhelper"
	"main-service/src/config"
)

var ListDefaultImage = []string{"default.jpg", "default-ads.jpg", "default-user-male.jpg", "default-user-female.jpg"}

func HashPassword(pass string) string {
	hasher := sha256.New()
	hasher.Write([]byte(pass))
	return hex.EncodeToString(hasher.Sum(nil))
}

func Rs(c echo.Context, result zhelper.Response) error {
	res := zhelper.Rs(c, result)
	if result.Code != 200 && config.ENV.StoreLog {

	}
	return res
}

func RsMessage(c echo.Context, code int, message interface{}) error {
	result := zhelper.RsMessage(c, code, message)
	if code != 200 && config.ENV.StoreLog {

	}
	return result
}
