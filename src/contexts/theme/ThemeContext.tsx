import { createContext, useContext, useState, type ReactNode } from "react";
import type { Theme, ThemeContextType } from "./ThemeContext.type";

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    function toggleTheme() {
        const newThema = theme === 'light' ? 'dark' : 'light';
        setTheme(newThema);
        localStorage.setItem('theme', newThema);
        document.documentElement.classList.toggle('dark', newThema === 'dark');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme precisa ser usado dentro de um ThemeProvider");
    }
    return context;
}