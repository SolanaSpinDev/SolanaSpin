import {NextResponse} from "next/server";
import {auth} from "@/app/api/auth";
import {refresh} from "@/app/api/utils/user-auth";

export async function POST(req: Request) {
    console.log('x')
    const {pathname} = new URL(req.url);
    try {
        const session = await auth();

        // refresh(session.tokens.token,session.tokens.refreshToken);

        console.log(session)
        if (!session?.validity?.valid_until) {
            return NextResponse.json(
                {error: "Unauthorized: No valid session"},
                {status: 401}
            );
        }

        const accessToken = session?.tokens.token.toString();
        const urlPath = `${process.env.BASE_URL}${pathname}`;
        const payload = await req.json();

        const backendResponse = await fetch(
            urlPath, // Replace with your backend URL
            {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // if needed
                },
                body: JSON.stringify(payload),
            }
        );

        if (!backendResponse.ok) {
            throw new Error("Failed to fetch play");
        }

        const data = await backendResponse.json();
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        console.error("Error fetching play:", error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        );
    }
}
