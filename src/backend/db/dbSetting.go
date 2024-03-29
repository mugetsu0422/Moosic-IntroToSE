package db

import(
	"fmt"
)

// type DBConfig struct{
// 	Host 		string `json:"host"`
// 	Port		string `json:"port"`
// 	User 		string `json:"user"`
// 	Password	string `json:"password"`
// 	Dbname		string `json:"dbname"`
// }

const (
	DBUser = "root"
	DBPassword = "123456"
	DBName = "sys"
	DBHost = "127.0.0.1"
	DBPort = "3306"
	DBType = ""
)

func GetDBType() string {
	return DBType
}

func GetMySQLConnectionString() string {
	dataBase := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", 
	DBUser, DBPassword, DBHost, DBPort, DBName)
	return dataBase
}