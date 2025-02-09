package bff

import (
	"context"
	"testing"

	bffv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/bff/v1"
	commonv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/common/v1"
	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewService(t *testing.T) {
	svc := NewService()
	assert.NotNil(t, svc, "service should not be nil")
}

func TestService_FetchHomepage(t *testing.T) {
	svc := NewService()

	t.Run("basic homepage request", func(t *testing.T) {
		req := &bffv1.FetchHomepageRequest{
			Pagination: &commonv1.Pagination{
				PageSize: 10,
				PageToken: "",
			},
		}

		resp, err := svc.FetchHomepage(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})

	t.Run("nil request", func(t *testing.T) {
		resp, err := svc.FetchHomepage(context.Background(), nil)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})
}

func TestService_FetchUserProfilePage(t *testing.T) {
	svc := NewService()

	t.Run("basic profile page request", func(t *testing.T) {
		req := &bffv1.FetchUserProfilePageRequest{
			TargetUser: &commonv1.UserId{
				Value: "user123",
			},
			Pagination: &commonv1.Pagination{
				PageSize: 10,
				PageToken: "",
			},
		}

		resp, err := svc.FetchUserProfilePage(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})

	t.Run("nil request", func(t *testing.T) {
		resp, err := svc.FetchUserProfilePage(context.Background(), nil)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})
} 