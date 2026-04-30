import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { buscarInstrutor } from "../services/api";
import Badge from "../components/ui/Badges";
import Breadcrumb from "../components/ui/Breadcrumb";
import type { Instrutor } from "../types";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

function Perfil() {
  const usuario = useAuthStore((state) => state.usuario);
  const { id } = useParams<{id: string;}>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      // Se o usuário não estiver logado, redireciona para a página de login
      // eslint-disable-next-line react-hooks/immutability
      navigate("/", { replace: true });
    }
  },[usuario, navigate]);

  const {
    data: instrutor,
    isLoading,
    isError
  } = useQuery<Instrutor>({
    queryKey: ["instrutor", id], // chave única para cada instrutor: rebusca quando o ID muda
    queryFn: () => buscarInstrutor(id!), // função de busca, recebe o ID
    enabled: !!id, // só roda a query se o ID existir
    retry: false, // não tenta refazer a query em caso de erro (ex: ID inválido)
  });

  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-6xl">🚫</p>
        <h1 className="text-2xl font-bold text-gray-600">Acesso negado</h1>
        <p className="text-gray-500">Faça login para acessar o perfil do instrutor.</p>
        <Link
          to="/"
          className="
            bg-brand-primary text-white font-semibold
            py-2 px-6 rounded-xl
            hover:bg-brand-primary-hover transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2
          "
        >
          Voltar para a listagem
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-6xl animate-pulse">⏳</p>
        <h1 className="text-2xl font-bold text-gray-600">Carregando perfil...</h1>
      </div>
    );
  }
  
  if (isError || !instrutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-6xl">⚠️</p>
        <h1 className="text-2xl font-bold text-red-600">Erro ao carregar perfil</h1>
        <p className="text-gray-500">{isError ? "Erro ao carregar perfil" : "Instrutor não encontrado"}</p>
        <Link
          to="/"
          className="
            bg-brand-primary text-white font-semibold
            py-2 px-6 rounded-xl
            hover:bg-brand-primary-hover transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2
          "
        >
          Voltar para a listagem
        </Link>
      </div>
    );
  }

  if (!instrutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-6xl">😕</p>
        <h1 className="text-2xl font-bold text-brand-primary">
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
            bg-brand-primary text-white font-semibold
            py-2 px-6 rounded-xl
            hover:bg-brand-primary-hover transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2
          "
        >
          Voltar para a listagem
        </Link>
      </div>
    );
  }

  const { nome, cidade, especialidade, preco, disponivel, foto } = instrutor;

  return (
    <>
      <article>
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Instrutores", to: "/" },
            { label: nome },
          ]}
        />

        {/* Perfil */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <img
              src={foto}
              alt={`Foto de perfil de ${nome}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-brand-secondary"
            />

            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-brand-primary">{nome}</h1>
              <p className="text-gray-600">📍 {cidade}</p>
              <p className="text-gray-600 italic">{especialidade}</p>
              <p className="text-2xl font-bold text-brand-primary">
                R$ {preco.toFixed(2)}
                <span className="text-sm font-normal text-gray-400">/hora</span>
              </p>
              {disponivel ? (
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
              disabled={!disponivel}
              className="
              bg-brand-primary text-white font-semibold flex justify-center items-center gap-2
              py-3.5 px-8 rounded-xl shadow-sm
              hover:bg-brand-primary-hover hover:shadow-md transition-all duration-200 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:shadow-sm
              focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
            "
              aria-label={
                disponivel
                  ? `Agendar aula com ${nome}`
                  : `${nome} está indisponível para agendamento`
              }
            >
              {disponivel ? "Agendar aula" : "Indisponível"}
            </button>

            {/*
            navigate(-1) = history.back() — volta uma posição na pilha
            É o equivalente do botão "←" do navegador
          */}
            <button
              onClick={() => navigate(-1)}
              className="
              border-2 border-gray-200 bg-white text-gray-500 font-semibold
              py-3.5 px-8 rounded-xl
              hover:border-gray-300 hover:text-brand-neutral hover:bg-gray-50
              transition-all duration-200 active:scale-[0.98]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2
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
