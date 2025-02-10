package config

import (
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestLoadConfig(t *testing.T) {
	// Test environment variable overrides
	t.Run("environment variables override defaults", func(t *testing.T) {
		// Set test environment variables
		os.Setenv("FLOCK_SERVER_PORT", "9090")
		os.Setenv("FLOCK_LOGGER_LEVEL", "debug")
		defer func() {
			os.Unsetenv("FLOCK_SERVER_PORT")
			os.Unsetenv("FLOCK_LOGGER_LEVEL")
		}()

		cfg, err := LoadConfig()
		require.NoError(t, err)
		require.NotNil(t, cfg)

		// Verify environment variables were applied
		assert.Equal(t, "9090", cfg.Server.Port)
		assert.Equal(t, "debug", cfg.Logger.Level)
	})

	// Test default values
	t.Run("default values are set correctly", func(t *testing.T) {
		cfg, err := LoadConfig()
		require.NoError(t, err)
		require.NotNil(t, cfg)

		// Server defaults
		assert.Equal(t, "8080", cfg.Server.Port)
		assert.Equal(t, 10*time.Second, cfg.Server.ReadTimeout)
		assert.Equal(t, 10*time.Second, cfg.Server.WriteTimeout)
		assert.Equal(t, 1<<20, cfg.Server.MaxHeaderBytes)

		// Logger defaults
		assert.Equal(t, "info", cfg.Logger.Level)
		assert.Equal(t, "json", cfg.Logger.Format)
		assert.Equal(t, "stdout", cfg.Logger.OutputPath)
	})

	// Test invalid configuration
	t.Run("invalid configuration returns error", func(t *testing.T) {
		// Set an invalid duration to test error handling
		os.Setenv("FLOCK_SERVER_READ_TIMEOUT", "invalid")
		defer os.Unsetenv("FLOCK_SERVER_READ_TIMEOUT")

		cfg, err := LoadConfig()
		assert.Error(t, err)
		assert.Nil(t, cfg)
	})
}

func TestConfig_Validation(t *testing.T) {
	tests := []struct {
		name      string
		modifyEnv func()
		wantErr   bool
	}{
		{
			name:      "valid default config",
			modifyEnv: func() {},
			wantErr:   false,
		},
		{
			name: "invalid server port",
			modifyEnv: func() {
				os.Setenv("FLOCK_SERVER_PORT", "invalid")
			},
			wantErr: false, // Port is a string, so "invalid" is technically valid
		},
		{
			name: "invalid read timeout",
			modifyEnv: func() {
				os.Setenv("FLOCK_SERVER_READ_TIMEOUT", "invalid")
			},
			wantErr: true,
		},
		{
			name: "invalid write timeout",
			modifyEnv: func() {
				os.Setenv("FLOCK_SERVER_WRITE_TIMEOUT", "invalid")
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Clear environment before each test
			os.Clearenv()

			// Apply test-specific environment modifications
			tt.modifyEnv()

			// Attempt to load config
			cfg, err := LoadConfig()

			if tt.wantErr {
				assert.Error(t, err)
				assert.Nil(t, cfg)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, cfg)
			}

			// Clear environment after test
			os.Clearenv()
		})
	}
}
