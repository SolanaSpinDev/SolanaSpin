import {NextRequest, NextResponse} from "next/server";
// import {withAuth} from "next-auth/middleware"

// export default withAuth({
//         pages: {
//           signIn: "/auth/signin", // Redirect to this page if not authenticated
//           },
// });


export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // Exclude NextAuth API routes
    if (url.pathname.startsWith("/api/auth/")) {
        return NextResponse.next();
    }

    // Add custom logic for protected routes if needed
    const isProtectedRoute = url.pathname.startsWith("/protected/");
    const token = request.cookies.get("next-auth.session-token");

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/protected/:path*", "/api/auth/:path*"], // Ensure /api/auth routes are handled
};
