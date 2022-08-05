package controller

import (
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"music-app-backend/model"
	"net/http"
	"log"
	"golang.org/x/crypto/bcrypt"
	"music-app-backend/entity/response"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"time"
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
	userId := c.Get("user_id").(string)
	
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = userId
	claims["exp"] = time.Now().Add(5 * time.Hour).Unix()

	log.Printf("\nExpired time: %v\n", claims["exp"])

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, &response.JSONResponse{
		Success: true,
		Data: t,
		Messages: "Success",
	})
}