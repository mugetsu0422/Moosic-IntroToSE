package main

import (
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/tientran505/musicapp/controller"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World")
	})
	e.POST("/login", controllers.LoginController)

	e.Logger.Fatal(e.Start(":8888"))
}