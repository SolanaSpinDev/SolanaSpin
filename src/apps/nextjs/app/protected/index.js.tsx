"use client";
//todo remove this after test it

import {useSession} from "next-auth/react";

export default function ProtectedPage() {
    const {data: session} = useSession();

    if (!session) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome, {session.user?.name}</h1>
        </div>
    );
}
