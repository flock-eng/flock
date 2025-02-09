package post

import (
	"context"
	"testing"

	commonv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/common/v1"
	postv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/post/v1"
	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func TestNewService(t *testing.T) {
	svc := NewService()
	assert.NotNil(t, svc, "service should not be nil")
}

func TestService_CreatePost(t *testing.T) {
	svc := NewService()

	t.Run("basic create post request", func(t *testing.T) {
		requestId := "req123"
		req := &postv1.CreatePostRequest{
			RequestId: &requestId,
			Content:   "Hello, World!",
		}

		resp, err := svc.CreatePost(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})

	t.Run("nil request", func(t *testing.T) {
		resp, err := svc.CreatePost(context.Background(), nil)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})
}

func TestService_GetPost(t *testing.T) {
	svc := NewService()

	t.Run("basic get post request", func(t *testing.T) {
		req := &postv1.GetPostRequest{
			PostId: &commonv1.PostId{
				Value: "post123",
			},
			ReadMask: &fieldmaskpb.FieldMask{
				Paths: []string{"content", "author_id"},
			},
		}

		resp, err := svc.GetPost(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})

	t.Run("nil request", func(t *testing.T) {
		resp, err := svc.GetPost(context.Background(), nil)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})
}

func TestService_BatchGetPost(t *testing.T) {
	svc := NewService()

	t.Run("basic batch get post request", func(t *testing.T) {
		req := &postv1.BatchGetPostRequest{
			PostId: []*commonv1.PostId{
				{Value: "post123"},
				{Value: "post456"},
			},
			ReadMask: &fieldmaskpb.FieldMask{
				Paths: []string{"content", "author_id"},
			},
		}

		resp, err := svc.BatchGetPost(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})

	t.Run("nil request", func(t *testing.T) {
		resp, err := svc.BatchGetPost(context.Background(), nil)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})
}

func TestService_UpdatePost(t *testing.T) {
	svc := NewService()

	t.Run("basic update post request", func(t *testing.T) {
		req := &postv1.UpdatePostRequest{
			Post: &postv1.Post{
				Id: &commonv1.PostId{
					Value: "post123",
				},
				AuthorId: &commonv1.UserId{
					Value: "user123",
				},
				Content:       "Updated content",
				CreatedAt:     &timestamppb.Timestamp{},
				LastUpdatedAt: &timestamppb.Timestamp{},
				Version:       1,
			},
			UpdateMask: &fieldmaskpb.FieldMask{
				Paths: []string{"content"},
			},
		}

		resp, err := svc.UpdatePost(context.Background(), req)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})

	t.Run("nil request", func(t *testing.T) {
		resp, err := svc.UpdatePost(context.Background(), nil)
		require.Error(t, err, "method should return unimplemented error")
		assert.Nil(t, resp, "response should be nil")
		assert.Equal(t, connect.CodeUnimplemented, connect.CodeOf(err), "error should have unimplemented code")
	})
}
