import { Parser } from 'json2csv';

import type { ILead } from '../modules/leads/leads.types';

export const generateLeadsCSV =
    (leads: ILead[]) => {
        const fields = [
            'name',
            'email',
            'status',
            'source',
            'createdAt',
        ];

        const parser =
            new Parser({
                fields,
            });

        return parser.parse(
            leads
        );
    };