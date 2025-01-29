import NextAuth from "next-auth";
import {login, refresh} from "@/app/api/utils/user-auth";
import type {
    User,
    UserObject,
    AuthValidity,
    BackendAccessJWT,
    BackendJWT,
    DecodedJWT,
} from "next-auth";
import type {JWT} from "next-auth/jwt";
import {jwtDecode} from "jwt-decode";
import Credentials from "next-auth/providers/credentials";

async function refreshAccessToken(nextAuthJWT: JWT): Promise<JWT> {
    try {
        console.debug("Refreshing access token with", nextAuthJWT.data.tokens.refreshToken);
        // Get a new access token from backend using the refresh token
        console.log('token param passed to refresh token function is = ', nextAuthJWT.data.tokens.token)
        console.log('refreshToken param passed to refresh token function is = ', nextAuthJWT.data.tokens.refreshToken)
        const res = await refresh(nextAuthJWT.data.tokens.token, nextAuthJWT.data.tokens.refreshToken);
        console.log('XXXXXXXXXXXXrefresh token res is ', res)
        const accessToken: BackendAccessJWT = await res.json();

        if (!res.ok) throw accessToken;
        const {exp}: DecodedJWT = jwtDecode(accessToken.token);

        // Update the token and validity in the next-auth object
        nextAuthJWT.data.validity.valid_until = exp;
        nextAuthJWT.data.tokens.token = accessToken.token;

        console.debug("Token refreshed successfully");
        return {...nextAuthJWT};
    } catch (error) {
        console.debug(error);
        console.log('refresh token is not working, should delogate the use')
        await signOut();
        return {
            ...nextAuthJWT,
            error: "RefreshAccessTokenError"
        };
    }
}

const {auth, handlers, signIn, signOut} = NextAuth({
    session: {strategy: "jwt"},
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "Login",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "john@mail.com"},
                password: {label: "Password", type: "password"}
            },

            async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
                console.debug('credentials in authorize -  ', credentials);
                try {
                    const res = await login(
                        credentials.email || "",
                        credentials?.password || ""
                    );
                    const tokens: BackendJWT = await res.json();
                    if (!res.ok) throw tokens;

                    const access: DecodedJWT = jwtDecode(tokens.token);
                    console.debug('access and tokens = ', access, tokens);
                    // Extract the user from the access token
                    //todo update the user Object with shorter keys to map
                    const user: UserObject = {
                        firstName: access['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                        surname: access['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
                        email: access['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                        id: access['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
                    };
                    // Extract the auth validity from the tokens
                    const validity: AuthValidity = {
                        valid_until: access.exp,
                        refresh_until: Math.floor(new Date(tokens.refreshTokenExpiryTime).getTime() / 1000.0)
                    };
                    // Return the object that next-auth calls 'User' (which we've defined in next-auth.d.ts)
                    return {
                        id: tokens.refreshToken,
                        tokens: tokens,
                        user: user,
                        validity: validity
                    } as unknown as User;
                } catch (error) {
                    console.log('login function failed')
                    console.error(error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            return url.startsWith(baseUrl)
                ? Promise.resolve(url)
                : Promise.resolve(baseUrl);
        },
        async jwt({token, user, account}) {

            if (user && account) {
                console.debug("Initial signin");
                return {...token, data: user};
            }

            // The current access token is still valid
            if (Date.now() < token.data.validity.valid_until * 1000) {
                console.debug("Access token is still valid");
                return token;
            }

            // The current access token has expired, but the refresh token is still valid
            console.log('here it is done the refreshAccesstoken becaus ethe condition isnt met')
            if (Date.now() < token.data.validity.refresh_until * 1000) {
                console.debug("Access token is being refreshed");
                console.debug("Date.now() is, ", Date.now());
                console.debug("token.data.validity.refresh_until * 1000, ", token.data.validity.refresh_until * 1000);
                console.debug("and the condition of Date.now()<token.data.validity.refresh_until * 1000 is fulfilled")
                console.log('se cheama refresh token with this param (named token but it is not jsut token is the entire nextAuthJWT) = ', token)
                return await refreshAccessToken(token);
            }

            // The current access token and refresh token have both expired
            // This should not really happen unless you get really unlucky with
            // the timing of the token expiration because the middleware should
            // have caught this case before the callback is called
            return {...token, error: "RefreshTokenExpired"} as JWT;
        },
        async session({session, token, user}) {
            // @ts-expect-error type mismatch
            session.user = token.data.user;
            session.validity = token.data.validity;
            session.error = token.error;
            session.tokens = token.data.tokens

            return session;
        }
    }
})
export const {GET, POST} = handlers