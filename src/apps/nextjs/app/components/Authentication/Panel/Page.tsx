import React from "react";

export function Panel({children}: { children: React.ReactNode }) {
    return (
        <div className="bg-opacity-50 w-[400px] h-auto p-6">
            <div>{children}</div>
        </div>
    )
}