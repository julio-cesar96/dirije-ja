import { cva, type VariantProps } from 'class-variance-authority'

// ── Variantes do Badge ────────────────────────────────────────────────
const badgeVariants = cva(
  // Classes base — presentes em todas as variantes
  "inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full",
  {
    variants: {
      variant: {
        disponivel: "bg-green-100 text-green-700",
        ocupado:    "bg-gray-100 text-gray-600",
        destaque:   "bg-yellow-100 text-yellow-700",
        novo:       "bg-purple-100 text-purple-700",
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