export function extractAuthToken(authHeader: any): string | undefined {
    if (!authHeader || typeof authHeader != 'string') {
        return (undefined)
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] != 'Bearer') {
        return (undefined);        
    }

    const token = tokenParts[1];

    if (!token) {
        return (undefined);
    }

    return (token);
}