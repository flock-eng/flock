import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // If user is not authenticated, `withAuth` will automatically
        // redirect them to /api/auth/signin, which then goes to Keycloak.
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // If no token, the user is not logged in.
                // Return true to allow, false to redirect.
                return !!token;
            },
        },
    }
);