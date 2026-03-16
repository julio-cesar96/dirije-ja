import { Header } from "./components/Header"
import { ListaInstrutores } from "./components/ListaInstrutores" 
import { instrutores } from "./data/instrutores"


// Componente principal da aplicação
// Orquestra os dados e faz a ligação entre os componentes

function App() {

  // Calculo dos instrutores disponveis.
   // filter() retorna um novo array só com os que passam na condição
  const instrutoresDisponiveis = instrutores.filter(instrutor => instrutor.disponivel)

  return (
    <div className="app">
      <Header totalDisponiveis={instrutores.length} />

      <main className="main">
        <h2 className="secao-titulo">Instrutores</h2>

        <ListaInstrutores instrutores={instrutoresDisponiveis} />
      </main>
    </div>
  )
}

export default App;
