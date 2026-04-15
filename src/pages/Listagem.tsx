import { useEffect, useMemo, useState } from "react";
import { instrutores as dadosMockados } from "../data/instrutores";
import type { Instrutor } from "../types";
import { BarraFiltros } from "../components/features/BarraFiltro";
import CardInstrutor from "../components/features/CardInstrutor";

function Listagem() {
    const [instrutores, setInstrutores] = useState<Instrutor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [busca, setBusca] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [erro, setErro] = useState<null | string>(null); 

    useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setLoading(true); // inicia o carregamento
        setInstrutores(dadosMockados); // carrega os dados mockados
        setLoading(false); // terminou o carregamento
      } catch (error) {
        setErro(`Erro ao carregar os instrutores. ${error}`); // define a mensagem de erro
        setLoading(false); // terminou o carregamento, mesmo com erro
      }
    }, 1500);

    return () => clearTimeout(timer); // limpa o timer se o componente desmontar antes de completar
  }, []);

  const instrutoresFiltrados = useMemo<Instrutor[]>(() => {
    return instrutores.filter(instrutor => {
      const buscaOk = busca === "" || instrutor.nome.toLowerCase().includes(busca.toLowerCase());
      const cidadeOk = cidade === "" || instrutor.cidade.toLowerCase() === cidade.toLowerCase();
      return buscaOk && cidadeOk;
    })
  }, [instrutores, busca, cidade]);

  const totalDisponiveis = useMemo<number>(() => {
    return instrutores.filter(instrutor => instrutor.disponibilidade).length;
  }, [instrutores]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" aria-label="Carregando instrutores">
          <p> Carregando instrutores...</p>
        </div>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="erro">
        <p> {erro} </p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    )
  }
    return (
        <>
            <section>
                <h1 className="text-2xl font-bold text-purple-200 mb-6">
                    {totalDisponiveis > 0 ? `Encontre seu instrutor de habilitação` : 'Nenhum instrutor disponível no momento'}
                </h1>

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
                <p className="text-sm text-gray-500 mb-4" aria-live="polite">
                    {instrutoresFiltrados.length === 0
                        ? "Nenhum instrutor encontrado."
                        : `${instrutoresFiltrados.length} instrutor${instrutoresFiltrados.length > 1 ? "es" : ""} encontrado${instrutoresFiltrados.length > 1 ? "s" : ""}.`
                    }
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instrutoresFiltrados.map(instrutor => (
                        <CardInstrutor
                            key={instrutor.id}
                            instrutor={instrutor}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Listagem;