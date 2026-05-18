import {
    Navigate,
    Outlet,
} from 'react-router-dom';

import { useAuth } from '../modules/auth/hooks/useAuth';

import { ROUTES } from '../shared/constants/routes.constants';

import type { UserRole } from '../modules/auth/types/auth.types';

interface PrivateRouteProps {
    allowedRoles?: UserRole[];
}

export default function PrivateRoute({
    allowedRoles,
}: PrivateRouteProps) {
    const {
        isAuthenticated,
        user,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-2xl">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.LOGIN}
            />
        );
    }

    if (
        allowedRoles &&
        user &&
        !allowedRoles.includes(
            user.role
        )
    ) {
        return (
            <Navigate
                to={
                    ROUTES.DASHBOARD
                }
            />
        );
    }

    return <Outlet />;
}