import {NextRequest, NextResponse} from "next/server";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    console.log("@Middleware.ts - path:", url.pathname);

    //1. Exclude NextAuth API routes
    if (url.pathname.startsWith("/api/auth/")) {

        return NextResponse.next();
    }

    // 2. Redirect root path "/" to default game mode
    if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/game/default", request.url));
    }

    const isProtectedRoute = url.pathname.startsWith("/user/");
    const token: RequestCookie = request.cookies.get("authjs.session-token");

    if (isProtectedRoute && !token.value) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/auth/:path*", "/user/:path*"],
};
