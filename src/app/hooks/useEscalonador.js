import { useState } from "react"; 

export const useEscalonador = () => {
  const [processos, setProcessos] = useState([]);
  const [quantum, setQuantum] = useState(2);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [ganttChart, setGanttChart] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  const TEMPO_PROCESSOS = 8;
  const TEMPO_ESPERA_PROCESSO = 0;

  const limparGrafico = () => {
    setGanttChart([]);
    setTempoAtual(0);
  };

  const limparMensagens = () => {
    setMensagens([]);
  };

  const restaurarProcessosOriginais = () => {
    setProcessos(
      processos.map((p) => ({
        ...p,
        tempoRestante: p.tempoExecucao,
        finalizado: false,
        estadoExecucao: "-", // Reinicializa o estadoExecucao
      }))
    );
  };

  const criarProcessosAleatorios = () => {
    limparGrafico();
    const numProcessos = Math.floor(Math.random() * 4) + 3; // Entre 3 e 6 processos
    const novosProcessos = Array.from({ length: numProcessos }, (_, index) => {
      const tempoExecucao = Math.floor(Math.random() * TEMPO_PROCESSOS) + 1; // Entre 1 e 8
      return {
        id: index + 1,
        tempoExecucao: tempoExecucao,
        tempoRestante: tempoExecucao, // Define tempoRestante igual ao tempoExecucao
        tempoChegada: Math.floor(Math.random() * TEMPO_PROCESSOS) + 1,
        finalizado: false,
        estadoExecucao: "-", // Estado inicial
      };
    });
  
    setProcessos(novosProcessos);
  };
  

  const adicionarProcesso = () => {
    const tempoExecucao = Math.floor(Math.random() * TEMPO_PROCESSOS) + 1;
  
    // Obtém o maior ID existente nos processos, ou define como 0 se não houver processos
    const maiorId = processos.length > 0 ? Math.max(...processos.map(p => p.id)) : 0;
  
    const novoProcesso = {
      id: maiorId + 1, // Garante que o novo ID seja único
      tempoExecucao: tempoExecucao,
      tempoRestante: tempoExecucao, // Define tempoRestante igual ao tempoExecucao
      tempoChegada: Math.floor(Math.random() * TEMPO_PROCESSOS) + 1,
      finalizado: false,
      estadoExecucao: "-", // Estado inicial
    };
  
    setProcessos((prev) => [...prev, novoProcesso]);
  };
  

  const removerProcesso = (id) => {
    setProcessos((prev) => prev.filter((processo) => processo.id !== id));
  };

  const atualizarCampo = (id, campo, valor) => {
    setProcessos((prevProcessos) =>
      prevProcessos.map((processo) => {
        if (processo.id === id) {
          // Atualiza tempoRestante se tempoExecucao for alterado
          if (campo === "tempoExecucao") {
            const novoTempoExecucao = parseInt(valor, 10);
            return {
              ...processo,
              [campo]: novoTempoExecucao,
              tempoRestante: novoTempoExecucao, // Atualiza tempoRestante
            };
          }
          return { ...processo, [campo]: valor };
        }
        return processo;
      })
    );
  };

  const iniciarEscalonamentoCircular = () => {
    if (processos.length === 0) return;
    limparGrafico();
    limparMensagens();

    const fila = processos.map((p) => ({ ...p }));
    let tempoCorrente = 0;
    let indiceAtual = 0; // Índice para controlar a posição na fila

    const intervalo = setInterval(() => {
      const processosDisponiveis = fila.filter(
        (p) => p.tempoChegada <= tempoCorrente && p.tempoRestante > 0
      );

      if (processosDisponiveis.length === 0) {
        if (fila.every((p) => p.finalizado)) {
          clearInterval(intervalo);
          setProcessos((prev) =>
            prev.map((p) => ({ ...p, estadoExecucao: "Finalizado" })) // Atualiza todos para "Finalizado"
          );
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

      if (indiceAtual >= fila.length) {
        indiceAtual = 0;
      }

      let processo = fila[indiceAtual];

      if (processo.tempoChegada <= tempoCorrente && processo.tempoRestante > 0) {
        const tempoExecutado = Math.min(processo.tempoRestante, quantum);
        processo.tempoRestante -= tempoExecutado;
        tempoCorrente += tempoExecutado;

        if (processo.tempoRestante === 0) {
          processo.finalizado = true;
          processo.estadoExecucao = "Finalizado"; // Atualiza o estadoExecucao
        } else {
          processo.estadoExecucao = "Executando"; // Atualiza o estadoExecucao
        }

        setGanttChart((prev) => [
          ...prev,
          {
            processoId: processo.id,
            tempoInicio: tempoCorrente - tempoExecutado,
            tempoFim: tempoCorrente,
          },
        ]);

        setTempoAtual(tempoCorrente);
        setProcessos((prev) =>
          prev.map((p) => (p.id === processo.id ? processo : p))
        );
      }

      indiceAtual++;
      if (indiceAtual >= fila.length) {
        indiceAtual = 0;
      }
    }, TEMPO_ESPERA_PROCESSO);
  };

  const iniciarEscalonamentoSJF = () => {
    if (processos.length === 0) return;
    limparGrafico();
    limparMensagens();

    const fila = processos.map((p) => ({ ...p }));
    let tempoCorrente = 0;

    const intervalo = setInterval(() => {
      const processosDisponiveis = fila
        .filter((p) => p.tempoChegada <= tempoCorrente && p.tempoRestante > 0)
        .sort((a, b) => a.tempoRestante - b.tempoRestante);

      if (processosDisponiveis.length === 0) {
        if (fila.every((p) => p.finalizado)) {
          clearInterval(intervalo);
          setProcessos((prev) =>
            prev.map((p) => ({ ...p, estadoExecucao: "Finalizado" })) // Atualiza todos para "Finalizado"
          );
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
      processo.estadoExecucao = "Finalizado"; // Atualiza o estadoExecucao

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
    }, TEMPO_ESPERA_PROCESSO);
  };

  const iniciarEscalonamentoFIFO = () => {
    if (processos.length === 0) return;
    limparGrafico();
    limparMensagens();

    const fila = processos.map((p) => ({ ...p })); // Cria uma cópia da fila
    let tempoCorrente = 0;
    let temposTotais = []; // Para armazenar o tempo total de cada processo
    let temposEspera = []; // Para armazenar o tempo de espera de cada processo

    const intervalo = setInterval(() => {
        const processosDisponiveis = fila.filter(
            (p) => p.tempoChegada <= tempoCorrente && p.tempoRestante > 0
        );

        if (processosDisponiveis.length === 0) {
            if (fila.every((p) => p.finalizado)) {
                clearInterval(intervalo);

                // Cálculo do Tempo Total e Tempo Médio de Retorno
                const totalProcessos = fila.length;

                const tempoTotal = temposTotais.reduce((acc, tempo) => acc + tempo, 0);
                const tempoMedioRetorno = tempoTotal / totalProcessos;

                // Cálculo do Tempo Médio de Espera
                const tempoMedioEspera = temposEspera.reduce((acc, tempo) => acc + tempo, 0) / totalProcessos;

                // Mensagens dos resultados
                setMensagens((prevMensagens) => [
                    ...prevMensagens,
                    `Tempo Total: ${tempoTotal}`,
                    `Tempo Médio de Retorno (TMR): ${tempoMedioRetorno}`,
                    `Tempo Médio de Espera: ${tempoMedioEspera}`,
                ]);

                setProcessos((prev) =>
                    prev.map((p) => ({ ...p, estadoExecucao: "Finalizado" })) // Atualiza todos para "Finalizado"
                );
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

        // Pega o primeiro processo da fila (FIFO)
        let processo = processosDisponiveis[0]; // Pega o primeiro da lista filtrada

        if (processo) {
            // Executa o processo
            const tempoInicio = tempoCorrente; // Marca o tempo de início do processo
            const tempoExecutado = processo.tempoRestante; // Executa até terminar
            tempoCorrente += tempoExecutado; // Atualiza o tempo corrente
            processo.tempoRestante = 0; // Define o tempo restante como zero
            processo.finalizado = true; // Define como finalizado
            processo.estadoExecucao = "Finalizado"; // Atualiza o estadoExecucao

            // Cálculo do Tempo Total para o processo atual
            const tempoTotalProcesso = tempoCorrente - processo.tempoChegada; // Tempo total do processo
            temposTotais.push(tempoTotalProcesso); // Adiciona ao array de tempos totais

            // Cálculo do Tempo de Espera
            const tempoEsperaProcesso = tempoInicio - processo.tempoChegada; // Tempo que o processo esperou
            temposEspera.push(tempoEsperaProcesso); // Adiciona ao array de tempos de espera

            setGanttChart((prev) => [
                ...prev,
                {
                    processoId: processo.id,
                    tempoInicio: tempoInicio,
                    tempoFim: tempoCorrente,
                },
            ]);

            setTempoAtual(tempoCorrente);
            setProcessos((prev) =>
                prev.map((p) => (p.id === processo.id ? processo : p))
            );
        }
    }, TEMPO_ESPERA_PROCESSO);
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
    iniciarEscalonamentoFIFO,
    atualizarCampo,
  };
};
