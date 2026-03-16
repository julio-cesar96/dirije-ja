// JSX 

import Button from "./Button"
import Card from "./Card"
import ListaDeInstrutores from "./ListaDeInstrutores";

function App() {

  const handleAgendarAula = () => {
    alert("Agendei uma aula");
  }

  const handleCancelarAula = () => {
    alert("Cancelei uma aula");
  }

  return (
    <>
      <Card 
        nome="João Silva"
        disponivel={true}
        categoria="B"
        especialidade="Direção Defensiva"
      >
        <button>Agendar Aula</button>
      </Card>

      <Card 
        nome="Stella"
        disponivel={false}
        categoria="AB"
        especialidade="Baliza"
      >
        <button>Agendar Aula</button>
      </Card>

      <Card 
        nome="Maria"
        disponivel={true}
        categoria="A"
        especialidade="Transito"
      >
        <button>Agendar Aula</button>
      </Card>

      <Button 
        label="Agendar Aula"
        onClick={handleAgendarAula}
      />

      <Button 
        label="Cancelar Aula"
        onClick={handleCancelarAula}
      />

      <ListaDeInstrutores />

    </>
  )
}

export default App
