import type {NextAuthConfig, User} from "next-auth"
import Credentials from "next-auth/providers/credentials";
import {Awaitable} from "@auth/core/types";

export default {
    providers: [
        Credentials({
            name: "Login",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },

            async authorize(credentials): Promise<User | null> {
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
                        surname: tokens.surname,
                        firstName: tokens.firstName,
                        id: tokens.id
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
            // @ts-expect-error type mismatch
            session.user = token.data.user;
            session.validity = token.data.validity;
            session.tokens = token.data.tokens;
            session.error = token.error; // Include error if applicable
            return session;
        },
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig
