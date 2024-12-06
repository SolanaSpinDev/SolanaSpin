'use client';

import { SessionProvider } from 'next-auth/react'; // or your specific session provider
import { ReactNode } from 'react';

interface ClientSessionProviderProps {
    children: ReactNode;
}

const ClientSessionProvider = ({ children }: ClientSessionProviderProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionProvider;
