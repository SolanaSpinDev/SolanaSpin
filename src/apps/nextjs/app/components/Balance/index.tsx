'use client'

import {formatCurrency} from "@/lib/utils";
import React from "react";
import { useBalance } from "@/app/context/BalanceContext";

export const Balance = React.memo(({localBalance}: { localBalance: number }) => {
    const { balance } = useBalance();

    return (<div className="font-bold text-xs lg:text-2xl">
        <span className="p-1 lg:p-3 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] text-white">
            {formatCurrency(balance)}
        </span>
        <span className="text-black bg-amber-400 p-1 lg:p-3 rounded-tr-[5px] rounded-br-[5px]">
            Balance
        </span>
    </div>)
})

Balance.displayName = 'Balance';
