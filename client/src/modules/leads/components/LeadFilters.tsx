import type { ILeadQuery, LeadStatus, LeadSource } from '../types/lead.types';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';

interface LeadFiltersProps {
    filters: Partial<ILeadQuery>;
    onChange: (updated: Partial<ILeadQuery>) => void;
}

export default function LeadFilters({ filters, onChange }: LeadFiltersProps) {
    const [search, setSearch] = useState(filters.search || '');
    const debouncedSearch = useDebounce(search);

    // Only trigger onChange when debouncedSearch actually changes
    useEffect(() => {
        if (debouncedSearch !== filters.search) {
            onChange({
                search: debouncedSearch,
                page: 1,
            });
        }
    }, [debouncedSearch, filters.search, onChange]);

    return (
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />

            <select
                value={filters.status || ''}
                onChange={(e) =>
                    onChange({
                        status: (e.target.value as LeadStatus) || undefined,
                        page: 1,
                    })
                }
                className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
            </select>

            <select
                value={filters.source || ''}
                onChange={(e) =>
                    onChange({
                        source: (e.target.value as LeadSource) || undefined,
                        page: 1,
                    })
                }
                className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
                <option value="">All Sources</option>
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
            </select>

            <select
                value={filters.sort || 'latest'}
                onChange={(e) =>
                    onChange({
                        sort: e.target.value as any,
                    })
                }
                className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
    );
}