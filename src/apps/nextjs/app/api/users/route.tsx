import {NextResponse} from "next/server";
import type {AuthOptions} from "next-auth";
import {getServerSession} from "next-auth";
import {AuthenticationsOptions} from "../utils/auth";

const authOptions: AuthOptions = AuthenticationsOptions();


export async function GET(req: Request) {
    // const APPURI = "https://game-dev.solanaspin.io/"
    console.log('reqQQQQQQQQQQQQQQQQ = ', req)
    const {pathname} = new URL(req.url);
    console.log('pathname))))))))))))))))) = ', pathname);
    console.log('se face getXXXXX')
    try {
        // Retrieve session using getServerSession without exporting authOptions
        const session = await getServerSession(authOptions);
        // const cookies = req.headers.get("cookie");
        // console.log("Cookies in GET:", cookies);
        console.log('session%%%%%%%%%%', session);


        if (!session || !session.validity || !session.validity.valid_until) {
            return NextResponse.json(
                {error: "Unauthorized: No valid session"},
                {status: 401}
            );
        }

        // Get the Bearer token
        const accessToken = session?.tokens.token.toString();

        // Make a request to your ASP.NET backend
        const backendResponse = await fetch(
            `${process.env.BASE_URL}${pathname}`, // Replace with your backend URL
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
