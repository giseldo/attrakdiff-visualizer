import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-gray-100"
      role="main"
      aria-label="Página não encontrada"
    >
      <div className="text-center max-w-md p-8 rounded-lg shadow bg-white border border-gray-200">
        <h1
          className="text-5xl font-extrabold mb-4 text-blue-900"
          tabIndex={0}
          aria-label="Erro 404"
        >
          404
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          Oops! Página não encontrada
        </p>
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-700 px-4 py-2 rounded"
          aria-label="Voltar para a página inicial"
        >
          Voltar para o início
        </a>
      </div>
    </main>
  );
};

export default NotFound;
