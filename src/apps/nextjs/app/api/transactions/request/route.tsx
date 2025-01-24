import {NextResponse} from "next/server";
import {Headers} from "@/app/api/utils/utils";

export async function POST(req: Request) {
    const {pathname} = new URL(req.url);
    try {
        const payload = await req.json();
        const accessToken = payload.token;

        // the pathname should mirror the .net endpoints
        const urlPath = `${process.env.BASE_URL}${pathname}`;
        delete payload.token;
        const backendResponse = await fetch(
            urlPath,
            {
                method: "POST",
                headers:{
                    ...Headers('root', accessToken),
                },
                body: JSON.stringify(payload),
            }
        );

        if (!backendResponse.ok) {
            throw new Error("Failed to fetch transactions/request");
        }
        const data = {...(await backendResponse.json()), responseStatus: 200};
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching transactions/request:", error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        );
    }
}
