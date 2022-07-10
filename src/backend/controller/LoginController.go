package controllers

import 
(
	"github.com/tientran505/musicapp/model"
	"net/http"
	"github.com/labstack/echo/v4"
)

func LoginController(c echo.Context) error {
	user := new(models.User)
	
	if err := c.Bind(user); err != nil {
		return err
	}

	if user.Username != "admin" || user.Password != "123456" {
		return c.JSON(http.StatusInternalServerError, "invalid password")
	}

	return c.JSON(http.StatusOK, user)
}