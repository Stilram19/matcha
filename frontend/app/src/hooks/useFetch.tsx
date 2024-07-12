import { useEffect } from "react"
import { sendLoggedInGetRequest } from "../utils/httpRequests";


const useFetch = (url: string, setData: (data: any) => void, dependency?: any[]) => {
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
                // ! latter error handling
            }
        }

        // const fetchData = async () => {
        //     try {
        //         const response = await fetch(url);
        //         const data = await response.json();

        //         setData(data);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }

        fetchData();
        console.log("fetching.....");
    }, [url, ...(dependency ? dependency : [])])
}

export default useFetch;