
import type { FallbackProps } from 'react-error-boundary'

/*
  FallbackProps vem da lib react-error-boundary.
  Ela injeta automaticamente:
  - error: o erro que foi capturado
  - resetErrorBoundary: função para tentar novamente
*/
function ErroFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center px-4"
      role="alert"   // ← aria: anuncia ao leitor de tela como alerta
    >
      <p className="text-5xl">😕</p>

      <h2 className="text-xl font-bold text-brand-purple">
        Algo deu errado
      </h2>

      <p className="text-gray-500 text-sm max-w-md">
        {error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado. Tente novamente."}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="
          bg-brand-purple text-white font-semibold
          py-2 px-6 rounded-xl
          hover:bg-purple-800 transition-colors
          focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
        "
      >
        Tentar novamente
      </button>
    </div>
  )
}

export default ErroFallback