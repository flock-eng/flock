package home_page

import (
	frontendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/frontend/v1"
	"context"
	"errors"
)

type Service struct{}

func NewService() *Service {
	return &Service{}
}

func (s *Service) GetHomePage(ctx context.Context, request *frontendv1.GetHomePageRequest) (*frontendv1.GetHomePageResponse, error) {
	return nil, errors.New("frontend.v1.HomePageService.GetHomePage is not implemented")
}
