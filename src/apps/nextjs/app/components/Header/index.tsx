import {LogoTitle} from "@/app/components/LogoTitle";
import {Balance} from "@/app/components/Balance";
import {Profile} from "@/app/components/Profile";
import React from "react";

export const Header = ({balance}: { balance: number }) => {
    return (<div
        className="w-full h-[30px] lg:h-[80px] border-b-1 relative z-10 border-slate-800 border-solid flex justify-between items-center">
        <LogoTitle/>
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Balance balance={balance}/>
        </div>
        <div className="flex justify-between items-center">
            <Profile/>
        </div>
    </div>)
}

Header.displayName = 'Header';
