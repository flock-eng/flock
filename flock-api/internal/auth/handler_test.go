package auth

import (
	"context"
	"testing"

	authv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/auth/v1"
	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewHandler(t *testing.T) {
	svc := NewService()
	handler := NewHandler(svc)
	assert.NotNil(t, handler)
	assert.Equal(t, svc, handler.service)
}

func TestHandler_Register(t *testing.T) {
	tests := []struct {
		name    string
		req     *connect.Request[authv1.RegisterRequest]
		wantErr bool
	}{
		{
			name: "basic registration request",
			req: connect.NewRequest(&authv1.RegisterRequest{
				Username: "testuser",
				Password: "password123",
			}),
			wantErr: true, // Currently returns unimplemented
		},
		{
			name:    "nil request message",
			req:     connect.NewRequest[authv1.RegisterRequest](nil),
			wantErr: true,
		},
	}

	handler := NewHandler(NewService())
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := handler.Register(context.Background(), tt.req)
			if tt.wantErr {
				assert.Error(t, err)
				var connectErr *connect.Error
				require.ErrorAs(t, err, &connectErr)
				assert.Equal(t, connect.CodeUnimplemented, connectErr.Code())
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, resp)
				assert.NotNil(t, resp.Msg)
			}
		})
	}
}

func TestHandler_Login(t *testing.T) {
	tests := []struct {
		name    string
		req     *connect.Request[authv1.LoginRequest]
		wantErr bool
	}{
		{
			name: "basic login request",
			req: connect.NewRequest(&authv1.LoginRequest{
				Username: "testuser",
				Password: "password123",
			}),
			wantErr: true, // Currently returns unimplemented
		},
		{
			name:    "nil request message",
			req:     connect.NewRequest[authv1.LoginRequest](nil),
			wantErr: true,
		},
	}

	handler := NewHandler(NewService())
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := handler.Login(context.Background(), tt.req)
			if tt.wantErr {
				assert.Error(t, err)
				var connectErr *connect.Error
				require.ErrorAs(t, err, &connectErr)
				assert.Equal(t, connect.CodeUnimplemented, connectErr.Code())
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, resp)
				assert.NotNil(t, resp.Msg)
			}
		})
	}
}

func TestHandler_Logout(t *testing.T) {
	tests := []struct {
		name    string
		req     *connect.Request[authv1.LogoutRequest]
		wantErr bool
	}{
		{
			name:    "basic logout request",
			req:     connect.NewRequest(&authv1.LogoutRequest{}),
			wantErr: true, // Currently returns unimplemented
		},
		{
			name:    "nil request message",
			req:     connect.NewRequest[authv1.LogoutRequest](nil),
			wantErr: true,
		},
	}

	handler := NewHandler(NewService())
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := handler.Logout(context.Background(), tt.req)
			if tt.wantErr {
				assert.Error(t, err)
				var connectErr *connect.Error
				require.ErrorAs(t, err, &connectErr)
				assert.Equal(t, connect.CodeUnimplemented, connectErr.Code())
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, resp)
				assert.NotNil(t, resp.Msg)
			}
		})
	}
}
