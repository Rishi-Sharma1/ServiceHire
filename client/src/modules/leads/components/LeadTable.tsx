import { useAuth } from '../../../modules/auth/hooks/useAuth';

import EmptyState from '../../../shared/components/ui/EmptyState';

import LeadStatusBadge from './LeadStatusBadge';

import type { ILead } from '../types/lead.types';

interface LeadTableProps {
    leads: ILead[];

    onDelete: (
        id: string
    ) => void;

    onEdit: (
        lead: ILead
    ) => void;
}

export default function LeadTable({
    leads,
    onDelete,
    onEdit,
}: LeadTableProps) {
    const { user } = useAuth();

    if (!leads.length) {
        return (
            <EmptyState
                title="No leads found"
                description="Create a lead to get started."
            />
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="transition-colors border-b hover:bg-gray-50">
                        <th className="p-4 text-left">
                            Name
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            Source
                        </th>

                        <th className="p-4 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {leads.map((lead) => (
                        <tr
                            key={lead._id}
                            className="border-b hover:bg-gray-50"
                        >
                            <td className="p-4">
                                {lead.name}
                            </td>

                            <td className="p-4">
                                {lead.email}
                            </td>

                            <td className="p-4">
                                <LeadStatusBadge
                                    status={
                                        lead.status
                                    }
                                />
                            </td>

                            <td className="p-4">
                                {lead.source}
                            </td>

                            <td className="flex gap-3 p-4">
                                <button
                                    onClick={() =>
                                        onEdit(lead)
                                    }
                                    className="font-medium text-blue-500 cursor-pointer"
                                >
                                    Edit
                                </button>

                                {user?.role ===
                                    'admin' && (
                                        <button
                                            onClick={() =>
                                                onDelete(
                                                    lead._id
                                                )
                                            }
                                            className="font-medium text-red-500 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}