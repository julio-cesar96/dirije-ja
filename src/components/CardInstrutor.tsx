// CardInstrutor - mostra as infos de um instrutor.
// Recebe os dados via props e renderiza um card com as informações do instrutor.

export const CardInstrutor = ({ nome, cidade, especialidade, preco, disponivel, foto }) => {
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

                {disponivel && (
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