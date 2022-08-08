package controller

import (
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"music-app-backend/model"
	"net/http"
	"github.com/labstack/echo/v4"
	"log"
	"strconv"
	"time"
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
// Path: /search/:type?q=	type là song hoặc artist hoặc
func GetSong(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	songs := []model.Song{}

	_type := c.Param("type")
	query := c.QueryParam("q")
	query = "%" + query + "%"
	
	if _type == "song" {
		result := db.Where("title like ?", query).Limit(10).Find(&songs);
		if result.Error != nil {
			return c.JSON(http.StatusInternalServerError, "Song not found");
		}
	} else if _type == "artist" {
		result := db.Where("performer like ?", query).Limit(10).Find(&songs);
		if result.Error != nil {
			return c.JSON(http.StatusInternalServerError, "Song not found");
		}
	} else {
		return c.JSON(http.StatusNotFound, "Invalid path")
	}

	return c.JSON(http.StatusOK, songs) 
}

// Create Playlist API
// Method: POST
// Path: /:id/playlist
func CreatePlaylist(c echo.Context) error {
	user_id := c.Param("uid")

	newPlaylist := &struct {
		Title string `json:"title" xml:"title" form:"title" query:"title"`
	} {}

	log.Printf("%s", user_id)

	if err := c.Bind(newPlaylist); err != nil {
		return err
	}

	db := mysqlgorm.GetDBInstance()

	p := &model.Playlist{
		Playlist_id: generatePID(),
		Created_by: user_id,
		Title: newPlaylist.Title,
		Created_date: time.Now().Format("2006-01-02 15:04:05"),
	}

	db.Exec("INSERT INTO `playlist` (`playlist_id`, `created_by`, `title`, `created_date`) VALUES(?, ?, ?, ?)", p.Playlist_id, p.Created_by, p.Title, p.Created_date)
	return c.JSON(http.StatusOK, p) 
}

// Get User's Playlists API
// Method: GET
// Path: /user/:id/playlists
func GetUserPlaylist(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	uid := c.Param("uid")

	playlist := []model.Playlist{}
	
	record := db.Where("created_by = ?", uid).Order("created_date").Find(&playlist)
	
	if record.RowsAffected == 0 {
		return c.JSON(http.StatusInternalServerError, "Empty playlist")
	}

	return c.JSON(http.StatusOK, playlist)  
}

// Remove playlist API
// Method: DELETE
// path: /playlist/:pid
func RemovePlaylist(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	pid := c.Param("pid")

	record := db.Delete(&model.Playlist{}, "playlist_id = ?", pid)
	if record.Error != nil {
		return record.Error 
	}

	return c.JSON(http.StatusOK, "Playlist deleted")  
}

// Get Playlist content API
// Method: GET
// Path: /playlist/:id
func GetPlaylist(c echo.Context) error {
	db := mysqlgorm.GetDBInstance();
	playlist_content := []model.Playlist_content{};
	songs := []model.Song{};

	playlist_id := c.Param("id");

	if result := db.Where("playlist_id = ?", playlist_id).Find(&playlist_content);
	result.Error != nil {
		return result.Error;
	}

	var song_id []string
	for i := 0; i < len(playlist_content); i++ {
		song_id = append(song_id, playlist_content[i].Song_id)
	} 

	if result := db.Where(song_id).Order("title asc").Find(&songs);
	result.Error != nil {
		return result.Error;
	}

	return c.JSON(http.StatusOK, songs);
}


func generatePID() string {
	db := mysqlgorm.GetDBInstance()
	
	var i int64 = 2

	for true {
		p := &model.Playlist{}
	
		// check if user exists
		record := db.Where("playlist_id = ?", i).Take(&p)

		if record.RowsAffected == 0 {
			break
		}

		i += 1
	}

	return strconv.FormatInt(i, 10)
}