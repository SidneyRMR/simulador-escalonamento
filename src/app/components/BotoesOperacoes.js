import React, { useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa'; // Importando os ícones corretos

const BotaoOperacoes = ({ criarProcessosAleatorios, adicionarProcesso, limparProcessos, emExecucao, processos }) => {
  
  return (
    <div className="flex justify-center gap-2 mb-4 mt-4 overflow-x-auto px-2">
      <div className="relative">
        <button
          onClick={criarProcessosAleatorios}
          disabled={emExecucao}
          className={`bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition-colors duration-300 h-full flex items-center justify-center ${emExecucao ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="relative">
            <FaPlus className="mr-2" />
            <FaPlus className="ml-2" />
          </div>
          Criar Processos Aleatórios
        </button>
      </div>

      <div className="relative">
      <button
  onClick={() => {
    adicionarProcesso();
    
  }}
  disabled={emExecucao}
  className={`bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition-colors duration-300 h-full flex items-center justify-center ${emExecucao ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  <FaPlus className="mr-2" />
  Adicionar Processo
</button>

      </div>

      {processos.length > 0 && (
        <div className="relative">
          <button
            onClick={limparProcessos}
            disabled={emExecucao}
            className={`bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition-colors duration-300 h-full flex items-center justify-center ${emExecucao ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaTrashAlt className="mr-2" />
            Limpar
          </button>
        </div>
      )}
    </div>
  );
};

export default BotaoOperacoes;
