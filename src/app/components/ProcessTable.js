import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const ProcessTable = ({ processos, removerProcesso, emExecucao, atualizarCampo }) => {
  const getStatusClass = (processo) => {
    if (processo.finalizado) return "status-finalizado"; // Para processos finalizados
    if (processo.aguardando) return "status-aguardando"; // Para processos aguardando
    if (processo.pausando) return "status-pausando"; // Para processos pausando
    return emExecucao ? "status-em-execucao" : "status-padrao"; // Para processos em execução ou padrão
  };

  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th colSpan="6" style={{ textAlign: "center" }}>
            Tabela de Processos
          </th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Tempo de Execução</th>
          <th>Tempo Restante</th>
          <th>Tempo de Chegada</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {processos.map((processo) => (
          <tr key={processo.id} className={getStatusClass(processo)}>
            <td>{processo.id}</td>
            <td>
              <input
                type="number"
                min="1"
                max="8"
                value={processo.tempoExecucao}
                disabled={emExecucao}
                onChange={(e) =>
                  atualizarCampo(processo.id, "tempoExecucao", e.target.value)
                }
              />
            </td>
            <td>{processo.tempoRestante}</td>
            <td>
              <input
                type="number"
                min="0"
                max="8"
                value={processo.tempoChegada}
                disabled={emExecucao}
                onChange={(e) =>
                  atualizarCampo(processo.id, "tempoChegada", e.target.value)
                }
              />
            </td>
            <td>
              {processo.finalizado
                ? "Finalizado"
                : processo.aguardando
                ? "Aguardando"
                : processo.pausando
                ? "Pausando"
                : "Em Execução"}
            </td>
            <td>
              <button
                onClick={() => removerProcesso(processo.id)}
                disabled={emExecucao}
              >
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
