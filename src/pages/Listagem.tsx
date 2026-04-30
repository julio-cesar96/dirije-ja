import { useState } from "react";
import { BarraFiltros } from "../components/features/BarraFiltro";
import CardInstrutor from "../components/features/CardInstrutor";
import Skeleton from "../components/ui/Skeleton";
import { useInstrutores } from "../hooks/useInstrutores";

function Listagem() {
  const [busca, setBusca] = useState("");
  const [cidade, setCidade] = useState("");

  const { instrutores, instrutoresFiltrados, isLoading, isError, error } = useInstrutores({ busca, cidade});


  if (isLoading) {
    return (
     <section>
      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Encontre seu instrutor
      </h1>
      {/*
        aria-label="Carregando instrutores" no grid:
        leitores de tela anunciam o loading sem ver os skeletons
      */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="Carregando instrutores..."
        aria-busy="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    </section>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
        <p className="text-red-500 font-medium mb-4"> Ocorreu um erro: {error?.message} </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 border-b pb-4">
            <h1 className="text-3xl font-extrabold text-gray-800">
                Encontre seu instrutor de habilitação
            </h1>
            <p className="text-gray-500 mt-2">Busque pelo nome ou filtre por cidade para encontrar o instrutor ideal.</p>
        </div>

        <div className="mb-6">
            <BarraFiltros
                busca={busca}
                cidade={cidade}
                onBuscaChange={setBusca}
                onCidadeChange={setCidade}
                instrutores={instrutores}
                onLimpar={() => {
                    setBusca("");
                    setCidade("");
                }}
            />
        </div>

        <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 bg-gray-100 inline-block px-4 py-1.5 rounded-full" aria-live="polite">
                {instrutoresFiltrados.length} {instrutoresFiltrados.length === 1 ? 'instrutor encontrado' : 'instrutores encontrados'}
            </p>
        </div>

        {instrutoresFiltrados.length > 0 ? (
            <div className="flex flex-col gap-6">
                {instrutoresFiltrados.map(instrutor => (
                    <CardInstrutor
                        key={instrutor.id}
                        instrutor={instrutor}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500 text-lg">Nenhum instrutor encontrado com esses filtros.</p>
            </div>
        )}
    </section>
  )
}

export default Listagem;