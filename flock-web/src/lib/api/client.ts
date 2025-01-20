import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { PostService } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';
import { HomePageService } from '@buf/wcygan_flock.bufbuild_es/frontend/v1/home_page_pb';
import { ProfilePageService } from '@buf/wcygan_flock.bufbuild_es/frontend/v1/profile_page_pb';

// Create a transport that uses the API base URL from environment variables
const createTransport = (baseUrl: string) => {
	return createConnectTransport({
		baseUrl,
		// Add any additional transport configuration here
		useBinaryFormat: false
	});
};

// API Client factory to create clients with the given base URL
export const createApiClient = (baseUrl: string) => {
	const transport = createTransport(baseUrl);

	return {
		posts: createClient(PostService, transport),
		homePage: createClient(HomePageService, transport),
		profilePage: createClient(ProfilePageService, transport)
	};
};

// Type representing all available API clients
export type ApiClient = ReturnType<typeof createApiClient>;
