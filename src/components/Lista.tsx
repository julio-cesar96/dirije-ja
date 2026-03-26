interface ListaProps<T> {
    itens: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    mensagem?: string;
    titulo?: string;
}

function Lista<T>({ itens, renderItem, keyExtractor, mensagem = "Nenhum item encontrado.", titulo }: ListaProps<T>) {
    return (
       <section>
        {titulo && <h2 className="secao-titulo">{titulo}</h2>}

        {itens.length === 0 ? (
            <div className="lista-vazia">
                <p>{mensagem}</p>
            </div>
        ) : (
            <div className="lista-grid">
                {itens.map(item => (
                    <div key={keyExtractor(item)} className="lista-item">
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        )}
       </section>
    )
};

export default Lista;