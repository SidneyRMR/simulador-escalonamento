'use client'
import React from "react";
import "./Escalonador.css";
import { useEscalonador } from "./hooks/useEscalonador";
import ProcessTable from "./components/ProcessTable";
import GanttChart from "./components/GanttChart";
import { FaPlay } from "react-icons/fa";

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

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center font-bold text-3xl text-blue-950 mt-3 mb-4">
          Simulador de Escalonamento de Processos
        </h2>

        <div className="h-1 w-full bg-blue-950 rounded-full mb-4"></div>
        <p className="text-center text-gray-600">
          Uma ferramenta para simular o escalonamento de processos de forma interativa.
        </p>

        <div className="flex justify-center gap-2 mb-4 mt-4">
          <button onClick={criarProcessosAleatorios} disabled={emExecucao}>
            Criar Processos Aleatórios
          </button>
          <button onClick={adicionarProcesso} disabled={emExecucao}>
            Adicionar Processo
          </button>
          {processos.length > 0 && (
            <button
              onClick={limparProcessos} // Botão de limpar processos
              disabled={emExecucao}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Limpar
            </button>
          )}
        </div>

        {processos.length === 0 && (
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
        )}

        {processos.length > 0 && (
          <>
            {/* Explicação sobre a tabela de processos */}
            <div className="explicacao-tabela bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-blue-950">
                Sobre a Tabela de Processos
              </h3>
              <p className="text-gray-600">
                A tabela abaixo exibe todos os processos que foram adicionados ao simulador. 
                Você pode editar informações como o tempo de execução e a prioridade diretamente 
                na tabela, além de remover processos. Cada linha representa um processo, 
                e as colunas indicam os atributos do processo, como o tempo de execução e o tempo de chegada.
              </p>
            </div>
            <div className="">
              <ProcessTable
                estadoExecucao={estadoExecucao}
                processos={processos}
                removerProcesso={removerProcesso}
                emExecucao={emExecucao}
                atualizarCampo={atualizarCampo}
              />
            </div>
            <div className="border border-gray-300 rounded-lg p-4 mt-2">
  <h2 className="text-center font-bold text-2xl text-blue-950 mt-2 mb-3">
    Algoritmo de Escalonamento
  </h2>

  {/* Explicação sobre os algoritmos de escalonamento */}
  <div className="explicacao-algoritmo bg-blue-50 p-4 rounded-lg mb-4">
    <h3 className="text-lg font-semibold text-blue-950">
      Sobre os Algoritmos de Escalonamento
    </h3>
    <p className="text-gray-600">
      Existem vários algoritmos de escalonamento que controlam como os processos são selecionados para execução pelo processador. Cada algoritmo segue um critério específico para decidir qual processo executar em determinado momento, equilibrando eficiência e tempo de espera. Aqui estão alguns dos algoritmos que podem ser simulados nesta aplicação: 
      <p className=""></p><strong>Aponte o mouse nos botões, para ver mais informações.</strong>
    </p>
  </div>

  <div className="flex justify-center gap-6 my-5 flex-wrap">
    <div className="escalonador-option relative group">
      <h3 className="text-center font-normal text-base text-blue-950">
        Round Robin
      </h3>
      <button
        onClick={iniciarEscalonamentoCircular}
        disabled={emExecucao}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <FaPlay />
        Executar Round Robin
      </button>
      <span className="tooltip group-hover:scale-100">
        O escalonamento de processos Round Robin funciona atribuindo um tempo fixo (quantum) a cada processo. Quando o tempo de um processo expira, o sistema operacional o coloca no final da fila, dando oportunidade para o próximo processo na fila. Isso garante que todos os processos recebam tempo de CPU de forma justa.
      </span>
    </div>

    <div className="escalonador-option relative group">
      <h3 className="text-center font-normal text-base text-blue-950">
        Shortest Job First
      </h3>
      <button
        onClick={iniciarEscalonamentoSJF}
        disabled={emExecucao}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <FaPlay />
        Executar SJF
      </button>
      <span className="tooltip group-hover:scale-100">
        O escalonamento Shortest Job First (SJF) prioriza os processos com menor tempo de execução. O processo mais curto é executado primeiro, o que minimiza o tempo de espera médio. Contudo, pode causar adiamento de processos mais longos, especialmente se novos processos curtos continuarem chegando. Isso leva ao que chamamos de starvation, onde processos longos não recebem a chance de serem executados rapidamente.
      </span>
    </div>

    <div className="escalonador-option relative group">
      <h3 className="text-center font-normal text-base text-blue-950">
        First-In, First-Out
      </h3>
      <button
        onClick={iniciarEscalonamentoFIFO}
        disabled={emExecucao}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <FaPlay />
        Executar FIFO
      </button>
      <span className="tooltip group-hover:scale-100">
        O escalonamento First In, First Out (FIFO) executa os processos na ordem de chegada. O primeiro processo a entrar na fila é o primeiro a ser executado, e assim por diante. Isso é simples e justo, mas pode levar a tempos de espera elevados se um processo longo chegar primeiro.
      </span>
    </div>

    <div className="escalonador-option relative group">
      <h3 className="text-center font-normal text-base text-gray-500">
        Priority Scheduling
      </h3>
      <button
        disabled
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2"
      >
        <FaPlay />
        Executar Priority
      </button>
      <span className="tooltip group-hover:scale-100">
        O escalonamento por Prioridade (Priority Scheduling) atribui a cada processo uma prioridade. Processos com maior prioridade são executados antes dos processos com menor prioridade. Se dois processos têm a mesma prioridade, pode-se usar outro método de escalonamento para decidir a ordem. Essa abordagem é útil para garantir que processos críticos sejam atendidos rapidamente, mas pode causar starvation de processos com prioridade baixa.
      </span>
    </div>
  </div>
</div>


            <GanttChart ganttChart={ganttChart} processos={processos} tempoAtual={tempoAtual} />

            <div className="border border-gray-300 rounded-lg p-4 mt-2">
  <h2 className="text-center font-bold text-2xl text-blue-950 mt-3 mb-3">
    Resultados
  </h2>

  {/* Explicação sobre os resultados */}
  <div className="explicacao-resultados bg-blue-50 p-4 rounded-lg mb-4">
    <h3 className="text-lg font-semibold text-blue-950">
      Sobre os Resultados
    </h3>
    <p className="text-gray-600">
      Após a execução dos algoritmos de escalonamento, os resultados fornecem uma visão clara sobre o desempenho do sistema. 
      Eles incluem informações como o tempo médio de espera, o tempo de turnaround e a ordem de execução dos processos. 
      Estes dados são fundamentais para analisar a eficiência de cada algoritmo e entender como os processos se comportaram 
      durante a simulação.
    </p>
  </div>

  {mensagens.map((mensagem, index) => (
    <p key={index} style={{ minHeight: "20px" }}>
      {mensagem}
    </p>
  ))}
</div>

            
          </>
        )}
      </div>
    </div>
  );
};

export default Escalonador;
