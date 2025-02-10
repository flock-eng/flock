# Viper Configuration Management Standard

## Context
Need for a standardized, robust configuration management solution across all microservices that supports multiple configuration sources, environment variables, and runtime updates.

## Solution
Standardize on Viper as the configuration management solution for all microservices with the following implementation pattern:

```go
// internal/config/config.go
package config

import (
    "github.com/spf13/viper"
    "time"
)

type Config struct {
    Server   ServerConfig   `mapstructure:"server"`
    Database DatabaseConfig `mapstructure:"database"`
    Logging  LoggingConfig `mapstructure:"logging"`
}

type ServerConfig struct {
    Host         string        `mapstructure:"host"`
    Port         int          `mapstructure:"port"`
    ReadTimeout  time.Duration `mapstructure:"readTimeout"`
    WriteTimeout time.Duration `mapstructure:"writeTimeout"`
}

// Additional config structs...

func Load(configPath string) (*Config, error) {
    v := viper.New()
    
    // Set defaults
    setDefaults(v)
    
    // Support both YAML and environment variables
    v.SetConfigType("yaml")
    v.SetConfigFile(configPath)
    v.AutomaticEnv()
    v.SetEnvPrefix("APP")
    
    if err := v.ReadInConfig(); err != nil {
        return nil, fmt.Errorf("failed to read config: %w", err)
    }
    
    var config Config
    if err := v.Unmarshal(&config); err != nil {
        return nil, fmt.Errorf("failed to unmarshal config: %w", err)
    }
    
    return &config, nil
}

func setDefaults(v *viper.Viper) {
    v.SetDefault("server.host", "0.0.0.0")
    v.SetDefault("server.port", 8080)
    v.SetDefault("server.readTimeout", "5s")
    v.SetDefault("server.writeTimeout", "10s")
    // Additional defaults...
}
```

Example YAML configuration:
```yaml
server:
  host: 0.0.0.0
  port: 8080
  readTimeout: 5s
  writeTimeout: 10s

database:
  host: localhost
  port: 5432
  name: myapp
  user: ${DB_USER}
  password: ${DB_PASSWORD}

logging:
  level: info
  format: json
```

## Benefits
- Consistent configuration management across all microservices
- Support for multiple configuration sources (files, env vars, flags)
- Type-safe configuration with struct mapping
- Environment variable overrides with automatic binding
- Hot reloading capability for configuration changes
- Nested configuration support
- Default values for all configuration options

## Considerations
- Configuration keys should follow a consistent naming convention
- Sensitive values should always be provided via environment variables
- Each microservice should document its configuration options
- Consider using validation tags for config validation
- Use strongly typed configuration structs
- Include configuration unit tests

## Tags
#configuration #microservices #best-practices #viper #golang

## Metadata
- Date: 2024-03-21
- Related PRs: N/A 