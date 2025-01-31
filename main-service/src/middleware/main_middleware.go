package middleware

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"github.com/bytedance/sonic"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/zulfirman/zhelper"
	"main-service/src/model"
	"main-service/src/model/default_model"

	"main-service/src/config"
	"main-service/src/helper"
	"strings"
	"time"
)

func AuthJwt(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		authToken := helper.VerifyJWT(c, authHeader, 1)

		// Check if token verification failed
		if authToken.Token == "false" {
			// Handle expired token case
			if authToken.Error == "token is expired" {
				newAccessToken := ""
				newRefreshToken := ""

				// Attempt to refresh the token using the X-Refresh-Token header
				refreshTokenHeader := c.Request().Header.Get("X-Refresh-Token")
				if refreshTokenHeader == "" {
					return zhelper.RsMessage(c, 401, "authorization token is expired and refresh token is empty")
				}

				// Validate the refresh token
				refreshTokenValidation := helper.VerifyJWT(c, refreshTokenHeader, 1)
				if refreshTokenValidation.Token == "false" {
					return zhelper.RsMessage(c, 401, "refresh token "+refreshTokenValidation.Error)
				}

				// Ensure the refresh token matches the authorization token
				authTokenStripped := strings.Replace(authHeader, "Bearer ", "", 1)
				if refreshTokenValidation.Token != authTokenStripped {
					return zhelper.RsMessage(c, 401, "mismatch between refresh token and authorization token")
				}

				// Generate a new token pair
				hasher := sha256.New()
				hasher.Write([]byte(refreshTokenHeader))
				tokenKeyRedis := hex.EncodeToString(hasher.Sum(nil))

				// Retrieve token from Redis
				tokenData, redisErr := config.RDB.Get(config.RDBX, tokenKeyRedis).Result()
				var redisToken map[string]string
				if redisErr == nil {
					// Verify the token version is still valid
					tokenVersionErr := checkUserTokenVersion(refreshTokenValidation.Profile.ID, refreshTokenValidation.Profile.TokenVersion)
					if tokenVersionErr != nil {
						return zhelper.RsMessage(c, 401, tokenVersionErr.Error())
					}

					// Unmarshal the token data and retrieve a new token from Redis
					sonic.Unmarshal([]byte(tokenData), &redisToken)
					newAccessToken = redisToken["newToken"]
					newRefreshToken = redisToken["refreshToken"]

					// Prevent excessive usage of refresh tokens (max 10 uses)
					usedRefreshCount := zhelper.StringInt(redisToken["usedRefreshToken"])
					if usedRefreshCount > 10 {
						return zhelper.RsMessage(c, 401, "refresh token is expired")
					}

					// Update Redis with incremented refresh token usage
					config.RDB.Set(config.RDBX, tokenKeyRedis, zhelper.MarshalBinary(zhelper.H{
						"newToken":         newAccessToken,
						"refreshToken":     newRefreshToken,
						"usedRefreshToken": zhelper.IntString(usedRefreshCount + 1),
					}), time.Hour*12)
				} else {
					// Handle case where Redis token data doesn't exist, generate new token
					tokenVersionErr := checkUserTokenVersion(refreshTokenValidation.Profile.ID, refreshTokenValidation.Profile.TokenVersion)
					if tokenVersionErr != nil {
						return zhelper.RsMessage(c, 401, tokenVersionErr.Error())
					}

					// Generate new token pair
					newTokens, genTokenErr := helper.GenerateTokenPair(refreshTokenValidation.Profile, 0)
					if genTokenErr != nil {
						return zhelper.RsMessage(c, 401, genTokenErr.Error())
					}
					newAccessToken = newTokens["accessToken"]
					newRefreshToken = newTokens["refreshToken"]

					// Save the new token pair in Redis
					config.RDB.Set(config.RDBX, tokenKeyRedis, zhelper.MarshalBinary(zhelper.H{
						"newToken":         newAccessToken,
						"refreshToken":     newRefreshToken,
						"usedRefreshToken": "1",
					}), time.Hour*12)
				}

				// Set the new token and refresh token in the response headers
				c.Response().Header().Set("X-Token", newAccessToken)
				c.Response().Header().Set("X-Refresh-Token", newRefreshToken)

				// Update the context with user information
				cc := &default_model.CustomContext{}
				cc.Context = c
				cc.UserID = refreshTokenValidation.Profile.ID
				cc.TypeUser = refreshTokenValidation.Profile.TypeUser
				return next(cc)
			}

			// Return error if the token is invalid for other reasons
			return zhelper.RsMessage(c, 401, authToken.Error)
		}

		// Reject refresh tokens used as authorization tokens
		if authToken.Sub == 1 {
			return zhelper.RsMessage(c, 401, "cannot use refresh token as authorization token")
		}

		// Add user info to the context and proceed with the request
		cc := &default_model.CustomContext{}
		cc.Context = c
		cc.UserID = authToken.Profile.ID
		cc.TypeUser = authToken.Profile.TypeUser
		return next(cc)
	}
}

func checkUserTokenVersion(profileId int64, tokenVersion int64) error {
	resultCh := make(chan error, 1)

	go func() {
		var user model.M_user
		user.ID = profileId

		// Perform the DB lookup
		err := config.DB.Select("token_version").First(&user).Error
		if err != nil {
			resultCh <- err
			return
		}

		// Check token version
		if user.TokenVersion != tokenVersion {
			resultCh <- errors.New("account signed out from all devices")
		} else {
			resultCh <- nil // No error
		}
	}()

	// Wait for the result from the goroutine
	return <-resultCh
}

func MiddlewareConfig() (echo.MiddlewareFunc, echo.MiddlewareFunc, echo.MiddlewareFunc) {
	return middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins: []string{"*"}, //[]string{"http://localhost", "https://labstack.net"}
			AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization,
				"X-Refresh-Token",
			},
			ExposeHeaders: []string{
				"X-Token",
				"X-Refresh-Token",
				echo.HeaderContentDisposition, //for file name download
			},
		}),
		middleware.GzipWithConfig(middleware.GzipConfig{
			//https://serverfault.com/questions/253074/what-is-the-best-nginx-compression-gzip-level
			Level: 2,
			Skipper: func(c echo.Context) bool {
				if strings.Contains(c.Request().URL.Path, "swagger") {
					return true
				}
				return false
			},
		}),
		middleware.SecureWithConfig(middleware.SecureConfig{
			//https://echo.labstack.com/middleware/secure/
			XSSProtection:      "1; mode=block",
			ContentTypeNosniff: "nosniff",
			XFrameOptions:      "SAMEORIGIN",
			HSTSPreloadEnabled: false,
			HSTSMaxAge:         3600,
		})
}
