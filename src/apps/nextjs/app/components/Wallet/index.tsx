'use client'

import {toast} from "react-toastify";
import {Modal, ModalBody, ModalContent, ModalHeader, ModalFooter} from "@heroui/modal";
import {FaRegCopy} from "react-icons/fa6";
import React, {useState, useEffect} from "react";
import {FaWallet} from "react-icons/fa6";
import {Button} from "@/app/components/Button/Page";
import {fetchWithAuth} from "@/app/api/utils/api";
import {useSession} from "next-auth/react";
import {formatCurrency} from "@/lib/utils";
import {useBalance} from "@/app/context/BalanceContext";
import {Withdraw} from "@/app/components/Wallet/Withdraw";
import SolanaQRCode from "@/app/components/Wallet/SolanaQRCode";

interface WalletModalProps {
    isOpen: boolean;
    onOpenChange: (nextState: boolean) => void;
}

export const Wallet = ({isOpen, onOpenChange}: WalletModalProps) => {
    const [depositAddress, setDepositAddress] = useState();
    const [isDepositActive, setIsDepositActive] = useState(false);
    const [isWithdrawActive, setIsWithdrawActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState('Wallet');
    const {data: session} = useSession();
    const {balance} = useBalance();
    const getProfile = async () => {
        setLoading(true)
        if (!session?.tokens?.token) {
            console.error("User is not authenticated");
            setLoading(false)
            return;
        }

        try {
            const url = "/api/users/profile"
            const data = await fetchWithAuth(url, "GET", session.tokens?.token)

            if (data.depositAddress) {
                setDepositAddress(data.depositAddress);
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching protected data:", error);
            toast.error('Error fetching Deposit address, please try again later');
            setLoading(false)
        }
    };

    const handleDeposit = () => {
        setBreadcrumb("Wallet / Deposit");
        setIsDepositActive(true);
        setIsWithdrawActive(false);
        getProfile();
    }
    const handleWithdraw = () => {
        setBreadcrumb("Wallet / Withdraw");
        setIsWithdrawActive(true);
        setIsDepositActive(false);
    }

    useEffect(() => {

        if (!isOpen) {
            setIsDepositActive(false);
            setIsWithdrawActive(false);
        }
    }, [isOpen]);

    function handleCopy() {
        if (typeof navigator !== 'undefined' && navigator.clipboard && depositAddress) {
            navigator.clipboard.writeText(depositAddress)
                .then(() => {
                    toast.success("Copied to clipboard!");
                })
                .catch((error) => {
                    toast.error("An error has occurred! you have to manually copy the address");
                });
        }

    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="xl"
            className="text-white"
            placement="top-center"
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                },
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col  text-xl bg-sky-950">
                            <div className="flex items-center gap-1">
                                <FaWallet className="text-sky-500 mr-2"/>
                                <span className="text-base">{breadcrumb}</span>
                            </div>
                            <div>
                                <span>{formatCurrency(balance)} USD</span>
                            </div>
                        </ModalHeader>
                        <ModalBody className={`bg-sky-950 ${isWithdrawActive || isDepositActive ? "p-2" : "p-0"}`}>
                            <div
                                className={`bg-sky-950 ${isWithdrawActive || isDepositActive ? "p-2" : "p-0"} rounded`}>
                                {isDepositActive && <>
                                    <p className="mb-10">
                                        Use this address to deposit your funds. After deposit your funds will be visible
                                        in
                                        your
                                        balance
                                    </p>
                                    {depositAddress &&<SolanaQRCode address={depositAddress}/>}
                                    {depositAddress &&  <p className="flex items-center justify-center gap-3">
                                        <button>
                                            <FaRegCopy onClick={handleCopy}/>
                                        </button>
                                        <span
                                            className="overflow-x-hidden whitespace-nowrap text-ellipsis">{depositAddress}</span>
                                    </p>}
                                </>}
                                {isWithdrawActive && <Withdraw/>}
                            </div>
                        </ModalBody>
                        <ModalFooter className="bg-sky-950">
                            {session?.tokens?.token && !isDepositActive &&
                                <Button onClick={handleDeposit}>
                                    <span className="text-white">Deposit</span>
                                </Button>
                            }
                            {session?.tokens?.token && !isWithdrawActive &&
                                <Button onClick={handleWithdraw}>
                                    <span className="text-white">Withdraw</span>
                                </Button>
                            }
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}