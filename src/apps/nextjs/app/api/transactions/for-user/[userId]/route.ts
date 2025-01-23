import {auth} from "@/app/api/auth";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const {pathname} = new URL(req.url);
    console.log('pathname in route.ts')
    console.log(pathname)
    try {
        // Retrieve session using getServerSession without exporting authOptions
        const session = await auth();

        if (!session?.validity?.valid_until) {
            return NextResponse.json(
                {error: "Unauthorized: No valid session"},
                {status: 401}
            );
        }

        const accessToken = session?.tokens.token.toString();
        const urlPath = `${process.env.BASE_URL}${pathname}`;

        // Make a request to your ASP.NET backend
        const backendResponse = await fetch(
            urlPath, // Replace with your backend URL
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!backendResponse.ok) {
            throw new Error("Failed to fetch user profile");
        }

        const data = await backendResponse.json();

        // Return backend data to client
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        );
    }
}
