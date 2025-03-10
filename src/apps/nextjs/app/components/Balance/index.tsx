'use client'
import React, {useState} from "react";
import {formatCurrency} from "@/lib/utils";

import {useBalance} from "@/app/context/BalanceContext";
import Image from "next/image";
import {useDisclosure} from "@heroui/modal";
import {Wallet} from "@/app/components/Wallet";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useSolConversionRate} from "@/app/hooks/useSolConversionRate";

export const Balance = () => {
    const {balance} = useBalance();
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const {status} = useSession();
    const router = useRouter();
    const [displayCurrency, setDisplayCurrency] = useState('usd');
    const toggleCurrency = () => {
        setDisplayCurrency((prev) => (prev === 'usd' ? 'sol' : 'usd'));
    };
    const conversionRate = useSolConversionRate();

    const displayedBalance =
        displayCurrency === 'usd' && conversionRate && balance !== null
            ? balance * conversionRate
            : balance;

    const handleWallet = () => {
        if (status === 'unauthenticated') {
            return router.push('/login');
        }
        onOpen();
    }
    return (<div className="flex items-center font-bold text-xs lg:text-2xl">
            <span className="flex items-center p-1 lg:p-3 bg-zinc-900 rounded-tl-[5px] rounded-bl-[5px] text-white">
                {status !== 'unauthenticated' &&
                    <span>{displayedBalance !== null ? formatCurrency(displayedBalance, displayCurrency) : 'Loading...'}</span>}
                {status === 'unauthenticated' && <span>0</span>}
                <Image
                    src={`/images/solana.png`}
                    alt="Solana"
                    loading="lazy"
                    quality={100}
                    width={28}
                    height={28}
                    className="rounded-2xl ml-2 object-contain cursor-pointer"
                    onClick={toggleCurrency}
                    title="change currency"
                />
            </span>

        <span className="text-black bg-slate-50 p-1 lg:p-3 rounded-tr-[5px] rounded-br-[5px]  cursor-pointer"
              onClick={handleWallet}>
            <Wallet isOpen={isOpen}
                    onOpenChange={onOpenChange}/>
            Wallet
        </span>
    </div>)
}

Balance.displayName = 'Balance';
