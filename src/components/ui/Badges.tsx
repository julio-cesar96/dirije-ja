import { cva, type VariantProps } from 'class-variance-authority'

// ── Variantes do Badge ────────────────────────────────────────────────
const badgeVariants = cva(
  // Classes base — presentes em todas as variantes
  "inline-flex items-center justify-center text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase",
  {
    variants: {
      variant: {
        disponivel: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
        ocupado:    "bg-gray-50 text-gray-500 border border-gray-200",
        destaque:   "bg-brand-secondary/10 text-brand-secondary-hover border border-brand-secondary/20",
        novo:       "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
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