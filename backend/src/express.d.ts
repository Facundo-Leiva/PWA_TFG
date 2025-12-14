import type { Request } from 'express';

// Declaración de tipos de TypeScript
declare namespace Express {
    export interface User {
        id: number;
        email: string;
        // otros campos
    }

    export interface Request {
        user?: User;
    }
}
