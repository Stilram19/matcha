import { randomBytes } from 'crypto';
import { hash, verify } from 'argon2';

export async function hashDataService(data: string): Promise<string> {
    const hashedData = await hash(data);
    return (hashedData);
}

export async function hashDataWithSaltService(data: string): Promise<[string, string]> {
    const salt = randomBytes(32).toString('hex');
    const hashedData = await hash(data + salt);
    return ([hashedData, salt]);
}

export async function compareDataService(plainData: string, hashedData: string): Promise<boolean> {
    return (await verify(hashedData, plainData));
}

export async function compareDataWithSaltService(plainData: string, hashedData: string, salt: string): Promise<boolean> {
    return (await verify(hashedData, plainData + salt));
}

export function generateRandomTokenService(length: number): string {
    const token = randomBytes(length).toString('hex');

    return (token);
}
