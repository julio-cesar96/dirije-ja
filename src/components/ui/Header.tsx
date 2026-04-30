// Recebe o total de instrutores disponíveis e exibe no header
import { NavLink } from "react-router-dom"
import { useTheme } from "../../contexts/theme/ThemeContext";
import { useAuthStore } from "../../stores/authStore";

export const Header = ({ totalDisponiveis }: { totalDisponiveis: number }) => {

    const usuario = useAuthStore((state) => state.usuario);
    const logout = useAuthStore((state) => state.logout);

    const { theme, toggleTheme } = useTheme();
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 w-full">
            <button
                onClick={toggleTheme}
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-brand-tertiary hover:text-brand-primary hover:border-brand-tertiary transition cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="Alternar tema claro/escuro"
            >
                {theme === 'light' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18v2.25m-6.364-.386l1.591-1.591M3 12H5.25m.386-6.364L6.927 5.636M16.364 16.364l1.591 1.591M7.758 7.758L5.636 5.636" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11c0 5.385 4.365 9.75 9.75 9.75a9.753 9.753 0 006.002-2.748z" />
                    </svg>
                )}
            </button>
            {usuario && (
                <div className="absolute top-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        {usuario.nome.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-600">{usuario.nome}</span>
                    <button
                        onClick={logout}
                        className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                        Sair
                    </button>
                </div>
            )}
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-8">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
                        aria-label="DirejeJá - ir para página inicial"
                    >
                        <div className="bg-brand-primary w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-xl" aria-hidden="true">🚗</span>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-brand-neutral">
                            Direje<span className="text-brand-primary">Já</span>
                        </span>
                    </NavLink>

                    <nav aria-label="Navegação principal" className="hidden sm:block">
                        <ul className="flex items-center gap-6 list-none m-0 p-0">
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) => 
                                        isActive
                                            ? "text-sm font-bold text-brand-primary"
                                            : "text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors duration-200"
                                    }
                                >
                                    Instrutores
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/meu-perfil"
                                    className={({ isActive}) => 
                                        isActive                                        
                                            ? "text-sm font-bold text-brand-primary"
                                            : "text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors duration-200"
                                    }
                                >
                                    Meu Perfil
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <p className="text-sm font-medium text-gray-400 hidden lg:block">
                        {totalDisponiveis > 0 ? `Encontre seu instrutor de habilitação` : 'Nenhum instrutor disponível no momento'}
                    </p>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-brand-tertiary hover:text-brand-primary hover:border-brand-tertiary transition cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                            aria-label="Notificações"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:bg-brand-primary-hover transition">
                            Y
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}