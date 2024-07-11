export function isIdValid(id: string) {
    const idRegxp = /^[0-9]+$/;

    return (idRegxp.test(id));
}
