import { cva, type VariantProps } from 'class-variance-authority'

// ── Variantes do Badge ────────────────────────────────────────────────
const badgeVariants = cva(
  // Classes base — presentes em todas as variantes
  "inline-flex items-center justify-center text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase",
  {
    variants: {
      variant: {
        disponivel: "bg-gray-500 text-white",
        ocupado:    "bg-gray-200 text-gray-500",
        destaque:   "bg-gray-800 text-white",
        novo:       "bg-gray-100 text-gray-800",
      },
    },
    defaultVariants: {
      variant: "disponivel",
    },
  }
)

// ── Props ─────────────────────────────────────────────────────────────
interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  className?: string
}

// ── Componente ────────────────────────────────────────────────────────
function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={badgeVariants({ variant, className })}
      role="status"
    >
      {children}
    </span>
  )
}

export default Badge

// ── Uso ───────────────────────────────────────────────────────────────
// <Badge variant="disponivel">✅ Disponível hoje</Badge>
// <Badge variant="ocupado">🔴 Indisponível</Badge>
// <Badge variant="destaque">⭐ Em destaque</Badge>
// <Badge variant="novo">🆕 Novo</Badge>