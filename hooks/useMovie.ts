import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Custom hook for fetching specific movie data as Parameter it will take the Id
const useMovie = (id?: string) => { 
    //If we have an Id we are going to fetch the specific movie if not we not going to fetch anything 
    const {data, error, isLoading} = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
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

export default useMovie;