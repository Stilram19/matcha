import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export function generateAccessToken(userId: number) {
    const expirDuration = process.env.ACCESS_TOKEN_EXPIRATION as string;
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, { algorithm: 'HS256', expiresIn: expirDuration });
    return (accessToken);
}

export function generateRefreshToken(userId: number) {
    const expirDuration = process.env.REFRESH_TOKEN_EXPIRATION as string;
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { algorithm: 'HS256', expiresIn: expirDuration });
    return (refreshToken);
}

function validateJwtToken(token: string, secret: string): {userId: number | null, error: string | null} {
    try {
        const decoded = jwt.verify(token, secret, {
            algorithms: ['HS256']
        }) as JwtPayload;

        return {userId: decoded.userId as number, error: null};

    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return {userId: null, error: 'expired token'};
        }

        return {userId: null, error: 'invalid token'};
    }
}

export function validateJwtAccessToken(token: string): {userId: number | null, error: string | null} {
    return validateJwtToken(token, process.env.ACCESS_TOKEN_SECRET as string);
}

export function validateJwtRefreshToken(token: string): {userId: number | null, error: string | null} {
    return validateJwtToken(token, process.env.REFRESH_TOKEN_SECRET as string);
}
