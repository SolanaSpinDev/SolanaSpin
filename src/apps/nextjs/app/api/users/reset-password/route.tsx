import {NextResponse} from 'next/server';
import {Headers} from "@/app/api/utils/utils";

export async function POST(req: Request) {
    try {

        // Parse the incoming JSON data from the request
        const data = await req.json();
        console.log('Data received from frontend(reset-password):', data);

        const backendUrl = `${process.env.BASE_URL}/api/users/reset-password`;

        const backendResponse = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                ...Headers("root")
            },
            body: JSON.stringify(data),
        });
        // Check if the backend response is successful
        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();
            console.error('Backend responded with an error:', errorData);
            return NextResponse.json(
                {error: 'reset password failed on backend', details: errorData},
                {status: backendResponse.status}
            );
        }

        // Parse the successful response from the backend
        const responseData = await backendResponse.json();
        console.log('Reset password successful:', responseData);

        const rspData = {
            status: 200,
            details: responseData
        }
        // Return the backend response to the frontend
        return NextResponse.json(rspData);
    } catch (error) {
        console.error('Error during reset password process:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}
