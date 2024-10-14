import { useRef, useState } from "react"; 

export const useEscalonador = (tempoChegadaRef) => {
  const [processos, setProcessos] = useState([]);
  const [quantum, setQuantum] = useState(2);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [ganttChart, setGanttChart] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  const TEMPO_PROCESSOS = 8;
  const TEMPO_ESPERA_PROCESSO = 0;

  const limparProcessos = () => {
    setProcessos([]); // Limpa a lista de processos
    setGanttChart([]); // Limpa o gráfico de Gantt
    setMensagens([]); // Limpa as mensagens
    setTempoAtual(0); // Reseta o tempo atual
  };

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
        tempoChegada: Math.floor(Math.random() * TEMPO_PROCESSOS),
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
      tempoChegada: 0,
      finalizado: false,
      estadoExecucao: "-", // Estado inicial
    };
  
    setProcessos((prev) => [...prev, novoProcesso]);
    if (tempoChegadaRef.current) {
      tempoChegadaRef.current.focus();
    }
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
    if (processos.length === 0) return; // Se não houver processos, a função para
    
    limparGrafico();  // Limpa o gráfico de Gantt antes de iniciar a execução
    limparMensagens();  // Limpa as mensagens anteriores
  
    // Cria uma cópia da fila de processos
    const fila = processos.map((p) => ({ ...p }));
    
    // Variáveis iniciais
    let tempoCorrente = 0;  // Tempo atual de execução
    let indiceAtual = 0;  // Controle de qual processo está sendo executado
    let tempoTotal = 0;  // Tempo total gasto na execução de todos os processos
    
    // Arrays para armazenar os tempos de retorno e espera de cada processo
    let tempoRetorno = new Array(processos.length).fill(0);  // Turnaround Time (TAT)
    let tempoEspera = new Array(processos.length).fill(0);   // Waiting Time (WT)
  
    // Inicia a execução dos processos em intervalos regulares
    const intervalo = setInterval(() => {
      // Filtra processos que estão disponíveis para execução com base no tempo de chegada e que ainda não foram finalizados
      const processosDisponiveis = fila.filter(
        (p) => p.tempoChegada <= tempoCorrente && p.tempoRestante > 0
      );
  
      // Se não houver processos disponíveis e todos estiverem finalizados
      if (processosDisponiveis.length === 0) {
        // Verifica se todos os processos foram finalizados
        if (fila.every((p) => p.finalizado)) {
          clearInterval(intervalo);  // Para o intervalo de execução
          
          // Calcula o tempo total de execução
          tempoTotal = tempoCorrente;
  
          // Calcula Turnaround Time (TAT) e Waiting Time (WT) para cada processo
          fila.forEach((p, index) => {
            tempoRetorno[index] = tempoCorrente - p.tempoChegada; // TAT = Tempo Final - Tempo de Chegada
            tempoEspera[index] = tempoRetorno[index] - p.tempoExecucao; // WT = TAT - Tempo de Execução
          });
  
          // Cálculo do Tempo Médio de Retorno (TMR) e Tempo Médio de Espera (TME)
          const tempoMedioRetorno = tempoRetorno.reduce((a, b) => a + b, 0) / processos.length;
          const tempoMedioEspera = tempoEspera.reduce((a, b) => a + b, 0) / processos.length;
  
          // Criação da tabela de resultados para exibição
          const tabelaResultados = {
            tempoTotal,  // Tempo total de execução
            tempoMedioRetorno: tempoMedioRetorno.toFixed(2),  // TMR arredondado para 2 casas
            tempoMedioEspera: tempoMedioEspera.toFixed(2),  // TME arredondado para 2 casas
            detalhes: fila.map((p, index) => ({
              processo: p.id,
              TAT: tempoRetorno[index],  // Turnaround Time (TAT) de cada processo
              WT: tempoEspera[index],    // Waiting Time (WT) de cada processo
              tempoExecucao: p.tempoExecucao  // Tempo total de execução de cada processo
            })),
          };
  
          setMensagens(tabelaResultados);  // Atualiza as mensagens com os resultados calculados
  
          // Marca todos os processos como "Finalizado"
          setProcessos((prev) => prev.map((p) => ({ ...p, estadoExecucao: "Finalizado" })));
  
          restaurarProcessosOriginais();  // Restaura os processos ao estado inicial
          return;
        }
  
        // Caso o processador esteja ocioso, adiciona um bloco "Ocioso" no gráfico de Gantt
        setGanttChart((prev) => [
          ...prev,
          {
            processoId: "Ocioso",
            tempoInicio: tempoCorrente - 1,
            tempoFim: tempoCorrente,
          },
        ]);
        tempoCorrente++;  // Aumenta o tempo corrente durante o período de ociosidade
        return;
      }
  
      // Lógica para selecionar o próximo processo da fila
      if (indiceAtual >= fila.length) {
        indiceAtual = 0;  // Reseta o índice se ultrapassar o tamanho da fila
      }
  
      let processo = fila[indiceAtual];  // Seleciona o processo atual na fila
  
      // Executa o processo se ele chegou no tempo e ainda tem tempo restante
      if (processo.tempoChegada <= tempoCorrente && processo.tempoRestante > 0) {
        const tempoExecutado = Math.min(processo.tempoRestante, quantum);  // Tempo executado (limitado pelo quantum)
        processo.tempoRestante -= tempoExecutado;  // Reduz o tempo restante do processo
        tempoCorrente += tempoExecutado;  // Atualiza o tempo corrente
  
        // Atualiza o tempo total de execução
        tempoTotal += tempoExecutado;
  
        // Se o processo terminou sua execução
        if (processo.tempoRestante === 0) {
          processo.finalizado = true;  // Marca o processo como finalizado
          processo.estadoExecucao = "Finalizado";
  
          // Atualiza o Turnaround Time (TAT) e o Waiting Time (WT) do processo
          tempoRetorno[processo.id - 1] = tempoCorrente - processo.tempoChegada;
          tempoEspera[processo.id - 1] = tempoRetorno[processo.id - 1] - processo.tempoExecucao;
        } else {
          processo.estadoExecucao = "Executando";  // Marca como "Executando"
        }
  
        // Adiciona o processo ao gráfico de Gantt
        setGanttChart((prev) => [
          ...prev,
          {
            processoId: processo.id,
            tempoInicio: tempoCorrente - tempoExecutado,
            tempoFim: tempoCorrente,
          },
        ]);
  
        setTempoAtual(tempoCorrente);  // Atualiza o tempo atual
        setProcessos((prev) => prev.map((p) => (p.id === processo.id ? processo : p)));
      }
  
      indiceAtual++;  // Incrementa o índice para o próximo processo na fila
      if (indiceAtual >= fila.length) {
        indiceAtual = 0;  // Reseta o índice se ultrapassar o tamanho da fila
      }
    }, TEMPO_ESPERA_PROCESSO);  // Intervalo de execução
  };

  const iniciarEscalonamentoSJF = () => {
    if (processos.length === 0) return;
    limparGrafico();
    limparMensagens();

    const fila = processos.map((p) => ({ ...p }));
    let tempoCorrente = 0;
    let temposTotais = []; // Para armazenar o tempo total de cada processo
    let temposEspera = []; // Para armazenar o tempo de espera de cada processo
    let tempoTotal = 0; // Inicialmente, zero
    const intervalo = setInterval(() => {
      const processosDisponiveis = fila
          .filter((p) => p.tempoChegada <= tempoCorrente && p.tempoRestante > 0)
          .sort((a, b) => a.tempoRestante - b.tempoRestante);
  
      if (processosDisponiveis.length === 0) {
          if (fila.every((p) => p.finalizado)) {
              clearInterval(intervalo);
  
              // Cálculo do Tempo Total e Tempo Médio de Retorno
              tempoTotal += fila.reduce((acc, p) => acc + p.tempoExecucao, 0); // Somatória dos tempos de execução
              const totalProcessos = fila.length;
              const tempoMedioRetorno = temposTotais.reduce((acc, tempo) => acc + tempo, 0) / totalProcessos;
              const tempoMedioEspera = temposEspera.reduce((acc, tempo) => acc + tempo, 0) / totalProcessos;
  
              // Cria o objeto para ser recebido pelo escalonador.js
              const tabelaResultados = {
                  tempoTotal, // Agora inclui tempo ocioso e tempos de execução
                  tempoMedioRetorno: tempoMedioRetorno.toFixed(2),
                  tempoMedioEspera: tempoMedioEspera.toFixed(2),
                  detalhes: fila.map((p, index) => ({
                      processo: p.id,
                      TAT: temposTotais[index],
                      WT: temposEspera[index],
                      tempoExecucao: p.tempoExecucao,
                  })),
              };
  
              // Atualiza as mensagens
              setMensagens(tabelaResultados);
  
              setProcessos((prev) =>
                  prev.map((p) => ({ ...p, estadoExecucao: "Finalizado" })) // Atualiza todos para "Finalizado"
              );
              restaurarProcessosOriginais();
              return;
          }
  
          // Se nenhum processo foi executado, ocioso
          setGanttChart((prev) => [
              ...prev,
              {
                  processoId: "Ocioso",
                  tempoInicio: tempoCorrente - 1,
                  tempoFim: tempoCorrente,
              },
          ]);
  
          tempoTotal += 1; // Incrementa o tempo total com o tempo ocioso
          tempoCorrente++;
          return;
      }
  
      let processo = processosDisponiveis.shift(); // Pega o primeiro processo disponível
      const tempoInicio = tempoCorrente; // Marca o tempo de início do processo
  
      // Executa o processo
      tempoCorrente += processo.tempoRestante; // Atualiza o tempo corrente
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
  }, TEMPO_ESPERA_PROCESSO);
  }

