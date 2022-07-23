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
// Path: /search/:type?q=	type là song hoặc artist
func GetSong(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	songs := []model.Song{}

	_type := c.Param("type")
	query := c.QueryParam("q")
	query = "%" + query + "%"
	
	if _type == "song" {
		result := db.Where("title like ?", query).Find(&songs);
		if result.Error != nil {
			return c.JSON(http.StatusInternalServerError, "Song not found");
		}
	} else if _type == "artist" {
		result := db.Where("performer like ?", query).Find(&songs);
		if result.Error != nil {
			return c.JSON(http.StatusInternalServerError, "Song not found");
		}
	} else {
		return c.JSON(http.StatusNotFound, "Invalid path")
	}

	return c.JSON(http.StatusOK, songs) 
}