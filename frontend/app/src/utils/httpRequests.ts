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

export async function sendLoggedInActionRequest(method: string, url: string, data?: any) {
    const csrfClientExposedCookie = getCookie('csrfClientExposedCookie');

    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${csrfClientExposedCookie}`
    }

    let body = null;

    if (data) {
        body = JSON.stringify(data);
    }

    const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: headers,
        body
    });

    let responseBody: any;

    try {
        responseBody = await response.json();        
    } catch (err) {
        responseBody = null;
    }

    if (response.status === 401) {
        document.location.href = 'http://localhost:5173/login';
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

    if (response.status === 401) {
        document.location.href = 'http://localhost:5173/login';
    }

    if (!response.ok) {
        throw (responseBody?.error ?? responseBody ?? 'uknown error occurred');
    }

    return (responseBody);
}


// ! why if the endpoint not found the server respond with unauthorized
