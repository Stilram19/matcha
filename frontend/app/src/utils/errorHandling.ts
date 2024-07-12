export function getFormError(error: unknown): FormError | undefined {
    if (error != null && typeof error == 'object'
        && 'field' in error && 'message' in error
        && typeof error.message == 'string' && typeof error.field == 'string') {
        return (
            {
                message: error.message,
                field: error.field
            }
        );
    }

    return (undefined);
}