import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Custom hook for fetching for a Random movie to generate a Billboard
const useBillboard = () => {
    const {data, error, isLoading } = useSWR('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading
    }
}

export default useBillboard