import {LogoTitle} from "@/app/components/LogoTitle";
import {Balance} from "@/app/components/Balance";
import {Profile} from "@/app/components/Profile";
import React from "react";
import {useRouter} from 'next/navigation';

export const Header = () => {
    const router = useRouter();
    const handleLogoCLick = () => {
        router.push("/");
    }

    return (<div
        className="w-full h-[40px] lg:h-[80px] border-b-1 relative z-30 border-slate-800 border-solid flex justify-between items-center">
        <div onClick={handleLogoCLick}>
            <LogoTitle/>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-center hidden low-md:inline-block">
            <Balance/>
        </div>
        <div className="flex justify-between items-center">
            <Profile/>
        </div>
    </div>)
}

Header.displayName = 'Header';
