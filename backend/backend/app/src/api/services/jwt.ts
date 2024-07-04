import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

function generateAccessToken(userId: string) {
    const expirDuration = process.env.ACCESS_TOKEN_EXPIRATION as string;
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, { algorithm: 'HS256', expiresIn: expirDuration });
    return (accessToken);
}

function generateRefreshToken(userId: string) {
    const expirDuration = process.env.REFRESH_TOKEN_EXPIRATION as string;
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { algorithm: 'HS256', expiresIn: expirDuration });
    return (refreshToken);
}
