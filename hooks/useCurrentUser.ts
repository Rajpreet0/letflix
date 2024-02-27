import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    /*
        SWR => stale-while-revalidate, a HTTP cache invalidation strategy.
        SWR is strategy to first return the data from cache (stale), then send the fetch
        request (revalidate), and finally come up with up-to-date data
    */
    const {data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    }
};

export default useCurrentUser;