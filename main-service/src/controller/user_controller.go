package controller

import (
	"github.com/labstack/echo/v4"
	"github.com/zulfirman/zhelper"
	"main-service/src/config"
	"main-service/src/model"
	"strings"
)

func selectColumnUser() string {
	return "id, image, username, email, type_user, created_at, created_by, updated_at, updated_by, deleted_at, first_name, last_name, gender, phone"
}

func GetAllUser(c echo.Context) error {
	var user []model.M_user
	field := zhelper.GetParamPagination(c)
	if field.Field == "" {
		field.Field = "email"
	}
	typeUser := c.QueryParam("typeUser")
	if typeUser == "" {
		typeUser = "1"
	}
	mainQry := config.DB.Model(&user).Select(selectColumnUser()).Where("type_user = ?", typeUser)
	if field.Field == "gender" {
		mainQry = mainQry.Where(field.Field+" = ?", strings.ToLower(field.Search))
	} else if field.Field == "created_at" {
		field.Field = "date(" + field.Field + ")"
		mainQry = mainQry.Where(field.Field+" = ?", field.Search)
	} else {
		mainQry = mainQry.Where(field.Field+" ilike ?", "%"+field.Search+"%")
	}

	var total int64
	mainQry.Count(&total)

	qry, paging := zhelper.Paginate(field, mainQry, total)
	qry.Find(&user)

	return zhelper.Rs(c, zhelper.Response{
		Content: zhelper.H{
			"data":       user,
			"pagination": paging,
		},
	})
}
