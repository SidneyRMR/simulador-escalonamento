const TabelaResultados = ({ resultados }) => {

    if (!resultados || resultados.length === 0) return null;

    return (
        <div className="p-4 overflow-x-auto">
          <p className="font-bold">Tempo Total do processador: {resultados.tempoTotal}</p>
          <p className="font-bold">Tempo Médio de Retorno (TMR): {resultados.tempoMedioRetorno}</p>
          <p className="font-bold">Tempo Médio de Espera (TME): {resultados.tempoMedioEspera}</p>
          <table className="min-w-full bg-white border border-gray-300 mt-3">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">Processo</th>
                <th className="border px-4 py-2">Tempo de Turnaround (TAT)</th>
                <th className="border px-4 py-2">Tempo de Espera (WT)</th>
                <th className="border px-4 py-2">Tempo de Execução</th>
              </tr>
            </thead>
            <tbody>
              {resultados.detalhes.map((detalhe, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="border px-4 py-2">{detalhe.processo}</td>
                  <td className="border px-4 py-2">{detalhe.TAT}</td>
                  <td className="border px-4 py-2">{detalhe.WT}</td>
                  <td className="border px-4 py-2">{detalhe.tempoExecucao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }      

    export default TabelaResultados;