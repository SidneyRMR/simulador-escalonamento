import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const statusClasses = {
  aguardando: "text-yellow-600 text-black", // Amarelo para "Aguardando"
  emExecucao: "text-green-600 text-white", // Verde para "Em Execução"
  finalizado: "text-red-600 text-white", // Vermelho para "Finalizado"
};

const ProcessTable = ({ processos, removerProcesso, emExecucao, atualizarCampo, estadoExecucao }) => {
  return (
    <table className="min-w-full border border-gray-300 text-left">
      <thead>
        <tr>
          <th colSpan="6" className="text-center text-xl py-4">
            Tabela de Processos
          </th>
        </tr>
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Tempo de Chegada</th>
          {/* <th className="border border-gray-300 px-4 py-2">Tempo Restante</th> */}
          <th className="border border-gray-300 px-4 py-2">Tempo de Execução</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {processos.map((processo) => (
          <tr key={processo.id}>
            <td className="border border-gray-300 px-4 py-2">{processo.id}</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                min="0"
                max="8"
                value={processo.tempoChegada}
                disabled={emExecucao}
                onChange={(e) =>
                  atualizarCampo(processo.id, "tempoChegada", e.target.value)
                }
                className="border border-gray-300 rounded px-2"
              />
            </td>
                {/* <td className="border border-gray-300 px-4 py-2">{processo.tempoRestante || '-'}</td> */}
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                min="1"
                max="8"
                value={processo.tempoExecucao}
                disabled={emExecucao}
                onChange={(e) =>
                  atualizarCampo(processo.id, "tempoExecucao", e.target.value)
                }
                className="border border-gray-300 rounded px-2"
              />
            </td>
            <td className={`border border-gray-300 px-4 py-2 font-bold ${
  processo.estadoExecucao === "Finalizado" ? "text-red-600" : 
  processo.estadoExecucao === "Aguardando" ? "text-yellow-600" : 
  "text-green-600"
}`}>
  {processo.estadoExecucao}
</td>

            <td className="border border-gray-300 px-4 py-2 flex justify-center">
  <button onClick={() => removerProcesso(processo.id)}>
    <AiOutlineDelete />
  </button>
</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProcessTable;
