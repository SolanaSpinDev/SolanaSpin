
/**
 * Log in a user by sending a POST request to the backend using the supplied credentials.
 *
 * TODO: Implement the actual login functionality by sending a POST request to the backend
 *
 * @param email The email of the user
 * @param password The password of the user
 * @returns A BackendJWT response from the backend.
 */
export async function login(
    email: string,
    password: string
): Promise<Response> {
    console.debug("Logging in");

    if (!email) {
        throw new Error("Email is required");
    }
    if (!password) {
        throw new Error("Password is required");
    }

    return await fetch(process.env.BASE_URL + '/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'tenant': 'root',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
}

/**
 * Refresh the access token by sending a POST request to the backend using the supplied refresh token.
 *
 * TODO: Implement the actual refresh functionality by sending a POST request to the backend
 *
 * @param token The current refresh token
 * @param refreshToken The current refresh token
 * @returns A BackendAccessJWT response from the backend.
 */
export async function refresh(token: string, refreshToken: string): Promise<Response> {
    console.debug("Refreshing token");

    if (!token) {
        throw new Error("Token is required");
    }

    return await fetch(process.env.BASE_URL + '/api/token/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'tenant': 'root',
        },
        body: JSON.stringify({
            token: token,
            refreshToken: refreshToken,
        }),
    });
}
