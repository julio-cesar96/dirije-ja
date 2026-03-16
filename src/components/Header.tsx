// Recebe o total de instrutores disponíveis e exibe no header

import { instrutores } from "../data/instrutores"

export const Header = ({ totalDisponiveis }) => {
    return (
        <header className="header">
            <div className="header-logo">
                <span className="logo-icone">🚗</span>
                <h1 className="logo-nome">DirijeJá</h1>
            </div>

            <p className="header-tagline">
                Encontre seu instrutor de habilitação
            </p>

            {totalDisponiveis > 0
                ? (
                    <p className="header-disponiveis">
                       🟢 {totalDisponiveis}  instrutor{instrutores.length !== 1 ? 'es' : ''} encontrado{instrutores.length !== 1 ? 's' : ''}.
                    </p>
                )
                : (
                    <p className="header-disponiveis">
                        🔴 Nenhum instrutor disponível no momento
                    </p>
                )
            }
        </header>
    )
}