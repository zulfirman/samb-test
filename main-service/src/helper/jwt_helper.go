package helper

import (
	"bytes"
	"fmt"
	"github.com/bytedance/sonic"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"main-service/src/config"
	"strings"
	"time"
)

// jwt helper
type JwtCustomClaims struct {
	Profile ProfileJwt `json:"profile"`
	Token   string     `json:"token"`
	Sub     int        `json:"sub"`
	Error   string     `json:"error"`
	jwt.RegisteredClaims
}

type UserLoginStruct struct {
	Email           string `json:"email" `
	Password        string `json:"password"`
	TimeoutDuration int
}

type ProfileJwt struct {
	ID           int64 `json:"id"`
	TypeUser     int   `json:"typeUser"`
	TokenVersion int64 `json:"tokenVersion"`
}

func GenerateTokenPair(user ProfileJwt, timeOutDuration int) (map[string]string, error) {
	//generate jwt token function
	expiresAt := time.Now().Add(15 * time.Minute).Unix()
	if config.ENV.AppEnv == 1 && timeOutDuration != 0 {
		expiresAt = time.Now().Add(time.Second * time.Duration(timeOutDuration)).Unix()
	}

	jwtSecret := config.ENV.JWTSecret
	if user.TypeUser == 3 {
		expiresAt = time.Now().Add(262800 * time.Minute).Unix() // 6 months
		jwtSecret = config.ENV.JWTSecretGame
	}
	claimsStruct := &JwtCustomClaims{
		user,
		"",
		0,
		"",
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Unix(expiresAt, 0)),
		},
	}

	// create main jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claimsStruct)
	// Generate encoded token and send it as response.
	generatedTokenMain, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return nil, err
	}
	//end create main jwt token

	//generate refresh token (ONLY MODIFY EXPIRES AT AND SUB)
	claimsStruct.Token = generatedTokenMain
	defaultRefreshTokenDuration := time.Hour * 72
	if user.TypeUser == 3 {
		defaultRefreshTokenDuration = time.Hour * 4380 //6 months
	}
	claimsStruct.ExpiresAt = jwt.NewNumericDate(time.Unix(time.Now().Add(defaultRefreshTokenDuration).Unix(), 0))
	claimsStruct.Sub = 1
	rtClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claimsStruct)
	generatedRefreshToken, err := rtClaims.SignedString([]byte(jwtSecret))
	if err != nil {
		return nil, err
	}
	//end generate refresh token

	return map[string]string{
		"accessToken":  generatedTokenMain,
		"refreshToken": generatedRefreshToken,
	}, nil
}

func Me(c echo.Context, typeUser int) JwtCustomClaims {
	tokenString := c.Request().Header.Get("Authorization")
	return ParseToken(tokenString, typeUser)
}

func ParseToken(tokenString string, typeUser int) JwtCustomClaims { //check if token is valid then parse the token to struct
	tokenString = strings.Replace(tokenString, "Bearer ", "", 1)
	var claimStruct JwtCustomClaims
	claims := jwt.MapClaims{}
	token, errClaim := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if jwt.SigningMethodHS256 != token.Method {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		secret := ""
		if typeUser == 1 { //typeUser 1 or 2 use JWT_SECRET
			secret = config.ENV.JWTSecret
		}
		if typeUser == 3 { //typeUser 3 for game use JWT_SECRET_GAME
			secret = config.ENV.JWTSecretGame
		}
		return []byte(secret), nil
	})
	jsonString, _ := sonic.Marshal(claims)
	errDecodeMap := sonic.Unmarshal(jsonString, &claimStruct)                   //parse jwt token to struct
	if token == nil && errClaim != nil || !token.Valid || errDecodeMap != nil { //not verified, failed parse jwt to struct
		claimStruct.Token = "false"
		claimStruct.Error = errClaim.Error()
		return claimStruct
	}
	claimStruct.ExpiresAt = jwt.NewNumericDate(time.Unix(int64(claims["exp"].(float64)), 0))
	return claimStruct
}

func VerifyJWT(c echo.Context, tokenString string, typeUser int) *JwtCustomClaims { //check if token is valid
	if tokenString == "" {
		tokenString = c.Request().Header.Get("Authorization")
		if tokenString == "" {
			return &JwtCustomClaims{
				Token: "false",
				Error: "authorization token is empty",
			}
		}
	}
	tokenString = strings.Replace(tokenString, "Bearer ", "", 1)
	token, errClaim := jwt.ParseWithClaims(tokenString, &JwtCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		if jwt.SigningMethodHS256 != token.Method {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		secret := ""
		if typeUser == 1 { //typeUser 1 or 2 use JWT_SECRET
			secret = config.ENV.JWTSecret
		}
		if typeUser == 3 { //typeUser 3 for game use JWT_SECRET_GAME
			secret = config.ENV.JWTSecretGame
		}
		return []byte(secret), nil
	})
	if token == nil && errClaim != nil || !token.Valid { //not verified, failed parse jwt to struct
		errByte := []byte(errClaim.Error())
		if bytes.Contains(errByte, []byte("expired")) {
			return &JwtCustomClaims{
				Token: "false",
				Error: "token is expired",
			}
		} else {
			return &JwtCustomClaims{
				Token: "false",
				Error: errClaim.Error(),
			}
		}
	}
	claims := token.Claims.(*JwtCustomClaims)
	return claims
}
