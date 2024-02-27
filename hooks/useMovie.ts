import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id?: string) => { 
    //If we have an Id we are going to fetch something if not we not going to fetch anything 
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