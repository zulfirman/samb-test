package default_model

type Env struct {
	ProjectName    string `env:"PROJECT_NAME"`
	ComposeProject string `env:"COMPOSE_PROJECT_NAME"`
	AppEnv         int    `env:"APP_ENV"`
	AppPort        string `env:"APP_PORT"`
	Timezone       string `env:"TZ"`
	StoreLog       bool   `env:"STORE_LOG"`

	HostDB        string `env:"HOST_DB"`
	PortDB        string `env:"PORT_DB"`
	SSLDB         string `env:"SSL_DB"`
	LogDB         int    `env:"LOG_DB"`
	DBReplication bool   `env:"DB_REPLICATION"`

	RedisHost     string `env:"REDIS_HOST"`
	RedisPassword string `env:"REDIS_PASSWORD"`

	JWTSecret     string `env:"JWT_SECRET"`
	JWTSecretGame string `env:"JWT_SECRET_GAME"`

	PostgresUser     string `env:"POSTGRES_USER"`
	PostgresPassword string `env:"POSTGRES_PASSWORD"`
	PostgresDB       string `env:"POSTGRES_DB"`

	PGRepUser     string `env:"PG_REP_USER"`
	PGRepPassword string `env:"PG_REP_PASSWORD"`
}
