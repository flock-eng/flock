import { describe, it, expect } from 'vitest';
import { createMockApiClient } from './mock-client';

describe('Mock API Client', () => {
    const client = createMockApiClient();

    describe('posts service', () => {
        it('should create a post', async () => {
            const response = await client.posts.createPost({
                $typeName: 'backend.v1.CreatePostRequest',
                author: { $typeName: 'backend.v1.ProfileKey', id: '123' },
                content: 'Test post',
            });

            expect(response.post).toBeDefined();
            if (!response.post) throw new Error('Post should be defined');
            expect(response.post.content).toBe('Test post');
            expect(response.post.author).toBeDefined();
            if (!response.post.author) throw new Error('Author should be defined');
            expect(response.post.author.key).toBeDefined();
            if (!response.post.author.key) throw new Error('Author key should be defined');
            expect(response.post.author.key.id).toBe('123');
        });

        it('should get a post by id', async () => {
            const response = await client.posts.getPost({
                $typeName: 'backend.v1.GetPostRequest',
                id: { $typeName: 'backend.v1.PostKey', id: '123' },
            });

            expect(response.post).toBeDefined();
            if (!response.post) throw new Error('Post should be defined');
            expect(response.post.id).toBeDefined();
            if (!response.post.id) throw new Error('Post ID should be defined');
            expect(response.post.id.id).toBe('123');
        });

        it('should list most recent posts', async () => {
            const limit = 3;
            const response = await client.posts.listMostRecentPosts({
                $typeName: 'backend.v1.ListMostRecentPostsRequest',
                postLimit: limit,
            });

            expect(response.posts).toHaveLength(limit);
            expect(response.posts[0].content).toContain('Mock post 1');
        });
    });

    describe('home page service', () => {
        it('should get home page data', async () => {
            const response = await client.homePage.getHomePage({
                $typeName: 'frontend.v1.GetHomePageRequest',
            });

            expect(response.posts).toBeDefined();
            expect(response.posts).toHaveLength(5);
        });
    });

    describe('profile page service', () => {
        it('should get profile page data', async () => {
            const response = await client.profilePage.getProfilePage({
                $typeName: 'frontend.v1.GetProfilePageRequest',
                profile: { $typeName: 'backend.v1.ProfileKey', id: '123' },
            });

            expect(response.userDetails).toBeDefined();
            if (!response.userDetails) throw new Error('User details should be defined');
            expect(response.userDetails.key).toBeDefined();
            if (!response.userDetails.key) throw new Error('User details key should be defined');
            expect(response.userDetails.key.id).toBe('123');
            expect(response.posts).toHaveLength(5);
        });
    });
}); 