const iniciarEscalonamentoFIFO = () => {
  if (processos.length === 0) return;
  limparGrafico();
  limparMensagens();

  const fila = processos.map((p) => ({ ...p })); // Cria uma cópia da fila
  let tempoCorrente = 0;
  let temposTotais = []; // Para armazenar o tempo total de cada processo
  let temposEspera = []; // Para armazenar o tempo de espera de cada processo
  let tempoOcioso = 0; // Para armazenar o tempo total ocioso

  const intervalo = setInterval(() => {
      const processosDisponiveis = fila.filter(
          (p) => p.tempoChegada <= tempoCorrente && p.tempoRestante > 0
      );

      if (processosDisponiveis.length === 0) {
          if (fila.every((p) => p.finalizado)) {
              clearInterval(intervalo);

              // Cálculo do Tempo Total e Tempo Médio de Retorno
              const totalProcessos = fila.length;

              // Tempo total deve incluir o tempo ocioso
              const tempoTotal = fila.reduce((acc, p) => acc + p.tempoExecucao, 0) + tempoOcioso;
              //const tempoTotal = temposTotais.reduce((acc, tempo) => acc + tempo, 0) 
              const tempoMedioRetorno = tempoTotal / totalProcessos;

              // Cálculo do Tempo Médio de Espera
              const tempoMedioEspera = temposEspera.reduce((acc, tempo) => acc + tempo, 0) / totalProcessos;

              // Cria um objeto para ser recebido pelo escalonador.js
              const tabelaResultados = {
                  tempoTotal,
                  tempoMedioRetorno: tempoMedioRetorno.toFixed(2),
                  tempoMedioEspera: tempoMedioEspera.toFixed(2),
                  detalhes: fila.map((p, index) => ({
                      processo: p.id,
                      TAT: temposTotais[index],
                      WT: temposEspera[index],
                      tempoExecucao: p.tempoExecucao,
                  })),
              };

              // Atualiza as mensagens
              setMensagens(tabelaResultados);

              setProcessos((prev) =>
                  prev.map((p) => ({ ...p, estadoExecucao: "Finalizado" })) // Atualiza todos para "Finalizado"
              );
              restaurarProcessosOriginais();
              return;
          }

          // Aumenta o tempo ocioso se não houver processos disponíveis
          tempoOcioso++;
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
    limparProcessos,
  };
};
