import { Request, Response } from 'express';

import { asyncHandler } from '../../utils/async-handler.util';

import { ApiResponse } from '../../utils/api-response.util';

import {
    createLead,
    deleteLead,
    getLeadById,
    getLeads,
    updateLead,
    exportLeadsService,
} from './leads.service';
import { generateLeadsCSV } from '../../utils/csv-export.util';

export const exportLeads =
    asyncHandler(
        async (req, res) => {
            const leads =
                await exportLeadsService(
                    req.query
                );

            const csv =
                generateLeadsCSV(
                    leads
                );

            res.header(
                'Content-Type',
                'text/csv'
            );

            res.attachment(
                'leads.csv'
            );

            return res.send(csv);
        }
    );

export const createLeadController =
    asyncHandler(
        async (req: Request, res: Response) => {
            const result = await createLead(
                req.body
            );

            res.status(201).json(
                new ApiResponse(
                    'Lead created successfully',
                    result
                )
            );
        }
    );

export const getLeadsController =
    asyncHandler(
        async (req: Request, res: Response) => {
            const result = await getLeads(
                req.query as any
            );

            res.status(200).json(
                new ApiResponse(
                    'Leads fetched successfully',
                    result.data,
                    result.pagination
                )
            );
        }
    );

export const getLeadController =
    asyncHandler(
        async (req: Request, res: Response) => {
            const result =
                await getLeadById(req.params.id);

            res.status(200).json(
                new ApiResponse(
                    'Lead fetched successfully',
                    result
                )
            );
        }
    );

export const updateLeadController =
    asyncHandler(
        async (req: Request, res: Response) => {
            const result = await updateLead(
                req.params.id,
                req.body
            );

            res.status(200).json(
                new ApiResponse(
                    'Lead updated successfully',
                    result
                )
            );
        }
    );

export const deleteLeadController =
    asyncHandler(
        async (req: Request, res: Response) => {
            await deleteLead(req.params.id);

            res.status(200).json(
                new ApiResponse(
                    'Lead deleted successfully'
                )
            );
        }
    );