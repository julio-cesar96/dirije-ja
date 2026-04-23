import { z } from 'zod'

export const agendamentoSchema = z.object({
  nome: z.string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter ao menos 3 caracteres")
    .max(100, "Nome muito longo"),

  telefone: z.string()
    .min(1, "Telefone é obrigatório")
    .min(10, "Telefone inválido"),

  data: z.string()
    .min(1, "Data é obrigatória")
    .refine((valor) => {
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      return new Date(valor) > hoje
    }, "A data deve ser a partir de amanhã"),

  horario: z.string()
    .min(1, "Horário é obrigatório"),

  observacoes: z.string().max(500, "Máximo 500 caracteres").optional(),
})

// Tipo inferido automaticamente — sem interface duplicada
export type AgendamentoSchema = z.infer<typeof agendamentoSchema>






/* 
Exemplos de uso de validação com Zod.
O esquema define as regras de validação e as mensagens de erro.
A inferência de tipo gera um tipo TypeScript a partir do esquema, garantindo que o código esteja sempre alinhado com as regras de validação.

export const agendamentoSchema = z.object({
  // String simples com mensagem customizada
  nome: z.string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter ao menos 3 caracteres"),

  // String com regex
  telefone: z.string()
    .min(1, "Telefone é obrigatório")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (11) 99999-9999"),

  // Data futura com refine — lógica customizada
  data: z.string()
    .min(1, "Data é obrigatória")
    .refine(
      (valor) => {
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        return new Date(valor) > hoje
      },
      "A data deve ser a partir de amanhã"
    ),

  // Campo opcional
  observacoes: z.string().optional(),
}) /*

// Inferência de tipo — não precisa de interface manual
// O TypeScript sabe exatamente o formato dos dados válidos
//type AgendamentoSchema = z.infer<typeof agendamentoSchema>
//   ↑ equivale a:
//   { nome: string, telefone: string, data: string, observacoes?: string }


// refine valida um campo isolado
// superRefine valida a relação ENTRE campos

/*
const agendamentoSchema = z.object({
  data: z.string().min(1),
  horario: z.string().min(1),
}).superRefine((dados, ctx) => {
  // Valida que data + horário não esteja no passado
  const dataHora = new Date(`${dados.data}T${dados.horario}`)
  if (dataHora <= new Date()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["horario"],  // o erro aparece no campo horário
      message: "Este horário já passou para o dia selecionado",
    })
  }
}) */