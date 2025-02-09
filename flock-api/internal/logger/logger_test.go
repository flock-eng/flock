package logger

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func TestInitialize(t *testing.T) {
	tests := []struct {
		name          string
		isDevelopment bool
	}{
		{
			name:          "development mode",
			isDevelopment: true,
		},
		{
			name:          "production mode",
			isDevelopment: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			Initialize(tt.isDevelopment)
			require.NotNil(t, log)

			// Test that the logger is properly configured
			if tt.isDevelopment {
				// Development logger should have debug level enabled
				assert.True(t, log.Core().Enabled(zapcore.DebugLevel))
			} else {
				// Production logger should have info level enabled but not debug
				assert.True(t, log.Core().Enabled(zapcore.InfoLevel))
				assert.False(t, log.Core().Enabled(zapcore.DebugLevel))
			}
		})
	}
}

func TestGet(t *testing.T) {
	tests := []struct {
		name            string
		initializeFirst bool
	}{
		{
			name:            "logger already initialized",
			initializeFirst: true,
		},
		{
			name:            "logger not initialized",
			initializeFirst: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Reset the global logger
			log = nil

			if tt.initializeFirst {
				Initialize(true)
			}

			logger := Get()
			assert.NotNil(t, logger)
			assert.NotNil(t, log) // Global logger should be initialized
		})
	}
}

func TestWith(t *testing.T) {
	// Initialize logger
	Initialize(true)

	// Test adding fields
	fields := []zapcore.Field{
		zap.String("key1", "value1"),
		zap.Int("key2", 42),
	}

	logger := With(fields...)
	assert.NotNil(t, logger)

	// The returned logger should be a new instance
	assert.NotEqual(t, log, logger)
}

func TestSync(t *testing.T) {
	// Initialize logger
	Initialize(true)

	// Test syncing
	err := Sync()
	// Note: zap.Logger.Sync() might return an error on some platforms (like stderr on macOS)
	// so we don't assert on the error value
	if err != nil {
		assert.Contains(t, err.Error(), "failed to sync logger")
	}
}
