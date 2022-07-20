package mysqlgorm

import(
	"fmt"
	"log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var dbGORM *gorm.DB

const (
	DBUser = "musicapp"
	DBPassword = "clqKyLvjafCE5F3D"
	DBName = "musicapp"
	DBHost = "139.162.86.234"
	DBPort = "5728"
	DBType = "mysql"
)

func GetMySQLConnectionString() string {
	database := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", 
	DBUser, DBPassword, DBHost, DBPort, DBName)
	return database
}

func NewDB(params ...string) *gorm.DB {
	var err error
	conString := GetMySQLConnectionString()
	log.Print(conString)

	dbGORM, err = gorm.Open(mysql.Open(conString), &gorm.Config{})

	if err != nil {
		log.Panic(err)
	}

	return dbGORM
}

func GetDBInstance() *gorm.DB{
	return dbGORM
}