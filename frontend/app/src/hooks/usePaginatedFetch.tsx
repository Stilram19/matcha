import { useState } from "react";
import useFetch from "./useFetch";
import { sendLoggedInGetRequest } from "../utils/httpRequests";

interface data<T> {
    data: T[] | undefined;
    setData: React.Dispatch<React.SetStateAction<T[] | undefined>>;
    fetchMoreData: () => void;
}

// the given url should not contain any query paramaters
function usePaginatedFetch<T>(url: string) : data<T> {
    const [data, setData] = useFetch<T[]>(url);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const PAGE_SIZE = 20;

    const   fetchMoreData = async () => {
        if (!hasMore) {
            console.log('no more data');
            return
        }

        try {
            const data = await sendLoggedInGetRequest(`${url}?page=${page}&pageSize=${PAGE_SIZE}`) as T[];
            if (!(data.length > 0)) {
                setHasMore(false);
                return ;
            }
            setData((prev) => [...(prev || []), ...data]);
            setPage((prevPage) => prevPage + 1);
        } catch (e) {
            console.log(`FETCHING MORE DATA ERROR, URL : ${url}`);
            console.log(e);
        }
    }

    return {
        data,
        setData,
        fetchMoreData
    }
}


export default usePaginatedFetch;