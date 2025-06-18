import React, { useState } from "react";
import AttrakDiffForm from "../components/AttrakDiffForm";
import AttrakDiffChart from "../components/AttrakDiffChart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ATTRAKDIFF_QUESTIONS, ATTRAKDIFF_QUESTIONS_SHORT } from "../lib/attrakdiff";
import Papa from "papaparse";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Upload, Download, UserPlus, BarChart2, Shuffle, Send } from "lucide-react";

interface ResultEntry {
  answers: number[];
  questions: typeof ATTRAKDIFF_QUESTIONS;
  label?: string;
}

type Questionnaire = typeof ATTRAKDIFF_QUESTIONS | typeof ATTRAKDIFF_QUESTIONS_SHORT;

export default function AttrakDiffSurvey() {
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [questions, setQuestions] = useState<Questionnaire>(ATTRAKDIFF_QUESTIONS);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'respostas' | 'import'>('respostas');

  const navigate = useNavigate();

  // Gera CSV de exemplo conforme o questionário atual
  const handleDownloadExample = () => {
    const headers = ["nome", ...questions.map(q => q.label)];
    const values = ["Maria", ...Array(questions.length).fill(4)];
    const csv = Papa.unparse({ fields: headers, data: [values] });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "attrakdiff_exemplo.csv";
    a.click();
  };

  // Trata upload de CSV com respostas múltiplas
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: function(results_: any) {
        try {
          const data: string[][] = results_.data;
          if (!data.length) throw new Error("CSV vazio.");
          // Cabeçalho
          const header = data[0];
          const colCount = questions.length + 1; // +1 for label
          if (header.length !== colCount)
            throw new Error(`O arquivo precisa ter ${colCount} colunas (nome + respostas das perguntas na ordem).`);

          const responses: ResultEntry[] = [];
          for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (row.length < colCount) continue; // ignora linhas incompletas
            const label = row[0];
            const answers = row.slice(1).map(v => Number(v));
            if (answers.some(val => isNaN(val) || val < 1 || val > 7)) {
              throw new Error(`Linha ${i + 1}: Todas as respostas precisam ser números de 1 a 7.`);
            }
            responses.push({ answers, label, questions });
          }
          if (!responses.length) throw new Error("Nenhuma resposta válida encontrada no CSV.");
          setResults(responses);
          setSelectedIdx(0);
        } catch (err: any) {
          setCsvError(err.message || "Erro ao processar o CSV.");
        }
      },
      error: function(error) {
        setCsvError("Falha ao ler o arquivo CSV.");
      }
    });
    // reset input
    (e.target as HTMLInputElement).value = "";
  };

  // Função para calcular a média das respostas
  function getAverageAnswers(results: { answers: number[] }[], questions: any[]) {
    if (results.length === 0) return [];
    const numQuestions = questions.length;
    const sum = Array(numQuestions).fill(0);
    results.forEach(r => {
      r.answers.forEach((val, idx) => {
        sum[idx] += val;
      });
    });
    return sum.map(total => total / results.length);
  }

  // Renderiza seleção de tabs para múltiplos respondentes do CSV
  const renderTabs = () => (
    <div className="flex space-x-2 mb-4 overflow-x-auto">
      {results.map((item, idx) => (
        <Button
          key={idx}
          variant={selectedIdx === idx ? "default" : "outline"}
          size="sm"
          className="min-w-[80px]"
          onClick={() => setSelectedIdx(idx)}
        >
          {item.label || `Pessoa ${idx + 1}`}
        </Button>
      ))}
      {results.length > 1 && (
        <Button
          key="todos"
          variant={selectedIdx === -2 ? "default" : "outline"}
          size="sm"
          className="min-w-[80px]"
          onClick={() => setSelectedIdx(-2)}
        >
          Todos
        </Button>
      )}
    </div>
  );

  // Troca entre versão completa/resumida para download e upload
  const handleQuestionnaireSwitch = (type: "completo" | "resumido") => {
    setQuestions(type === "completo" ? ATTRAKDIFF_QUESTIONS : ATTRAKDIFF_QUESTIONS_SHORT);
    setResults([]);
    setSelectedIdx(0);
    setCsvError(null);
  };

  // Função para gerar respostas aleatórias
  const handleAddRandom = () => {
    const randomAnswers = questions.map(() => Math.floor(Math.random() * 7) + 1);
    setResults([...results, { answers: randomAnswers, questions }]);
    setSelectedIdx(results.length); // seleciona a nova pessoa
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-5xl px-6">
        <Button variant="outline" size="sm" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 " + (activeTab === 'respostas' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground') + " h-9 rounded-md px-3"}
            onClick={() => setActiveTab('respostas')}
          >
            Home
          </button>
          <button
            className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 " + (activeTab === 'import' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground') + " h-9 rounded-md px-3"}
            onClick={() => setActiveTab('import')}
          >
            Importação/Exportação
          </button>
        </div>
        <div className="border-b border-gray-300 mb-6 w-full"></div>

        {/* Botão para responder como outra pessoa no topo */}
        {activeTab === 'respostas' && results.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => setSelectedIdx(-1)}
            icon={<UserPlus />}
          >
            Responder como outra pessoa
          </Button>
        )}

        {/* Conteúdo das abas */}
        {activeTab === 'import' ? (
          <>
            {/* Seleção do tipo de questionário para download/Upload */}
            <div className="mb-4 flex items-center gap-3">
              <span className="font-medium">Versão do questionário:</span>
              <RadioGroup
                value={questions === ATTRAKDIFF_QUESTIONS ? "completo" : "resumido"}
                onValueChange={v => handleQuestionnaireSwitch(v as "completo" | "resumido")}
                className="flex flex-row gap-2"
              >
                <label className="flex items-center gap-1 cursor-pointer">
                  <RadioGroupItem value="completo" />
                  <span>Completo</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <RadioGroupItem value="resumido" />
                  <span>Resumido</span>
                </label>
              </RadioGroup>
            </div>

            <div className="flex flex-wrap gap-3 items-center mb-8">
              <label className="font-medium">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <Button asChild variant="outline" size="sm" icon={<Upload />}>
                  <span role="button" tabIndex={0} className="cursor-pointer">Importar respostas CSV</span>
                </Button>
              </label>
              <Button variant="outline" size="sm" onClick={handleDownloadExample} icon={<Download />}>
                Baixar exemplo CSV
              </Button>
              <Button
                variant="default"
                size="sm"
                className="ml-2"
                disabled={results.length === 0}
                onClick={() => setActiveTab('respostas')}
                icon={<BarChart2 />}
              >
                Carregar e ir para os gráficos
              </Button>
            </div>
            {csvError && (
              <div className="text-red-700 text-sm mb-4 rounded bg-red-100 px-3 py-2">
                {csvError}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Botão para preencher com dados aleatórios */}
            <div className="flex justify-end mb-4">
              <Button
                variant="default"
                size="lg"
                className="shadow-md px-6 py-2 text-base font-semibold transition-transform duration-150 hover:scale-105 hover:shadow-lg"
                onClick={handleAddRandom}
                icon={<Shuffle />}
              >
                Preencher com dados aleatórios
              </Button>
            </div>
            {results.length > 0 ? (
              <>
                {renderTabs()}
                {selectedIdx >= 0 && (
                  <AttrakDiffChart
                    answers={results[selectedIdx].answers}
                    questions={questions}
                  />
                )}
                {selectedIdx === -2 && (
                  <AttrakDiffChart
                    answers={getAverageAnswers(results, questions)}
                    questions={questions}
                  />
                )}
                {selectedIdx === -1 && (
                  <AttrakDiffForm
                    onSubmit={(answers, questionsForm) => {
                      setResults([...results, { answers, questions: questionsForm }]);
                      setSelectedIdx(results.length); // seleciona a nova pessoa
                    }}
                  />
                )}
              </>
            ) : (
              <AttrakDiffForm
                onSubmit={(answers, questionsForm) => setResults([{ answers, questions: questionsForm }])}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
