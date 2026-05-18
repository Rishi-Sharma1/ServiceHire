import axiosInstance from '../../../lib/axios.lib';

import type {
    ILeadPayload,
    ILeadQuery,
} from '../types/lead.types';

export const getLeadsApi =
    async (
        query: Partial<ILeadQuery>
    ) => {
        const response =
            await axiosInstance.get(
                '/leads',
                {
                    params: query,
                }
            );

        return response.data;
    };

export const createLeadApi =
    async (
        payload: ILeadPayload
    ) => {
        const response =
            await axiosInstance.post(
                '/leads',
                payload
            );

        return response.data;
    };

export const updateLeadApi =
    async (
        id: string,
        payload: Partial<ILeadPayload>
    ) => {
        const response =
            await axiosInstance.patch(
                `/leads/${id}`,
                payload
            );

        return response.data;
    };

export const deleteLeadApi =
    async (id: string) => {
        const response =
            await axiosInstance.delete(
                `/leads/${id}`
            );

        return response.data;
    };

export const exportLeadsApi =
    async (
        params: any
    ) => {
        const response =
            await axiosInstance.get(
                '/leads/export',
                {
                    params,

                    responseType:
                        'blob',
                }
            );

        return response.data;
    };