import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Custom hook for fetching specific movie data as Parameter it will take the Id
const useFavorite = () => {
    // We are trying to fetch the favorites movies
    const {data, error, isLoading, mutate} = useSWR('/api/favorites', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false, 
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useFavorite;