package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/tientran505/musicapp/db"
	"github.com/tientran505/musicapp/model"
)

func LikeSong(c echo.Context) error {
	db := db.GetDBInstance()
	like_song := &models.Liked_song{}

	if err := c.Bind(like_song); err != nil {
		return err;
	}

	db.Create(&like_song)
	return c.JSON(http.StatusCreated, like_song)
}