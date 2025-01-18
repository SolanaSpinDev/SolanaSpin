import React from "react";
import {LogoTitle} from "@/app/components/LogoTitle";
import clsx from "clsx";

interface PanelProps {
    children: React.ReactNode;
    className?: string; // optional prop for extra class names
}
export function Panel({ children, className }: PanelProps) {
    return (
        <div className={clsx("bg-opacity-50 w-[400px] h-auto p-6", className)}>
            <div className="rounded-lg bg-[#1d3155]">
                <LogoTitle showBeta={false}/>
                <div>{children}</div>
            </div>
        </div>
    )
}