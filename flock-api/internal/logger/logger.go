package logger

import (
	"fmt"
	"strings"

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

	// Set log level from environment variable
	logLevel := strings.ToLower(strings.TrimSpace(config.Level.String()))
	switch logLevel {
	case "debug":
		config.Level = zap.NewAtomicLevelAt(zapcore.DebugLevel)
	case "info":
		config.Level = zap.NewAtomicLevelAt(zapcore.InfoLevel)
	case "warn":
		config.Level = zap.NewAtomicLevelAt(zapcore.WarnLevel)
	case "error":
		config.Level = zap.NewAtomicLevelAt(zapcore.ErrorLevel)
	default:
		config.Level = zap.NewAtomicLevelAt(zapcore.InfoLevel)
	}

	log, err = config.Build(
		zap.AddCaller(),
		zap.AddStacktrace(zapcore.ErrorLevel),
	)
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
	if err := log.Sync(); err != nil {
		return fmt.Errorf("failed to sync logger: %w", err)
	}
	return nil
}
