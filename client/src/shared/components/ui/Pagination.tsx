import type { IPagination } from '../../../modules/leads/types/lead.types';

interface PaginationProps {
    pagination: IPagination;

    onPageChange: (
        page: number
    ) => void;
}

export default function Pagination({
    pagination,
    onPageChange,
}: PaginationProps) {
    return (
        <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
                Showing page{' '}
                {pagination.page} of{' '}
                {pagination.totalPages}
            </p>

            <div className="flex gap-2">
                <button
                    disabled={
                        pagination.page === 1
                    }
                    onClick={() =>
                        onPageChange(
                            pagination.page -
                            1
                        )
                    }
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>

                <button
                    disabled={
                        pagination.page ===
                        pagination.totalPages
                    }
                    onClick={() =>
                        onPageChange(
                            pagination.page +
                            1
                        )
                    }
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}