'use client'
import React, {useState} from "react";
import {formatCurrency} from "@/lib/utils";

import {useBalance} from "@/app/context/BalanceContext";
import Image from "next/image";
import {
    useDisclosure
} from "@heroui/modal";
import {Wallet} from "@/app/components/Wallet";

export const Balance = () => {
    const {balance} = useBalance();
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const handleWallet = () => {
        onOpen();
    }
    return (<div className="flex items-center font-bold text-xs lg:text-2xl">
            <span className="flex items-center p-1 lg:p-3 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] text-white">
                <span>{formatCurrency(balance)}</span>
            <Image
                src={`/images/solana.png`}
                alt="Solana"
                loading="lazy"
                quality={100}
                width={28}
                height={28}
                className="rounded-2xl ml-2 object-contain "
            />
            </span>

        <span className="text-white bg-blue-800 p-1 lg:p-3 rounded-tr-[5px] rounded-br-[5px]" onClick={handleWallet}>
            <Wallet isOpen={isOpen}
                    onOpenChange={onOpenChange}/>
            Wallet
        </span>
    </div>)
}

Balance.displayName = 'Balance';
