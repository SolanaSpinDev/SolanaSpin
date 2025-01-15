import {useSession} from 'next-auth/react';
import {fetchWithAuth} from "@/app/api/utils/api";

export const useBalanceData = (setBalance: (balance: number) => void) => {
    const {data: session, status} = useSession();

    const getBalance = async () => {
        if (status !== 'authenticated' || !session?.tokens?.token) {
            console.error("User is not authenticated or token is missing");
            return;
        }

        try {
            const url = "/api/users/profile";
            const response = await fetchWithAuth(url, "GET", session.tokens.token);

            if (typeof response.balance === 'number') {
                setBalance(response.balance);
            } else {
                throw new Error("Invalid balance data received");
            }
        } catch (error) {
            console.error("Error fetching balance:", error.message);
        }
    };

    return {getBalance};
};
