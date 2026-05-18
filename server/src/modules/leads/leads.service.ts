import { FilterQuery } from 'mongoose';

import { Lead } from '../../models/lead.model';

import {
    ILeadQuery,
    ILeadPayload,
} from './leads.types';

import { ApiError } from '../../utils/api-error.util';

import { HTTP_STATUS } from '../../constants/http-status.constants';

export const createLead = async (
    payload: ILeadPayload
) => {
    const lead = await Lead.create(payload);

    return lead;
};

export const getLeads = async (
    query: ILeadQuery
) => {
    const {
        page = 1,
        limit = 10,
        status,
        source,
        search,
        sort = 'latest',
    } = query;

    const filter: FilterQuery<any> = {};

    if (status) {
        filter.status = status;
    }

    if (source) {
        filter.source = source;
    }

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: 'i',
                },
            },

            {
                email: {
                    $regex: search,
                    $options: 'i',
                },
            },
        ];
    }

    const sortOrder =
        sort === 'latest'
            ? { createdAt: -1 }
            : { createdAt: 1 };

    const skip = (page - 1) * limit;

    const total =
        await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
        .sort(sortOrder)
        .skip(skip)
        .limit(limit)
        .lean();

    return {
        data: leads,

        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(
                total / limit
            ),
        },
    };
};

export const getLeadById = async (
    id: string
) => {
    const lead = await Lead.findById(id).lean();

    if (!lead) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            'Lead not found'
        );
    }

    return lead;
};

export const updateLead = async (
    id: string,
    payload: Partial<ILeadPayload>
) => {
    const lead =
        await Lead.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true,
            }
        );

    if (!lead) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            'Lead not found'
        );
    }

    return lead;
};

export const deleteLead = async (
    id: string
) => {
    const lead =
        await Lead.findByIdAndDelete(id);

    if (!lead) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            'Lead not found'
        );
    }

    return null;
};

export const exportLeadsService =
    async (
        query: any
    ) => {
        const filter: any = {};

        if (query.status) {
            filter.status =
                query.status;
        }

        if (query.source) {
            filter.source =
                query.source;
        }

        if (query.search) {
            filter.$or = [
                {
                    name: {
                        $regex:
                            query.search,
                        $options: 'i',
                    },
                },

                {
                    email: {
                        $regex:
                            query.search,
                        $options: 'i',
                    },
                },
            ];
        }

        const sortOrder =
            query.sort ===
                'oldest'
                ? { createdAt: 1 }
                : { createdAt: -1 };

        const leads =
            await Lead.find(filter)
                .sort(sortOrder)
                .lean();

        return leads;
    };