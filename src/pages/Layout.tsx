import { Outlet } from "react-router-dom";
import { Header } from "../components/ui/Header";
import ErroFallback from "../components/ui/ErroFallback";
import { ErrorBoundary } from "react-error-boundary";

/* 
    Layout define a estrutura visual comum a todas as paginas (header, footer e etc)

    <Outlet /> - local aonde o conteudo da rota filha vai aparecer (renderizado)

    Quando a URL for "/":
     -> Layout renderiza -> Header + <Outlet /> = Header + Listagem

    Quando a URL for "/instrutores/123":
     -> Layout renderiza -> Header + <Outlet /> = Header + Perfil do instrutor 123
*/

function Layout() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* 
                    Header é fixo, sempre visível no topo, mesmo quando rolar a página.
                    Montado apenas uma única vez.
                    TODO ESTADO INTERNO DO HEADER vai persistir entre a navegações (ex: menu aberto/fechado, etc)
                */}
                <Header totalDisponiveis={3} />
                
                <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
                    {/*
                        ErrorBoundary é um componente que captura erros em seus filhos e exibe um fallback (componente de erro) ao invés de quebrar toda a aplicação.
                        Aqui, se qualquer componente renderizado dentro do <Outlet /> lançar um erro, o ErroFallback será exibido, evitando que a aplicação quebre completamente.
                    */}
                    <ErrorBoundary FallbackComponent={ErroFallback}> 
                        <Outlet />
                    </ErrorBoundary>
                </main>

                <footer className="bg-white border-t border-gray-200 text-gray-500 text-center py-6 mt-auto text-sm">
                    <p>© 2026 DirejeJá — Todos os direitos reservados</p>
                </footer>
            </div>
        </>
    )
}

export default Layout;