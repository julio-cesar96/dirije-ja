// ListaInstrutor - recebe o array de instrutores e renderiza um card para cada um.
// Exibe uma mensagem quando a lista estiver vazia.

import { CardInstrutor } from "./CardInstrutor"

export const ListaInstrutores = ({ instrutores }) => {
    if (instrutores.length === 0) {
        return (
            <div className="lista-vazia">
                <p>Nenhum instrutor encontrado.</p>
                <p>Experimente ajustar seus filtros ou tente novamente mais tarde.</p>
            </div>
        )
    }

    return (
        <section>
            <p className="contador">
                {instrutores.length} instrutor{instrutores.length !== 1 ? 'es' : ''} encontrado{instrutores.length !== 1 ? 's' : ''}.
            </p>

            <div className="lista-grid">
                {instrutores.map(instrutor => (
                    <CardInstrutor
                        key={instrutor.id}
                        nome={instrutor.nome}
                        cidade={instrutor.cidade}
                        especialidade={instrutor.especialidade}
                        preco={instrutor.preco}
                        disponivel={instrutor.disponivel}
                        foto={instrutor.foto}
                    />
                ))}
            </div>
        </section>
    )
}