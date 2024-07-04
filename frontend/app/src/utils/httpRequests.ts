export async function sendPostRequest(url: string, data: any) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseBody = await response.json();

        if (!response.ok) {
            let { error } = responseBody;

            throw (error || responseBody);
        }

        return (responseBody);
    }
    catch (err) {
        throw err;
    }
}

export async function sendGetRequest(url: string) {
    try {
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return (responseData);
    }
    catch (err) {
        throw err;
    }
}
