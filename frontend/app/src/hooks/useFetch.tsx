import { useEffect, useState } from "react"
import { sendLoggedInGetRequest } from "../utils/httpRequests";

// type UseFetchType<T> = (url: string, dependency?: any[]) => 

function useFetch<T>(url: string, dependency?: any[]): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>, any] {
    const   [data, setData] = useState<T>();
    const   [error, setError] = useState<string | null>(null);

    // console.log("trying to fetch");
    // define which function to call sendLoggedInGetRequest if it get request, using it by default
    useEffect(() => {
        const fetchData =  async () => {
            try {
                const data = await sendLoggedInGetRequest(url);
                console.log(data);
                setData(data);
            } catch (error) {
                console.log(`fetch error: ${error}`);
                // ! error handling
                setError(`fetch error: something went wrong`);
            }
        }

        fetchData();
        console.log("fetching.....");
    }, [url, ...(dependency ? dependency : [])])

    return [data, setData, error];
}

export default useFetch;