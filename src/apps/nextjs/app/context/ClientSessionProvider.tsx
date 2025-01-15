'use client';

import {SessionProvider} from 'next-auth/react';
import {ReactNode} from 'react';
import {BalanceProvider} from "@/app/context/BalanceContext";

interface ClientSessionProviderProps {
    children: ReactNode;
}

const ClientSessionProvider = ({children}: ClientSessionProviderProps) => {
    return (
        <SessionProvider>
            <BalanceProvider>
                {children}
            </BalanceProvider>
        </SessionProvider>
    )
};

export default ClientSessionProvider;
