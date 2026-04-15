import { Link, useLocation } from "react-router-dom";

function Error() {
// useLocation dá acesso à URL atual
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-8xl">🚗💨</p>

      <h1 className="text-4xl font-bold text-brand-purple">
        Página não encontrada
      </h1>

      <p className="text-gray-500 max-w-md">
        A URL{" "}
        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
          {location.pathname}
        </code>{" "}
        não existe na plataforma.
      </p>

      <Link
        to="/"
        className="
          bg-brand-purple text-white font-semibold
          py-3 px-8 rounded-xl
          hover:bg-purple-800 transition-colors
          focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
        "
      >
        Voltar para a home
      </Link>
    </div>
  )
}

export default Error;