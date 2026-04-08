// Interface para as props do Instrutor, definindo os tipos de cada propriedade.
export interface Instrutor {
    id: string | number;
    nome: string;
    cidade: string;
    especialidade: string;
    preco: number;
    disponibilidade: boolean;
    foto: string;
}

export type RascunhoInstrutor = Partial<Instrutor>
export type InstrutorResumido = Pick<Instrutor, "id" | "nome" | "cidade" | "disponibilidade" | "foto">;
export type InstrutorSemId = Omit<Instrutor, "id">;

// Interface das props dos filtros
export interface FiltrosInstrutor { 
    busca: string;
    cidade: string;
}

export interface BarraFiltrosProps {
    busca: string;
    cidade: string;
    instrutores: Instrutor[];
    onBuscaChange: (valor: string) => void;
    onCidadeChange: (valor: string) => void;
    onLimpar?: () => void;
}

export interface ListaInstrutoresProps {
    instrutores: Instrutor[];
}

export interface HeaderProps {
    totalDisponiveis: number;
}

export interface CardInstrutorProps {
    instrutor: Instrutor;
    onVerPerfil?: (id: string | number) => void;
}


export type StatusFiltro = "todos" | "disponiveis" | "indisponiveis";



