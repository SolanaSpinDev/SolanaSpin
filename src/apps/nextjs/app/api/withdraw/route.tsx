import {NextResponse} from 'next/server';

export async function POST(req: Request) {
    try {
        console.log('Received request in Next.js API route for withdraw');

        // Parse the incoming JSON data from the request
        const data = await req.json();
        console.log('Data received from frontend withdraw:', data);

        // Define the absolute URL of your .NET backend
        const backendUrl = `${process.env.BASE_URL}/api/withdraw/amount`;

        console.log('backendUrl here should break');
        console.log(backendUrl);
        // Make a POST request to the .NET backend with the received data
        const backendResponse = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'tenant': 'root',
            },
            body: JSON.stringify(data),
        });

        // Check if the backend response is successful
        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();
            console.error('Backend responded with an error:', errorData);
            console.error('backend status is ', backendResponse.status)
            return NextResponse.json(
                {error: 'Forgot password process failed', details: errorData},
                {status: backendResponse.status}
            );
        }

        // Parse the successful response from the backend
        const responseData = await backendResponse.json();
        console.log('The user is:', data);
        const rspData = {
            status: 200,
            details: "Password reset email sent."
        }
        // Return the backend response to the frontend
        return NextResponse.json(rspData);
    } catch (error) {
        console.error('Error during forgot withdraw process:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}
