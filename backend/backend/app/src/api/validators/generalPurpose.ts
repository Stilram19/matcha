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
