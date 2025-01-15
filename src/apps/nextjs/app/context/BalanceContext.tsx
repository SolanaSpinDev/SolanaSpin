import React, {createContext, useContext, useState, ReactNode} from 'react';

interface BalanceContextType {
    balance: number;
    setBalance: (value: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({children}: { children: ReactNode }) => {
    const [balance, setBalance] = useState<number>(0);

    return (
        <BalanceContext.Provider value={{balance, setBalance}}>
            {children}
        </BalanceContext.Provider>
    );
};

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};
