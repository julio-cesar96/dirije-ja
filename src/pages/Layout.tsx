import { Outlet } from "react-router-dom";
import { Header } from "../components/ui/Header";

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
                    <Outlet />
                </main>

                <footer className="bg-purple-200 text-white text-center py-4 mt-auto text-sm">
                    <p>© 2024 DiretoFácil — Todos os direitos reservados</p>
                </footer>
            </div>
        </>
    )
}

export default Layout;