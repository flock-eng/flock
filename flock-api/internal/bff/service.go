package bff

import (
	"context"
	"errors"

	bffv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/bff/v1"
	"connectrpc.com/connect"
)

// Service implements the Backend-for-Frontend (BFF) service
type Service struct{}

// NewService creates a new BFF service
func NewService() *Service {
	return &Service{}
}

// FetchHomepage retrieves the data needed for the homepage
func (s *Service) FetchHomepage(ctx context.Context, req *bffv1.FetchHomepageRequest) (*bffv1.FetchHomepageResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("bff.v1.FlockUserAggregationService.FetchHomepage is not implemented"))
}

// FetchUserProfilePage retrieves the data needed for a user's profile page
func (s *Service) FetchUserProfilePage(ctx context.Context, req *bffv1.FetchUserProfilePageRequest) (*bffv1.FetchUserProfilePageResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("bff.v1.FlockUserAggregationService.FetchUserProfilePage is not implemented"))
}
