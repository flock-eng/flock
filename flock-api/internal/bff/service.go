package bff

import (
	"context"
	"errors"

	bffv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/bff/v1"
	"connectrpc.com/connect"
)

type Service struct{}

func NewService() *Service {
	return &Service{}
}

func (s *Service) FetchHomepage(ctx context.Context, req *bffv1.FetchHomepageRequest) (*bffv1.FetchHomepageResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("bff.v1.FlockUserAggregationService.FetchHomepage is not implemented"))
}

func (s *Service) FetchUserProfilePage(ctx context.Context, req *bffv1.FetchUserProfilePageRequest) (*bffv1.FetchUserProfilePageResponse, error) {
	// Stub implementation
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("bff.v1.FlockUserAggregationService.FetchUserProfilePage is not implemented"))
} 