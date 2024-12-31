import { Post } from "@/types";

export const ApiClient = {
  posts: {
    list: async (): Promise<Post[]> => {
      // Return dummy data until the API is ready
      return [
        { id: "1", content: "This is the first post!", author: "user1", createdAt: new Date() },
        { id: "2", content: "Another post here.", author: "user2", createdAt: new Date() },
        { id: "3", content: "Post number three.", author: "user3", createdAt: new Date() },
        { id: "4", content: "Fourth post for testing.", author: "user4", createdAt: new Date() },
        { id: "5", content: "Final dummy post.", author: "user5", createdAt: new Date() },
      ];
    },
    create: async (authorId: string, content: string): Promise<void> => {
      // Mock implementation for now
      console.log("Post created:", { authorId, content });
    },
  },
};
