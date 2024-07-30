export function isArray(arr: any, length?: number, elementsType?: string): boolean {
    if (!arr || !Array.isArray(arr)) {
        console.log('this: ' + arr);
        return (false);
    }

    if (length && arr.length != length) {
        console.log('2');
        return (false);
    }

    if (elementsType && !arr.every(item => typeof item == elementsType)) {
        console.log('3');
        return (false);
    }

    return (true);
}
