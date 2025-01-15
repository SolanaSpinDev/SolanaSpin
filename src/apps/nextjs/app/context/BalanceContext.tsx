import React, {createContext, useContext, useState, ReactNode} from 'react';
import {useBalanceData} from '@/app/hooks/useBalanceData';

interface BalanceContextType {
    balance: number;
    setBalance: (value: number) => void;
    getBalance: () => Promise<void>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const useBalance = (): BalanceContextType => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};


export const BalanceProvider = ({children}: { children: ReactNode }) => {
    const [balance, setBalance] = useState<number | null>(null);

    useBalanceData(setBalance);
    const {getBalance} = useBalanceData(setBalance);

    return (
        <BalanceContext.Provider value={{balance, setBalance, getBalance}}>
            {children}
        </BalanceContext.Provider>
    );
};

