import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const statusClasses = {
  aguardando: "text-yellow-600 text-black", // Amarelo para "Aguardando"
  emExecucao: "text-green-600 text-white", // Verde para "Em Execução"
  finalizado: "text-red-600 text-white", // Vermelho para "Finalizado"
};

const ProcessTable = ({ processos, removerProcesso, emExecucao, atualizarCampo }) => {
  return (
    <div className="overflow-x-auto"> {/* Contêiner para rolagem horizontal */}
      <table className="min-w-full">
        <thead>
          <tr>
            <th colSpan="6" className="text-center text-xl py-4">
              Tabela de Processos
            </th>
          </tr>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Tempo de Chegada</th>
            <th className="border border-gray-300 px-4 py-2">Tempo de Execução</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map((processo, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
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
                  className="border border-gray-300 rounded px-2" // Ajuste para largura total
                />
              </td>
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
                  className="border border-gray-300 rounded px-2" // Ajuste para largura total
                />
              </td>
              <td className={`border border-gray-300 px-4 py-2 font-bold ${statusClasses[processo.estadoExecucao.toLowerCase()]}`}>
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
    </div>
  );
};

export default ProcessTable;
