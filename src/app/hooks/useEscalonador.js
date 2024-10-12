import { useState } from "react";

export const useEscalonador = () => {
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
      processos.map((p) => ({
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
      tempoRestante: 0,
      tempoChegada: Math.floor(Math.random() * TEMPO_PROCESSOS) + 1,
      finalizado: false,
    };

    setProcessos((prev) => [...prev, novoProcesso]);
  };

  const removerProcesso = (id) => {
    setProcessos((prev) => prev.filter((processo) => processo.id !== id));
  };

  const atualizarCampo = (id, campo, valor) => {
    setProcessos((prevProcessos) =>
      prevProcessos.map((processo) =>
        processo.id === id ? { ...processo, [campo]: valor } : processo
      )
    );
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
        //   setMensagens((prev) => [
        //     ...prev,
        //     Processo ${processo.id} finalizado.,
        //   ]);
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
      //setMensagens((prev) => [...prev, Processo ${processo.id} finalizado.]);
    }, 1000);
  };

  return {
    processos,
    tempoAtual,
    ganttChart,
    mensagens,
    criarProcessosAleatorios,
    adicionarProcesso,
    removerProcesso,
    iniciarEscalonamentoCircular,
    iniciarEscalonamentoSJF,
    atualizarCampo,
    emExecucao,
  };
};
