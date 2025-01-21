import {NextResponse} from 'next/server';
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {

        // Parse the incoming JSON data from the request
        const data = await req.json();
        const uniqueGeneratedUsername = uuidv4();
        console.log('Data received from frontend:', data);
        const updatedData = {
            ...data,
            username: uniqueGeneratedUsername,
        }

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
            body: JSON.stringify(updatedData),
        });
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
