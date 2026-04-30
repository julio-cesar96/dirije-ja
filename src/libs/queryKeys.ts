// Single source of truth - ponto único para as chaves de consulta usadas em toda a aplicação 
// Se o endpoint de instrutores mudar, basta atualizar aqui e todas as consultas que usam essas chaves serão atualizadas automaticamente

export const queryKeys = {
  instrutores: {
    all:    ["instrutores"]              as const,
    detail: (id: string) => ["instrutores", id] as const,
  },
  agendamentos: {
    all:    ["agendamentos"]             as const,
    byUser: (userId: string) => ["agendamentos", "user", userId] as const,
  },
  favoritos: {
    all:    ["favoritos"]                as const,
  },
} as const