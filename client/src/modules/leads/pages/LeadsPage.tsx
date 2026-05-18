import { useState } from 'react';

import { useAuth } from '../../auth/hooks/useAuth';

import { useLeads } from '../hooks/useLeads';

import LeadTable from '../components/LeadTable';

import LeadFilters from '../components/LeadFilters';

import Pagination from '../../../shared/components/ui/Pagination';

import TableSkeleton from '../../../shared/components/ui/TableSkeleton';

import { useTheme } from '../../../hooks/useTheme';

export default function LeadsPage() {
    const { user, logout } =
        useAuth();

    const [editingLead, setEditingLead] =
        useState<any>(null);

    const { darkMode, toggleTheme } =
        useTheme();

    const {
        leads,
        loading,
        createLead,
        deleteLead,
        updateLead,
        filters,
        setFilters,
        pagination,
        exportLeads
    } = useLeads();;

    const [formData, setFormData] =
        useState({
            name: '',

            email: '',

            status: 'New',

            source: 'Website',
        });

    const handleCreateLead =
        async (
            e: React.FormEvent
        ) => {
            e.preventDefault();

            if (editingLead) {
                await updateLead(
                    editingLead._id,
                    formData
                );

                setEditingLead(null);
            } else {
                await createLead(
                    formData as any
                );
            }

            setFormData({
                name: '',

                email: '',

                status: 'New',

                source: 'Website',
            });
        };

    return (
        <div className="min-h-screen transition-colors bg-gray-100 dark:bg-[#0f172a]">
            <div className="sticky top-0 z-50 flex items-center justify-between p-6 bg-white dark:bg-[#111827] border-b shadow-sm">
                <div className=''>
                    <h1 className="text-3xl font-bold text-gray-500 dark:text-gray-400">
                        Smart Leads Dashboard
                    </h1>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Welcome, {user?.name}
                    </p>
                </div>

                <div className='flex gap-3'>
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-white bg-black rounded-lg cursor-pointer"
                    >
                        Logout
                    </button>
                    {user?.role ===
                        'admin' && (
                            <button
                                onClick={exportLeads}
                                className="px-4 py-2 text-white transition bg-green-600 rounded-lg hover:opacity-90"
                            >
                                Export CSV
                            </button>
                        )}
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 text-white transition bg-gray-800 rounded-lg cursor-pointer dark:bg-yellow-400 dark:text-black"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
                    <div className="p-6 bg-white rounded-xl shadow bg-white dark:bg-[#1e293b]">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Leads
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-500 dark:text-gray-400">
                            {pagination.total}
                        </h2>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow bg-white dark:bg-[#1e293b]">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            New
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-blue-500 dark:text-gray-400">
                            {
                                leads.filter(
                                    (lead) =>
                                        lead.status ===
                                        'New'
                                ).length
                            }
                        </h2>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow bg-white dark:bg-[#1e293b]">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Qualified
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-500 dark:text-gray-400">
                            {
                                leads.filter(
                                    (lead) =>
                                        lead.status ===
                                        'Qualified'
                                ).length
                            }
                        </h2>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow bg-white dark:bg-[#1e293b]">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Lost
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-red-500 dark:text-gray-400">
                            {
                                leads.filter(
                                    (lead) =>
                                        lead.status ===
                                        'Lost'
                                ).length
                            }
                        </h2>
                    </div>
                </div>
                <div className="p-6 mb-6 bg-white rounded-xl shadow bg-white dark:bg-[#1e293b]">
                    <h2 className="mb-4 text-xl font-semibold text-gray-500 dark:text-gray-400">
                        {editingLead
                            ? 'Save Changes'
                            : 'Create Lead'}
                    </h2>

                    <form
                        onSubmit={
                            handleCreateLead
                        }
                        className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            value={
                                formData.name
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,

                                    name:
                                        e.target
                                            .value,
                                })
                            }
                            className="p-3 border rounded-lg dark:bg-[#1e293b] dark:text-gray-400"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={
                                formData.email
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,

                                    email:
                                        e.target
                                            .value,
                                })
                            }
                            className="p-3 border rounded-lg dark:bg-[#1e293b] dark:text-gray-400"
                            required
                        />

                        <select
                            value={
                                formData.status
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,

                                    status:
                                        e.target
                                            .value,
                                })
                            }
                            className="p-3 border rounded-lg dark:bg-[#1e293b] dark:text-gray-400"
                        >
                            <option>
                                New
                            </option>

                            <option>
                                Contacted
                            </option>

                            <option>
                                Qualified
                            </option>

                            <option>
                                Lost
                            </option>
                        </select>

                        <select
                            value={
                                formData.source
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,

                                    source:
                                        e.target
                                            .value,
                                })
                            }
                            className="p-3 border rounded-lg dark:bg-[#1e293b] dark:text-gray-400"
                        >
                            <option>
                                Website
                            </option>

                            <option>
                                Instagram
                            </option>

                            <option>
                                Referral
                            </option>
                        </select>

                        <button
                            type="submit"
                            className="p-3 font-semibold text-white bg-black rounded-lg cursor-pointer "
                        >
                            Create Lead
                        </button>
                    </form>
                </div>

                <div className="p-6 bg-white rounded-xl shadow dark:bg-[#1e293b] dark:text-gray-400 dark:border-none hover">
                    <h2 className="mb-4 text-xl font-semibold">
                        Leads
                    </h2>

                    <LeadFilters
                        filters={filters}
                        onChange={(updated) =>
                            setFilters((prev) => ({
                                ...prev,
                                ...updated,
                            }))
                        }
                    />

                    {loading ? (
                        <TableSkeleton rows={5} columns={5} />
                    ) : (
                        <>
                            <LeadTable
                                leads={leads}
                                onDelete={deleteLead}
                                onEdit={(lead) => {
                                    setEditingLead(lead);

                                    setFormData({
                                        name: lead.name,
                                        email: lead.email,
                                        status: lead.status,
                                        source: lead.source,
                                    });
                                }}
                            />
                            <Pagination
                                pagination={pagination}
                                onPageChange={(page) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        page,
                                    }))
                                }
                            />

                        </>)}
                </div>
            </div>
        </div>
    );
}