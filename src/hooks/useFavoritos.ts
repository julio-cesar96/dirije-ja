import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../libs/queryKeys";
import { buscarFavoritos, desfavoritarInstrutor, favoritarInstrutor } from "../services/api";


export function useFavoritos(instrutorId: string) {
    const queryClient = useQueryClient();
    
    // busca lista de instrutores favoritos do usuário
    const { data: favoritos = [] } = useQuery({
        queryKey: queryKeys.favoritos.all,
        queryFn: buscarFavoritos
    });

    // derivar o estado de favoritos a partir da lista de favoritos do usuário
    // não precisamos de um useState separado para isFavoritado, pois ele pode ser calculado diretamente a partir dos dados da query
    const isFavoritado = favoritos.includes(instrutorId);

    const mutation = useMutation({
        mutationFn: () => 
            isFavoritado
                ? desfavoritarInstrutor(instrutorId)
                : favoritarInstrutor(instrutorId),
        onMutate: async () => {
            // Optimistic update: atualizar o cache de favoritos imediatamente para refletir a ação do usuário, sem esperar a resposta do servidor
            await queryClient.cancelQueries({ queryKey: queryKeys.favoritos.all });
            const anterior = queryClient.getQueryData<string[]>(queryKeys.favoritos.all) || [];
            queryClient.setQueryData<string[]>(
                queryKeys.favoritos.all,
                prev => isFavoritado
                    ? (prev ?? []).filter(id => id !== instrutorId) // remover do favoritos
                    : [...(prev ?? []), instrutorId] // adicionar ao favoritos
            );
            return { anterior }; // retornar o estado anterior para possível rollback em caso de erro
        },
        onError: (_err, _vars, context) => {
            // Rollback: se a mutação falhar, restaurar o estado anterior do cache
            if (context?.anterior) {
                queryClient.setQueryData<string[]>(queryKeys.favoritos.all, context.anterior);
            }
        },
        onSettled: () => {
            // Reavalidar a query de favoritos para garantir que o cache esteja sincronizado com o servidor, mesmo que a mutação tenha sido otimista
            queryClient.invalidateQueries({ queryKey: queryKeys.favoritos.all });
        },
    })

    return {
        isFavoritado,
        favoritar: mutation.mutate,
        desfavoritar: mutation.isPending ? null : mutation.mutate, // desabilitar a ação de desfavoritar enquanto a mutação estiver pendente para evitar múltiplas requisições simultâneas
    }
}