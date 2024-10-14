"use client";
import React, { useState } from "react";
import "./Escalonador.css";
import { useEscalonador } from "./hooks/useEscalonador";
import ProcessTable from "./components/ProcessTable";
import TabelaResultados from "./components/TabelaResultados";
import GanttChart from "./components/GanttChart";
import { FaPlay } from "react-icons/fa";
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
            {/* <h2 className="text-center font-bold text-2xl text-blue-950 mt-3 mb-3">
              Resultados
            </h2> */}
            <TabelaResultados resultados={mensagens} />
            <ExplicacaoResultados />
          </div>
          </>
        );
      default:
        return null;
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
            {/* Explicação sobre a tabela de processos */}


                  {/* Abas de navegação */}
        <div className="flex justify-center border-b border-gray-300 mb-4">
          <button
            className={`py-2 px-4 transition-colors duration-300 ease-in-out ${abaAtiva === "processos" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"} rounded-tl-lg rounded-tr-lg`}
            onClick={() => setAbaAtiva("processos")}
          >
            Tabela de Processos
          </button>
          <button
            className={`py-2 px-4 transition-colors duration-300 ease-in-out ${abaAtiva === "gantt" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"} rounded-tl-lg rounded-tr-lg`}
            onClick={() => setAbaAtiva("gantt")}
          >
            Gráfico de Gantt
          </button>
          <button
            className={`py-2 px-4 transition-colors duration-300 ease-in-out ${abaAtiva === "resultados" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"} rounded-tl-lg rounded-tr-lg`}
            onClick={() => setAbaAtiva("resultados")}
          >
            Resultados
          </button>
        </div>

           
            {renderizarConteudo()}
          </>
        )}
      </div>
    </div>
  );
};

export default Escalonador;
