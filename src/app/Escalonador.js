"use client";
import React from "react";
import "./Escalonador.css";
import { useEscalonador } from "./hooks/useEscalonador";
import ProcessTable from "./components/ProcessTable";
import GanttChart from "./components/GanttChart";

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
  } = useEscalonador();

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center font-bold text-3xl text-blue-950 mt-3 mb-4">
          Simulador de Escalonamento de Processos
        </h2>
        <div className="flex justify-center gap-2 mb-4">
          <button onClick={criarProcessosAleatorios} disabled={emExecucao}>
            Criar Processos Aleatórios
          </button>
          <button onClick={adicionarProcesso} disabled={emExecucao}>
            Adicionar Processo
          </button>
        </div>
        <div className="mx-8">
          <ProcessTable
          estadoExecucao={estadoExecucao}
          processos={processos}
          removerProcesso={removerProcesso}
          emExecucao={emExecucao}
          atualizarCampo={atualizarCampo}
        />
        </div>

        <div className="border border-gray-300 rounded-lg p-4 mt-2">
          <h2 className="text-center font-bold text-2xl text-blue-950 mt-2">
            Algoritmo de Escalonamento
          </h2>
          <div className="flex justify-center gap-6 my-5 flex-wrap">
            <div className="escalonador-option">
              <h3 className="text-center font-normal text-base text-blue-950">
                Round Robin
              </h3>
              <button
                onClick={iniciarEscalonamentoCircular}
                disabled={emExecucao}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Executar Round Robin
              </button>
            </div>
            <div className="escalonador-option">
              <h3 className="text-center font-normal text-base text-blue-950">
                Shortest Job First
              </h3>
              <button
                onClick={iniciarEscalonamentoSJF}
                disabled={emExecucao}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Executar SJF
              </button>
            </div>
            <div className="escalonador-option">
              <h3 className="text-center font-normal text-base text-blue-950">
                First-In, First-Out
              </h3>
              <button
              onClick={iniciarEscalonamentoFIFO}
                disabled={emExecucao}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Executar FIFO
              </button>
            </div>
            <div className="escalonador-option">
              <h3 className="text-center font-normal text-base text-gray-500">
                Priority Scheduling
              </h3>
              <button
                disabled
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Executar Priority
              </button>
            </div>
            {/* <div className="escalonador-option">
              <h3 className="text-center font-normal text-base text-gray-500">
                Multilevel Queue
              </h3>
              <button
                disabled
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Executar Multilevel Queue
              </button>
            </div> */}
          </div>
        </div>

        <GanttChart ganttChart={ganttChart} processos={processos} tempoAtual={tempoAtual} />

        <div className="border border-gray-300 rounded-lg p-4 mt-2">
          <h2 className="text-center font-bold text-2xl text-blue-950 mt-3">
            Mensagens
          </h2>
          <div
            className="mensagens"
            style={{
              marginInline: "auto",
              maxWidth: "90%",
              maxHeight: "200px",
              overflowY: "scroll",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "0.5rem", // Adiciona borda arredondada
            }}
          >
            {mensagens.map((mensagem, index) => (
              <p key={index} style={{ minHeight: "20px" }}>
                {mensagem}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Escalonador;
