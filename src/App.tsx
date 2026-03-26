import { Header } from "./components/Header"
import { instrutores as dadosMockados } from "./data/instrutores"
import { BarraFiltros } from "./components/BarraFiltro"
import { useEffect, useMemo, useState } from "react"
import type { Instrutor } from "./types"
import Lista from "./components/Lista"
import { CardInstrutor } from "./components/CardInstrutor"

// Componente principal da aplicação
// Orquestra os dados e faz a ligação entre os componentes

function App() {

  // Estado para os instrutores filtrados, inicialmente com todos os instrutores
  const [instrutores, setInstrutores] = useState<Instrutor[]>([]); // lista vazia
  const [loading, setLoading] = useState<boolean>(false); // começa carregando
  const [erro, setErro] = useState<null | string>(null); // sem erro inicialmente
  const [busca, setBusca] = useState<string>(""); // estado para o termo de busca
  const [cidade, setCidade] = useState<string>(""); // estado para a cidade selecionada


  // [] - rodar toda vez que o App montar

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
    <div className="app">
      <Header totalDisponiveis={totalDisponiveis} />

      <main className="main">
        <BarraFiltros 
          instrutores={dadosMockados}
          busca={busca}
          cidade={cidade}
          onBuscaChange={setBusca}
          onCidadeChange={setCidade}
        />
        
        <p className="contador">
          {instrutoresFiltrados.length === 0
            ? "Nenhum instrutor encontrado."
            : `${instrutoresFiltrados.length} instrutor${instrutoresFiltrados.length > 1 ? "es" : ""} encontrado${instrutoresFiltrados.length > 1 ? "s" : ""}.`
          }
        </p>
        
        <Lista<Instrutor> 
          itens={instrutoresFiltrados}
          keyExtractor={(i) => i.id.toString()}
          renderItem={(i) => <CardInstrutor instrutor={i} />}
          mensagem="Nenhum instrutor encontrado para esse filtro"
        />
        
      </main>
    </div>
  )
}

export default App;
