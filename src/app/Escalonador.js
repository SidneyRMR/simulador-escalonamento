'use client'
import React, { useState } from 'react';
import './Escalonador.css';

const Escalonador = () => {
  const [processos, setProcessos] = useState([]);
  const [quantum, setQuantum] = useState(2);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [emExecucao, setEmExecucao] = useState(false);
  const [ganttChart, setGanttChart] = useState([]);

  const limparGrafico = () => {
    setGanttChart([]);
    setTempoAtual(0);
  };

  const iniciarEscalonamentoCircular = () => {
    if (processos.length === 0) return; // Não faz nada se não houver processos
    limparGrafico(); // Limpa o gráfico antes de iniciar a simulação
    setEmExecucao(true);
    const fila = processos.map(p => ({ ...p })); // Cria uma cópia dos processos
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
      setProcessos(prev => prev.map(p => (p.id === processo.id ? processo : p)));
    }, 1000);
  };

  const iniciarEscalonamentoSJF = () => {
    if (processos.length === 0) return; // Não faz nada se não houver processos
    limparGrafico(); // Limpa o gráfico antes de iniciar a simulação
    setEmExecucao(true);
    const fila = processos.map(p => ({ ...p })); // Cria uma cópia dos processos
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
      setProcessos(prev => prev.map(p => (p.id === processo.id ? processo : p)));
    }, 1000);
  };

  const criarProcessosAleatorios = () => {
    limparGrafico(); // Limpa o gráfico antes de criar novos processos
    const numProcessos = Math.floor(Math.random() * 6) + 3; // Entre 3 e 8 processos
    const novosProcessos = Array.from({ length: numProcessos }, (_, index) => ({
      id: index + 1,
      tempoExecucao: Math.floor(Math.random() * 10) + 1, // Entre 1 e 10
      tempoRestante: Math.floor(Math.random() * 10) + 1, // Entre 1 e 10
      tempoChegada: Math.floor(Math.random() * 10) + 1, // Entre 1 e 10
      finalizado: false
    }));
    setProcessos(novosProcessos);
  };

  const atualizarProcesso = (id, campo, valor) => {
    setProcessos(prev =>
      prev.map(processo => {
        if (processo.id === id) {
          return { ...processo, [campo]: parseInt(valor, 10) }; // Atualiza o campo específico
        }
        return processo;
      })
    );
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Simulador de Escalonamento de Processos</h2>
        <button onClick={criarProcessosAleatorios} disabled={emExecucao}>
          Criar Processos Aleatórios
        </button>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tempo de Execução</th>
              <th>Tempo Restante</th>
              <th>Tempo de Chegada</th>
              <th>Status</th>
              {/* <th>Ações</th> */}
            </tr>
          </thead>
          <tbody>
            {processos.map(processo => (
              <tr key={processo.id}>
                <td>{processo.id}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={processo.tempoExecucao}
                    onChange={(e) => atualizarProcesso(processo.id, 'tempoExecucao', e.target.value)}
                    disabled={emExecucao}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={processo.tempoRestante}
                    onChange={(e) => atualizarProcesso(processo.id, 'tempoRestante', e.target.value)}
                    disabled={emExecucao}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={processo.tempoChegada}
                    onChange={(e) => atualizarProcesso(processo.id, 'tempoChegada', e.target.value)}
                    disabled={emExecucao}
                  />
                </td>
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
