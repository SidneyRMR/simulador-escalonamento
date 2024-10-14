'use client'
import React, { useState } from "react";
import "./Escalonador.css";
import { useEscalonador } from "./hooks/useEscalonador";
import ProcessTable from "./components/ProcessTable";
import TabelaResultados from "./components/TabelaResultados";
import GanttChart from "./components/GanttChart";
import { FaPlay, FaTable, FaChartBar, FaClipboardList, FaInfoCircle } from "react-icons/fa"; // Adicione o ícone de info
import ExplicacaoResultados from "./components/ExplicacaoResultados";
import AlgoritmoEscalonamento from "./components/AlgoritmoEscalonamento";
import BotaoOperacoes from "./components/BotoesOperacoes";

const Escalonador = () => {
  const {
    processos,
    tempoAtual,
    ganttChart,
    mensagens,
    criarProcessosAleatorios,
    adicionarProcesso,
    removerProcesso,
    iniciarEscalonamentoCircular,
    iniciarEscalonamentoSJF,
    iniciarEscalonamentoFIFO,
    emExecucao,
    atualizarCampo,
    estadoExecucao,
    limparProcessos // Função para limpar os processos
  } = useEscalonador();

  const [abaAtiva, setAbaAtiva] = useState("processos"); // Estado para controlar a aba ativa

  const renderizarConteudo = () => {
    switch (abaAtiva) {
      case "processos":
        return (
          <>
            <BotaoOperacoes
              criarProcessosAleatorios={criarProcessosAleatorios}
              adicionarProcesso={adicionarProcesso}
              limparProcessos={limparProcessos}
              emExecucao={emExecucao}
              processos={processos}
            />
            <div className="explicacao-tabela bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-blue-950">Sobre a Tabela de Processos</h3>
              <p className="text-gray-600">
                A tabela abaixo exibe todos os processos que foram adicionados ao simulador.
                Você pode editar informações como o tempo de execução e a prioridade diretamente
                na tabela, além de remover processos. Cada linha representa um processo,
                e as colunas indicam os atributos do processo, como o tempo de execução e o tempo de chegada.
              </p>
            </div>
            <ProcessTable
              estadoExecucao={estadoExecucao}
              processos={processos}
              removerProcesso={removerProcesso}
              emExecucao={emExecucao}
              atualizarCampo={atualizarCampo}
            />
          </>
        );
      case "gantt":
        return (
          <>
            <AlgoritmoEscalonamento
              iniciarEscalonamentoCircular={iniciarEscalonamentoCircular}
              iniciarEscalonamentoSJF={iniciarEscalonamentoSJF}
              iniciarEscalonamentoFIFO={iniciarEscalonamentoFIFO}
              emExecucao={emExecucao}
            />
            <GanttChart ganttChart={ganttChart} processos={processos} tempoAtual={tempoAtual} />
          </>
        );
      case "resultados":
        return (
          <>
            <AlgoritmoEscalonamento
              iniciarEscalonamentoCircular={iniciarEscalonamentoCircular}
              iniciarEscalonamentoSJF={iniciarEscalonamentoSJF}
              iniciarEscalonamentoFIFO={iniciarEscalonamentoFIFO}
              emExecucao={emExecucao}
            />
            <div className="border border-gray-300 rounded-lg p-4 mt-2">
              <TabelaResultados resultados={mensagens} />
            </div>
          </>
        );
      case "explicacao":
        return (
          <div className="border border-gray-300 rounded-lg p-4 mt-2">
          <ExplicacaoResultados />
        </div>
        );
      default:
        return null;
    }
  };

  const mensagemInformativa = () => {
    switch (abaAtiva) {
      case "processos":
        return (
          "Nesta aba, você pode visualizar e editar a tabela de processos, bem como adicionar novos processos. " +
          "Cada processo é representado por uma linha na tabela, onde você pode definir parâmetros como o tempo de chegada e o " +
          "tempo de execução. " +
          "Além disso, é possível remover processos indesejados. " +
          "Certifique-se de preencher todos os campos obrigatórios antes de iniciar o escalonamento."
        );
  
      case "gantt":
        return (
          "Aqui, você pode visualizar o gráfico de Gantt, que ilustra a execução dos processos ao longo do tempo. " +
          "O gráfico fornece uma representação visual do agendamento, permitindo que você veja como os processos " +
          "são escalonados e a ordem em que são executados. " +
          "As barras coloridas representam cada processo, e sua largura reflete o tempo de execução. " +
          "Você pode usar essa visualização para entender melhor o comportamento do sistema sob diferentes " +
          "algoritmos de escalonamento."
        );
  
      case "resultados":
        return (
          "Na aba de resultados, você pode ver os resultados da simulação, incluindo o tempo médio de espera, " +
          "o tempo de turnaround e outros parâmetros relevantes para a análise do desempenho do escalonamento. " +
          "Esses resultados são essenciais para avaliar a eficiência do algoritmo escolhido. " +
          "Certifique-se de revisar os dados apresentados, pois eles ajudam a identificar áreas de melhoria no " +
          "desempenho dos processos."
        );
  
      case "explicacao":
        return (
          "Nesta aba, você encontrará uma explicação detalhada dos resultados e as fórmulas utilizadas para " +
          "calcular cada um dos parâmetros apresentados. " +
          "Entender essas fórmulas é fundamental para interpretar os resultados da simulação e realizar ajustes " +
          "nos processos ou no algoritmo de escalonamento. " +
          "Considere a importância de cada parâmetro na performance do sistema ao realizar suas análises."
        );
  
      default:
        return "";
    }
  };
  

  return (
    <div className="container mx-auto px-4">
      <div className="card shadow-lg rounded-lg bg-white p-6">
        <h2 className="text-center font-bold text-3xl text-blue-950 mt-3 mb-4">
          Simulador de Escalonamento de Processos
        </h2>
        <p className="text-center text-gray-600 m-4">
          Uma ferramenta para simular o escalonamento de processos de forma interativa.
        </p>
        <div className="h-1 w-full bg-blue-950 rounded-full mb-4"></div>

        {processos.length === 0 && (
          <>
            <div className="boas-vindas text-center p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl text-blue-950 mb-2">Bem-vindo ao Simulador de Escalonamento!</h3>
              <p className="text-gray-600">
                Utilize os botões acima para adicionar processos ou criar processos aleatórios.
                Em seguida, escolha o algoritmo de escalonamento para visualizar a execução.
              </p>
              <p className="text-gray-600 mt-2">
                O gráfico de Gantt exibirá a execução dos processos em tempo real, e você poderá ver
                os resultados ao final da simulação.
              </p>
            </div>
            <BotaoOperacoes
              criarProcessosAleatorios={criarProcessosAleatorios}
              adicionarProcesso={adicionarProcesso}
              limparProcessos={limparProcessos}
              emExecucao={emExecucao}
              processos={processos}
            />
          </>
        )}

        {processos.length > 0 && (
          <>
            {/* Abas de navegação */}
            <div className="flex justify-center border-b border-gray-300 mb-4">
              <button
                className={`flex items-center py-2 px-4 transition-colors duration-300 ease-in-out ${abaAtiva === "processos" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"} rounded-tl-lg rounded-tr-lg`}
                onClick={() => setAbaAtiva("processos")}
              >
                <FaTable className="mr-2" /> Tabela de Processos
              </button>
              <button
                className={`flex items-center py-2 px-4 transition-colors duration-300 ease-in-out ${abaAtiva === "gantt" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"} rounded-tl-lg rounded-tr-lg`}
                onClick={() => setAbaAtiva("gantt")}
              >
                <FaChartBar className="mr-2" /> Gráfico de Gantt
              </button>
              <button
                className={`flex items-center py-2 px-4 transition-colors duration-300 ease-in-out ${abaAtiva === "resultados" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"} rounded-tl-lg rounded-tr-lg`}
                onClick={() => setAbaAtiva("resultados")}
              >
                <FaClipboardList className="mr-2" /> Resultados
              </button>
              <button
                className={`flex items-center py-2 px-4 transition-colors duration-300 ease-in-out ${abaAtiva === "explicacao" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"} rounded-tl-lg rounded-tr-lg`}
                onClick={() => setAbaAtiva("explicacao")}
              >
                <FaInfoCircle className="mr-2" /> Explicação dos Resultados
              </button>
            </div>

            {/* Mensagem informativa sobre a aba ativa */}
            <div className="bg-yellow-100 p-3 rounded-lg mb-4">
              <p className="text-gray-700 text-center">{mensagemInformativa()}</p>
            </div>

            {renderizarConteudo()}
          </>
        )}
      </div>
    </div>
  );
};

export default Escalonador;
