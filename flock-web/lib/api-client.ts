import { Post } from "@/types";

export const ApiClient = {
  posts: {
    list: async (): Promise<Post[]> => {
      return [
        { 
          id: "1", 
          content: "This is the first post!", 
          author: {
            id: "user1",
            firstName: "John",
            lastName: "Doe",
            username: "johndoe"
          },
          createdAt: new Date() 
        },
        { 
          id: "2", 
          content: "Another post here.", 
          author: {
            id: "user2",
            firstName: "Jane",
            lastName: "Smith",
            username: "janesmith"
          },
          createdAt: new Date() 
        },
        { 
          id: "3", 
          content: "Post number three.", 
          author: {
            id: "user3",
            firstName: "Alice",
            lastName: "Johnson",
            username: "alicej"
          },
          createdAt: new Date() 
        },
        { 
          id: "4", 
          content: "Fourth post for testing.", 
          author: {
            id: "user4",
            firstName: "Bob",
            lastName: "Brown",
            username: "bobbrown"
          },
          createdAt: new Date() 
        },
        { 
          id: "5", 
          content: "Final dummy post.", 
          author: {
            id: "user5",
            firstName: "Charlie",
            lastName: "Davis",
            username: "charlied"
          },
          createdAt: new Date() 
        },
      ];
    },
    create: async (authorId: string, content: string): Promise<void> => {
      // Mock implementation for now
      console.log("Post created:", { authorId, content });
    },
  },
};
