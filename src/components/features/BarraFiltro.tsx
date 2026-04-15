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
        <section className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-2.5 sm:p-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium whitespace-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12m-9 6h6" />
                    </svg>
                    Filtros
                </div>

                <div className="flex-1 min-w-0">
                    <label htmlFor="busca-nome" className="sr-only">Buscar por nome</label>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-gray-400" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                        </svg>
                        <input
                            id="busca-nome"
                            type="text"
                            placeholder="Buscar por nome..."
                            value={busca} // controlado pelo estado
                            onChange={handleBuscaChange}
                            ref={inputBuscaRef}
                            className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-56">
                    <label htmlFor="filtro-cidade" className="sr-only">Filtrar por cidade</label>
                    <div className="relative rounded-lg border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-gray-300">
                        <select
                            id="filtro-cidade"
                            value={cidade}
                            onChange={handleCidadeChange}
                            className="h-10.5 w-full appearance-none bg-transparent px-3 pr-10 text-sm text-gray-700 outline-none cursor-pointer"
                        >
                            <option value="">Todas as cidades</option>
                            {cidades.map(cidade => (
                                <option key={cidade} value={cidade}>
                                    {cidade}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                            </svg>
                        </span>
                    </div>
                </div>

                {onLimpar && (
                    <button
                        onClick={onLimpar}
                        className="h-10.5 w-full sm:w-auto rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        Limpar
                    </button>
                )}
            </div>
        </section>
    )
}