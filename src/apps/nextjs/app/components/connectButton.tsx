"use client";

import { useEffect, useRef } from "react";
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
//todo to be deleted
export const ConnectBtn = () => {
    const { isConnecting, address, isConnected, chain } = useAccount();
    const { color: backgroundColor, emoji } = emojiAvatarForAddress(
        address ?? ""
    );

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { disconnect } = useDisconnect();
    const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
        address,
    });
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
    }, []);

    const roundedBalance = balanceData ? parseFloat(balanceData.formatted).toFixed(2) : '0.00';

    if (!isConnected) {
        return (
            <button
                className="btn"
                onClick={async () => {
                    // Disconnecting wallet first because sometimes when is connected but the user is not connected
                    if (isConnected) {
                        disconnect();
                    }
                    openConnectModal?.();
                }}
                disabled={isConnecting}
            >
                { isConnecting ? 'Connecting...' : 'Connect your wallet' }
            </button>
        );
    }

    if (isConnected && !chain) {
        return (
            <button className="btn" onClick={openChainModal}>
                Wrong network
            </button>
        );
    }

    return (
        <div className="connect-btn-container">
            <div
                className="account-info"
                onClick={async () => openAccountModal?.()}
            >
                <div
                    role="button"
                    tabIndex={1}
                    className="emoji-avatar"
                    style={{
                        backgroundColor,
                        boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
                    }}
                >
                    {emoji}
                </div>
                <p className="balance-text">
                    {isBalanceLoading ? 'Loading...' : `${roundedBalance} ${balanceData?.symbol}`}
                    $10,000.00$
                </p>
            </div>
            {/* Optionally render the Switch Networks button */}
            {/*{chain && (*/}
            {/*    <button className="btn" onClick={openChainModal}>*/}
            {/*        Switch Networks*/}
            {/*    </button>*/}
            {/*)}*/}
        </div>
    );
};
