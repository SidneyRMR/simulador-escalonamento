import React from 'react';

const ExplicacaoResultados = () => {
  return (
    <div className="explicacao-resultados bg-blue-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-blue-950">
        Sobre os Resultados
      </h3>
      <p className="text-gray-600">
        Após a execução dos algoritmos de escalonamento, os resultados fornecem uma visão clara sobre o desempenho do sistema.
        Eles incluem informações como o tempo total do processador, o tempo médio de retorno (TMR), o tempo médio de espera (TME),
        o Turnaround Time (TAT), o Waiting Time (WT) e a ordem de execução dos processos.
        Estes dados são fundamentais para analisar a eficiência de cada algoritmo e entender como os processos se comportaram
        durante a simulação.
      </p>

      <h4 className="text-md font-semibold text-blue-950 mt-4">1. Tempo Total do Processador (TTP)</h4>
      <p className="text-gray-600">
        O Tempo Total do Processador é a soma do tempo de execução de todos os processos, incluindo o tempo em que o sistema ficou ocioso.
        <strong> Fórmula:</strong>
        <code className="bg-gray-100 border border-gray-300 rounded p-1 block mt-1">
          Tempo Total = Soma dos Tempos de Execução + Tempo Ocioso
        </code>
      </p>

      <h4 className="text-md font-semibold text-blue-950 mt-4">2. Tempo Médio de Retorno (TMR)</h4>
      <p className="text-gray-600">
        O Tempo Médio de Retorno é o tempo médio que leva para um processo ser concluído após a sua chegada.
        Ele reflete o tempo total que um processo gasta desde sua chegada até a finalização.
        <strong> Fórmula:</strong>
        <code className="bg-gray-100 border border-gray-300 rounded p-1 block mt-1">
          TMR = Tempo Total / Número de Processos
        </code>
      </p>

      <h4 className="text-md font-semibold text-blue-950 mt-4">3. Tempo Médio de Espera (TME)</h4>
      <p className="text-gray-600">
        O Tempo Médio de Espera é o tempo médio que um processo aguarda na fila antes de ser executado.
        Esse tempo pode incluir períodos em que o processo não está sendo atendido.
        <strong> Fórmula:</strong>
        <code className="bg-gray-100 border border-gray-300 rounded p-1 block mt-1">
          TME = Soma dos Tempos de Espera / Número de Processos
        </code>
      </p>

      <h4 className="text-md font-semibold text-blue-950 mt-4">4. Tempo de Retorno (TAT)</h4>
      <p className="text-gray-600">
        O Turnaround Time é o tempo total que um processo leva desde a sua chegada até a sua conclusão.
        Ele é um indicador importante da eficiência do sistema.
        <strong> Fórmula:</strong>
        <code className="bg-gray-100 border border-gray-300 rounded p-1 block mt-1">
          TAT = Tempo de Conclusão - Tempo de Chegada
        </code>
      </p>

      <h4 className="text-md font-semibold text-blue-950 mt-4">5. Tempo de Espera (WT)</h4>
      <p className="text-gray-600">
        O Waiting Time é o tempo que um processo permanece na fila de prontos antes de ser executado.
        É calculado como a diferença entre o tempo de início de execução e o tempo de chegada do processo.
        <strong> Fórmula:</strong>
        <code className="bg-gray-100 border border-gray-300 rounded p-1 block mt-1">
          WT = Tempo de Início de Execução - Tempo de Chegada
        </code>
      </p>

      <h4 className="text-md font-semibold text-blue-950 mt-4">6. Tempo de Execução</h4>
      <p className="text-gray-600">
        O Tempo de Execução é o tempo que um processo leva para ser concluído, uma vez que começa sua execução.
        Este valor é específico para cada processo e é essencial para calcular TAT e WT.
        <strong> Fórmula:</strong>
        <code className="bg-gray-100 border border-gray-300 rounded p-1 block mt-1">
          Tempo de Execução = Tempo de Conclusão - Tempo de Início
        </code>
      </p>
    </div>
  );
};

export default ExplicacaoResultados;
