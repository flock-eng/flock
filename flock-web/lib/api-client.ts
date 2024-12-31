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
          createdAt: new Date("2020-03-15T09:30:00")
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
          createdAt: new Date("2021-08-22T14:15:00")
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
          createdAt: new Date("2022-11-05T18:45:00")
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
          createdAt: new Date("2023-05-10T10:00:00")
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
          createdAt: new Date("2023-09-28T16:20:00")
        },
      ];
    },
    create: async (authorId: string, content: string): Promise<void> => {
      // Mock implementation for now
      console.log("Post created:", { authorId, content });
    },
  },
};
