import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../libs/queryKeys";
import { criarAgendamento, type DadosAgendamento } from "../services/api";

interface UseAgendamentoOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useAgendamento({
    onSuccess,
    onError
} : UseAgendamentoOptions = {}) {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, isSuccess, error } = useMutation({
        mutationFn: criarAgendamento,
        onSuccess: () => {
            // Invalida as queries relacionadas a agendamentos e instrutores para garantir que os dados sejam atualizados
            queryClient.invalidateQueries({ queryKey: [queryKeys.agendamentos.all] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.instrutores.all] });
            onSuccess?.();
        },
        onError: (err: Error) => {
            onError?.(err);
        },
    })

    function agendar(dados: DadosAgendamento) {
        mutate(dados);
    }

    return { agendar, isPending, isError, isSuccess, error };
}