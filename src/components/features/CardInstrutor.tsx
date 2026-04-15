import { cva, type VariantProps } from 'class-variance-authority'
import type { Instrutor } from '../../types'
import Badge from '../ui/Badges'
import { Link } from 'react-router-dom';

const cardVariants = cva(
  [
    "bg-white rounded-2xl p-6",
    "flex flex-col gap-4",
    "transition-all duration-200",
    "focus-within:ring-2 focus-within:ring-brand-yellow focus-within:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        padrao:     "border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1",
        disponivel: "border-2 border-green-400 shadow-md shadow-green-50 hover:shadow-green-200 hover:-translate-y-1",
        destaque:   "border-2 border-brand-yellow shadow-md shadow-yellow-50 hover:shadow-yellow-200 hover:-translate-y-1",
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

      <img
        src={foto}
        alt={`Foto de perfil de ${nome}`}
        className="w-20 h-20 rounded-full object-cover border-4 border-brand-yellow self-center"
      />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-brand-purple">{nome}</h3>
        <p className="text-sm text-gray-500">
          <span aria-hidden="true">📍 </span>
          {cidade}
        </p>
        <p className="text-sm text-gray-600 italic">{especialidade}</p>
      </div>

      <p className="text-2xl font-bold text-brand-purple">
        R$ {preco.toFixed(2)}
        <span className="text-sm font-normal text-gray-400">/hora</span>
      </p>

      {/* Badge usando o componente do /ui */}
      {disponibilidade
        ? <Badge variant="disponivel">✅ Disponível hoje</Badge>
        : <Badge variant="ocupado">🔴 Indisponível</Badge>
      }

      <Link
       to={`/instrutores/${id}`}
        className="
          mt-auto bg-brand-purple text-white
          font-semibold py-2 px-4 rounded-xl
          hover:bg-purple-800 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
        "
        aria-label={`Ver perfil de ${nome}`}
      >
        Ver perfil
      </Link>


    </article>
  )
}

export default CardInstrutor