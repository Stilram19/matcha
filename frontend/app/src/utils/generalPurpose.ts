export function getCookie(key: string): string | undefined {
    const cookieString = document.cookie;
    const cookies = cookieString ? cookieString.split('; ') : [];

    for (let cookie of cookies) {
        let cookieParts = cookie.split('=');

        if (cookieParts[0] === key) {
            return (decodeURIComponent(cookieParts[1]));
        }
    }

    return (undefined);
}

export function isArray(arr: any, length?: number, elementsType?: string): boolean {
    if (!arr || !Array.isArray(arr)) {
        return (false);
    }

    if (length && arr.length != length) {
        return (false);
    }

    if (elementsType && !arr.every(item => typeof item == elementsType)) {
        return (false);
    }

    return (true);
}