export type UserRole = 'admin' | 'sales_user';

export interface IUser {
    _id: string;

    name: string;

    email: string;

    role: UserRole;

    createdAt: Date;

    updatedAt: Date;
}

export interface IRegisterPayload {
    name: string;

    email: string;

    password: string;

    role?: UserRole;
}

export interface ILoginPayload {
    email: string;

    password: string;
}