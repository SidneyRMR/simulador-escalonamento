import React from 'react';
import { FaTable, FaChartBar, FaClipboardList, FaInfoCircle } from 'react-icons/fa';

const AbasNavegacao = ({ abaAtiva, setAbaAtiva, mensagemInformativa }) => {
  return (
    <>
      {/* Abas de navegação */}
      <div className="flex justify-center border-b border-gray-300 mb-4 px-2 min-w-[870px]">
        <button
          className={`flex items-center py-2 px-4 min-w-[120px] transition-colors duration-300 ease-in-out ${
            abaAtiva === "processos" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"
          } rounded-tl-lg rounded-tr-lg`}
          onClick={() => setAbaAtiva("processos")}
        >
          <FaTable className="mr-2" /> Tabela de Processos
        </button>
        <button
          className={`flex items-center py-2 px-4 min-w-[120px] transition-colors duration-300 ease-in-out ${
            abaAtiva === "gantt" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"
          } rounded-tl-lg rounded-tr-lg`}
          onClick={() => setAbaAtiva("gantt")}
        >
          <FaChartBar className="mr-2" /> Gráfico de Gantt
        </button>
        <button
          className={`flex items-center py-2 px-4 min-w-[120px] transition-colors duration-300 ease-in-out ${
            abaAtiva === "resultados" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"
          } rounded-tl-lg rounded-tr-lg`}
          onClick={() => setAbaAtiva("resultados")}
        >
          <FaClipboardList className="mr-2" /> Resultados
        </button>
        <button
          className={`flex items-center py-2 px-4 min-w-[120px] transition-colors duration-300 ease-in-out ${
            abaAtiva === "explicacao" ? "bg-blue-500 text-white" : "bg-white text-blue-500 hover:bg-gray-100"
          } rounded-tl-lg rounded-tr-lg`}
          onClick={() => setAbaAtiva("explicacao")}
        >
          <FaInfoCircle className="mr-2" /> Explicação dos Resultados
        </button>
      </div>

      {/* Mensagem informativa sobre a aba ativa */}
      <div className="bg-yellow-100 p-3 rounded-lg mb-4">
        <p className="text-gray-700 text-center">{mensagemInformativa()}</p>
      </div>
    </>
  );
};

export default AbasNavegacao;
