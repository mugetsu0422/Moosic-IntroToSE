package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	controllers "github.com/tientran505/musicapp/controller"
	"github.com/tientran505/musicapp/db"
)

func main() {
	e := echo.New()

	db.NewDB()

	e.GET("/dashboard", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World")
	})

	e.POST("/login", controllers.LoginController)
	e.POST("/like", controllers.LikeSong)
	e.PUT("/register", controllers.RegisterController)
	e.Logger.Fatal(e.Start(":8888"))
}
