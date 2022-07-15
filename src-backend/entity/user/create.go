package user

import (
    "fmt"
    "music-app-backend/database/mysql"
    "music-app-backend/library/dopanic"
    "music-app-backend/library/hash"
    "music-app-backend/library/random"
)

func generateUserID() string {
    for {
        userID := random.GenerateRandomString(8)
        if FromUserID(userID) != nil {
            continue
        }
        return userID
    }
}

func (fields *Fields) Create() bool {
    fields.UserID = generateUserID()
    fields.UserRole = "default"

    passwordSalt := random.GenerateRandomString(25)
    fields.Password = hash.Password(fields.Password, passwordSalt)
    if _, err := mysql.GetConnection().Exec("INSERT INTO user (user_id, username, email, user_role, birthday, gender, phone_number, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", fields.UserID, fields.Username, fields.Email, fields.UserRole, fields.Birthday, fields.Gender, fields.PhoneNumber, fields.Password); err != nil {
        dopanic.Silent([]string{fmt.Sprintf("%s", err)}, "USER_FIELDS_INSERT")
        return false
    }

    if _, err := mysql.GetConnection().Exec("INSERT INTO user_salt (user_id, salt) VALUES (?, ?)", fields.UserID, passwordSalt); err != nil { 
        dopanic.Silent([]string{fmt.Sprintf("%s", err)}, "PASSWORD_SALT_INSERT")
        return false
    }
    
    return true
}
