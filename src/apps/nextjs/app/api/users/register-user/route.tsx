// /app/api/users/register-user/route.tsx

import {NextResponse} from 'next/server';

export async function POST(req: Request) {
    console.log('--- /api/users/register-user route is invoked ---')
    try {
        console.log('Received request in Next.js API route for self-registration');

        // Parse the incoming JSON data from the request
        const data = await req.json();
        console.log('Data received from frontend:', data);

        // Define the absolute URL of your .NET backend
        const backendUrl = `${process.env.BASE_URL}/api/users/self-register`;

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
        console.log('res from the backend (backendResponse) (dotnet) is')
        console.log(backendResponse)
        // Check if the backend response is successful
        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();
            console.error('Backend responded with an error:', errorData);
            return NextResponse.json(
                {error: 'Registration failed on backend', details: errorData},
                {status: backendResponse.status}
            );
        }

        // Parse the successful response from the backend
        const responseData = await backendResponse.json();
        console.log('Registration successful:', responseData);
        console.log('The user is:', data);

        // Return the backend response to the frontend
        return NextResponse.json(responseData, {status: 200});
    } catch (error) {
        console.error('Error during registration process:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}
