package controllers

import (
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/tientran505/musicapp/db"
	"golang.org/x/crypto/bcrypt"
	models "github.com/tientran505/musicapp/model"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
} 

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func LoginController(c echo.Context) error {
	user := new(models.User)
	db := db.GetDBInstance()

	if err := c.Bind(user); err != nil {
		return err
	}

	var existedUser models.User

	record := db.Where("username = ?", user.Username).First(&existedUser)
	
	if (record.RowsAffected) == 1 {
		if (CheckPasswordHash(user.Password, existedUser.Password)) {
			return c.JSON(http.StatusOK, "Login successfully")
		}	
	}
	
	return c.JSON(http.StatusInternalServerError, "invalid username/password")
}

func ForgetPassword(c echo.Context) error {
	db := db.GetDBInstance()
	user := &models.User{}

	if err := c.Bind(user); err != nil {
		return err
	}

	db.Where("username = ? AND email = ?", user.Username, user.Email).Take(&user)

	return c.JSON(http.StatusOK, user)
}

func RegisterController(c echo.Context) error {
	user := new(models.User)
	db := db.GetDBInstance()

	if err := c.Bind(user); err != nil {
		return err
	}

	if user.Username == "" || user.Password == "" {
		return c.JSON(http.StatusInternalServerError, "Please add all fields")
	}

	// check if user exists
	record := db.Where("username = ?", user.Username).First(&user)

	if record.RowsAffected == 1 {
		return c.JSON(http.StatusInternalServerError, "User already exists")
	}

	hashPassword, _ := HashPassword(user.Password)

	new_user := &models.User{
		Username: user.Username,
		Password: hashPassword,
	}

	db.Create(&new_user)
	return c.JSON(http.StatusOK, new_user)
}
