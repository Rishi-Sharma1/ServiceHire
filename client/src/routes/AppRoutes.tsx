import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import LoginPage from '../modules/auth/pages/LoginPage';

import RegisterPage from '../modules/auth/pages/RegisterPage';

import LeadsPage from '../modules/leads/pages/LeadsPage';

import PrivateRoute from './PrivateRoute';

import { ROUTES } from '../shared/constants/routes.constants';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={
                        ROUTES.LOGIN
                    }
                    element={<LoginPage />}
                />

                <Route
                    path={
                        ROUTES.REGISTER
                    }
                    element={
                        <RegisterPage />
                    }
                />

                <Route
                    element={
                        <PrivateRoute />
                    }
                >
                    <Route
                        path={
                            ROUTES.DASHBOARD
                        }
                        element={
                            <LeadsPage />
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={
                                ROUTES.LOGIN
                            }
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}