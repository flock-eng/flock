package server

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/twmb/franz-go/pkg/kgo"
	"go.uber.org/zap"
)

// ExampleDependencyConfig holds configuration for external dependencies
type ExampleDependencyConfig struct {
	// Database configuration
	DBHost     string
	DBPort     int
	DBUser     string
	DBPassword string
	DBName     string

	// Redis configuration
	RedisHost     string
	RedisPort     int
	RedisPassword string
	RedisDB       int

	// Kafka/Redpanda configuration
	KafkaBrokers []string
}

// ExampleDependencyInitializer demonstrates how to implement the DependencyInitializer interface
type ExampleDependencyInitializer struct {
	cfg    *ExampleDependencyConfig
	logger *zap.Logger
}

// NewExampleDependencyInitializer creates a new example dependency initializer
func NewExampleDependencyInitializer(cfg *ExampleDependencyConfig, logger *zap.Logger) *ExampleDependencyInitializer {
	if logger == nil {
		logger = zap.NewNop()
	}
	return &ExampleDependencyInitializer{cfg: cfg, logger: logger}
}

// Initialize sets up all external dependencies
func (i *ExampleDependencyInitializer) Initialize(ctx context.Context) (*Dependencies, error) {
	deps := &Dependencies{}
	var err error

	// Initialize database connection (example with PostgreSQL)
	if err = i.initDB(ctx, deps); err != nil {
		return nil, fmt.Errorf("failed to initialize database: %w", err)
	}

	// Initialize Redis connection
	if err = i.initRedis(ctx, deps); err != nil {
		if cleanupErr := i.cleanupDB(ctx, deps); cleanupErr != nil {
			i.logger.Error("failed to cleanup DB during Redis init failure", zap.Error(cleanupErr))
		}
		return nil, fmt.Errorf("failed to initialize Redis: %w", err)
	}

	// Initialize Kafka/Redpanda client
	if err = i.initKafka(ctx, deps); err != nil {
		if cleanupErr := i.cleanupRedis(ctx, deps); cleanupErr != nil {
			i.logger.Error("failed to cleanup Redis during Kafka init failure", zap.Error(cleanupErr))
		}
		if cleanupErr := i.cleanupDB(ctx, deps); cleanupErr != nil {
			i.logger.Error("failed to cleanup DB during Kafka init failure", zap.Error(cleanupErr))
		}
		return nil, fmt.Errorf("failed to initialize Kafka: %w", err)
	}

	return deps, nil
}

func (i *ExampleDependencyInitializer) initDB(ctx context.Context, deps *Dependencies) error {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		i.cfg.DBHost, i.cfg.DBPort, i.cfg.DBUser, i.cfg.DBPassword, i.cfg.DBName)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return fmt.Errorf("failed to open database connection: %w", err)
	}

	// Set connection pool settings
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(5 * time.Minute)

	// Verify connection
	if err = db.PingContext(ctx); err != nil {
		if closeErr := db.Close(); closeErr != nil {
			i.logger.Error("failed to close DB after ping failure", zap.Error(closeErr))
		}
		return fmt.Errorf("failed to ping database: %w", err)
	}

	return nil
}

func (i *ExampleDependencyInitializer) initRedis(ctx context.Context, deps *Dependencies) error {
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", i.cfg.RedisHost, i.cfg.RedisPort),
		Password: i.cfg.RedisPassword,
		DB:       i.cfg.RedisDB,
	})

	// Verify connection
	if err := rdb.Ping(ctx).Err(); err != nil {
		return fmt.Errorf("failed to ping Redis: %w", err)
	}

	return nil
}

// kafkaLogger implements kgo.Logger interface using zap
type kafkaLogger struct {
	logger *zap.Logger
}

func (k *kafkaLogger) Level() kgo.LogLevel {
	return kgo.LogLevelDebug
}

func (k *kafkaLogger) Log(level kgo.LogLevel, msg string, keyvals ...interface{}) {
	fields := make([]zap.Field, 0, len(keyvals)/2)
	for i := 0; i < len(keyvals); i += 2 {
		if i+1 < len(keyvals) {
			fields = append(fields, zap.Any(fmt.Sprint(keyvals[i]), keyvals[i+1]))
		}
	}

	switch level {
	case kgo.LogLevelError:
		k.logger.Error(msg, fields...)
	case kgo.LogLevelWarn:
		k.logger.Warn(msg, fields...)
	case kgo.LogLevelInfo:
		k.logger.Info(msg, fields...)
	case kgo.LogLevelDebug:
		k.logger.Debug(msg, fields...)
	}
}

func (i *ExampleDependencyInitializer) initKafka(ctx context.Context, deps *Dependencies) error {
	// Create Kafka client with proper logger
	client, err := kgo.NewClient(
		kgo.SeedBrokers(i.cfg.KafkaBrokers...),
		kgo.WithLogger(&kafkaLogger{logger: i.logger}),
	)
	if err != nil {
		return fmt.Errorf("failed to create Kafka client: %w", err)
	}

	// Verify connection by fetching metadata
	if err := client.Ping(ctx); err != nil {
		client.Close()
		return fmt.Errorf("failed to ping Kafka: %w", err)
	}

	return nil
}

// Cleanup performs cleanup of all initialized dependencies
func (i *ExampleDependencyInitializer) Cleanup(ctx context.Context, deps *Dependencies) error {
	var errs []error

	// Clean up Kafka
	if err := i.cleanupKafka(ctx, deps); err != nil {
		errs = append(errs, fmt.Errorf("failed to cleanup Kafka: %w", err))
	}

	// Clean up Redis
	if err := i.cleanupRedis(ctx, deps); err != nil {
		errs = append(errs, fmt.Errorf("failed to cleanup Redis: %w", err))
	}

	// Clean up database
	if err := i.cleanupDB(ctx, deps); err != nil {
		errs = append(errs, fmt.Errorf("failed to cleanup database: %w", err))
	}

	if len(errs) > 0 {
		return fmt.Errorf("cleanup errors: %v", errs)
	}
	return nil
}

func (i *ExampleDependencyInitializer) cleanupDB(ctx context.Context, deps *Dependencies) error {
	return nil
}

func (i *ExampleDependencyInitializer) cleanupRedis(ctx context.Context, deps *Dependencies) error {
	return nil
}

func (i *ExampleDependencyInitializer) cleanupKafka(ctx context.Context, deps *Dependencies) error {
	return nil
}
