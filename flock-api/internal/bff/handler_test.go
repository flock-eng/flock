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

func TestNewHandler(t *testing.T) {
	svc := NewService()
	handler := NewHandler(svc)
	assert.NotNil(t, handler, "handler should not be nil")
	assert.NotNil(t, handler.service, "handler's service should not be nil")
}

func TestHandler_FetchHomepage(t *testing.T) {
	svc := NewService()
	handler := NewHandler(svc)

	t.Run("basic homepage request", func(t *testing.T) {
		req := connect.NewRequest(&bffv1.FetchHomepageRequest{
			Pagination: &commonv1.Pagination{
				PageSize:  10,
				PageToken: "",
			},
		})

		resp, err := handler.FetchHomepage(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})

	t.Run("nil request message", func(t *testing.T) {
		req := connect.NewRequest(&bffv1.FetchHomepageRequest{})
		resp, err := handler.FetchHomepage(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})
}

func TestHandler_FetchUserProfilePage(t *testing.T) {
	svc := NewService()
	handler := NewHandler(svc)

	t.Run("basic profile page request", func(t *testing.T) {
		req := connect.NewRequest(&bffv1.FetchUserProfilePageRequest{
			TargetUser: &commonv1.UserId{
				Value: "user123",
			},
			Pagination: &commonv1.Pagination{
				PageSize:  10,
				PageToken: "",
			},
		})

		resp, err := handler.FetchUserProfilePage(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})

	t.Run("nil request message", func(t *testing.T) {
		req := connect.NewRequest(&bffv1.FetchUserProfilePageRequest{})
		resp, err := handler.FetchUserProfilePage(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})
}
