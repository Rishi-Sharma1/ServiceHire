export type LeadStatus =
    | 'New'
    | 'Contacted'
    | 'Qualified'
    | 'Lost';

export type LeadSource =
    | 'Website'
    | 'Instagram'
    | 'Referral';

export interface ILead {
    _id: string;

    name: string;

    email: string;

    status: LeadStatus;

    source: LeadSource;

    createdAt: string;

    updatedAt: string;
}

export interface ILeadPayload {
    name: string;

    email: string;

    status: LeadStatus;

    source: LeadSource;
}

export interface ILeadQuery {
    page: number;

    limit: number;

    search?: string;

    status?: LeadStatus;

    source?: LeadSource;

    sort: 'latest' | 'oldest';
}

export interface IPagination {
    total: number;

    page: number;

    limit: number;

    totalPages: number;
}