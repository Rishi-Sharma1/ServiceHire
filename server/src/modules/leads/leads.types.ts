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

    createdAt: Date;

    updatedAt: Date;
}

export interface ILeadPayload {
    name: string;

    email: string;

    status: LeadStatus;

    source: LeadSource;
}

export interface ILeadQuery {
    page?: number;

    limit?: number;

    status?: LeadStatus;

    source?: LeadSource;

    search?: string;

    sort?: 'latest' | 'oldest';
}