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
