package model

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

type M_user struct {
	ID           int64  `json:"id" gorm:"primarykey"`
	Image        string `json:"image" form:"image" gorm:"type:varchar(40);default:'default-user-male.jpg'"`
	Email        string `json:"email" form:"email" gorm:"type:varchar(255)"`
	Password     string `json:"password" form:"password" gorm:"type:varchar(255)"`
	FirstName    string `json:"firstName" form:"firstName" gorm:"type:varchar(255)"`
	LastName     string `json:"lastName" form:"lastName" gorm:"type:varchar(255)"`
	Gender       string `json:"gender" form:"gender" gorm:"type:varchar(15)"`
	TypeUser     int    `json:"typeUser" form:"typeUser"`
	TokenVersion int64  `json:"tokenVersion" gorm:"default:1"`
	MainModel
}

func (a M_user) VdLogin() error {
	var req = validation.By(BlankString)
	return validation.ValidateStruct(&a,
		validation.Field(&a.Email, req, is.EmailFormat),
		validation.Field(&a.Password, req),
	)
}
