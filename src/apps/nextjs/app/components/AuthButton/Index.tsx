"use client";

import {signIn, signOut, useSession} from "next-auth/react";
import React from "react";


export default function AuthButton() {
    const {data: session} = useSession();

    return (
        <div
            className="border-1 border-solid border-blue-950 text-tiny px-[4px] py-[2px] rounded mr-1 bg-blue-950 text-white">
            {session ? (
                <button onClick={() => signOut()}>Sign Out</button>
            ) : (
                <button onClick={() => signIn("auth0")}>Sign In</button>
            )}
        </div>
    );
}
