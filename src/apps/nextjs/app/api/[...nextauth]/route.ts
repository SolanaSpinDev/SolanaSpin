import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const authOptions = {
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID as string,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: process.env.AUTH0_ISSUER as string,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token as string;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
