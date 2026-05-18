import axiosInstance from '../../../lib/axios.lib';

import type {
    ILoginPayload,
    IRegisterPayload,
} from '../types/auth.types';

export const loginApi = async (
    payload: ILoginPayload
) => {
    const response =
        await axiosInstance.post(
            '/auth/login',
            payload
        );

    return response.data;
};

export const registerApi =
    async (
        payload: IRegisterPayload
    ) => {
        const response =
            await axiosInstance.post(
                '/auth/register',
                payload
            );

        return response.data;
    };