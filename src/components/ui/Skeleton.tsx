
function SkeletonCard() {
  return (
    /*
      animate-pulse = animação de pulso do Tailwind
      bg-gray-200 com rounded = formato do conteúdo real, sem dados
    */
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100"
      aria-hidden="true"  // ← esconde do leitor de tela — não é conteúdo real
    >
      {/* Foto */}
      <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse self-center" />

      {/* Nome */}
      <div className="h-5 bg-gray-200 animate-pulse rounded-lg w-3/4" />

      {/* Cidade */}
      <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-1/2" />

      {/* Especialidade */}
      <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-2/3" />

      {/* Preço */}
      <div className="h-8 bg-gray-200 animate-pulse rounded-lg w-1/3" />

      {/* Botão */}
      <div className="h-10 bg-gray-200 animate-pulse rounded-xl mt-auto" />
    </div>
  )
}

export default SkeletonCard