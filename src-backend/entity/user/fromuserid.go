package user

import (
    "fmt"
    "music-app-backend/database/mysql"
    "music-app-backend/library/dopanic"
)

func FromUserID(userID string) (fields *Fields) {
    userDataQuery, err := mysql.GetConnection().Query("SELECT username, email, user_role, birthday, gender, phone_number, password FROM user WHERE user_id = ?", userID)
    if err != nil {
        dopanic.WithMessage([]string{fmt.Sprintf("%s", err)}, "user-from-user-id-query")
        return nil
    }
    defer userDataQuery.Close()

    if !userDataQuery.Next() {
        return nil
    }

    fields.UserID = userID
    if err := userDataQuery.Scan(&fields.Username, &fields.Email, &fields.UserRole, &fields.Birthday, &fields.Gender, &fields.PhoneNumber, &fields.Password); err != nil {
        dopanic.WithMessage([]string{fmt.Sprintf("%s", err)}, "user-from-user-id-bind")
        return nil
    }

    fields.BirthdayString = fmt.Sprintf("%04d/%02d/%02d", fields.Birthday.Year(), fields.Birthday.Month(), fields.Birthday.Day())
    return fields
}
