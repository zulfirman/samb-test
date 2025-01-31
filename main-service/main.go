package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/bytedance/sonic/decoder"
	"github.com/bytedance/sonic/encoder"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	echoMiddleware "github.com/labstack/echo/v4/middleware"
	"html/template"
	"io"
	_ "main-service/docs"
	"main-service/src/config"
	"main-service/src/route"
	"net/http"
	"os"
	"os/signal"
	"time"
)

func main() {
	_ = godotenv.Load()
	config.ENV = config.LoadEnv()
	location, _ := time.LoadLocation(config.ENV.Timezone)
	time.Local = location
	router := echo.New()
	router.JSONSerializer = CustomJSONSerializer{}
	router.Use(echoMiddleware.BodyLimit("15M"))
	router = route.SetupRouter(router)
	renderer := &TemplateRenderer{
		templates: template.Must(template.ParseGlob("src/view/*.html")),
	}
	router.Renderer = renderer

	//databases
	config.DB, _ = config.Con()
	config.RDB = config.ConRedis()
	//end databases

	//graceful-shutdown
	//start server
	go func() {
		if err := router.Start(":" + config.ENV.AppPort); err != nil && err != http.ErrServerClosed {
			router.Logger.Fatal("shutting down the server")
		}
	}()
	// Wait for interrupt signal to gracefully shutdown the server with a timeout of 10 seconds.
	// Use a buffered channel to avoid missing signals as recommended for signal.Notify
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := router.Shutdown(ctx); err != nil {
		router.Logger.Fatal(err)
	}
	//end graceful-shutdown
}

type CustomJSONSerializer struct{}

// Serialize converts an interface into a json and writes it to the response.
// You can optionally use the indent parameter to produce pretty JSONs.
func (d CustomJSONSerializer) Serialize(c echo.Context, i interface{}, indent string) error {
	enc := encoder.NewStreamEncoder(c.Response()) //use sonic encoder
	if indent != "" {
		enc.SetIndent("", indent)
	}
	return enc.Encode(i)
}

// Deserialize reads a JSON from a request body and converts it into an interface.
func (d CustomJSONSerializer) Deserialize(c echo.Context, i interface{}) error {
	err := decoder.NewStreamDecoder(c.Request().Body).Decode(i) //use sonic decoder
	if ute, ok := err.(*json.UnmarshalTypeError); ok {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Unmarshal type error: expected=%v, got=%v, field=%v, offset=%v", ute.Type, ute.Value, ute.Field, ute.Offset)).SetInternal(err)
	} else if se, ok := err.(*json.SyntaxError); ok {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Syntax error: offset=%v, error=%v", se.Offset, se.Error())).SetInternal(err)
	}
	return err
}

// TemplateRenderer is a custom html/template renderer for Echo framework
type TemplateRenderer struct {
	templates *template.Template
}

// Render renders a template document
func (t *TemplateRenderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	// Add global methods if data is a map
	if viewContext, isMap := data.(map[string]interface{}); isMap {
		viewContext["reverse"] = c.Echo().Reverse
	}
	return t.templates.ExecuteTemplate(w, name, data)
}
