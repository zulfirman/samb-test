package controller

import (
	"github.com/labstack/echo/v4"
	"github.com/lib/pq"
	"github.com/zulfirman/zhelper"

	"main-service/src/config"
	"main-service/src/helper"
	"main-service/src/model"
)

func SigninAdmin(c echo.Context) error {
	var user model.M_user
	var userLogin helper.UserLoginStruct
	if err := c.Bind(&userLogin); err != nil {
		return zhelper.RsMessage(c, 400, err.Error())
	}
	user.Email = userLogin.Email
	user.Password = userLogin.Password
	validate := user.VdLogin()
	if validate != nil {
		return zhelper.Rs(c, zhelper.Response{
			Code:    400,
			Content: validate,
		})
	}
	user.Password = helper.HashPassword(user.Password)
	//where in gorm https://golangforall.com/en/post/gorm-filter-by-list-of-values.html
	checkData := config.DB.Table("m_user").Where("email", user.Email).Where("password", user.Password).
		Where("type_user = ANY(?)", pq.Array([]uint{1, 2})).First(&user)
	if checkData.Error != nil {
		return zhelper.RsMessage(c, 400, "Email or password is incorrect")
	}
	//generate jwt token
	getToken, errGenerate := helper.GenerateTokenPair(helper.ProfileJwt{user.ID, user.TypeUser, user.TokenVersion}, userLogin.TimeoutDuration)
	if errGenerate != nil {
		return zhelper.RsMessage(c, 400, errGenerate.Error())
	}
	result, _ := zhelper.RemoveField(user, "password")
	return zhelper.Rs(c, zhelper.Response{
		Content: zhelper.H{
			"accessToken":  getToken["accessToken"],
			"refreshToken": getToken["refreshToken"],
			"user":         result,
		},
	})
}

func GetMe(c echo.Context) error {
	data := helper.Me(c, 1)
	data.Token = ""
	return zhelper.Rs(c, zhelper.Response{
		Content: data,
	})
}
