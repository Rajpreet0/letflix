import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Custom hook for fetching movie list data
const useMovieList = () => {
    // Fetch movie list data using SWR
    const {data, error, isLoading} = useSWR('/api/movies', fetcher, {
        // Configure SWR options to prevent revalidation
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

export default useMovieList;