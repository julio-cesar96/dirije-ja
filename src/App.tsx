import { Header } from "./components/Header"
import { ListaInstrutores } from "./components/ListaInstrutores" 
import { instrutores as dadosMockados } from "./data/instrutores"
import { BarraFiltros } from "./components/BarraFiltro"
import { useEffect, useState } from "react"

// Componente principal da aplicação
// Orquestra os dados e faz a ligação entre os componentes

function App() {

  // Estado para os instrutores filtrados, inicialmente com todos os instrutores
  const [instrutores, setInstrutores] = useState([]); // lista vazia
  const [instrutoresFiltrados, setInstrutoresFiltrados] = useState([]);
  const [loading, setLoading] = useState(true); // começa carregando
  const [erro, setErro] = useState(null); // sem erro inicialmente


  // [] - rodar toda vez que o App montar

  useEffect(() => {
    setLoading(true); // inicia o carregamento
    setErro(null); // limpa erros anteriores 
    
    const timer = setTimeout(() => {
      // Simulo uma request de 1.5 segundos
      try {
        setInstrutores(dadosMockados); // carrega os dados mockados
        setInstrutoresFiltrados(dadosMockados); // inicialmente, todos os instrutores estão filtrados
        setLoading(false); // terminou o carregamento
      } catch (error) {
        setErro("Erro ao carregar os instrutores."); // define a mensagem de erro
        setLoading(false); // terminou o carregamento, mesmo com erro
      }
    }, 1500);

    return () => clearTimeout(timer); // limpa o timer se o componente desmontar antes de completar
  }, []);

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
      <Header totalDisponiveis={dadosMockados.length} />

      <main className="main">
        <BarraFiltros 
          instrutores={dadosMockados}
          onFiltrar={setInstrutoresFiltrados}
        />

        <ListaInstrutores instrutores={instrutoresFiltrados} />
      </main>
    </div>
  )
}

export default App;
