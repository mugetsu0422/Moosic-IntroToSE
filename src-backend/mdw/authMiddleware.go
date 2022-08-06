package mdw

import (
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"github.com/labstack/echo/v4"
	"music-app-backend/model"
	"music-app-backend/controller"
)

func BasicAuth(username string, password string, c echo.Context) (bool, error) {
	db := mysqlgorm.GetDBInstance()

	var validatedUser model.User
	record := db.Where("username = ?", username).First(&validatedUser)

	if (record.RowsAffected) == 1 {
		userId := validatedUser.User_id 
		validatedSaltPassword := model.Password_salt{
			User_id: validatedUser.User_id,
		}

		record := db.Where("user_id = ?", userId).First(&validatedSaltPassword)

		if (record.RowsAffected) == 1 {
			if (controller.CheckPasswordHash(password, validatedSaltPassword.Salt)) {
				c.Set("user_id", userId)
				c.Set("username", username)
				return true, nil
			}
		}
	}

	return false, nil
}
