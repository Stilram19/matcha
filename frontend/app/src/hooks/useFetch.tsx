import { useEffect, useState } from "react"
import { sendLoggedInGetRequest } from "../utils/httpRequests";


const useFetch = ({url, dependency}: {url: string, dependency?: any[]}) => {
    const [data, setData] = useState<any>()
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // console.log("trying to fetch");
    // define which function to call sendLoggedInGetRequest if it get request, using it by default
    useEffect(() => {
        const fetchData =  async () => {
            try {
                const data = await sendLoggedInGetRequest(url);
                console.log(data);
                setData(data);
            } catch (error) {
                console.log('error');
            }
            setLoading(false);
        }

        fetchData();
        console.log("fetching.....");
    }, [url, ...(dependency ? dependency : [])])

    return {data, isLoading, error};
}


// const useFetch = ({url}: {url: string}) => {
//     const [data, setData] = useState<any>()
//     const [isLoading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<Error | null>(null);

//     // console.log("trying to fetch");
//     useEffect(() => {
//         const fetchData =  async () => {
//             try {
//                 const response = await fetch(url);
//                 if (!response.ok)
//                     return new Error(`HTTP Error status code ${response.status} ${response.statusText}`);
//                 const data = await response.json();
//                 console.log(data);
//                 setData(data);
//             } catch (error) {
//                 // !!!!!!!!! bad idea
//                 const err = error instanceof Error ? error : new Error(JSON.stringify(error));
//                 setError(err);
//             }
//             setLoading(false);
//         }

//         fetchData();
//         console.log("fetching.....");
//     }, [url])

//     return {data, isLoading, error};
// }




export default useFetch;