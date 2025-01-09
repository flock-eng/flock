import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user?: {
      id: string;
      user_id: string;
      name?: string | null;
      email?: string | null;
      username?: string | null;
      image?: string | null;
    };
  }
}

