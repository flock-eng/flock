import type { Post, PostKey } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';
import type {
	MiniProfile,
	Profile,
	ProfileKey,
	ProfilePicture
} from '@buf/wcygan_flock.bufbuild_es/backend/v1/profile_pb';
import type { ApiClient } from './client';

// Helper function to create a mock post
const createMockPost = (id: string, authorId: string, content: string): Post => ({
	$typeName: 'backend.v1.Post',
	id: { $typeName: 'backend.v1.PostKey', id } as PostKey,
	author: {
		$typeName: 'backend.v1.MiniProfile',
		key: { $typeName: 'backend.v1.ProfileKey', id: authorId } as ProfileKey,
		username: `user${authorId}`,
		firstName: 'Mocked',
		lastName: 'User',
		profilePicture: {
			$typeName: 'backend.v1.ProfilePicture',
			pictureType: {
				case: 'hexColor',
				value: '#4A90E2'
			}
		} as ProfilePicture
	} as MiniProfile,
	content,
	createdAt: BigInt(Date.now())
});

// Helper function to create a mock profile
const createMockProfile = (id: string): Profile => ({
	$typeName: 'backend.v1.Profile',
	summary: {
		$typeName: 'backend.v1.MiniProfile',
		key: { $typeName: 'backend.v1.ProfileKey', id } as ProfileKey,
		username: `user${id}`,
		firstName: 'Mock',
		lastName: 'User',
		profilePicture: {
			$typeName: 'backend.v1.ProfilePicture',
			pictureType: {
				case: 'hexColor',
				value: '#50E3C2'
			}
		} as ProfilePicture
	} as MiniProfile,
	bio: 'This is a mock bio.'
});

// Mock API client implementation
export const createMockApiClient = (): ApiClient => ({
	posts: {
		createPost: async (request) => ({
			$typeName: 'backend.v1.CreatePostResponse',
			post: createMockPost('1', request.author?.id ?? '1', request.content ?? '')
		}),
		getPost: async (request) => ({
			$typeName: 'backend.v1.GetPostResponse',
			post: createMockPost(request.id?.id ?? '1', '1', 'Mock post content')
		}),
		batchGetPosts: async (request) => ({
			$typeName: 'backend.v1.BatchGetPostsResponse',
			posts: (request.ids ?? []).map((id) =>
				createMockPost(id?.id ?? '1', '1', 'Mock post content')
			)
		}),
		listMostRecentPosts: async (request) => ({
			$typeName: 'backend.v1.ListMostRecentPostsResponse',
			posts: Array.from({ length: request.postLimit ?? 10 }, (_, i) =>
				createMockPost(String(i + 1), '1', `Mock post ${i + 1}`)
			)
		}),
		listMostRecentPostsByUser: async (request) => ({
			$typeName: 'backend.v1.ListMostRecentPostsByUserResponse',
			posts: Array.from({ length: request.postLimit ?? 10 }, (_, i) =>
				createMockPost(
					String(i + 1),
					request.author?.id ?? '1',
					`Mock post ${i + 1} by user ${request.author?.id ?? '1'}`
				)
			)
		})
	},
	homePage: {
		getHomePage: async () => ({
			$typeName: 'frontend.v1.GetHomePageResponse',
			posts: Array.from({ length: 5 }, (_, i) => {
				const id = String(i + 1);
				const authorId = String(i + 1);
				return createMockPost(id, authorId, `Mock home page post ${i + 1}`);
			})
		})
	},
	profilePage: {
		getProfilePage: async (request) => ({
			$typeName: 'frontend.v1.GetProfilePageResponse',
			userDetails: createMockProfile(request.profile?.id ?? '1').summary,
			posts: Array.from({ length: 5 }, (_, i) =>
				createMockPost(String(i + 1), request.profile?.id ?? '1', `Mock profile post ${i + 1}`)
			)
		})
	}
});

// Export the mock client instance for direct use
export const ApiClientMock = createMockApiClient();
