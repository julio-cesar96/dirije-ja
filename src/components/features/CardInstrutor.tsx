import { cva, type VariantProps } from 'class-variance-authority'
import type { Instrutor } from '../../types'
import Badge from '../ui/Badges'
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';
import { favoritarInstrutor } from '../../services/api';

/* SOLID */

// S - Single Responsibility Principle: O componente CardInstrutor é responsável apenas por exibir as informações do instrutor e lidar com ações relacionadas a ele, como favoritar e agendar. Ele não lida com lógica de autenticação ou gerenciamento de estado global, o que mantém suas responsabilidades claras e focadas.

/* 
  CardInstrutor hoje tem QUATRO motivos para mudar:

  Motivo 1: o design do card muda (responsabilidade de UI)
  Motivo 2: a lógica de favoritar muda (responsabilidade de dados)
  Motivo 3: a regra de autenticação muda (responsabilidade de auth)
  Motivo 4: a rota de agendamento muda (responsabilidade de roteamento)

  Um componente com 4 motivos para mudar vai ser modificado 4x mais do que deveria — e cada modificação pode quebrar as outras 3.

*/


// O - Open/Closed Principle: O componente é aberto para extensão, mas fechado para modificação. Por exemplo, se quisermos adicionar um novo tipo de badge para indicar instrutores com avaliações excelentes, podemos estender o componente sem modificar seu código existente, mantendo a estabilidade do componente e evitando bugs.

/*

Violação do Open/Closed Principle:
function CardInstrutor({ tipo }: { tipo: "normal" | "destaque" | "novo-tipo" }) {
  if (tipo === "normal") return <div>...</div>
  if (tipo === "destaque") return <div>...</div>
  if (tipo === "novo-tipo") return <div>...</div>  // ← modifica o componente
}

O pai compõe sem modificar o componente filho
<Card>
  <Card.Header foto={foto} nome={nome} />
  <Card.Body especialidade={especialidade} preco={preco} />
  <Card.Actions instrutorId={id} disponivel={disponivel} />
</Card>


*/

// D - Dependy Inversion Principle: O componente depende de abstrações (props e hooks) em vez de detalhes concretos. Ele recebe os dados do instrutor como props e usa hooks para acessar o estado de autenticação e realizar mutações, sem depender diretamente de implementações específicas, o que facilita a manutenção e a testabilidade do componente.

/* 
 ❌ Componente depende diretamente da implementação (API):
function CardInstrutor({ instrutor }) {
  const mutation = useMutation({ mutationFn: favoritarInstrutor }) // ← acoplado
   Se trocar de API, este componente muda
}

 ✅ Componente depende de abstração (hook):
function CardInstrutor({ instrutor }) {
  const { favoritar, isFavoritado } = useFavoritos(instrutor.id) // ← desacoplado
   Se trocar de API, só o hook muda — o componente não sabe
}
*/


const cardVariants = cva(
  [
    "bg-white rounded-xl border border-gray-200 overflow-hidden",
    "flex flex-col md:flex-row shadow-sm",
    "transition-all duration-200 hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        padrao:     "border-gray-200",
        disponivel: "border-green-500 bg-green-100",
        destaque:   "border-gray-300",
        erro:     "border-red-500 bg-red-50",
      },
    },
    defaultVariants: { variant: "padrao" },
  }
)

interface CardInstrutorProps extends VariantProps<typeof cardVariants> {
  instrutor: Instrutor
  onVerPerfil?: (id: string) => void
}

