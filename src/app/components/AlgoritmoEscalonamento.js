import React from 'react';
import { FaPlay } from 'react-icons/fa';

const AlgoritmoEscalonamento = ({
  iniciarEscalonamentoCircular,
  iniciarEscalonamentoSJF,
  iniciarEscalonamentoFIFO,
  emExecucao,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mt-2">
      {/* <h2 className="text-center font-bold text-2xl text-blue-950 mt-2 mb-3">
        Algoritmo de Escalonamento
      </h2> */}

      {/* Explicação sobre os algoritmos de escalonamento */}
      <div className="explicacao-algoritmo bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-blue-950 text-center">Algoritmos de Escalonamento</h3>
        <p className="text-gray-600">
          Existem vários algoritmos de escalonamento que controlam como os processos são selecionados para execução pelo processador. Cada algoritmo segue um critério específico para decidir qual processo executar em determinado momento, equilibrando eficiência e tempo de espera. Aqui estão alguns dos algoritmos que podem ser simulados nesta aplicação: 
          <span className="font-bold"> Aponte o mouse nos botões, para ver mais informações.</span>
        </p>
      </div>

      <div className="flex justify-center gap-6 my-5 flex-wrap">
        {/* Round Robin */}
        <div className="escalonador-option relative group">
          <h3 className="text-center font-normal text-base text-blue-950">Round Robin</h3>
          <button
            onClick={iniciarEscalonamentoCircular}
            disabled={emExecucao}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 transition-transform duration-200 transform hover:scale-105"
          >
            <FaPlay />
            Executar Round Robin
          </button>
          <span className="tooltip group-hover:scale-100">
            O escalonamento de processos Round Robin funciona atribuindo um tempo fixo (quantum) a cada processo. Quando o tempo de um processo expira, o sistema operacional o coloca no final da fila, dando oportunidade para o próximo processo na fila. Isso garante que todos os processos recebam tempo de CPU de forma justa.
          </span>
        </div>

        {/* Shortest Job First */}
        <div className="escalonador-option relative group">
          <h3 className="text-center font-normal text-base text-blue-950">Shortest Job First</h3>
          <button
            onClick={iniciarEscalonamentoSJF}
            disabled={emExecucao}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 transition-transform duration-200 transform hover:scale-105"
          >
            <FaPlay />
            Executar SJF
          </button>
          <span className="tooltip group-hover:scale-100">
            O escalonamento Shortest Job First (SJF) prioriza os processos com menor tempo de execução. O processo mais curto é executado primeiro, o que minimiza o tempo de espera médio. Contudo, pode causar adiamento de processos mais longos, especialmente se novos processos curtos continuarem chegando. Isso leva ao que chamamos de starvation, onde processos longos não recebem a chance de serem executados rapidamente.
          </span>
        </div>

        {/* First-In, First-Out */}
        <div className="escalonador-option relative group">
          <h3 className="text-center font-normal text-base text-blue-950">First-In, First-Out</h3>
          <button
            onClick={iniciarEscalonamentoFIFO}
            disabled={emExecucao}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 transition-transform duration-200 transform hover:scale-105"
          >
            <FaPlay />
            Executar FIFO
          </button>
          <span className="tooltip group-hover:scale-100">
            O algoritmo First-In, First-Out (FIFO) é um dos algoritmos mais simples de escalonamento. Os processos são executados na ordem em que chegam, como em uma fila. Não há priorização, e o tempo de espera pode ser elevado se um processo longo chegar antes de vários processos curtos.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlgoritmoEscalonamento;
