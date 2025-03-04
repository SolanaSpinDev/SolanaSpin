import {useState, useEffect} from 'react';

export const useSolConversionRate = () => {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        async function fetchRate() {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
                );
                const data = await response.json();
                // Example response: { solana: { usd: 35.12 } }
                setRate(data.solana.usd);
            } catch (error) {
                console.error("Error fetching conversion rate:", error);
            }
        }

        fetchRate().then(d => console.log(d));
    }, []);

    return rate;
};
