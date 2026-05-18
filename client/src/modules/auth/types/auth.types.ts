export type UserRole =
    | 'admin'
    | 'sales_user';

export interface IUser {
    _id: string;

    name: string;

    email: string;

    role: UserRole;

    createdAt: string;

    updatedAt: string;
}

export interface ILoginPayload {
    email: string;

    password: string;
}

export interface IRegisterPayload {
    name: string;

    email: string;

    password: string;

    role?: UserRole;
}

export interface IAuthResponse {
    user: IUser;

    token: string;
}

export interface IAuthState {
    user: IUser | null;

    token: string | null;

    isAuthenticated: boolean;

    isLoading: boolean;
}