import { randomBytes } from 'crypto';
import { hash, verify } from 'argon2';

export async function hashData(data: string): Promise<string> {
    const hashedData = await hash(data);
    return (hashedData);
}

export async function hashDataWithSalt(data: string): Promise<[string, string]> {
    const salt = randomBytes(32).toString('hex');
    const hashedData = await hash(data + salt);
    return ([hashedData, salt]);
}

export async function compareData(plainData: string, hashedData: string): Promise<boolean> {
    return (verify(hashedData, plainData));
}

export async function compareDataWithSalt(plainData: string, hashedData: string, salt: string): Promise<boolean> {
    return (verify(hashedData, plainData + salt));
}

export function generateRandomToken(length: number): string {
    const token = randomBytes(length).toString('hex');

    return (token);
}
