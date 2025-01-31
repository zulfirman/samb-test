package config

import (
	"context"
	"github.com/labstack/gommon/log"
	"github.com/redis/go-redis/v9"
)

var RDB *redis.Client
var RDBX = context.Background()

func ConRedis() *redis.Client {
	con := redis.NewClient(&redis.Options{
		Addr:     ENV.RedisHost,
		Password: ENV.RedisPassword,
		DB:       0, // use default DB
	})
	checkConnection := con.Ping(RDBX)
	log.Info(checkConnection)
	return con
}
