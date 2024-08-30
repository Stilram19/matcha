import { Request } from 'express';
import { AuthPayload } from './authPayload.ts';

declare module 'express-serve-static-core' {
    interface Request {
        user: AuthPayload;
    }
}