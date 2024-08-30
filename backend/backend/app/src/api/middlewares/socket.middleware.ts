import { Socket } from "socket.io";
import cookie from "cookie";
import { validateJwtAccessTokenService } from "../services/jwt.js";

// move to utils
function parseCookieString(cookieString: string | undefined) {
    if (!cookieString)
        return ;

    try {
        const parsedCookies = cookie.parse(cookieString);
        return parsedCookies;
    } catch (e) {
        console.log('cookie parse error');
    }
}

// make a reusable one, and extend it as need
function validateAccessTokenSocketVersion(parsedCookies: Record<string, string>) {
    const accessToken = parsedCookies['AccessToken'];

    if (!accessToken) {
        console.log('socket connection invalid access token');
        return ;
    }

    const payload = validateJwtAccessTokenService(accessToken);
    if (payload.error)
        return ;
    return payload.userId;
}



export function authMiddleware(socket: Socket, next: any) {
    const parsedCookies = parseCookieString(socket.handshake.headers.cookie);
    const token = socket.handshake.auth.token;

    console.log(socket.handshake);
    // console.log(`token: ${JSON.stringify(token)}`)
    if (!parsedCookies) {
        socket.emit('error', {msg: "Authentication error"})
        next(new Error("Auth error"))
        return ;
    }

    const userId = validateAccessTokenSocketVersion(parsedCookies);
    if (!userId) {
        socket.emit('invalid-token', {msg: 'invalid access token'});
        next(new Error("invalid access token"));
        return ;
    }
    // valdiate jwt token and extract the payload object
    console.log(`accepted connection userId ${userId}`)
    socket.handshake.auth.user = {id: userId}; // ! replace with jwt payload object
    next();
}