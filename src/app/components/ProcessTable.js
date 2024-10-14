import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const ProcessTable = ({ processos, removerProcesso, emExecucao, atualizarCampo, tempoChegadaRef }) => {
  return (
    <div className="overflow-x-auto">
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
                  ref={tempoChegadaRef} // Usando a referência aqui
                  onChange={(e) =>
                    atualizarCampo(processo.id, "tempoChegada", e.target.value)
                  }
                  className="border border-gray-300 rounded px-2"
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
                  className="border border-gray-300 rounded px-2"
                />
              </td>
              <td className={`border border-gray-300 px-4 py-2`}>
                {processo.estadoExecucao}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                <button onClick={() => removerProcesso(processo.id)}>
                  <FaTrashAlt />
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
