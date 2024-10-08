'use client'
import React, { useState, useEffect } from 'react';
import './Escalonador.css';

const processosIniciais = [
  { id: 1, tempoExecucao: 5, tempoRestante: 5, tempoChegada: 0, finalizado: false },
  { id: 2, tempoExecucao: 8, tempoRestante: 8, tempoChegada: 0, finalizado: false },
  { id: 3, tempoExecucao: 3, tempoRestante: 3, tempoChegada: 0, finalizado: false }
];

const Escalonador = () => {
  const [processos, setProcessos] = useState(processosIniciais);
  const [quantum, setQuantum] = useState(2);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [emExecucao, setEmExecucao] = useState(false);
  const [ganttChart, setGanttChart] = useState([]);

  const limparGrafico = () => {
    setGanttChart([]);
    setTempoAtual(0);
    setProcessos(processosIniciais.map(p => ({ ...p, tempoRestante: p.tempoExecucao, finalizado: false })));
  };

  const iniciarEscalonamentoCircular = () => {
    limparGrafico(); // Limpa o gráfico antes de iniciar a simulação
    setEmExecucao(true);
    let fila = [...processos];
    let tempoCorrente = 0;
    const intervalo = setInterval(() => {
      if (fila.length === 0) {
        clearInterval(intervalo);
        setEmExecucao(false);
        return;
      }
      let processo = fila.shift();
      if (processo.tempoRestante > quantum) {
        tempoCorrente += quantum;
        processo.tempoRestante -= quantum;
        fila.push(processo);
      } else {
        tempoCorrente += processo.tempoRestante;
        processo.tempoRestante = 0;
        processo.finalizado = true;
      }

      setGanttChart(prev => [
        ...prev,
        { processoId: processo.id, tempoInicio: tempoCorrente - quantum, tempoFim: tempoCorrente }
      ]);

      setTempoAtual(tempoCorrente);
      setProcessos([...processos.map(p => (p.id === processo.id ? processo : p))]);
    }, 1000);
  };

  const iniciarEscalonamentoSJF = () => {
    limparGrafico(); // Limpa o gráfico antes de iniciar a simulação
    setEmExecucao(true);
    const fila = [...processos];
    let tempoCorrente = 0;

    // Ordena os processos com base no tempo de execução
    const processosOrdenados = fila.sort((a, b) => a.tempoExecucao - b.tempoExecucao);

    const intervalo = setInterval(() => {
      if (processosOrdenados.length === 0) {
        clearInterval(intervalo);
        setEmExecucao(false);
        return;
      }
      let processo = processosOrdenados.shift();
      tempoCorrente += processo.tempoExecucao;

      // Atualiza o gráfico de Gantt
      setGanttChart(prev => [
        ...prev,
        { processoId: processo.id, tempoInicio: tempoCorrente - processo.tempoExecucao, tempoFim: tempoCorrente }
      ]);

      processo.finalizado = true;
      setTempoAtual(tempoCorrente);
      setProcessos([...processos.map(p => (p.id === processo.id ? processo : p))]);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Processos</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tempo de Execução</th>
              <th>Tempo Restante</th>
              <th>Tempo de Chegada</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {processos.map(processo => (
              <tr key={processo.id}>
                <td>{processo.id}</td>
                <td>{processo.tempoExecucao}</td>
                <td>{processo.tempoRestante}</td>
                <td>{processo.tempoChegada}</td>
                <td>{processo.finalizado ? 'Finalizado' : 'Em Execução'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Simulação de Escalonamento</h2>
        <p>Tempo Atual: {tempoAtual}s</p>

        <div>
          <h3>Round Robin (Quantum: {quantum})</h3>
          <button onClick={iniciarEscalonamentoCircular} disabled={emExecucao}>
            Executar Round Robin
          </button>
          <h3>SJF</h3>
          <button onClick={iniciarEscalonamentoSJF} disabled={emExecucao}>
            Executar SJF
          </button>
        </div>

        <h2>Gráfico de Gantt (Tempo x Processo)</h2>
        <div className="gantt-chart">
          {processos.map((processo) => (
            <div key={processo.id} className="gantt-row">
              <span>Processo {processo.id}</span>
              <div className="gantt-bar-container">
                {ganttChart
                  .filter(entry => entry.processoId === processo.id)
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="gantt-bar"
                      style={{
                        left: `${entry.tempoInicio * 30}px`,
                        width: `${(entry.tempoFim - entry.tempoInicio) * 30}px`,
                        backgroundColor: `hsl(${(entry.processoId * 100) % 360}, 70%, 50%)`
                      }}
                    >
                      {entry.tempoInicio}-{entry.tempoFim}s
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Escalonador;

