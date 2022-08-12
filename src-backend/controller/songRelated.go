package controller

import (
	"log"
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"music-app-backend/model"
	"net/http"
	"strconv"
	"time"

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

// Search Playlist info API
// Method: GET
// Path: /search/playlist?q=
func GetPlaylist(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	playlists := []model.Playlist{}

	query := c.QueryParam("q")
	query = "%" + query + "%"

	result := db.Where("title like ?", query).Limit(10).Find(&playlists);
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Playlist(s) not found");
	}

	return c.JSON(http.StatusOK, playlists) 
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
		if query =="%%" {
			result := db.Where("title like ?", query).Order("rand()").Limit(10).Find(&songs);
			if result.Error != nil {
				return c.JSON(http.StatusInternalServerError, "Song not found");
			}
		} else {
			result := db.Where("title like ?", query).Limit(10).Find(&songs);
			if result.Error != nil {
				return c.JSON(http.StatusInternalServerError, "Song not found");
			}
		}
		
	} else if _type == "artist" {
		if query == "%%" {
			result := db.Where("performer like ?", query).Order("rand()").Limit(10).Find(&songs);
			if result.Error != nil {
				return c.JSON(http.StatusInternalServerError, "Song not found");
			}
		} else {
			result := db.Where("performer like ?", query).Limit(10).Find(&songs);
			if result.Error != nil {
				return c.JSON(http.StatusInternalServerError, "Song not found");
			}
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
// Path: /playlist/content/:id
func GetPlaylistContent(c echo.Context) error {
	db := mysqlgorm.GetDBInstance();
	playlist_content := []model.Playlist_content{};
	songs := []model.Song{};

	playlist_id := c.Param("id");

	if result := db.Where("playlist_id = ?", playlist_id).Find(&playlist_content);
	result.Error != nil {
		return result.Error;
	}

	if len(playlist_content) == 0 {
		return c.JSON(http.StatusOK, songs);
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

// add item to playlist API
// Method: POST
// Path: /playlists/{playlist_id}/tracks
func AddItemToPlaylist(c echo.Context) error {
	p_id := c.Param("pid")

	newSong := &struct {
		Song_id string `json:"song_id" xml:"song_id" form:"song_id" query:"song_id"`
	} {}

	log.Printf("%s", p_id)

	if err := c.Bind(newSong); err != nil {
		return err
	}

	db := mysqlgorm.GetDBInstance()

	p_content := model.Playlist_content{}

	record := db.Where("playlist_id = ? AND song_id = ?", p_id, newSong.Song_id).Take(&p_content)

	if record.RowsAffected == 1 {
		return c.JSON(http.StatusInternalServerError, "Song has already added to this playlist")
	}

	db.Exec("INSERT INTO `musicapp`.`playlist_content` (`playlist_id`, `song_id`) VALUES (?, ?)", p_id, newSong.Song_id)

	return c.JSON(http.StatusOK, p_content)
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