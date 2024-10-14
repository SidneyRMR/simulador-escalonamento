import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const BotaoOperacoes = ({ criarProcessosAleatorios, adicionarProcesso, limparProcessos, emExecucao, processos }) => {
  return (
    <>

    <div className="flex justify-center gap-2 mb-4 mt-4">
        
      <div className="relative">
        <button
          onClick={criarProcessosAleatorios}
          disabled={emExecucao}
          className="btn"
        >
          Criar Processos Aleatórios
        </button>
        <span className="tooltip group-hover:scale-100">
          Cria um conjunto de processos aleatórios para simulação. Use este botão antes de iniciar o escalonamento.
        </span>
      </div>

      <div className="relative">
        <button
          onClick={adicionarProcesso}
          disabled={emExecucao}
          className="btn"
        >
          Adicionar Processo
        </button>
        <span className="tooltip group-hover:scale-100">
          Adiciona um novo processo manualmente ao simulador. Você pode definir o tempo de execução e a prioridade.
        </span>
      </div>

      {processos.length > 0 && (
        <div className="relative">
          <button
            onClick={limparProcessos}
            disabled={emExecucao}
            className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition-colors"
          >
            Limpar
          </button>
          <span className="tooltip group-hover:scale-100">
            Remove todos os processos da lista. Use este botão se você quiser começar uma nova simulação.
          </span>
        </div>
      )}
    </div>
    </>
  );
};

export default BotaoOperacoes;
