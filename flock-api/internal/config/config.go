package config

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/spf13/viper"
)

// Config holds all configuration settings
type Config struct {
	Server ServerConfig `mapstructure:"server"`
	Logger LoggerConfig `mapstructure:"logger"`
}

// ServerConfig holds server-specific configuration
type ServerConfig struct {
	Port           string        `mapstructure:"port"`
	ReadTimeout    time.Duration `mapstructure:"read_timeout"`
	WriteTimeout   time.Duration `mapstructure:"write_timeout"`
	MaxHeaderBytes int           `mapstructure:"max_header_bytes"`
}

// LoggerConfig holds logger-specific configuration
type LoggerConfig struct {
	Level      string `mapstructure:"level"`
	Format     string `mapstructure:"format"`
	OutputPath string `mapstructure:"output_path"`
}

// LoadConfig loads the application configuration using Viper
func LoadConfig() (*Config, error) {
	v := viper.New()

	// Set default values
	setDefaults(v)

	// Set up Viper
	v.SetConfigName("config")   // name of config file (without extension)
	v.SetConfigType("yaml")     // type of config file
	v.AddConfigPath("./config") // path to look for the config file in
	v.AddConfigPath(".")        // optionally look for config in the working directory

	// Enable environment variable overrides
	v.SetEnvPrefix("FLOCK")                            // prefix for environment variables
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_")) // replace dots with underscores in env vars
	v.AutomaticEnv()                                   // read in environment variables that match

	// Read the configuration file
	if err := v.ReadInConfig(); err != nil {
		// It's okay if config file doesn't exist, we'll use defaults and env vars
		var configFileNotFound viper.ConfigFileNotFoundError
		if !errors.As(err, &configFileNotFound) {
			return nil, fmt.Errorf("error reading config file: %w", err)
		}
	}

	var config Config
	if err := v.Unmarshal(&config); err != nil {
		return nil, fmt.Errorf("unable to decode config into struct: %w", err)
	}

	return &config, nil
}

// setDefaults sets default values for all configuration settings
func setDefaults(v *viper.Viper) {
	// Server defaults
	v.SetDefault("server.port", "8080")
	v.SetDefault("server.read_timeout", "10s")
	v.SetDefault("server.write_timeout", "10s")
	v.SetDefault("server.max_header_bytes", 1<<20) // 1MB

	// Logger defaults
	v.SetDefault("logger.level", "info")
	v.SetDefault("logger.format", "json")
	v.SetDefault("logger.output_path", "stdout")
}
