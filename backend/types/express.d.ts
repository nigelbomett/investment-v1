import { Request } from 'express';

declare module 'express' {
    export interface Request {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user?: any;
    }
}
