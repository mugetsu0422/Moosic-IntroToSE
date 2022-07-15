package hash

import (
    "crypto/sha256"
    "encoding/hex"
)

func SHA256(text string) string {
    hasher := sha256.New()
    hasher.Write([]byte(text))
    return hex.EncodeToString(hasher.Sum(nil))
}

func Password(password string, salt string) string {
    return SHA256(password + "|" + salt)
}
