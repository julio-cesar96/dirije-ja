import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      BrowserRouter deve envolver TODA a aplicação.
      Ele é o contexto que fornece informações de rota
      para todos os componentes filhos.
      Se um componente usar useNavigate ou Link fora do
      BrowserRouter, vai quebrar com erro.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
