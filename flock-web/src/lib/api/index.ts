export { api } from './config';
export type { ApiClient } from './client';

// Re-export types from the protocol buffers for convenience
export type {
	Post,
	PostKey,
	CreatePostRequest,
	CreatePostResponse,
	GetPostRequest,
	GetPostResponse,
	BatchGetPostsRequest,
	BatchGetPostsResponse,
	ListMostRecentPostsRequest,
	ListMostRecentPostsResponse,
	ListMostRecentPostsByUserRequest,
	ListMostRecentPostsByUserResponse
} from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';

export type {
	Profile,
	ProfileKey,
	MiniProfile,
	ProfilePicture
} from '@buf/wcygan_flock.bufbuild_es/backend/v1/profile_pb';

export type {
	GetHomePageRequest,
	GetHomePageResponse
} from '@buf/wcygan_flock.bufbuild_es/frontend/v1/home_page_pb';

export type {
	GetProfilePageRequest,
	GetProfilePageResponse
} from '@buf/wcygan_flock.bufbuild_es/frontend/v1/profile_page_pb';
