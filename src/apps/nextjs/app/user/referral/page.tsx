'use client'

import {toast, ToastContainer} from "react-toastify";
import {Panel} from "@/app/components/Authentication/Panel/Page";
import {UserLayout} from "@/app/components/UserLayout/Page";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {fetchWithAuth} from "@/app/api/utils/api";
import {useSession} from "next-auth/react";
import {Header} from "@/app/components/Header";
import {Socials} from "@/app/components/Socials";
import {FaRegCopy} from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';

export default function Referral() {
    const [isLoading, setIsLoading] = useState(true);
    const {data: session} = useSession();

    const router = useRouter();
    const [referralLink, setReferralLink] = useState<string | undefined>()
    const getProfile = async () => {

        if (!session?.tokens?.token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const url = "/api/users/profile"
            const data = await fetchWithAuth(url, "GET", session.tokens?.token)

            if (data.depositAddress) {
                setReferralLink("https://solanaSPin.vercell.app/?referralId=asdfasfasdfasdfasdf")
            }
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    };
    useEffect(() => {
        getProfile();
    }, [])
    const handleReturn = () => {
        router.push("/");
    }

    function handleCopy() {
        if (typeof navigator !== 'undefined' && navigator.clipboard && referralLink) {
            navigator.clipboard.writeText(referralLink)
                .then(() => {
                    toast.success("Copied to clipboard!");
                })
                .catch((error) => {
                    toast.error("An error has occurred! you have to manually copy the address");
                });
        }

    }

    return (
        <UserLayout>
            <div className="flex flex-col justify-between h-full min-h-screen w-full">
                <Header/>
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <Panel className={`overflow-x-auto md:w-[600px] lg:w-[800px] !p-1 md:!p-6 mx-auto max-w-full`}>
                    <div className="flex flex-col p-8">
                        <div className="flex flex-col p-4 bg-sky-900 rounded-lg mb-2">
                            <div className="uppercase text-base text-white">Your referral link </div>
                            <div className="bg-gray-500 w-full h-[1px]"/>
                            <div className="flex items-center justify-start p-4 text-white">
                                <button className="mr-4">
                                    <FaRegCopy onClick={handleCopy}/>
                                </button>
                                <span
                                    className="truncate text-ellipsis" style={{ maxWidth: '200px' }}>{referralLink}</span>
                            </div>
                        </div>
                        <div className="flex flex-col p-4 bg-sky-900 rounded-lg">
                            <div className="uppercase text-base text-white">Your Statistics</div>
                            <div className="bg-gray-500 w-full h-[1px]"/>
                            <div className="flex justify-between p-4 text-white">
                                <div className="flex flex-col">
                                    <div>
                                        Referrals
                                    </div>
                                    <div>0</div>
                                </div>
                                <div className="flex flex-col">
                                    <div>
                                        Solana Volume
                                    </div>
                                    <div>0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel>
                <div className="p-6">
                    <Socials/>
                </div>
            </div>
        </UserLayout>
    )
}