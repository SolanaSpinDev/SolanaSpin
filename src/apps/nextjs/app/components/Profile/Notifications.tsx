"use client";

import React, {useEffect, useState} from "react";
import {fetchWithAuth} from "@/app/api/utils/api"
import {useSession} from "next-auth/react"
import clsx from "clsx";
import {IoMdNotifications} from "react-icons/io";
import {IoClose} from "react-icons/io5";
import {FaWallet} from "react-icons/fa6";

export interface Notification {
    actionType: string,
    amount: number,
    date: string,
    status: string
}

interface NotificationsProps {
    onClose: () => void
}

export const Notifications = ({onClose}: NotificationsProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {actionType: 'deposit', amount: 300, date: '02/01/2025', status: 'completed'},
        {actionType: 'withdraw', amount: 200, date: '03/01/2025', status: 'pending'},
        {actionType: 'deposit', amount: 500, date: '06/01/2025', status: 'progress'},
        {actionType: 'deposit', amount: 600, date: '09/01/2025', status: 'completed'},
        {actionType: 'withdraw', amount: 700, date: '11/01/2025', status: 'failed'},
        {actionType: 'deposit', amount: 50, date: '12/01/2025', status: 'pending'},
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {data: session} = useSession()

    function handleClose() {
        onClose();
    }

    useEffect(() => {
        const getNotifications = async () => {

            if (!session?.tokens?.token) {
                console.error("User is not authenticated");
                return;
            }

            try {
                const url = "/api/withdraw/"
                const data = await fetchWithAuth(url, "GET", session.tokens?.token)
                // setNotifications(data)
                //
            } catch (error) {
                console.error("Error fetching protected data:", error);
                setError("Failed to fetch notifications");
            }

        };
        getNotifications();
    }, []);

    // if (error) {
    //     return <p className="p-4 text-red-500">Error: {error}</p>;


    // }
    return (<div className="bg-sky-950 p-4 rounded">
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
            {notifications.length > 0 &&
                <div className="w-full max-h-[170px] lg:max-h-[235px] xl:max-h-[285px] overflow-y-auto ">
                    {notifications.map((dt: Notification, i: number) => (
                        <div key={i + "" + dt.amount}
                             className={`w-full flex items-center justify-between p-1.5 border-b-1 border-b-sky-600 border-dashed`}>
                            <div className="p-1">
                                <FaWallet className="text-sky-500 mr-2"/>
                            </div>
                            <div className="w-1/4 capitalize">{dt.actionType}</div>
                            <div
                                className={`w-1/4 ${dt.actionType === 'withdraw' ? 'text-red-500' : 'text-green-600'}`}>{dt.actionType === 'withdraw' ? '- ' : "+ "}{dt.amount}</div>
                            <div className="w-1/4 text-tiny">
                                {dt.date}
                            </div>
                            <div className="w-1/4 capitalize flex items-center">
                                        <span className={clsx("mr-2 rounded-full w-[10px] h-[10px]", {
                                            "bg-green-500": dt.status === "completed",
                                            "bg-red-500": dt.status === "failed",
                                            "bg-orange-500": dt.status === "progress",
                                            "bg-sky-500": dt.status === "pending",
                                        })}
                                        ></span>
                                <span className="text-sm">{dt.status}</span>
                            </div>
                        </div>))}
                </div>}
        </div>
    </div>)
}