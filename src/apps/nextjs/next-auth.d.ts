import { Session } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string; // Add the accessToken property here
    }
}
