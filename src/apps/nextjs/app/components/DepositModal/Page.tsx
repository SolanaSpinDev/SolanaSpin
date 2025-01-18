import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@heroui/modal";
import {FaRegCopy} from "react-icons/fa6";
import React from "react";
import {toast} from "react-toastify";

interface DepositAddressModalProps {
    depositAddress: string;
    isOpen: boolean;
    onOpenChange: (nextState: boolean) => void;
}

export default function DepositModal({depositAddress, isOpen, onOpenChange}: DepositAddressModalProps) {
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

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 bg-[#1d3155] text-xl">Your deposit
                            address</ModalHeader>
                        <ModalBody className="bg-[#1d3155] p-5">
                            <p className="mb-10">
                                Use this address to deposit your funds. After deposit your funds will be visible in your
                                balance
                            </p>
                            <p className="flex items-center justify-center gap-3">
                                <button>
                                    <FaRegCopy onClick={handleCopy}/>
                                </button>
                                <span>{depositAddress}</span>
                            </p>

                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}