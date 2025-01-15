import {formatCurrency} from "@/lib/utils";
import React from "react";
import {useBalanceData} from "@/app/hooks/useBalanceData";

export const Balance = React.memo(({localBalance}: { localBalance: number }) => {
    const { balance, isLoading, isError } = useBalanceData();

    return (<div className="font-bold text-xs lg:text-2xl">
        <span className="p-1 lg:p-3 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] text-white">
            {formatCurrency(localBalance)}
        </span>
        <span className="text-black bg-amber-400 p-1 lg:p-3 rounded-tr-[5px] rounded-br-[5px]">
            Balance
        </span>
        {/*if (isLoading) return <div>Loading...</div>;*/}
        {/*if (isError) return <div>Error loading balance.</div>;*/}
        <div className="text-red-700">context balance is {balance}</div>
    </div>)
})

Balance.displayName = 'Balance';
