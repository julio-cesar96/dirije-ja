import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Listagem from './pages/Listagem'
import Perfil from './pages/Perfil'
import Agendamento from './pages/Agendamento'
import Error from './pages/Error'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Listagem />} />
        <Route path="instrutores/:id" element={<Perfil />} />
        <Route path="agendar/:id" element={<Agendamento />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App