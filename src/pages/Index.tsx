import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <main
      className="min-h-screen bg-gradient-to-r from-white via-sky-50 to-blue-100 flex flex-col justify-center items-center px-6"
      role="main"
      aria-label="Página inicial do AttrakDiff Survey"
    >
      <header className="w-full max-w-4xl flex flex-col items-center mb-24 mt-12" role="banner">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700" tabIndex={0}>
          AttrakDiff Survey
        </h1>
        <div className="text-lg text-gray-700 font-medium mb-4 max-w-2xl text-center">
          Avalie a experiência de uso do seu produto ou serviço segundo o framework{' '}
          <a
            className="underline text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
            href="https://www.attrakdiff.de/index-en.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Acessar site oficial do AttrakDiff (abre em nova aba)"
          >
            AttrakDiff
          </a>.
        </div>
        <p className="text-gray-600 text-md max-w-xl text-center mb-2">
          O AttrakDiff é um método consagrado de avaliação de usabilidade e experiência, analisando os aspectos <b>pragmáticos</b> (funcionalidade, eficiência) e <b>hedônicos</b> (estímulo, identidade). Responda o questionário e visualize os resultados em gráficos automáticos.
        </p>
        <Button
          className="mt-8 px-8 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          onClick={() => navigate("/attrakdiff")}
          aria-label="Iniciar questionário AttrakDiff"
        >
          Iniciar Questionário
        </Button>
      </header>
      <footer className="mt-auto py-8 text-center w-full text-sm text-gray-500" role="contentinfo">
        <span>Feito com <span aria-label="amor" role="img">❤️</span> usando React + shadcn + Lucide + Recharts</span>
        <br />
        <a
          href="https://www.attrakdiff.de/index-en.html"
          className="underline focus:outline-none focus:ring-2 focus:ring-blue-700"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Acessar site oficial do AttrakDiff (abre em nova aba)"
        >
          Site oficial / Saiba mais
        </a>
      </footer>
    </main>
  );
}
