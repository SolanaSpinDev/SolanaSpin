import React from "react";
import {LogoTitle} from "@/app/components/LogoTitle";
import clsx from "clsx";

interface PanelProps {
    children: React.ReactNode;
    className?: string; // optional prop for extra class names
}
export function Panel({ children, className }: PanelProps) {
    return (
        <div className={clsx("bg-opacity-50 w-auto md:w-[600px] lg:w-[800px] h-auto p-6", className)}>
            <div className="rounded-lg bg-sky-950">
                <LogoTitle showBeta={false}/>
                <div>{children}</div>
            </div>
        </div>
    )
}