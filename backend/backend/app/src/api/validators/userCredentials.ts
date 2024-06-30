export function isUsernameValid(username: string): boolean {
    const usernameRegexp = /^(?!_)(?!.*__)[a-zA-Z0-9_]{8,12}(?<!_)$/

    return (usernameRegexp.test(username));
}

export function isPasswordValid(password: string): boolean {
    const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{12,28}$/;

    return (passwordRegexp.test(password));
}

export function isEmailFormatValid(email: string): boolean {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (emailRegexp.test(email));
}
