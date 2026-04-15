import { cva, type VariantProps } from 'class-variance-authority'
import type { Instrutor } from '../../types'
import Badge from '../ui/Badges'
import { Link } from 'react-router-dom';

const cardVariants = cva(
  [
    "bg-white rounded-xl border border-gray-200 overflow-hidden",
    "flex flex-col md:flex-row shadow-sm",
    "transition-all duration-200 hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        padrao:     "",
        disponivel: "",
        destaque:   "border-gray-300",
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
  const { id, nome, cidade, especialidade, preco, disponibilidade, foto } = instrutor
  const variantFinal = variant ?? (disponibilidade ? "disponivel" : "padrao")

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
          className="absolute top-3 right-3 bg-gray-900/40 hover:bg-gray-900/60 p-2 rounded-full text-white transition-colors"
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
              <h3 className="text-[22px] font-semibold text-gray-900 tracking-tight">{nome}</h3>
              <Badge variant={disponibilidade ? "disponivel" : "ocupado"}>
                {disponibilidade ? 'DISPONÍVEL' : 'INDISPONÍVEL'}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 font-medium">{cidade}</p>
          </div>

          <div className="text-left md:text-right mt-1 md:mt-0">
            <p className="text-2xl font-bold text-gray-900 tracking-tight">
              R$ {preco.toFixed(2)}<span className="text-sm font-medium text-gray-500 ml-1">/hora</span>
            </p>
          </div>
        </div>

        {/* Informações detalhadas */}
        <div className="mt-8 flex items-center gap-4">
            <div className="bg-gray-50 rounded px-4 py-3 flex-1 flex flex-col gap-1 border border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Especialidade</span>
                <span className="text-[13px] font-semibold text-gray-900">
                  {especialidade}
                </span>
            </div>
            <div className="bg-gray-50 rounded px-4 py-3 flex-1 flex flex-col gap-1 border border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Tipo de Veículo</span>
                <span className="text-[13px] font-semibold text-gray-900">
                  Carro Passeio
                </span>
            </div>
            <div className="bg-gray-50 rounded px-4 py-3 flex-1 flex flex-col gap-1 border border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Habilitação</span>
                <span className="text-[13px] font-semibold text-gray-900">
                  Categoria B
                </span>
            </div>
        </div>

        {/* Linha separadora */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
           <div className="flex gap-10">
               <div>
                  <p className="text-[15px] font-bold text-gray-900 flex items-center gap-1">
                      100%
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Aprovação</p>
               </div>
               <div>
                  <p className="text-[15px] font-bold text-gray-900 flex items-center gap-1">
                      +500
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Alunos formados</p>
               </div>
               <div>
                  <p className="text-[15px] font-bold text-gray-900 flex items-center gap-1">
                      5.0
                      <span className="text-yellow-400">★</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Avaliação</p>
               </div>
           </div>

          <Link
           to={`/instrutores/${id}`}
            className="
              text-sm font-semibold text-gray-900 bg-white border-2 border-gray-900 
              py-2 px-6 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200
            "
            aria-label={`Ver detalhes de ${nome}`}
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CardInstrutor