import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useBalance } from '@/app/context/BalanceContext';

export const useBalanceData = () => {
  const { data, error } = useSWR('/api/getBalance', fetcher); //todo add the right method
  const { setBalance } = useBalance();

  React.useEffect(() => {
    if (data && data.total !== undefined) {
        setBalance(data.total);
    }
  }, [data, setBalance]);

  return {
    balance: data?.total,
    isLoading: !error && !data,
    isError: error,
  };
};
