"use client";
import React, { useState } from "react";
import "./Escalonador.css";

const Escalonador = () => {
  const [processos, setProcessos] = useState([]);
  const [quantum, setQuantum] = useState(2);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [emExecucao, setEmExecucao] = useState(false);
  const [ganttChart, setGanttChart] = useState([]);
  const [processosIniciais, setProcessosIniciais] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  const TEMPO_PROCESSOS = 8;

  const limparGrafico = () => {
    setGanttChart([]);
    setTempoAtual(0);
  };

  const restaurarProcessosOriginais = () => {
    setProcessos(
      processosIniciais.map((p) => ({
        ...p,
        tempoRestante: p.tempoExecucao,
        finalizado: false,
      }))
    );
  };

  const criarProcessosAleatorios = () => {
    limparGrafico();
    const numProcessos = Math.floor(Math.random() * 4) + 3; // Entre 3 e 6 processos
    const novosProcessos = Array.from({ length: numProcessos }, (_, index) => ({
      id: index + 1,
      tempoExecucao: Math.floor(Math.random() * TEMPO_PROCESSOS) + 1, // Entre 1 e 8
      tempoRestante: 0,
      tempoChegada: Math.floor(Math.random() * TEMPO_PROCESSOS) + 1,
      finalizado: false,
    }));

    const processosComTempoRestante = novosProcessos.map((p) => ({
      ...p,
      tempoRestante: p.tempoExecucao,
    }));

    setProcessos(processosComTempoRestante);
    setProcessosIniciais(processosComTempoRestante);
  };

  const adicionarProcesso = () => {
    const novoProcesso = {
      id: processos.length + 1,
      tempoExecucao: Math.floor(Math.random() * TEMPO_PROCESSOS) + 1,
      tempoRestante: 0,  // Inicializado aqui, será atualizado abaixo
      tempoChegada: Math.floor(Math.random() * TEMPO_PROCESSOS) + 1,
      finalizado: false,
    };
  
    novoProcesso.tempoRestante = novoProcesso.tempoExecucao;  // Correção da atribuição
  
    setProcessos((prev) => [...prev, novoProcesso]);
    setProcessosIniciais((prev) => [...prev, novoProcesso]);
    setMensagens((prev) => [
      ...prev,
      `Processo ${novoProcesso.id} adicionado.`,
    ]);
  };
  
  const removerProcesso = (id) => {
    setProcessos((prev) => prev.filter((p) => p.id !== id));
    setProcessosIniciais((prev) => prev.filter((p) => p.id !== id));
    setMensagens((prev) => [...prev, `Processo ${id} removido.`]);
  };

  const iniciarEscalonamentoCircular = () => {
    if (processos.length === 0) return;
    limparGrafico();
    setEmExecucao(true);
  
    // Copiar os processos originais para a fila
    const fila = processos.map((p) => ({ ...p }));
    let tempoCorrente = 0;
    let indiceAtual = 0; // Índice para controlar a posição na fila
  
    const intervalo = setInterval(() => {
      // Filtrar processos que chegaram e ainda têm tempo restante
      const processosDisponiveis = fila.filter(
        (p) => p.tempoChegada <= tempoCorrente && p.tempoRestante > 0
      );
  
      // Se não houver processos disponíveis, verificar se todos finalizaram
      if (processosDisponiveis.length === 0) {
        if (fila.every((p) => p.finalizado)) {
          clearInterval(intervalo);
          setEmExecucao(false);
          restaurarProcessosOriginais();
          return;
        }
  
        // Adicionar tempo ocioso no gráfico de Gantt
        setGanttChart((prev) => [
          ...prev,
          {
            processoId: "Ocioso",
            tempoInicio: tempoCorrente - 1,
            tempoFim: tempoCorrente,
          },
        ]);
        tempoCorrente++;
        return;
      }
  
      // Garantir que o índice atual esteja dentro do intervalo da fila
      if (indiceAtual >= fila.length) {
        indiceAtual = 0;
      }
  
      // Selecionar o próximo processo baseado no índice atual
      let processo = fila[indiceAtual];
  
      // Verificar se o processo está disponível para execução
      if (processo.tempoChegada <= tempoCorrente && processo.tempoRestante > 0) {
        const tempoExecutado = Math.min(processo.tempoRestante, quantum);
  
        // Atualizar tempo restante do processo e o tempo corrente do sistema
        processo.tempoRestante -= tempoExecutado;
        tempoCorrente += tempoExecutado;
  
        // Se o processo terminou, marcá-lo como finalizado
        if (processo.tempoRestante === 0) {
          processo.finalizado = true;
          setMensagens((prev) => [
            ...prev,
            `Processo ${processo.id} finalizado.`,
          ]);
        }
  
        // Atualizar gráfico de Gantt com o intervalo de execução do processo
        setGanttChart((prev) => [
          ...prev,
          {
            processoId: processo.id,
            tempoInicio: tempoCorrente - tempoExecutado,
            tempoFim: tempoCorrente,
          },
        ]);
  
        // Atualizar o estado dos processos
        setTempoAtual(tempoCorrente);
        setProcessos((prev) =>
          prev.map((p) => (p.id === processo.id ? processo : p))
        );
      }
  
      // Avançar para o próximo processo na fila (circular)
      indiceAtual++;
      if (indiceAtual >= fila.length) {
        indiceAtual = 0; // Reiniciar o índice para simular o comportamento circular
      }
  
    }, 1000); // Intervalo de 1 segundo para simulação
  };
  
  const iniciarEscalonamentoSJF = () => {
    if (processos.length === 0) return;
    limparGrafico();
    setEmExecucao(true);

    const fila = processos.map((p) => ({ ...p }));
    let tempoCorrente = 0;

    const intervalo = setInterval(() => {
      const processosDisponiveis = fila
        .filter((p) => p.tempoChegada <= tempoCorrente && p.tempoRestante > 0)
        .sort((a, b) => a.tempoRestante - b.tempoRestante);

      if (processosDisponiveis.length === 0) {
        if (fila.every((p) => p.finalizado)) {
          clearInterval(intervalo);
          setEmExecucao(false);
          restaurarProcessosOriginais();
          return;
        }

        setGanttChart((prev) => [
          ...prev,
          {
            processoId: "Ocioso",
            tempoInicio: tempoCorrente - 1,
            tempoFim: tempoCorrente,
          },
        ]);
        tempoCorrente++;
        return;
      }

      let processo = processosDisponiveis.shift();
      tempoCorrente += processo.tempoRestante;

      processo.tempoRestante = 0;
      processo.finalizado = true;

      setGanttChart((prev) => [
        ...prev,
        {
          processoId: processo.id,
          tempoInicio: tempoCorrente - processo.tempoExecucao,
          tempoFim: tempoCorrente,
        },
      ]);

      setTempoAtual(tempoCorrente);
      setProcessos((prev) =>
        prev.map((p) => (p.id === processo.id ? processo : p))
      );
      setMensagens((prev) => [...prev, `Processo ${processo.id} finalizado.`]);
    }, 1000);
  };

  const atualizarCampo = (id, campo, valor) => {
    setProcessos((prev) =>
      prev.map((processo) =>
        processo.id === id
          ? { ...processo, [campo]: parseInt(valor, 10) }
          : processo
      )
    );
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center font-bold text-3xl text-blue-950 mt-3 mb-2">
          Simulador de Escalonamento de Processos
        </h2>
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={criarProcessosAleatorios} disabled={emExecucao}>
            Criar Processos Aleatórios
          </button>
          <button onClick={adicionarProcesso} disabled={emExecucao}>
            Adicionar Processo
          </button>
        </div>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tempo de Execução</th>
              <th>Tempo Restante</th>
              <th>Tempo de Chegada</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processos.map((processo) => (
              <tr key={processo.id}>
                <td>{processo.id}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={processo.tempoExecucao}
                    onChange={(e) =>
                      atualizarCampo(
                        processo.id,
                        "tempoExecucao",
                        e.target.value
                      )
                    }
                    disabled={emExecucao}
                  />
                </td>
                <td>{processo.tempoRestante}</td>{" "}
                {/* Removido campo editável */}
                <td>
                  <input
                    type="number"
                    min="0"
                    max="8"
                    value={processo.tempoChegada}
                    onChange={(e) =>
                      atualizarCampo(
                        processo.id,
                        "tempoChegada",
                        e.target.value
                      )
                    }
                    disabled={emExecucao}
                  />
                </td>
                <td>{processo.finalizado ? "Finalizado" : "Em Execução"}</td>
                <td>
                  <button
                    onClick={() => removerProcesso(processo.id)}
                    disabled={emExecucao}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-center font-bold text-2xl text-blue-950 mt-3">
          Algoritmo de Escalonamento
        </h2>
        

        <div className="flex justify-center gap-4 my-5">
          <div>
            <h3 className="text-center font-normal text-base text-blue-950">Round Robin (Quantum: {quantum})</h3>
            <button
              onClick={iniciarEscalonamentoCircular}
              disabled={emExecucao}
            >
              Executar Round Robin
            </button>
          </div>
          <div>
            <h3 className="text-center font-normal text-base text-blue-950">Shortest Job First</h3>
            <button onClick={iniciarEscalonamentoSJF} disabled={emExecucao}>
              Executar SJF
            </button>
          </div>
        </div>

        <h2 className="text-center font-bold text-2xl text-blue-950 mt-8">Gráfico de Gantt (Tempo x Processo)</h2>

        <p className="text-center text-xl font-semibold mb-6">Tempo Atual: {tempoAtual}s</p>

        <div className="gantt-chart">
          {processos.map((processo) => (
            <div key={processo.id} className="gantt-row">
              <span>Processo {processo.id}</span>
              <div className="gantt-bar-container">
                {ganttChart
                  .filter(
                    (entry) =>
                      entry.processoId === processo.id ||
                      entry.processoId === "Ocioso"
                  )
                  .map((entry, index) => (
                    <div
                      key={index}
                      className={`gantt-bar ${
                        entry.processoId === "Ocioso" ? "ocioso" : ""
                      }`}
                      style={{
                        left: `${entry.tempoInicio * 30}px`,
                        width: `${(entry.tempoFim - entry.tempoInicio) * 30}px`,
                        backgroundColor:
                          entry.processoId === "Ocioso"
                            ? "grey"
                            : `hsl(${
                                (entry.processoId * 100) % 360
                              }, 70%, 50%)`,
                      }}
                    >
                      {entry.processoId === "Ocioso" ? "●" : ""}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center font-semibold text-xl my-8">Mensagens</h2>
        <div
          className="mensagens"
          style={{
            marginInline: "auto",
            maxWidth: "90%",
            maxHeight: "200px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {mensagens.map((mensagem, index) => (
            <p key={index}>{mensagem}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Escalonador;
