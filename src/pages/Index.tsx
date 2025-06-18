import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <span className="text-2xl font-extrabold text-indigo-700 tracking-tight">
          AttrakDiff<span className="text-indigo-400">Visualizer</span>
        </span>
        <nav className="space-x-6">
          <a href="#features" className="text-indigo-700 font-medium hover:underline">Recursos</a>
          <a href="#about" className="text-indigo-700 font-medium hover:underline">Sobre</a>
          <button onClick={() => navigate('/attrakdiff')} className="bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-indigo-800 transition">Comece agora</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-700 via-indigo-400 to-blue-400 bg-clip-text text-transparent mb-6 animate-fade-in">
          Visualize resultados do AttrakDiff <br /> de forma <span className="underline decoration-wavy decoration-indigo-400">simples</span> e <span className="underline decoration-wavy decoration-blue-400">impactante</span>
        </h1>
        <p className="text-xl md:text-2xl text-indigo-900/80 mb-8 max-w-2xl animate-fade-in delay-100">
          Gere gráficos profissionais, compartilhe insights e impressione seu time com visualizações modernas e interativas.
        </p>
        <button
          onClick={() => navigate('/attrakdiff')}
          className="inline-block bg-gradient-to-r from-indigo-700 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition"
        >
          Experimente grátis
        </button>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white rounded-t-3xl shadow-lg mt-12">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z" /><path d="M12 12V4" /></svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Visualização Instantânea</h3>
            <p className="text-indigo-900/70">Transforme dados em gráficos prontos para apresentação em segundos.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Design Moderno</h3>
            <p className="text-indigo-900/70">Interface minimalista, responsiva e inspirada nas melhores ferramentas do mercado.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Compartilhamento Fácil</h3>
            <p className="text-indigo-900/70">Baixe, compartilhe ou incorpore seus gráficos em qualquer lugar.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-16 flex flex-col items-center bg-gradient-to-r from-indigo-700 to-blue-500 text-white mt-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pronto para transformar seus dados?</h2>
        <p className="mb-8 text-lg">Comece agora e veja a diferença!</p>
        <button
          onClick={() => navigate('/attrakdiff')}
          className="bg-white text-indigo-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-100 transition"
        >
          Criar minha visualização
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-indigo-900/60 text-sm">
        © {new Date().getFullYear()} AttrakDiff Visualizer. Feito com ♥ por sua equipe.
      </footer>
    </div>
  );
}
