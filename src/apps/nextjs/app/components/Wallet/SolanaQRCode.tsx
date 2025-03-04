import React from "react";
import QRCode from "react-qr-code";

const SolanaQRCode = ({address}) => {
    if (!address) {
        return <p>No address provided!</p>;
    }

    return (
        <div style={{textAlign: "center", margin: "20px"}}>
            <h3>Scan to use this Solana address</h3>
            <div className="flex items-center justify-center p-4 fadeIn">
                <QRCode value={address} size={128} bgColor={'#e4e4e7'}/>
            </div>
        </div>
    );
};

export default SolanaQRCode;
