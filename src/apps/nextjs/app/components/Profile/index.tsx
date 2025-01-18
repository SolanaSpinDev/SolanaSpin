'use client';

import React, {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {fetchWithAuth} from "@/app/api/utils/api";
import {FaCircleUser, FaRegCopy} from "react-icons/fa6";
import {useRouter} from 'next/navigation';
import {Button} from "@/app/components/Button/Page";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure
} from "@heroui/modal";
import {toast} from "react-toastify";
import DepositModal from "@/app/components/DepositModal/Page";

export const Profile = () => {
    const [depositAddress, setDepositAddress] = useState()
    const {data: session} = useSession();
    const router = useRouter();
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

    const handleDeposit = () => {
        getProfile()
    }

    const handleLogin = () => {
        router.push('/login');
    }

    const handleRegister = () => {
        router.push('/register-user');
    };

    function handleCopy() {
        if (typeof navigator !== 'undefined' && navigator.clipboard && depositAddress) {
            navigator.clipboard.writeText(depositAddress)
                .then(() => {
                    toast.success("Copied to clipboard!");
                    // Optionally: show a toast notification, change icon color, etc.
                })
                .catch((error) => {
                    toast.error("An error has occurred! you have to manually copy the address");
                });
        }

    }

    return (<div className="mr-2">
        <DepositModal depositAddress={depositAddress}
                      isOpen={isOpen}
                      onOpenChange={onOpenChange}/>
        <ul className="flex items-center justify-center gap-3 text-white">
            {session?.tokens?.token &&
                <li className="flex justify-center items-center">
                    <FaCircleUser className="xl:text-2xl"/>
                    {session?.user?.firstName && <div className="ml-2">Hello {session?.user?.firstName}</div>}
                </li>
            }
            {session?.tokens?.token &&
                <Button onClick={handleDeposit}>
                    <span className="text-white">Deposit</span>
                </Button>
            }
            <li>
                <Button onClick={() => session ? signOut() : handleLogin()}>
                    <span className="text-white">{session ? 'Sign Out' : 'Login'}</span>
                </Button>
            </li>
            {!session?.tokens?.token &&
                <li>
                    <Button onClick={handleRegister}>
                        <span className="text-white">Register</span>
                    </Button>
                </li>
            }

        </ul>
    </div>)
}
