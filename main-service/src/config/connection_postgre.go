package config

import (
	"fmt"
	"github.com/zulfirman/zhelper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"gorm.io/plugin/dbresolver"
	"time"
)

var DB *gorm.DB

func Con() (*gorm.DB, error) {
	//connection to database
	host := ENV.HostDB
	dbname := ENV.PostgresDB
	user := ENV.PostgresUser
	pass := ENV.PostgresPassword
	port := ENV.PortDB
	timezone := ENV.Timezone
	dsn := "host=" + host + " user=" + user + " password=" + pass + " dbname=" + dbname + " port=" + port + " TimeZone=" + timezone + " sslmode=disable"
	loggerEnv := ENV.LogDB
	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		//https://gorm.io/docs/gorm_config.html
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
		DisableAutomaticPing:   false,
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
		Logger: logger.Default.LogMode(logger.LogLevel(loggerEnv)),
	})

	if ENV.DBReplication {
		//for development in local no need to separate read and write database
		replicas := make([]gorm.Dialector, 2)
		for i := 0; i < 2; i++ {
			host = ENV.HostDB + "-slave-" + zhelper.IntString(i)
			dsnReplicas := "host=" + host + " user=" + user + " password=" + pass + " dbname=" + dbname + " port=" + port + " TimeZone=" + timezone + " sslmode=disable"
			replicas[0] = postgres.Open(dsnReplicas)
		}
		err = DB.Use(dbresolver.Register(dbresolver.Config{
			Replicas: replicas,
		}))
		if err != nil {
			fmt.Println(err)
			//os.Exit(1)
		}
	}

	sqlDB, err := DB.DB()
	if err != nil {
		fmt.Println(err)
		//os.Exit(1)
	}
	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	sqlDB.SetMaxIdleConns(20)
	// SetMaxOpenConns sets the maximum number of open connections to the database.
	sqlDB.SetMaxOpenConns(100)
	//pool time
	tm := time.Minute * time.Duration(20)
	// SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
	sqlDB.SetConnMaxLifetime(tm)

	if err != nil {
		fmt.Println(err)
		//os.Exit(1)
	}
	fmt.Println("DB POSTGRE CONNECTED")
	return DB, nil
}
