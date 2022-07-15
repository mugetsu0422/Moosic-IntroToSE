package mysql

import (
    "database/sql"
    "fmt"
    "music-app-backend/library/dopanic"
    "net/url"
    "os"
    _ "github.com/go-sql-driver/mysql"
)

var database *sql.DB

func connect() {
    connectionData := []any{"USERNAME", "PASSWORD", "HOST", "PORT", "DATABASE"}
    for index, envKey := range connectionData {
        connectionData[index] = url.QueryEscape(os.Getenv("MYSQL_" + envKey.(string)))
    }
    targetDB, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", connectionData...))
    if err != nil {
        dopanic.WithMessage([]string{fmt.Sprintf("%s", err)}, "mysql-connect")
        return
    }
    database = targetDB
}

func GetConnection() *sql.DB {
    if database == nil {
        connect()
    }
    return database
}
