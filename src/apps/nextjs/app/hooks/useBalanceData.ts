import useSWR from 'swr';
import {useBalance} from '@/app/context/BalanceContext';
import React from "react";
import { useSession } from 'next-auth/react';
import {fetchWithAuth} from "@/app/api/utils/api";

export const useBalanceData = () => {
    const {setBalance} = useBalance();
    const { data: session } = useSession();

    const fetcher = async (url: string, token: string) => {
        if (!token) {
            throw new Error('No authentication token found');
        }

        const data = await fetchWithAuth(url, 'GET', token);
        return data;
    };

    const { data, error, mutate } = useSWR(
        session && session.tokens?.token ? ['/api/users/profile', session.tokens.token] : null,
        fetcher
    );

    React.useEffect(() => {
        if (data && data.balance !== undefined) {
            console.log('Fetched balance:', data.balance);
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
