package controller

import (
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"music-app-backend/model"
	"net/http"
	"github.com/labstack/echo/v4"
)

// Like Song API 
// Method: POST and DELETE
// Path: /song/like
// Content-Type: JSON
// Form:
// {
//      "user_id": "user_id",
//      "song_id": "song_id"
// }
func LikeSong(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	like_song := &model.Liked_song{}

	if err := c.Bind(like_song); err != nil {
		return err;
	}

	if result := db.Create(&like_song); 
	result.Error != nil {
		return result.Error;
	}

	return c.JSON(http.StatusCreated, like_song)
}

func DislikeSong(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	like_song := &model.Liked_song{}

	if err := c.Bind(like_song); err != nil {
		return err;
	}

	if result := db.Delete(&like_song); 
	result.Error != nil {
		return result.Error;
	}
	return c.JSON(http.StatusOK, like_song) 
}

// Get Song info API
// Method: GET
// Path: /song
// Content-Type: JSON
// Form:
// {
//      "song_id": "song_id"
// }
func GetSong(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	song := &model.Song{}

	if err := c.Bind(song); err != nil {
		return err;
	}
	result := db.Take(&song);
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Song not found");
	}
	return c.JSON(http.StatusOK, song) 
}