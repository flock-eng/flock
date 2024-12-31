import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  createdAt: Date;
}
