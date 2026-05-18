interface EmptyStateProps {
    title: string;

    description: string;
}

export default function EmptyState({
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="py-16 text-center">
            <h3 className="mb-2 text-2xl font-bold">
                {title}
            </h3>

            <p className="text-gray-500">
                {description}
            </p>
        </div>
    );
}