package controller

import (
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"music-app-backend/model"
	"net/http"
	"github.com/labstack/echo/v4"
)

// Forget Password API
// Method: GET
// Path: /user/forgetpassword
// Content-Type: JSON
// Form:
// {
//      "username": "username",
//      "email": "email"
// }
func ForgetPassword(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	user := &model.User{}

	if err := c.Bind(user); err != nil {
		return err;
	}

	if result := db.Where("username = ? AND email = ?", user.Username, user.Email).Take(&user); 
	result.Error != nil {
		return result.Error;
	}

	return c.JSON(http.StatusOK, user)
}

