package main

import (
	"music-app-backend/constant"
	"music-app-backend/controller"
	mysqlgorm "music-app-backend/database/mysqlGORM"
	"music-app-backend/entity/response"
	"net/http"
	"regexp"
    "music-app-backend/mdw"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func SubdomainCORS(next echo.HandlerFunc) echo.HandlerFunc {
    return func (context echo.Context) error {
        context.Response().Before(func(){
            origin := context.Request().Header.Get(echo.HeaderOrigin)
            if match, err := regexp.Match("^https?://([a-z0-9]+[.])*" + constant.SiteDomain, []byte(origin)); (err == nil) && (match) {
                context.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, origin)
                context.Response().Header().Set(echo.HeaderAccessControlAllowCredentials, "true")
                context.Response().Header().Set(echo.HeaderAccessControlMaxAge, "86400")

                if context.Request().Method == "OPTIONS" {
                    context.Response().Header().Set(echo.HeaderAccessControlAllowMethods, "GET, POST, OPTIONS")
                    context.Response().Header().Set(echo.HeaderAccessControlAllowHeaders, context.Request().Header.Get(echo.HeaderAccessControlRequestHeaders))
                    context.Response().Status = http.StatusOK
                }
            }
        })

        return next(context)
    }
}

func handleOptions(context echo.Context) error {
    return context.JSON(http.StatusOK, &response.JSONResponse{
        Success: true,
    })
}

func main() {
    constant.Init()
    e := echo.New()
    // Connect to mysql using gorm
    mysqlgorm.NewDB()

    // Middleware
    e.Use(middleware.Logger())
    e.Use(SubdomainCORS)
    e.Use(middleware.Recover())
    e.Use(middleware.Gzip())

    e.IPExtractor = echo.ExtractIPDirect()

    e.OPTIONS("*", handleOptions)

    // auth
    //isLogged := middleware.JWT([]byte("mysecretkey"))

    // Controllers
    e.GET("/user/forgotpassword", controller.ForgotPassword)
    e.GET("/search/:type", controller.GetSong)
    e.GET("/search/playlist", controller.GetPlaylist)
    e.POST("/song/like", controller.LikeSong)
	e.DELETE("/song/like", controller.DislikeSong)

    // User
    e.POST("/user/register", controller.Register)
    e.POST("/user/login", controller.Login, middleware.BasicAuth(mdw.BasicAuth))
    e.GET("/playlist/content/:id", controller.GetPlaylistContent)

    // Playlist
    e.POST("/user/:uid/playlists", controller.CreatePlaylist)
    e.GET("/user/:uid/playlists", controller.GetUserPlaylist)
    e.DELETE("/playlists/:pid", controller.RemovePlaylist)
    e.POST("/playlists/:pid/tracks", controller.AddItemToPlaylist)

    // Start server
    e.Logger.Fatal(e.Start(":" + constant.ServerPort))
}
