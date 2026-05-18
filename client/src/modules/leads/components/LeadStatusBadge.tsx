import type { LeadStatus } from '../types/lead.types';

interface LeadStatusBadgeProps {
    status: LeadStatus;
}

const statusClasses: Record<
    LeadStatus,
    string
> = {
    New: 'bg-blue-100 text-blue-700',

    Contacted:
        'bg-yellow-100 text-yellow-700',

    Qualified:
        'bg-green-100 text-green-700',

    Lost: 'bg-red-100 text-red-700',
};

export default function LeadStatusBadge({
    status,
}: LeadStatusBadgeProps) {
    return (
        <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${statusClasses[status]}`}
        >
            {status}
        </span>
    );
}