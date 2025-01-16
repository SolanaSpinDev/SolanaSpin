import React from "react";
import {LogoTitle} from "@/app/components/LogoTitle";

export function Panel({children}: { children: React.ReactNode }) {
    return (
        <div className="bg-opacity-50 w-[400px] h-auto p-6">
            <div className="rounded-lg bg-[#1d3155]">
                <LogoTitle showBeta={false}/>
                <div>{children}</div>
            </div>
        </div>
    )
}