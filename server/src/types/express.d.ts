import { UserRole } from '../modules/auth/auth.types';

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: string;

                email: string;

                role: UserRole;
            };
        }
    }
}

export { };