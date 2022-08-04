package model

type User struct {
	User_id      string `json:"user_id" gorm:"primaryKey"`
	Username     string `json:"username" xml:"username" form:"username" query:"username"`
	Email        string `json:"email"`
	User_role	 string `json:"user_role"`
	Birthday     string `json:"birthday"`
	Gender       int    `json:"gender"`
	Phone_number string `json:"phone_number"`
	//Password	 string `json:"password" xml:"password" form:"password" query:"password,omitempty"`
}

type Song struct {
	Song_id     string `json:"song_id" gorm:"primaryKey"`
	Uploaded_by string `json:"uploaded_by"`
	Performer   string `json:"performer"`
	Title       string `json:"title"`
	Play_count  int64  `json:"play_count"`
	Liked_count int64  `json:"liked_count"`
	Status      string `json:"status"`
}

type Session_key struct {
	Key string `json:"key" gorm:"primaryKey"`
	User_id string `json:"user_id"`
	Time int64 `json:"time"`
	Device string `json:"device"`
}

type Role_permission struct {
	Role_id string `json:"role_id" gorm:"primaryKey"`
	Permission string `json:"permission" gorm:"primaryKey"`
	Status string `json:"status"`
}

type Playlist_content struct {
	Playlist_id string `json:"playlist_id" gorm:"primaryKey"`
	Song_id string `json:"song_id" gorm:"primaryKey"`
}

type Playlist struct {
	Playlist_id string `json:"playlist_id" gorm:"primaryKey"`
	Created_by string `json:"created_by"`
	Type string `json:"type"`
	Title string `json:"title"`
	Thumbnail string `json:"thumbnail"`
	Published_date int64 `json:"published_date"`
	Created_date int64 `json:"created_date"`
}

type Password_salt struct {
	User_id string `json:"user_id" gorm:"primaryKey"`
	Salt string `json:"salt"`
}

type Liked_song struct {
	User_id string `json:"user_id" gorm:"primaryKey"`
	Song_id string `json:"song_id" gorm:"primaryKey"`
}