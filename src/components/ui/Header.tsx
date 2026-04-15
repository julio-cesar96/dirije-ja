// Recebe o total de instrutores disponíveis e exibe no header
import { NavLink } from "react-router-dom"

export const Header = ({ totalDisponiveis }: { totalDisponiveis: number }) => {
    return (
        <header className="bg-brand-purple text-white py-4 px-8 shadow-lg">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <NavLink
                    to="/"
                    className="flex items-center gap-3 no-underline"
                    aria-label="DirejeJá - ir para página inicial"
                >
                    <span className="text-3xl" aria-hidden="true">🚗</span>
                    <span className="text-2xl font-bold text-yellow-400">
                        DirejeJá
                    </span>
                </NavLink>

                <nav aria-label="Navegação principal">
                    <ul className="flex flex-items gap-6 list-none">
                        <li>
                            <NavLink
                                to="/"
                                end // só ativa quando for exatamente "/"
                                className={({ isActive }) => 
                                    isActive
                                        ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                                        : "text-white hover:text-yellow-300 transition-colors duration-200"
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
                                        ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                                        : "text-white hover:text-yellow-300 transition-colors duration-200"
                                }
                            >
                                Meu Perfil
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            

            <p className="header-tagline">
                {totalDisponiveis > 0 ? `Encontre seu instrutor de habilitação` : 'Nenhum instrutor disponível no momento'}
            </p>

            </div>
        </header>
    )
}