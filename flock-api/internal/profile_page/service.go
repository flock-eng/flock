package profile_page

import (
    "context"
    "errors"
    frontendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/frontend/v1"
)

type Service struct{}

func NewService() *Service {
    return &Service{}
}

func (s *Service) GetProfilePage(ctx context.Context, request *frontendv1.GetProfilePageRequest) (*frontendv1.GetProfilePageResponse, error) {
    return nil, errors.New("frontend.v1.ProfilePageService.GetProfilePage is not implemented")
}
