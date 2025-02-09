package auth

import (
	"context"
	"testing"

	authv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/auth/v1"
	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewService(t *testing.T) {
	svc := NewService()
	assert.NotNil(t, svc)
}

func TestService_Register(t *testing.T) {
	tests := []struct {
		name    string
		req     *authv1.RegisterRequest
		wantErr bool
	}{
		{
			name: "basic registration request",
			req: &authv1.RegisterRequest{
				Username: "testuser",
				Password: "password123",
			},
			wantErr: true, // Currently returns unimplemented
		},
		{
			name:    "nil request",
			req:     nil,
			wantErr: true,
		},
	}

	svc := NewService()
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := svc.Register(context.Background(), tt.req)
			if tt.wantErr {
				assert.Error(t, err)
				var connectErr *connect.Error
				require.ErrorAs(t, err, &connectErr)
				assert.Equal(t, connect.CodeUnimplemented, connectErr.Code())
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, resp)
			}
		})
	}
}

func TestService_Login(t *testing.T) {
	tests := []struct {
		name    string
		req     *authv1.LoginRequest
		wantErr bool
	}{
		{
			name: "basic login request",
			req: &authv1.LoginRequest{
				Username: "testuser",
				Password: "password123",
			},
			wantErr: true, // Currently returns unimplemented
		},
		{
			name:    "nil request",
			req:     nil,
			wantErr: true,
		},
	}

	svc := NewService()
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := svc.Login(context.Background(), tt.req)
			if tt.wantErr {
				assert.Error(t, err)
				var connectErr *connect.Error
				require.ErrorAs(t, err, &connectErr)
				assert.Equal(t, connect.CodeUnimplemented, connectErr.Code())
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, resp)
			}
		})
	}
}

func TestService_Logout(t *testing.T) {
	tests := []struct {
		name    string
		req     *authv1.LogoutRequest
		wantErr bool
	}{
		{
			name:    "basic logout request",
			req:     &authv1.LogoutRequest{},
			wantErr: true, // Currently returns unimplemented
		},
		{
			name:    "nil request",
			req:     nil,
			wantErr: true,
		},
	}

	svc := NewService()
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := svc.Logout(context.Background(), tt.req)
			if tt.wantErr {
				assert.Error(t, err)
				var connectErr *connect.Error
				require.ErrorAs(t, err, &connectErr)
				assert.Equal(t, connect.CodeUnimplemented, connectErr.Code())
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, resp)
			}
		})
	}
} 


