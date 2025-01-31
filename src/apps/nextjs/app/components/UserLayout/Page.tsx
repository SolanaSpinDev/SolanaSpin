import React from "react";
import {ToastContainer} from "react-toastify";

export function UserLayout({children}: { children: React.ReactNode }) {
    return (
        <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-cover bg-center w-full h-full overflow-auto bg-fixed"
            style={{backgroundImage: "url('/images/authentication-bg.png')"}}
        >
            <div className="bg-black bg-opacity-50 w-full h-full">
                <main className="flex items-center justify-center min-h-screen">{children}</main>
            </div>
        </div>
    )
}