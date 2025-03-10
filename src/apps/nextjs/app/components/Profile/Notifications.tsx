"use client";

import React, {useEffect, useState} from "react";
import {fetchWithAuth} from "@/app/api/utils/api"
import {useSession} from "next-auth/react"
import clsx from "clsx";
import {IoMdNotifications} from "react-icons/io";
import {IoClose} from "react-icons/io5";
import {FaWallet} from "react-icons/fa6";
import {formatDate} from "@/lib/utils";
import {Status, TransactionDirection} from "@/app/enums"
import {Notification} from "@/app/types"
import {LoadingSmall} from "@/app/components/LoadingSmall/LoadingSmall";


interface NotificationsProps {
    onClose: () => void
}

export const Notifications = ({onClose}: NotificationsProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {data: session} = useSession()

    function handleClose() {
        onClose();
    }

    useEffect(() => {
        const getTransactions = async () => {
            setLoading(true)
            if (!session?.tokens?.token) {
                console.error("User is not authenticated");
                setLoading(false)
                return;
            }
            if (!session?.user?.id) {
                console.error("Invalid User");
                setLoading(false)
                return;
            }


            try {
                const url = `/api/transactions/for-user/${session.user.id}`;
                const data = await fetchWithAuth(url, "GET", session.tokens?.token)
                setLoading(false)
                setNotifications(data);
            } catch (error) {
                setLoading(false)
                setError("An error has occurred, please try again later")
                console.error("Error fetching protected data:", error);
                setTimeout(() => {
                    onClose();
                }, 5000)
            }
        };

        getTransactions();
    }, []);

    if (error) {
        return <p className="p-4 text-red-500">{error}</p>;
    }
    return (<div className="bg-secondary p-4 rounded">
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center ">
                    <IoMdNotifications className="xl:text-2xl mr-2"/>
                    <span>Notifications</span>
                </div>
                <IoClose className="xl:text-2xl cursor-pointer" onClick={handleClose}/>
            </div>
        </div>
        <div>
            {loading && <div className="w-full flex items-center justify-center"><LoadingSmall/></div>}
            {!loading && notifications.length === 0 &&
                <div className="flex items-center justify-center">No notifications</div>}
            {notifications.length > 0 &&
                <div className="w-full max-h-[170px] lg:max-h-[235px] xl:max-h-[285px] overflow-y-auto fade-in">
                    {notifications.map((dt: Notification, i: number) => (
                        <div key={i + "" + dt.amount}
                             className={`w-full flex items-center justify-between p-1.5 border-b-1 border-b-sky-600 border-dashed`}>

                            <div className="flex w-full">
                                <div className="p-1">
                                    <FaWallet className="text-sky-500 mr-2"/>
                                </div>
                                <div className="flex flex-col flex-auto">
                                    <div className="flex items-center justify-between w-full">

                                        <div className="w-1/2 capitalize">{TransactionDirection[dt.direction]}</div>
                                        <div
                                            className={`w-1/2 ${dt.direction === 1 ? 'text-red-500' : 'text-green-600'}`}>
                                            {dt.direction === 1 ? '- ' : "+ "}{dt.amount}</div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="w-1/2 text-tiny">
                                            {dt.lastModified && formatDate(dt.lastModified)}
                                        </div>
                                        <div className="w-1/2 capitalize flex items-center">
                                        <span className={clsx("mr-2 rounded-full w-[10px] h-[10px]", {
                                            "bg-yellow-500": dt.status === 0,
                                            "bg-green-500": dt.status === 1,
                                            "bg-red-500": dt.status === 2,
                                        })}
                                        ></span>
                                            <span className="text-sm">{Status[dt.status]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                </div>}
        </div>
    </div>)
}