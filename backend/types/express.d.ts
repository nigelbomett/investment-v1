import { User } from './types'; // Adjust path as necessary

declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}