import {ZodString} from "zod";
import {NextResponse} from "next/server";

export const fetchWithAuth = async (
    url: string,
    method: string,
    token: string,
    body?: {
        [key: string]: string | number;
    }
) => {
    let options: RequestInit = {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    if (body) {
        options = {
            ...options,
            body: JSON.stringify(body)
        }
    }
    console.log('url')
    console.log(url)
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export const registerUser = async (data: {
    username?: ZodString["_output"];
    email?: ZodString["_output"];
    password?: ZodString["_output"];
    confirmPassword?: ZodString["_output"]
}) => {
    let options: RequestInit = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            "Content-Type": "application/json",
        },
    }
    options = {
        ...options,
        body: JSON.stringify(data)
    }
    const res = await fetch(`/api/users/register`, {
        ...options,
    });
    if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json(
            { error: 'Registration failed on backend', ...errorData },
            { status: res.status }
        );
        // throw new Error(errorData || 'Failed to self-register user');
    }

    return res.json();
}
