// Recebe o total de instrutores disponíveis e exibe no header
import { NavLink } from "react-router-dom"

export const Header = ({ totalDisponiveis }: { totalDisponiveis: number }) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 w-full">
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