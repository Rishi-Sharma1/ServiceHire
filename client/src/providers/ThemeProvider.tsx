import {
    createContext,
    useEffect,
    useState,
} from 'react';

interface ThemeContextType {
    darkMode: boolean;

    toggleTheme: () => void;
}

export const ThemeContext =
    createContext<ThemeContextType>(
        {} as ThemeContextType
    );

export const ThemeProvider = ({
    children,
}: React.PropsWithChildren) => {
    const [darkMode, setDarkMode] =
        useState(false);

    useEffect(() => {
        const savedTheme =
            localStorage.getItem(
                'theme'
            );

        if (savedTheme === 'dark') {
            setDarkMode(true);

            document.documentElement.classList.add(
                'dark'
            );
        }
    }, []);

    const toggleTheme = () => {
        const newTheme =
            !darkMode;

        setDarkMode(newTheme);

        if (newTheme) {
            document.documentElement.classList.add(
                'dark'
            );

            localStorage.setItem(
                'theme',
                'dark'
            );
        } else {
            document.documentElement.classList.remove(
                'dark'
            );

            localStorage.setItem(
                'theme',
                'light'
            );
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                darkMode,

                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};