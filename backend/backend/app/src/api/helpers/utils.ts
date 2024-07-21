interface ObjectType {
    [key : string]: any;
}

export function isEmptyObject(obj: ObjectType): boolean {
    return Object.keys(obj).length === 0;
}