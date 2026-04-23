import { useParams, useNavigate, Link } from "react-router-dom"
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { criarAgendamento, buscarInstrutor } from '../services/api'
import type { Instrutor } from "../types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { agendamentoSchema, type AgendamentoSchema } from "../schemas/agendamento.schema" 
import Breadcrumb from "../components/ui/Breadcrumb"


function Agendamento() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  // -- Form State - React Hook Form -- //
  const {
    register, // register é usado para conectar os campos do formulário ao React Hook Form,
    handleSubmit, // handleSubmit é uma função que envolve a função de envio do formulário, cuidando da validação e coleta dos dados,
    formState: { errors, isSubmitting }, // formState contém informações sobre o estado do formulário, como erros de validação e se o formulário está sendo submetido.
  } = useForm<AgendamentoSchema>({
    resolver: zodResolver(agendamentoSchema), // zodResolver integra o esquema de validação do Zod com o React Hook Form, permitindo que as regras de validação sejam aplicadas automaticamente.
    defaultValues: {
      nome: "",
      telefone: "",
      data: "",
      horario: "",
      observacoes: "",
    },
    mode: "onSubmit", // A validação ocorre apenas quando o formulário é submetido, evitando validações em tempo real enquanto o usuário preenche os campos.
  });

  // -- SERVER/HTTP State: Busca o instrutor para exibir o nome no formulário -- //
  const { data: instrutor } = useQuery<Instrutor>({
    queryKey: ["instrutor", id],
    queryFn: () => buscarInstrutor(id!),
    enabled: !!id,
  })

  // -- SERVER/HTTP State: envia os dados -- //
  const mutation = useMutation({
    mutationFn: criarAgendamento,
    onSuccess: () => {
      /*
        invalidateQueries marca a query de agendamentos como stale.
        Na próxima vez que PaginaMeuPerfil montar, vai rebuscar.
        Não precisa recarregar a página — o cache cuida disso.
      */
      // invalida agendamentos para atualizar a lista no perfil do instrutor
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] })
      // invalida o instrutor - disponibilidade pode ter mudado
      queryClient.invalidateQueries({ queryKey: ["instrutor", id] });
      
      // Removido o navigate imediato para exibir a tela de sucesso ("UX Modal Feedback")
    },

    onError: (error: Error) => {
      console.error(`Erro ao criar agendamento: ${error.message}`)
    }
  });

  function onSubmit(data: AgendamentoSchema) {
    mutation.mutate({ instrutorId: id!, ...data });
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
    <section className="flex flex-col items-center py-10 min-h-[80vh] justify-center relative">
      <div className="absolute top-0 left-0 w-full mb-10 max-w-2xl px-4">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: instrutor.nome, to: `/instrutores/${id}` },
              { label: "Agendar" },
            ]}
          />
      </div>

      {mutation.isSuccess ? (
        <div className="bg-white rounded-2xl p-10 shadow-2xl border border-gray-100 max-w-sm w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
             </svg>
           </div>
           <div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Agendamento Confirmado!</h2>
             <p className="text-gray-500 mb-8">
                Sua aula com a(o) instrutor(a) <strong>{instrutor.nome}</strong> foi marcada com sucesso.
             </p>
           </div>
           <button
             onClick={() => navigate(`/instrutores/${id}`, { replace: true })}
             className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold hover:bg-brand-primary/90 transition-colors shadow-md"
           >
             Certo, entendi!
           </button>
        </div>
      ) : (
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold text-brand-primary mb-6 text-center">
            Agendar aula com {instrutor.nome}
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate  // desativa validação nativa do browser — usamos Zod
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col gap-5 relative overflow-hidden"
          >
            {/* Modal-like backdrop if submitting */}
            {mutation.isPending && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                 <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                 <p className="mt-4 font-medium text-brand-primary animate-pulse">Agendando...</p>
              </div>
            )}

            {/* Error Message */}
            {mutation.isError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3">
                 <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 <div>
                   <h3 className="font-semibold text-red-800">Falha ao agendar</h3>
                   <p className="text-sm">Não foi possível concluir o agendamento. Verifique sua conexão e tente novamente.</p>
                 </div>
              </div>
            )}

            {/* Campo: nome */}
            <Input
              label="Seu nome"
              htmlFor="nome"
              erro={errors.nome?.message}
            >
              <input
                id="nome"
                type="text"
                autoComplete="name"
                {...register("nome")}
                className={inputClasses(!!errors.nome)}
              />
            </Input>

            {/* Campo: telefone */}
            <Input
              label="Telefone"
              htmlFor="telefone"
              erro={errors.telefone?.message}
            >
              <input
                id="telefone"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                {...register("telefone")}
                className={inputClasses(!!errors.telefone)}
              />
            </Input>

            {/* Campos lado a lado: data + horário */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Data" htmlFor="data" erro={errors.data?.message}>
                <input
                  id="data"
                  type="date"
                  min={amanha()}
                  {...register("data")}
                  className={inputClasses(!!errors.data)}
                />
              </Input>
              <Input label="Horário" htmlFor="horario" erro={errors.horario?.message}>
                <input
                  id="horario"
                  type="time"
                  {...register("horario")}
                  className={inputClasses(!!errors.horario)}
                />
              </Input>
            </div>

            {/* Campo: observações (opcional) */}
            <Input    
              label="Observações (opcional)"
              htmlFor="observacoes"
              erro={errors.observacoes?.message}
            >
              <textarea
                id="observacoes"
                rows={3}
                {...register("observacoes")}
                className={inputClasses(!!errors.observacoes)}
              />
            </Input>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                className="
                  flex-1 bg-brand-primary text-white font-semibold flex justify-center items-center gap-2
                  py-3.5 px-6 rounded-xl hover:bg-brand-primary-hover hover:shadow-md transition-all duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2
                "
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                     Enviando...
                  </span>
                ) : "Confirmar agendamento"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={mutation.isPending}
                className="
                  flex-1 border-2 border-gray-200 bg-white text-gray-500 font-semibold
                  py-3.5 px-6 rounded-xl hover:border-gray-300 hover:text-brand-neutral hover:bg-gray-50
                  transition-all duration-200 active:scale-[0.98] disabled:opacity-60
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2
                "
              >
                Cancelar
              </button>
            </div>

          </form>
        </div>
      )}
    </section>
  )
}

export default Agendamento;

// ── Utilitários do formulário ─────────────────────────────────────────

function amanha(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}

function inputClasses(temErro: boolean): string {
  return [
    "w-full border rounded-xl px-4 py-2.5 outline-none transition-all shadow-sm text-gray-800",
    temErro
      ? "border-red-400 focus:border-red-500 bg-red-50 focus:ring-4 focus:ring-red-500/10"
      : "border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-primary hover:border-gray-300 focus:ring-4 focus:ring-brand-primary/10",
  ].join(" ")
}

// Componente auxiliar para campo com label + erro
function Input({
  label,
  htmlFor,
  erro,
  children,
}: {
  label: string
  htmlFor: string
  erro?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="text-[13px] font-semibold text-gray-700"
      >
        {label}
      </label>
      {children}
      {erro && (
        <p className="text-red-500 text-xs" role="alert" aria-live="polite">
          {erro}
        </p>
      )}
    </div>
  )
}