import { useEffect, useRef } from "react";
import type { BarraFiltrosProps } from "../types";



export const BarraFiltros = ({ busca, cidade, instrutores, onBuscaChange, onCidadeChange, onLimpar }: BarraFiltrosProps) => {


    // Cria uma ref pro input de busca
    const inputBuscaRef = useRef<HTMLInputElement | null>(null);


    // focar no inut quando o componente monta
    useEffect(() => {
        inputBuscaRef.current?.focus();
    }, []);

    function handleBuscaChange(e: React.ChangeEvent<HTMLInputElement>) {
        onBuscaChange(e.target.value);
    }

    function handleCidadeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        onCidadeChange(e.target.value);
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
                <label htmlFor="filtro-cidade">Cidade</label>
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

            {onLimpar && (
                <button onClick={onLimpar} className="btn-limpar">
                    Limpar filtros
                </button>
            )}
        </div>
    )
}