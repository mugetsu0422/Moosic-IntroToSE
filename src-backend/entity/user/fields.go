package user

import (
    "time"
)

type Fields struct {
    UserID string `json:"user_id"`
    Username string `json:"username"`
    Email string `json:"email"`
    UserRole string `json:"user_role"`
    Birthday time.Time `json:"-"`
    BirthdayString string `json:"birthday"`
    Gender uint8 `json:"gender"`
    PhoneNumber string `json:"phone_number"`
    Password string `json:"-"`
}
