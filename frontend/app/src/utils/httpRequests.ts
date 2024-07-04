export async function sendPostRequest(url: string, data: any, token?: string) {

    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        let { error } = responseBody;

        throw (error || responseBody);
    }

    return (responseBody);
}

export async function sendGetRequest(url: string) {
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return (responseData);
}
