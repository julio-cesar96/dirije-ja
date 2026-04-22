import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { criarAgendamento, type DadosAgendamento, buscarInstrutor } from '../services/api'
import type { Instrutor } from "../types"

function Agendamento() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  // Busca o instrutor para exibir o nome no formulário
  const { data: instrutor } = useQuery<Instrutor>({
    queryKey: ["instrutor", id],
    queryFn: () => buscarInstrutor(id!),
    enabled: !!id,
  })

  const mutation = useMutation({
    mutationFn: criarAgendamento,
    onSuccess: () => {
      /*
        invalidateQueries marca a query de agendamentos como stale.
        Na próxima vez que PaginaMeuPerfil montar, vai rebuscar.
        Não precisa recarregar a página — o cache cuida disso.
      */
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] })


       // Redireciona para o perfil após sucesso
      // replace=true: botão "←" volta para o perfil, não para o formulário
      navigate(`/instrutores/${id}`, { replace: true })
    },

    onError: (error: Error) => {
      console.error(`Erro ao criar agendamento: ${error.message}`)
    }
  });

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    data: "",
    horario: "",
    observacoes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const dados: DadosAgendamento = {
      instrutorId: id!,
      ...form,
    }

    // Dispara a mutation com os dados do formulário
    mutation.mutate(dados)
  }
  

  if (!instrutor) {
    return (
      <div className="text-center py-16">
        <p>Instrutor não encontrado.</p>
        <Link to="/">Voltar para a listagem</Link>
      </div>
    )
  }


  return (
    <section>
      {/* Breadcrumb */}
      <nav aria-label="Navegação estrutural" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link to="/" className="hover:text-brand-purple">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to={`/instrutores/${id}`}
              className="hover:text-brand-purple"
            >
              {instrutor.nome}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-brand-purple font-medium" aria-current="page">
            Agendar
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Agendar aula com {instrutor.nome}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 max-w-lg"
      >
        {/* Campo nome */}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="nome" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
            Seu nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            value={form.nome}
            onChange={handleChange}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
          />
        </div>

        {/* Campo data */}
        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="data" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
            Data
          </label>
          <input
            id="data"
            name="data"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            value={form.data}
            onChange={handleChange}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
          />
        </div>

        {/* Feedback de erro */}
        {mutation.isError && (
          <p className="text-red-600 text-sm mb-4" role="alert">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Erro ao criar agendamento. Tente novamente."}
          </p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            /*
              isPending = true enquanto o POST está em andamento.
              Desabilita o botão para evitar duplo envio.
              Muda o texto para feedback visual imediato.
            */
            disabled={mutation.isPending}
            className="
              flex-1 bg-brand-purple text-white font-semibold
              py-3 rounded-xl hover:bg-purple-800 transition-colors
              disabled:opacity-60 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
            "
          >
            {mutation.isPending ? "Enviando..." : "Confirmar agendamento"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={mutation.isPending}
            className="
              flex-1 border-2 border-gray-200 text-gray-600 font-semibold
              py-3 rounded-xl hover:border-brand-purple hover:text-brand-purple
              transition-all disabled:opacity-60
              focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2
            "
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  )
}

export default Agendamento;