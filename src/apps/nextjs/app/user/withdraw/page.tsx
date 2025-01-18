'use client'

import {Panel} from "@/app/components/Authentication/Panel/Page";
import {AuthenticationLayout} from "@/app/components/Authentication/AuthenticationLayout/Page";
import {fetchWithAuth} from "@/app/api/utils/api";
import {useSession} from "next-auth/react";
import {useBalance} from "@/app/context/BalanceContext";
import {formatCurrency} from "@/lib/utils";
import React, {useState} from "react";
import {Button} from "@/app/components/Button/Page";
import {useRouter} from "next/navigation";
import clsx from "clsx";
import DepositModal from "@/app/components/DepositModal/Page";
import {useDisclosure} from "@heroui/modal";

export interface userAction {
    actionType: string,
    amount: number,
    date: string,
    status: string
}

export default function Withdraw() {
    const {data: session} = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [depositAddress, setDepositAddress] = useState()
    const [data, setData] = useState<userAction[]>([
        {actionType: 'deposit', amount: 300, date: '02/01/2025', status: 'completed'},
        {actionType: 'withdraw', amount: 200, date: '03/01/2025', status: 'pending'},
        {actionType: 'deposit', amount: 500, date: '06/01/2025', status: 'in progress'},
        {actionType: 'deposit', amount: 600, date: '09/01/2025', status: 'completed'},
        {actionType: 'deposit', amount: 700, date: '11/01/2025', status: 'failed'},
        {actionType: 'deposit', amount: 50, date: '12/01/2025', status: 'pending'},
    ]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const getProfile = async () => {

        if (!session?.tokens?.token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const url = "/api/users/profile"
            const data = await fetchWithAuth(url, "GET", session.tokens?.token)

            if (data.depositAddress) {
                setDepositAddress(data.depositAddress);
                onOpen();
            }
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    };
    const {balance} = useBalance();
    const router = useRouter();

    const getUserHistory = async () => {

        if (!session?.tokens?.token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const url = "XXXX"
            const data = await fetchWithAuth(url, "GET", session.tokens?.token)

            if (data.depositAddress) {
                //set data
            }
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    };
    
    const handleDeposit = () => {
        getProfile();
    }
    const handleWithdraw = () => {
        //show modal for withdraw
    }
    const handleRefresh = () => {
        router.refresh();
    }
    const handleReturn = () => {
        router.push("/");
    }
    return (
        <AuthenticationLayout>
            <DepositModal depositAddress={depositAddress}
                          isOpen={isOpen}
                          onOpenChange={onOpenChange}/>
            <Panel className="!w-[800px]">
                <div className="p-4">
                    <div className="flex items-center justify-between  border-b-1 border-b-blue-800 p-2">
                        <div>Balance: {formatCurrency(balance)}</div>
                        <div className="flex items-center justify-center gap-2">
                            {session?.tokens?.token &&
                                <Button onClick={handleDeposit}>
                                    <span className="text-white">Deposit</span>
                                </Button>
                            }
                            {session?.tokens?.token &&
                                <Button onClick={handleWithdraw}>
                                    <span className="text-white">Withdraw</span>
                                </Button>
                            }
                            {session?.tokens?.token &&
                                <Button onClick={handleRefresh}>
                                    <span className="text-white">Refresh</span>
                                </Button>
                            }
                            {session?.tokens?.token &&
                                <Button onClick={handleReturn}>
                                    <span className="text-white">Return to game</span>
                                </Button>
                            }
                        </div>
                    </div>
                    {data.length > 0 &&
                        <div className="w-full max-h-[170px] lg:max-h-[235px] xl:max-h-[285px] overflow-y-auto">
                            {data.map((dt, i) => (
                                <div key={i + "" + dt.amount}
                                     className={`${i % 2 === 0 ? "bg-blue-950/25 " : "bg-blue-950/85"} w-full flex items-center justify-between p-1.5`}>
                                    <div
                                        className="w-1/4 capitalize">{dt.actionType}</div>
                                    <div
                                        className={`w-1/4 ${dt.actionType === 'withdraw' ? 'text-red-500' : 'text-green-600'}`}>{dt.actionType === 'withdraw' ? '- ' : "+ "}{dt.amount}</div>
                                    <div className="w-1/4">{dt.date}</div>
                                    <div className="w-1/4 capitalize flex items-center">
                                        <span className={clsx("mr-2 rounded-full w-[10px] h-[10px]", {
                                            "bg-green-500": dt.status === "completed",
                                            "bg-red-500": dt.status === "failed",
                                            "bg-orange-500": dt.status === "in progress",
                                            "bg-sky-500": dt.status === "pending",
                                        })}
                                        ></span>
                                        <span>{dt.status}</span>
                                    </div>
                                </div>))}
                        </div>}
                </div>
            </Panel>
        </AuthenticationLayout>
    )
}