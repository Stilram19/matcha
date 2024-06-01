import { useEffect, useState } from "react"


const useFetch = ({url}: {url: string}) => {
    const [data, setData] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const response = await fetch(url);
                if (!response.ok)
                    return new Error(`HTTP Error status code ${response.status} ${response.statusText}`);
                const data = await response.json();
                setData(data);
            } catch (error) {
                // !!!!!!!!! bad idea
                const err = error instanceof Error ? error : new Error(JSON.stringify(error)); 
                setError(err);
            }
            setLoading(false);
        }

        fetchData();
    }, [url])

    return {data, isLoading, error};
}


export default useFetch;