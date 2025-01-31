package config

import (
	"fmt"
	"github.com/caarlos0/env/v11"
	"main-service/src/model/default_model"
)

var ENV default_model.Env

func LoadEnv() default_model.Env {
	var cfg default_model.Env
	err := env.Parse(&cfg)
	if err != nil {
		fmt.Println(err)
		//os.Exit(1)
	}
	return cfg
}
