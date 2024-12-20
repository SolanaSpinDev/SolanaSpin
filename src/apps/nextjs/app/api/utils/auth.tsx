import CredentialsProvider from "next-auth/providers/credentials";
import type {AuthOptions, Awaitable, RequestInternal} from "next-auth";


export const AuthenticationsOptions: () => AuthOptions = () => ({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Login",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            // @ts-expect-error for Awaitable
            async authorize(credentials, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Awaitable<never | null | User> {
                const res = await fetch(
                    process.env.BASE_URL + "/api/auth/login",
                    {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    }
                );

                if (!res.ok) return null;

                const tokens = await res.json();

                return {
                    id: tokens.refreshToken,
                    tokens,
                    user: {
                        name: tokens.name,
                        email: tokens.email,
                    },
                    validity: {
                        valid_until: tokens.valid_until,
                        refresh_until: tokens.refresh_until,
                    },
                };
            }
        }),
    ],
    callbacks: {
        // Add custom fields to the JWT token
        async jwt({token, user, profile}) {
            // Initial sign-in
            if (user) {
                token.id = user.id;
                token.tokens = user.tokens;
                token.validity = user.validity;
                token.user = user.user;
            }

            return token;
        },

        // Make custom fields available in the session
        async session({session, token}) {
            session.user = token.data.user;
            session.validity = token.data.validity;
            session.tokens = token.data.tokens;
            session.error = token.error; // Include error if applicable
            return session;
        },
    },
});
