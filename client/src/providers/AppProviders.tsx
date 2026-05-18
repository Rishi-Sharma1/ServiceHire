import { AuthProvider } from '../modules/auth/context/AuthContext';

import { ThemeProvider } from './ThemeProvider';

export const AppProviders = ({
    children,
}: React.PropsWithChildren) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
};