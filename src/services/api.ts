import type { Instrutor } from "../types"

const BASE_URL = "http://localhost:3000"

// Função auxiliar — lida com erros de HTTP de forma consistente
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    // Lança um erro com a mensagem do servidor se disponível
    let erro: { message?: string } = { message: "Erro desconhecido" }

    try {
      erro = await res.json()
    } catch {
      erro = { message: "Erro desconhecido" }
    }

    throw new Error(erro.message ?? `Erro HTTP ${res.status}`)
  }

  return res.json()
}

// ── Instrutores ───────────────────────────────────────────────────────

export async function buscarInstrutores(): Promise<Instrutor[]> {
  return apiFetch<Instrutor[]>("/instrutores")
}

export async function buscarInstrutor(id: string): Promise<Instrutor> {
  return apiFetch<Instrutor>(`/instrutores/${id}`)
}

// ── Agendamentos ──────────────────────────────────────────────────────

export interface DadosAgendamento {
  instrutorId: string
  nome: string
  telefone: string
  data: string
  horario: string
  observacoes?: string
}

export interface Agendamento extends DadosAgendamento {
  id: string
  criadoEm: string
}

export async function criarAgendamento(dados: DadosAgendamento): Promise<Agendamento> {
  return apiFetch<Agendamento>("/agendamentos", {
    method: "POST",
    body: JSON.stringify(dados),
  })
}

export async function buscarAgendamentos(): Promise<Agendamento[]> {
  return apiFetch<Agendamento[]>("/agendamentos")
}

// ── Favoritos ─────────────────────────────────────────────────────────

export async function favoritarInstrutor(id: string): Promise<void> {
  return apiFetch(`/favoritos/${id}`, { method: "POST" })
}

export async function desfavoritarInstrutor(id: string): Promise<void> {
  return apiFetch(`/favoritos/${id}`, { method: "DELETE" })
}

// Anatomia do React Query:
// - useQuery: para buscar dados (GET)
/*
const {
  data -> os dados retornados pela query (ou undefined se ainda estiver carregando)
  isLoading -> boolean que indica se a query está carregando pela primeira vez (sem dados em cache)
  ifFetching -> boolean que indica se a query está buscando dados (pode ser true mesmo com dados em cache)
  isError -> boolean que indica se a query falhou
  error -> o erro retornado pela query (ou null se não houve erro)
  refetch -> função para refazer a query manualmente
} = useQuery({
  queryKey: ["instrutores"], // chave única para identificar a query (pode ser string ou array)
  queryFn: buscarInstrutores, // função que retorna uma Promise com os dados
  staleTime: 1000 * 60, // 1 minuto (opcional) - tempo que os dados ficam frescos (sem refetch automático)
  enabled: true, // boolean (opcional) - se false, a query não roda automaticamente
});
*/
// - useMutation: para criar/atualizar/excluir dados (POST/PUT/DELETE)
