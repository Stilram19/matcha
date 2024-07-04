import { FormError } from "../types/errors.js";

export function formError(field: string, message: string): FormError {
    return ({
       field, message
    });
}
