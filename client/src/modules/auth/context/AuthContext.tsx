import {
    createContext,
    useEffect,
    useState,
} from 'react';

import type {
    IAuthResponse,
    IAuthState,
    ILoginPayload,
    IRegisterPayload,
} from '../types/auth.types';

import {
    loginApi,
    registerApi,
} from '../api/auth.api';

interface AuthContextType
    extends IAuthState {
    login: (
        payload: ILoginPayload
    ) => Promise<void>;

    register: (
        payload: IRegisterPayload
    ) => Promise<void>;

    logout: () => void;
}

export const AuthContext =
    createContext<AuthContextType>(
        {} as AuthContextType
    );

export const AuthProvider = ({
    children,
}: React.PropsWithChildren) => {
    const [state, setState] =
        useState<IAuthState>({
            user: null,

            token: null,

            isAuthenticated: false,

            isLoading: true,
        });

    useEffect(() => {
        const token =
            localStorage.getItem(
                'sld_token'
            );

        const user =
            localStorage.getItem(
                'sld_user'
            );

        if (token && user) {
            setState({
                token,

                user: JSON.parse(user),

                isAuthenticated: true,

                isLoading: false,
            });
        } else {
            setState((prev) => ({
                ...prev,

                isLoading: false,
            }));
        }
    }, []);

    const handleAuthSuccess = (
        data: IAuthResponse
    ) => {
        localStorage.setItem(
            'sld_token',
            data.token
        );

        localStorage.setItem(
            'sld_user',
            JSON.stringify(data.user)
        );

        setState({
            token: data.token,

            user: data.user,

            isAuthenticated: true,

            isLoading: false,
        });
    };

    const login = async (
        payload: ILoginPayload
    ) => {
        const response =
            await loginApi(payload);

        handleAuthSuccess(
            response.data
        );
    };

    const register = async (
        payload: IRegisterPayload
    ) => {
        const response =
            await registerApi(payload);

        handleAuthSuccess(
            response.data
        );
    };

    const logout = () => {
        localStorage.removeItem(
            'sld_token'
        );

        localStorage.removeItem(
            'sld_user'
        );

        setState({
            token: null,

            user: null,

            isAuthenticated: false,

            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,

                login,

                register,

                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};