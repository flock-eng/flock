package profile_page

import (
	"context"
	"errors"
	"net/http"

	"buf.build/gen/go/wcygan/flock/connectrpc/go/frontend/v1/frontendv1connect"
	frontendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/frontend/v1"
	"connectrpc.com/connect"
	"github.com/flock-eng/flock/flock-api/internal/service"
)

type Service struct{}

func NewService() service.RegisterableService {
	return &registeredService{svc: &Service{}}
}

// registeredService wraps the Service to implement RegisterableService
type registeredService struct {
	svc *Service
}

func (w *registeredService) ServiceName() string {
	return frontendv1connect.ProfilePageServiceName
}

func (w *registeredService) HandlerFunc(opts connect.HandlerOption) (string, http.Handler) {
	return frontendv1connect.NewProfilePageServiceHandler(NewHandler(w.svc), opts)
}

func (s *Service) GetProfilePage(ctx context.Context, request *frontendv1.GetProfilePageRequest) (*frontendv1.GetProfilePageResponse, error) {
	return nil, errors.New("frontend.v1.ProfilePageService.GetProfilePage is not implemented yet")
}
