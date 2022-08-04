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
	newUser := &struct {
		Username string `json:"username" xml:"username" form:"username" query:"username"`
		Password string `json:"password" xml:"password" form:"password" query:"password,omitempty"`
	} {}

	db := mysqlgorm.GetDBInstance()

	if err := c.Bind(newUser); err != nil {
		return err
	}

	log.Print(c)
	user := &model.User{
		Username: newUser.Username,
	}

	// check if user exists
	record := db.Where("username = ?", user.Username).Take(&user)

	if record.RowsAffected == 1 {
		return c.JSON(http.StatusInternalServerError, "User already exists")
	}

	hashPassword, _ := HashPassword(newUser.Password)

	new_user := &model.User{
		User_id: user.Username,
		Username: user.Username,
		User_role: "user",
		Birthday: "0/0/0",
	}
	
	user_password := &model.Password_salt{
		User_id: user.Username,
		Salt: hashPassword,
	}

	
	db.Create(&new_user)
	db.Create(&user_password)

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
	newUser := &struct {
		Username string `json:"username" xml:"username" form:"username" query:"username"`
		Password string `json:"password" xml:"password" form:"password" query:"password,omitempty"`
	} {}

	db := mysqlgorm.GetDBInstance()

	if err := c.Bind(newUser); err != nil {
		return err
	}

	validatedUser := &model.User{ 
		Username: newUser.Username,
	} 

	record := db.Where("username = ?", newUser.Username).First(&validatedUser)
	
	if (record.RowsAffected) == 1 {
		userId := validatedUser.User_id 
		validatedSaltPassword := model.Password_salt{
			User_id: validatedUser.User_id,
		}

		record := db.Where("user_id = ?", userId).First(&validatedSaltPassword)

		if (record.RowsAffected) == 1 {
			if (CheckPasswordHash(newUser.Password, validatedSaltPassword.Salt)) {
				return c.JSON(http.StatusOK, "Login successfully")
			}	
		}
	}
	
	return c.JSON(http.StatusInternalServerError, "Invalid username/password")
}