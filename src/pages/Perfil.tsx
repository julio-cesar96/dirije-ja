import { useParams, Link, useNavigate } from "react-router-dom";
import { instrutores } from "../data/instrutores";
import Badge from "../components/ui/Badges";

function Perfil() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="error">
        <h1>Erro: ID do instrutor não fornecido.</h1>
        <p>
          Por favor, volte para a lista de instrutores e selecione um perfil
          válido.
        </p>
      </div>
    );
  }

  const instrutor = instrutores.find((i) => i.id === id);

  if (!instrutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-6xl">😕</p>
        <h1 className="text-2xl font-bold text-brand-purple">
          Instrutor não encontrado
        </h1>
        <p className="text-gray-500">
          O instrutor com ID{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">{id}</code> não
          existe.
        </p>
        {/*
          Link de volta para a listagem.
          Poderia ser useNavigate(-1) para "voltar",
          mas Link é mais previsível — sempre vai para a home.
        */}
        <Link
          to="/"
          className="
            bg-brand-purple text-white font-semibold
            py-2 px-6 rounded-xl
            hover:bg-purple-800 transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
          "
        >
          Voltar para a listagem
        </Link>
      </div>
    );
  }

  const { nome, cidade, especialidade, preco, disponibilidade, foto } = instrutor;

  return (
    <>
      <article>
        {/* Breadcrumb — mostra o caminho de navegação */}
        <nav aria-label="Navegação estrutural" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                to="/"
                className="hover:text-brand-purple transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to="/"
                className="hover:text-brand-purple transition-colors"
              >
                Instrutores
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            {/* Página atual — não é link, tem aria-current */}
            <li className="text-brand-purple font-medium" aria-current="page">
              {nome}
            </li>
          </ol>
        </nav>

        {/* Perfil */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <img
              src={foto}
              alt={`Foto de perfil de ${nome}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-brand-yellow"
            />

            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-brand-purple">{nome}</h1>
              <p className="text-gray-600">📍 {cidade}</p>
              <p className="text-gray-600 italic">{especialidade}</p>
              <p className="text-2xl font-bold text-brand-purple">
                R$ {preco.toFixed(2)}
                <span className="text-sm font-normal text-gray-400">/hora</span>
              </p>
              {disponibilidade ? (
                <Badge variant="disponivel">✅ Disponível hoje</Badge>
              ) : (
                <Badge variant="ocupado">🔴 Indisponível</Badge>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-4 mt-8">
            {/*
            useNavigate para navegação programática.
            Aqui usamos navigate() com uma string de rota.
            O React Router chama history.pushState() internamente.
          */}
            <button
              onClick={() => navigate(`/agendar/${instrutor.id}`)}
              disabled={!disponibilidade}
              className="
              bg-brand-purple text-white font-semibold
              py-3 px-8 rounded-xl
              hover:bg-purple-800 transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
            "
              aria-label={
                disponibilidade
                  ? `Agendar aula com ${nome}`
                  : `${nome} está indisponível para agendamento`
              }
            >
              {disponibilidade ? "Agendar aula" : "Indisponível"}
            </button>

            {/*
            navigate(-1) = history.back() — volta uma posição na pilha
            É o equivalente do botão "←" do navegador
          */}
            <button
              onClick={() => navigate(-1)}
              className="
              border-2 border-gray-200 text-gray-600 font-semibold
              py-3 px-8 rounded-xl
              hover:border-brand-purple hover:text-brand-purple
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2
            "
            >
              Voltar
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default Perfil;
