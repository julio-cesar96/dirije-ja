import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { instrutores } from "../data/instrutores"

function Agendamento() {
    const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [enviado, setEnviado] = useState(false)

  const instrutor = instrutores.find(i => i.id === id)

  if (!instrutor) {
    return (
      <div className="text-center py-16">
        <p>Instrutor não encontrado.</p>
        <Link to="/">Voltar para a listagem</Link>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Simula envio
    setEnviado(true)
    // Após 2 segundos, redireciona para o perfil
    // navigate() com replace=true evita que o usuário volte para o formulário
    setTimeout(() => {
      navigate(`/instrutores/${id}`, { replace: true })
    }, 2000)
  }

  if (enviado) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl">✅</p>
        <p className="text-xl font-bold text-brand-purple mt-4">
          Agendamento confirmado!
        </p>
        <p className="text-gray-500 mt-2">
          Redirecionando para o perfil de {instrutor.nome}...
        </p>
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
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
              Seu nome
            </label>
            <input
              id="nome"
              type="text"
              required
              className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
              placeholder="João da Silva"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="data" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
              Data da aula
            </label>
            <input
              id="data"
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="
                flex-1 bg-brand-purple text-white font-semibold
                py-3 rounded-xl hover:bg-purple-800 transition-colors
                focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
              "
            >
              Confirmar agendamento
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                flex-1 border-2 border-gray-200 text-gray-600 font-semibold
                py-3 rounded-xl hover:border-brand-purple hover:text-brand-purple
                transition-all
                focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2
              "
            >
              Cancelar
            </button>
          </div>

        </div>
      </form>
    </section>
  )
}

export default Agendamento;