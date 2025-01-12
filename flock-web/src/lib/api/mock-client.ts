import type { Post, PostKey } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';
import type { ProfileKey, ProfilePicture } from '@buf/wcygan_flock.bufbuild_es/backend/v1/profile_pb';
import type { GetHomePageResponse } from '@buf/wcygan_flock.bufbuild_es/frontend/v1/home_page_pb';

export const ApiClientMock = {
    homePage: {
        getHomePage: async (): Promise<GetHomePageResponse> => {
            const mockPosts: Post[] = [
                {
                    $typeName: 'backend.v1.Post',
                    id: { $typeName: 'backend.v1.PostKey', id: '1' } as PostKey,
                    content: 'Welcome to Flock! This is our first post.',
                    author: {
                        $typeName: 'backend.v1.MiniProfile',
                        key: { $typeName: 'backend.v1.ProfileKey', id: 'user1' } as ProfileKey,
                        username: 'johndoe',
                        firstName: 'John',
                        lastName: 'Doe',
                        profilePicture: {
                            $typeName: 'backend.v1.ProfilePicture',
                            pictureType: {
                                case: 'hexColor',
                                value: '#4A90E2'
                            }
                        } as ProfilePicture
                    },
                    createdAt: BigInt(Date.now() - 3600000) // 1 hour ago
                },
                {
                    $typeName: 'backend.v1.Post',
                    id: { $typeName: 'backend.v1.PostKey', id: '2' } as PostKey,
                    content: 'Excited to share updates and connect with everyone here! 🚀',
                    author: {
                        $typeName: 'backend.v1.MiniProfile',
                        key: { $typeName: 'backend.v1.ProfileKey', id: 'user2' } as ProfileKey,
                        username: 'janedoe',
                        firstName: 'Jane',
                        lastName: 'Doe',
                        profilePicture: {
                            $typeName: 'backend.v1.ProfilePicture',
                            pictureType: {
                                case: 'hexColor',
                                value: '#50E3C2'
                            }
                        } as ProfilePicture
                    },
                    createdAt: BigInt(Date.now() - 7200000) // 2 hours ago
                }
            ];

            return {
                $typeName: 'frontend.v1.GetHomePageResponse',
                posts: mockPosts
            };
        }
    }
}; 