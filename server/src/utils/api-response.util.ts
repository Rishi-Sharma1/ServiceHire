interface Pagination {
    total: number;

    page: number;

    limit: number;

    totalPages: number;
}

export class ApiResponse<T> {
    success: boolean;

    message: string;

    data?: T;

    pagination?: Pagination;

    constructor(
        message: string,
        data?: T,
        pagination?: Pagination
    ) {
        this.success = true;

        this.message = message;

        this.data = data;

        this.pagination = pagination;
    }
}