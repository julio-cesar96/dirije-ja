import { useEffect, useRef, useState } from "react";

export const BarraFiltros = ({ instrutores, onFiltrar}) => {

    //Estado para o campo de busca por nome
    const [busca, setBusca] = useState("");

    //Estado para filtrar as cidades
    const [cidade, setCidade] = useState("");

    // Cria uma ref pro input de busca
    const inputBuscaRef = useRef(null);

    // focar no inut quando o componente monta
    useEffect(() => {
        if (inputBuscaRef.current) {
            inputBuscaRef.current.focus();
        }
    }, [])

    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log(`BarraFiltros renderizou ${renderCount.current} vezes`)

    function handleBuscaChange(event) {
        const novaBusca = event.target.value;
        setBusca(novaBusca);

        const instrutoresFiltrados = instrutores.filter(instrutor => 
            instrutor.nome.toLowerCase().includes(novaBusca.toLowerCase()) && (cidade === "" || instrutor.cidade === cidade)
        )
        onFiltrar(instrutoresFiltrados);
    }

    function handleCidadeChange(event) {
        const novaCidade = event.target.value;
        setCidade(novaCidade);

        const instrutoresFiltrados = instrutores.filter(instrutor => 
            instrutor.nome.toLowerCase().includes(busca.toLowerCase()) && (novaCidade === "" || instrutor.cidade === novaCidade)
        )
        onFiltrar(instrutoresFiltrados);
    }

    // Extrai as cidades únicas dos instrutores para popular o dropdown
    const cidades = [...new Set(instrutores.map(instrutor => instrutor.cidade))];


    return (
        <div className="barra-filtros">
            <div className="campo">
                <label htmlFor="busca-nome">Buscar por nome:</label>
                <input
                    id="busca-nome"
                    type="text"
                    placeholder="Ex.: Júlio César"
                    value={busca} // controlado pelo estado
                    onChange={handleBuscaChange}
                    ref={inputBuscaRef}
                />
            </div>

            <div className="campo">
                <label htmlFor="filtro-cidade">Filtrar por cidade</label>
                <select
                    id="filtro-cidade"
                    value={cidade}
                    onChange={handleCidadeChange}
                >
                    <option value="">Todas as cidades</option>
                    {cidades.map(cidade => (
                        <option key={cidade} value={cidade}>
                            {cidade}
                        </option>
                    ))}
                </select>
            </div>

            <p style={{ fontSize: '12px', color: '#999' }}>
                Renders: {renderCount.current}
            </p>
        </div>
    )
}