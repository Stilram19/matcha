export function isUsernameValid(username: string): boolean {
    const usernameRegexp = /^(?!_)(?!.*__)[a-zA-Z0-9_]{4,12}(?<!_)$/

    if (usernameRegexp.test(username) === false) {
        console.log('invalid username');
    }

    return (usernameRegexp.test(username));
}

export function isPasswordValid(password: string): boolean {
    const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*() ]{12,28}$/;

    if (passwordRegexp.test(password) === false) {
        console.log('invalid password');
    }

    return (passwordRegexp.test(password));
}

export function isEmailFormatValid(email: string): boolean {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegexp.test(email) === false) {
        console.log('invalid email');
    }

    return (emailRegexp.test(email));
}


export function isFirstNameValid(firstName: string): boolean {
    return (firstName.length > 0);
}

export function isLastNameValid(firstName: string): boolean {
    return (firstName.length > 0);
}