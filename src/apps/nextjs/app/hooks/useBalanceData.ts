import useSWR from 'swr';
import {fetcher} from '@/lib/fetcher';
import {useBalance} from '@/app/context/BalanceContext';
import React from "react";

export const useBalanceData = () => {
    const {data, error, mutate} = useSWR('/api/getProfile', fetcher); //todo add the right method
    const {setBalance} = useBalance();

    React.useEffect(() => {
        if (data && data.balance !== undefined) {
            setBalance(data.balance);
        }
    }, [data, setBalance]);

    return {
        balance: data?.balance,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
