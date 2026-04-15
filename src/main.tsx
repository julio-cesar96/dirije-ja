import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

/* 
  QueryClient é o objeto central do React Query, responsável por gerenciar o cache, as queries e as mutações.
  Ele é criado uma vez e passado para toda a aplicação via QueryClientProvider.
  Sem ele, o React Query não funcionaria, pois não teria onde armazenar os dados e o estado das queries.

  defaultOptions é uma configuração global que define o comportamento padrão de todas as queries e mutações.
  staleTime: 5 minutos (300000 ms) - Define o tempo que os dados são considerados "frescos". Durante esse período, o React Query não fará refetch automático.
  cacheTime: 10 minutos (600000 ms) - Define o tempo que os dados ficam no cache após ficarem obsoletos. Se uma query ficar obsoleta e não for acessada por esse tempo, ela será removida do cache.
  retry: 2 - Define o número de tentativas de refetch em caso de falha. O React Query tentará refazer a query até 2 vezes antes de considerar a query como falhada.
*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // statleTime: quanto tempo o dado fica fresco (não precisa refetch)
      // 1 minuto por padrão pra todas as queries.
      staleTime: 1000 * 60, // 1 minuto

      // retry: quantas vezes o React Query deve tentar refazer a query em caso de falha.
      // Por padrão, ele tenta 3 vezes. Aqui estamos configurando para tentar apenas 1 vezes.
      retry: 1,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    {/*
      BrowserRouter deve envolver TODA a aplicação.
      Ele é o contexto que fornece informações de rota
      para todos os componentes filhos.
      Se um componente usar useNavigate ou Link fora do
      BrowserRouter, vai quebrar com erro.
    */}
  </StrictMode>,
)
