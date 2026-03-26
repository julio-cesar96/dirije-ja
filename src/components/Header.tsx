// Recebe o total de instrutores disponíveis e exibe no header


export const Header = ({ totalDisponiveis }: { totalDisponiveis: number }) => {
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
                       🟢 {totalDisponiveis}  instrutor{totalDisponiveis !== 1 ? 'es' : ''} encontrado{totalDisponiveis !== 1 ? 's' : ''}.
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