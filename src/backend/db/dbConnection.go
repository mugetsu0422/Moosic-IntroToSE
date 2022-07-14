package db

import (
	"log"

	models "github.com/tientran505/musicapp/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func NewDB(params ...string) *gorm.DB {
	var err error
	conString := GetMySQLConnectionString()
	log.Print(conString)

	DB, err = gorm.Open(mysql.Open(conString), &gorm.Config{})

	if err != nil {
		log.Panic(err)
	}

	DB.Migrator().CurrentDatabase()
	// DB.Migrator().DropTable(&models.User{})
	// DB.Migrator().DropTable("users")

	//DB.Migrator().CreateTable(&models.User{})

	user := models.User{Username: "Nguyen Van C"}
	DB.Create(&user)

	return DB
}

func GetDBInstance() *gorm.DB {
	return DB
}
