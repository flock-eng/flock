package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var log *zap.Logger

// Initialize sets up the global logger
func Initialize(isDevelopment bool) {
	var err error
	var config zap.Config

	if isDevelopment {
		config = zap.NewDevelopmentConfig()
		config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	} else {
		config = zap.NewProductionConfig()
		config.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	}

	log, err = config.Build()
	if err != nil {
		panic("failed to initialize logger: " + err.Error())
	}
}

// Get returns the global logger instance
func Get() *zap.Logger {
	if log == nil {
		Initialize(true) // Default to development mode if not initialized
	}
	return log
}

// With creates a child logger with additional fields
func With(fields ...zapcore.Field) *zap.Logger {
	return Get().With(fields...)
}

// Sync flushes any buffered log entries
func Sync() error {
	return log.Sync()
} 