// ListaInstrutor - recebe o array de instrutores e renderiza um card para cada um.
// Exibe uma mensagem quando a lista estiver vazia.


import type { ListaInstrutoresProps } from "../types"
import { CardInstrutor } from "./features/CardInstrutor"



export const ListaInstrutores = ({ instrutores }: ListaInstrutoresProps) => {
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
                        instrutor={instrutor}
                    />
                ))}
            </div>
        </section>
    )
}