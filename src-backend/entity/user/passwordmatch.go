package user

import (
    "fmt"
    "music-app-backend/database/mysql"
    "music-app-backend/library/dopanic"
    "music-app-backend/library/hash"
)

func (eUser *Fields) getSalt() (userSalt string) {
    queryResult, err := mysql.GetConnection().Query("SELECT salt FROM user_salt WHERE user_id = ?", eUser.UserID)
    if err != nil {
        dopanic.Silent([]string{fmt.Sprintf("%s", err)}, "USER_SALT_QUERY")
        return ""
    }

    defer queryResult.Close()

    if err := queryResult.Scan(&userSalt); err != nil { 
        dopanic.Silent([]string{fmt.Sprintf("%s", err)}, "USER_SALT_QUERY")
        return ""
    }

    return userSalt
}

func (eUser *Fields) MatchPassword(rawPassword string) bool {
    return hash.Password(rawPassword, eUser.getSalt()) == eUser.Password
}
