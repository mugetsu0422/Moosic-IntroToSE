package user

import (
    "fmt"
    "music-app-backend/database/mysql"
    "music-app-backend/library/dopanic"
)

func Lookup(identifier string) (result *Fields) {
    lookupResult, err := mysql.GetConnection().Query("SELECT user_id FROM user WHERE user_id = ? OR user_name = ? OR email = ?", identifier, identifier, identifier)
    if err != nil {
        dopanic.Silent([]string{fmt.Sprintf("%s", err)}, "USER_LOOKUP")
        return nil
    }

    defer lookupResult.Close()

    userID := ""
    if !lookupResult.Next() {
        return nil
    }


    if err := lookupResult.Scan(&userID); err != nil {
        dopanic.Silent([]string{fmt.Sprintf("%s", err)}, "USER_LOOKUP_ID_BIND")
        return nil
    }

    result = FromUserID(userID)
    return result
}
