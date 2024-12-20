import {NextResponse} from "next/server";
import type {AuthOptions} from "next-auth";
import {getServerSession} from "next-auth";
import {AuthenticationsOptions} from "@/app/api/utils/auth";

const authOptions: AuthOptions = AuthenticationsOptions();

//this is get from the aps.net
export async function GET(req: Request) {
    const {pathname} = new URL(req.url);
    try {
        // Retrieve session using getServerSession without exporting authOptions
        const session = await getServerSession(authOptions);

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
