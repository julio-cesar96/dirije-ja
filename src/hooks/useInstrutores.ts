import { useQuery } from '@tanstack/react-query';
import type { Instrutor } from '../types';
import { queryKeys } from '../libs/queryKeys';
import { buscarInstrutor, buscarInstrutores } from '../services/api';
import { useMemo } from 'react';
// Hook para buscar e gerenciar os instrutores

interface FiltroInstrutores {
    busca?: string;
    cidade?: string;
}

interface UseInstrutoresReturn {
    instrutores: Instrutor[];
    instrutoresFiltrados: Instrutor[];
    totalDisponiveis: number;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
} 

export function useInstrutores(filtros: FiltroInstrutores = {}): UseInstrutoresReturn {
    const { busca = '', cidade = '' } = filtros;

    const { data: instrutores = [], isLoading, isError, error } = useQuery<Instrutor[], Error>({
        queryKey: queryKeys.instrutores.all,
        queryFn: buscarInstrutores,
        throwOnError: true, // para que erros sejam capturados no isError e error
        staleTime: 5 * 60 * 1000, // 5 minutos
    });


    // logica de filtragem de instrutore é derivada, não é um estado separado, então usamos useMemo para calcular os instrutores filtrados com base nos instrutores originais e nos filtros aplicados. Isso evita cálculos desnecessários e mantém a performance da aplicação.
    const instrutoresFiltrados = useMemo(() => 
        instrutores.filter(i => {
            const buscaOk = !busca || i.nome.toLowerCase().includes(busca.toLowerCase());
            const cidadeOk = !cidade || i.cidade === cidade;
            return buscaOk && cidadeOk; 
        })
    , [instrutores, busca, cidade]);

    const totalDisponiveis = useMemo(
        () => instrutores.filter(i => i.disponivel).length,
        [instrutores]
    )

    return {
        instrutores,
        instrutoresFiltrados,
        totalDisponiveis,
        isLoading,
        isError,
        error,
    }
}

export function useInstrutor(id: string | undefined) {
    return useQuery<Instrutor, Error>({
        queryKey: queryKeys.instrutores.detail(id!),
        queryFn: () => buscarInstrutor(id!), // A função de consulta agora é uma função anônima que chama buscarInstrutor com o id fornecido. Isso garante que o id seja passado corretamente para a função de consulta, evitando erros de tipo e garantindo que a consulta funcione como esperado.
        throwOnError: true,
        enabled: !!id // somente se o id existir
    });
}