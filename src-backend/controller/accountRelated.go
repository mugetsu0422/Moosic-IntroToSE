package controller

import (
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"music-app-backend/model"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Forgot Password API
// Method: GET
// Path: /user/forgotpassword?u=&e=
func ForgotPassword(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	user := &model.User{}

	u := c.QueryParam("u")
	e := c.QueryParam("e")

	if result := db.Where("username = ? AND email = ?", u, e).Take(&user); 
	result.Error != nil {
		return result.Error;
	}

	return c.JSON(http.StatusOK, user)
}

