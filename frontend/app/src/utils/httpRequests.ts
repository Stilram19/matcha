import { getCookie } from "./generalPurpose";

export async function sendActionRequest(method: string, url: string, data: any, token?: string) {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(data)
    });

    let responseBody: any;

    try {
        responseBody = await response.json();        
    } catch (err) {
        responseBody = null;
    }

    if (!response.ok) {
        throw (responseBody?.error ?? responseBody ?? 'uknown error occurred');
    }

    return (responseBody);
}

export async function sendLoggedInGetRequest(url: string) {
    const csrfClientExposedCookie = getCookie('csrfClientExposedCookie');

    console.log(csrfClientExposedCookie);

    const response = await fetch(url, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${csrfClientExposedCookie}`
        },
    });

    let responseBody: any;

    try {
        responseBody = await response.json();        
    } catch (err) {
        responseBody = null;
    }

    if (!response.ok) {
        throw (responseBody?.error ?? responseBody ?? 'uknown error occurred');
    }

    return (responseBody);
}
