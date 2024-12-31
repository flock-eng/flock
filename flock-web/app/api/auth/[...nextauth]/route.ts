import NextAuth, {getServerSession} from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// Function to get the server session using the provided authentication options
// This is necessary to ensure that the data within the session callback (from authOptions) is available
// like the `accessToken`, `username`, and `user_id` for the user
const getCustomServerSession = () => getServerSession(authOptions)

export { handler as GET, handler as POST, getCustomServerSession };
