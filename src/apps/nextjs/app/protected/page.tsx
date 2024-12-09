"use client";
//todo remove this after test it

import {useSession,signIn} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // just for testing
    if (status === "loading") {
        return <p>Loading...</p>; // Optionally, show a loading state
    }
    if (!session) {
        // Redirect to the sign-in page if the user is not authenticated
        signIn(); // Redirect to the default sign-in page
        return null;
    }
    return (
        <div>
            <h1>Welcome, {session.user?.name}</h1>
        </div>
    );
}
