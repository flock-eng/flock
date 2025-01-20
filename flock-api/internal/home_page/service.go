package home_page

import (
	"context"
	"net/http"

	"buf.build/gen/go/wcygan/flock/connectrpc/go/frontend/v1/frontendv1connect"
	backendv1 "buf.build/gen/go/wcygan/flock/protocolbuffers/go/backend/v1"
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
	return frontendv1connect.HomePageServiceName
}

func (w *registeredService) HandlerFunc(opts connect.HandlerOption) (string, http.Handler) {
	return frontendv1connect.NewHomePageServiceHandler(NewHandler(w.svc), opts)
}

func (s *Service) GetHomePage(ctx context.Context, request *frontendv1.GetHomePageRequest) (*frontendv1.GetHomePageResponse, error) {
	dummyPosts := []*backendv1.Post{
		{
			Id: &backendv1.PostKey{Id: "1"},
			Author: &backendv1.MiniProfile{
				Key:            &backendv1.ProfileKey{Id: "1"},
				Username:       "bigbot",
				FirstName:      "Big",
				LastName:       "Bot",
				ProfilePicture: nil,
			},
			Content:   "This is the first dummy post",
			CreatedAt: 1633036800,
		},
		{
			Id: &backendv1.PostKey{Id: "2"},
			Author: &backendv1.MiniProfile{
				Key:            &backendv1.ProfileKey{Id: "2"},
				Username:       "smallbot",
				FirstName:      "Small",
				LastName:       "Bot",
				ProfilePicture: nil,
			},
			Content:   "This is the second dummy post",
			CreatedAt: 1633123200,
		},
		{
			Id: &backendv1.PostKey{Id: "3"},
			Author: &backendv1.MiniProfile{
				Key:            &backendv1.ProfileKey{Id: "3"},
				Username:       "mediumbot",
				FirstName:      "Medium",
				LastName:       "Bot",
				ProfilePicture: nil,
			},
			Content:   "This is the third dummy post",
			CreatedAt: 1633209600,
		},
		{
			Id: &backendv1.PostKey{Id: "4"},
			Author: &backendv1.MiniProfile{
				Key:            &backendv1.ProfileKey{Id: "4"},
				Username:       "tinybot",
				FirstName:      "Tiny",
				LastName:       "Bot",
				ProfilePicture: nil,
			},
			Content:   "This is the fourth dummy post",
			CreatedAt: 1633296000,
		},
	}

	response := &frontendv1.GetHomePageResponse{
		Posts: dummyPosts,
	}

	return response, nil
}
