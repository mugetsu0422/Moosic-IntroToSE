package models

type User struct {
	Username	string `json:"username" xml:"username" form:"username" query:"username"`
	Firstname 	string `json:"firstname" xml:"firstname" form:"firstname" query:"firstname", omitempty`
	Lastname	string `json:"lastname" xml:"lastname" form:"lastname" query:"lastname" , omitempty`
	Password	string `json:"password" xml:"password" form:"password" query:"password", omitempty`
	Token		string `json:"token" xml:"token" form:"token" query:"token", omitempty`
	DateCreated string `json:"date_created" xml:"date_created" form:"date_created" query:"date_created", omitempty` 
}

type Error struct {
	ResponseCode		int 	`json:"rc"`
	Message				string 	`json:"message"`
	Detail				string 	`json:"detail"`
	ExternalReference	string	`json:"ext_ref"`
}