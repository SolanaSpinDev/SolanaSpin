import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
    pages: {
        signIn: "/auth/signin", // Redirect to this page if not authenticated
    },
});

export const config = {
    matcher: ["/protected/:path*"], // Apply middleware only to these routes
};
