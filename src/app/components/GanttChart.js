import React, { useState, useRef } from "react";

const GanttChart = ({ ganttChart, processos, tempoAtual }) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const ganttRef = useRef(null);

  const tempoTotal = Math.max(...ganttChart.map((entry) => entry.tempoFim));
  const fatorEscala = 30; // Fator para escala horizontal

  const handleScroll = () => {
    if (ganttRef.current) {
      setScrollLeft(ganttRef.current.scrollLeft);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mt-2">
      {/* <h2 className="text-center font-bold text-2xl text-blue-950 mt-4 mb-4">
        Gráfico de Gantt (Tempo x Processo)
      </h2> */}
        {/* Explicação sobre os algoritmos de escalonamento */}
  <div className="explicacao-algoritmo bg-blue-50 p-4 rounded-lg mb-4">
    <h3 className="text-lg font-semibold text-blue-950 text-center">
      Gráfico de Gantt (Tempo x Processo)
    </h3>
    <p className="text-gray-600">
    O gráfico de Gantt ilustra a execução dos processos ao longo do tempo, permitindo que você visualize 
                  como cada processo é escalonado. Ele ajuda a identificar possíveis melhorias no tempo de espera e 
                  na eficiência do escalonamento.
    </p>
  </div>
      <div
        className="scrollable-gantt"
        onScroll={handleScroll}
        ref={ganttRef} // Referência para o contêiner de rolagem
      >
        <div className="scale">
          {Array.from({ length: tempoTotal + 1 }).map((_, i) => (
            <div
              key={i}
              className="scale-mark"
              style={{
                left: `${i * fatorEscala}px`,
                transform: `translateX(-${scrollLeft}px)`, // Ajusta a posição das linhas
              }}
            >
              {i}
            </div>
          ))}
        </div>
        {processos.map((processo) => (
          <div key={processo.id} className="gantt-row">
            <span>Processo {processo.id}</span>
            <div className="gantt-bar-container">
              {ganttChart
                .filter(
                  (entry) =>
                    entry.processoId === processo.id ||
                    entry.processoId === "Ocioso"
                )
                .map((entry, index) => (
                  <div
                    key={index}
                    className={`gantt-bar ${
                      entry.processoId === "Ocioso" ? "ocioso" : ""
                    }`}
                    style={{
                      left: `${entry.tempoInicio * fatorEscala}px`,
                      width: `${(entry.tempoFim - entry.tempoInicio) * fatorEscala}px`,
                      backgroundColor:
                        entry.processoId === "Ocioso"
                          ? "#d3d3d3"
                          : `hsl(${(entry.processoId * 50) % 360}, 70%, 60%)`,
                    }}
                    title={`Processo ${entry.processoId} - Tempo: ${
                      entry.tempoInicio
                    }s até ${entry.tempoFim}s`}
                  >
                    {entry.processoId === "Ocioso" ? "●" : ""}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
