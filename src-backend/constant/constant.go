package constant

import (
    "os"
)

var (
    ServerPort    string = "4000"
    IsDevelopment bool
    SiteDomain    string
)

func Init() {
    if value, exist := os.LookupEnv("SERVER_PORT"); exist {
        ServerPort = value
    }
    IsDevelopment = os.Getenv("GO_ENVIRONMENT") == "development"
    SiteDomain = os.Getenv("SITE_DOMAIN")
}
