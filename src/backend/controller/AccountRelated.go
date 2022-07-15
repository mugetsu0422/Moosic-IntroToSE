package controllers

import (
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/tientran505/musicapp/db"
	"github.com/tientran505/musicapp/model"
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

func ForgetPassword(c echo.Context) error {
	db := db.GetDBInstance()
	user := &models.User{}

	if err := c.Bind(user); err != nil {
		return err;
	}

	db.Where("username = ? AND email = ?", user.Username, user.Email).Take(&user)

	return c.JSON(http.StatusOK, user)
}

func RegisterController(c echo.Context) error {
	user := new(models.User)
	db := db.GetDBInstance()

	if err := c.Bind(user); err != nil {
		return err
	}

	if (user.Username == "" || user.Password == "") {
		return c.JSON(http.StatusInternalServerError, "Please add all fields")
	}

	// check if user exists
	record := db.Where("username = ?", user.Username).Take(&user)

	if (record.RowsAffected == 1) {
		return c.JSON(http.StatusInternalServerError, "User already exists")
	}

	db.Create(&user)
	return c.JSON(http.StatusOK, user)
}