package controller

import (
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"music-app-backend/model"
	"net/http"
	"log"
	"golang.org/x/crypto/bcrypt"
	"github.com/labstack/echo/v4"
)

// Forgot Password API
// Method: GET
// Path: /user/forgotpassword?u=&e=
func ForgotPassword(c echo.Context) error {
	db := mysqlgorm.GetDBInstance()
	user := &model.User{}

	u := c.QueryParam("u")
	e := c.QueryParam("e")

	if result := db.Where("username = ? AND email = ?", u, e).Take(&user); 
	result.Error != nil {
		return result.Error;
	}

	return c.JSON(http.StatusOK, user)
}

// Register API
// Method: POST
// Path: /user/register
func Register(c echo.Context) error {
	user := new(model.User)
	db := mysqlgorm.GetDBInstance()

	if err := c.Bind(user); err != nil {
		return err
	}

	log.Print(user)


	if user.Username == "" || user.Password == "" {
		return c.JSON(http.StatusInternalServerError, "Please add all fields")
	}

	// check if user exists
	record := db.Where("username = ?", user.Username).Take(&user)

	if record.RowsAffected == 1 {
		return c.JSON(http.StatusInternalServerError, "User already exists")
	}

	hashPassword, _ := HashPassword(user.Password)

	new_user := &model.User{
		User_id: user.Username,
		Username: user.Username,
		Password: hashPassword,
		User_role: "user",
		Birthday: "0/0/0",
	}
	
	db.Create(&new_user)
	//db.Select("Username", "Password", )
	return c.JSON(http.StatusOK, new_user)
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 4)
	return string(bytes), err
} 

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Forgot Password API
// Method: POST
// Path: /user/login
func Login(c echo.Context) error {
	user := new(model.User)
	db := mysqlgorm.GetDBInstance()

	if err := c.Bind(user); err != nil {
		return err
	}

	var existedUser model.User

	record := db.Where("username = ?", user.Username).First(&existedUser)
	
	if (record.RowsAffected) == 1 {
		if (CheckPasswordHash(user.Password, existedUser.Password)) {
			return c.JSON(http.StatusOK, "Login successfully")
		}	
	}
	
	return c.JSON(http.StatusInternalServerError, "invalid username/password")
}