function CardInstrutor({ instrutor, variant }: CardInstrutorProps) {

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { id, nome, cidade, especialidade, preco, disponivel, foto } = instrutor
  

  // 1. busca estado de autenticação para verificar se usuário pode favoritar ou agendar
  const usuario = useAuthStore(state => state.usuario)
  // 2. estado local para controlar se o instrutor está favoritado ou não (pode ser melhorado para refletir estado real do backend)
  const [favoritado, setFavoritado] = useState(false)

  // 3. função de mutação para favoritar/desfavoritar o instrutor, com invalidation da query para atualizar a lista de instrutores
  const mutation = useMutation({
    mutationFn: favoritarInstrutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instrutores"] })
      setFavoritado(prev => !prev)
    },
  })

  // 4. formatação do preço para exibição
  const precoFormatado = `R$ ${instrutor.preco.toFixed(2)}`

  // 5. função para lidar com clique no botão de agendamento, redirecionando para a página de agendamento ou login se não autenticado
  function handleAgendar() {
    if (!usuario) { navigate("/login"); return }
    navigate(`/agendar/${instrutor.id}`)
  }

  // 6. definição do variant final do card com base na disponibilidade e no prop recebido
  const variantFinal = variant ?? (disponivel ? "disponivel" : "padrao")

  // 7. renderização do card com informações do instrutor, botões de ação e indicadores de status
  return (
    <article className={cardVariants({ variant: variantFinal })}>
      {/* Imagem do Instrutor */}
      <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0">
        <img
          src={foto}
          alt={`Foto de perfil de ${nome}`}
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute top-3 right-3 bg-brand-primary/40 hover:bg-brand-primary/60 p-2 rounded-full text-white transition-colors"
          aria-label="Favoritar"
        >
          <svg xmlns="http://www.w3.org/Infinity" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1 pl-8">
        {/* Cabeçalho do Card */}
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-[22px] font-semibold text-brand-neutral tracking-tight">{nome}</h3>
              <Badge variant={disponivel ? "disponivel" : "ocupado"}>
                {disponivel ? 'DISPONÍVEL' : 'INDISPONÍVEL'}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 font-medium">{cidade}</p>
          </div>

          <div className="text-left md:text-right mt-1 md:mt-0">
            <p className="text-2xl font-bold text-brand-neutral tracking-tight">
              R$ {preco.toFixed(2)}<span className="text-sm font-medium text-gray-500 ml-1">/hora</span>
            </p>
          </div>
        </div>

        {/* Informações detalhadas */}
        <div className="mt-8 flex items-center gap-4">
            <div className="bg-gray-50 rounded px-4 py-3 flex-1 flex flex-col gap-1 border border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Especialidade</span>
                <span className="text-[13px] font-semibold text-brand-neutral">
                  {especialidade}
                </span>
            </div>
            <div className="bg-gray-50 rounded px-4 py-3 flex-1 flex flex-col gap-1 border border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Tipo de Veículo</span>
                <span className="text-[13px] font-semibold text-brand-neutral">
                  Carro Passeio
                </span>
            </div>
            <div className="bg-gray-50 rounded px-4 py-3 flex-1 flex flex-col gap-1 border border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Habilitação</span>
                <span className="text-[13px] font-semibold text-brand-neutral">
                  Categoria B
                </span>
            </div>
        </div>

        {/* Linha separadora */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
           <div className="flex gap-10">
               <div>
                  <p className="text-[15px] font-bold text-brand-neutral flex items-center gap-1">
                      100%
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Aprovação</p>
               </div>
               <div>
                  <p className="text-[15px] font-bold text-brand-neutral flex items-center gap-1">
                      +500
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Alunos formados</p>
               </div>
               <div>
                  <p className="text-[15px] font-bold text-brand-neutral flex items-center gap-1">
                      5.0
                      <span className="text-yellow-400">★</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Avaliação</p>
               </div>
           </div>

          <Link
           to={`/agendar/${id}`}
            className="
              text-sm font-bold text-brand-primary bg-white border border-brand-primary/20 
              py-2.5 px-6 rounded-lg hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-200
              shadow-sm hover:shadow active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2
            "
            aria-label={`Ver detalhes de ${nome}`}
          >
            Agendar
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CardInstrutor

// function somar(a, b) {
    //  return a + b
    // cadastroUsuario()
    // enviarEmail()
// }