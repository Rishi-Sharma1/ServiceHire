import {
    useEffect,
    useState,
} from 'react';

import {
    createLeadApi,
    deleteLeadApi,
    getLeadsApi,
    updateLeadApi,
    exportLeadsApi
} from '../api/leads.api';

import type {
    ILead,
    ILeadPayload,
    ILeadQuery,
    IPagination,
} from '../types/lead.types';



export const useLeads = () => {
    const [leads, setLeads] =
        useState<ILead[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [filters, setFilters] =
        useState<
            Partial<ILeadQuery>
        >({
            page: 1,

            limit: 10,

            sort: 'latest',
        });

    const [pagination, setPagination] =
        useState<IPagination>({
            total: 0,

            page: 1,

            limit: 10,

            totalPages: 1,
        });

    const fetchLeads =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getLeadsApi(
                        filters
                    );

                setLeads(
                    response.data
                );

                setPagination(
                    response.pagination
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchLeads();
    }, [filters]);

    const createLead =
        async (
            payload: ILeadPayload
        ) => {
            await createLeadApi(
                payload
            );

            fetchLeads();
        };

    const deleteLead =
        async (id: string) => {
            await deleteLeadApi(id);

            fetchLeads();
        };

    const updateLead = async (
        id: string,
        payload: Partial<ILeadPayload>
    ) => {
        await updateLeadApi(id, payload);

        fetchLeads();
    };

    const exportLeads =
        async () => {
            const blob =
                await exportLeadsApi(
                    filters
                );

            const url =
                window.URL.createObjectURL(
                    blob
                );

            const a =
                document.createElement(
                    'a'
                );

            a.href = url;

            a.download =
                'leads.csv';

            a.click();

            window.URL.revokeObjectURL(
                url
            );
        };

    return {
        leads,

        loading,

        filters,

        setFilters,

        pagination,

        createLead,

        deleteLead,
        updateLead,
        exportLeads,
    };
};