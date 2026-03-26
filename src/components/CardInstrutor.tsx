// CardInstrutor - mostra as infos de um instrutor.
// Recebe os dados via props e renderiza um card com as informações do instrutor.

import type { CardInstrutorProps } from "../types";


export const CardInstrutor = ({ instrutor }: CardInstrutorProps) => {
    const { foto, nome, cidade, especialidade, preco, disponibilidade } = instrutor;
    return (
        <div className="card">
            {/* Exibe a foto do instrutor */}
            <img
                src={foto}
                alt={`Foto de perfil de ${nome}`}
                className="card-foto"
            />

            {/* Exibe as infos principais */}
            <div className="card-info">
                <h2 className="card-nome">{nome}</h2>
                <p className="card-cidade">📍 {cidade}</p>
                <p className="card-especialidade">💼 {especialidade}</p>

                <p className="card-preco">
                    💰 R$ {preco}<span>/hora</span>
                </p>

                {disponibilidade && (
                    <span className="badge badge-disponivel">
                        ✅ Disponível hoje 
                    </span>
                )}

                <button className="btn-agendar">
                    Ver perfil
                </button>
            </div>
        </div>
    )
}