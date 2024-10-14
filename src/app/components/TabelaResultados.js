const TabelaResultados = ({ resultados }) => {
  if (!resultados || resultados.length === 0) return null;

  return (
    <div className=" pb-4 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 mt-3">
        <thead>
        <tr>
            <th colSpan="4" className="text-center text-xl py-4">
              Tabela de Resultados
            </th>
          </tr>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Processo</th>
            <th className="border px-4 py-2">Tempo de Retorno (TAT)</th>
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
        <tfoot>
  <tr className="bg-gray-300 font-bold">
    <td className="border px-4 py-2">Totais</td>
    <td className="border px-4 py-2">
      {resultados.tempoMedioRetorno}
      <div className="text-gray-500 text-sm">
        TMR = ∑TAT / nº Processos
      </div>
    </td>
    <td className="border px-4 py-2">
      {resultados.tempoMedioEspera}
      <div className="text-gray-500 text-sm">
        TME = ∑WT / nº Processos
      </div>
    </td>
    <td className="border px-4 py-2">
      {resultados.tempoTotal}
      <div className="text-gray-500 text-sm">
        TTP = ∑TE
      </div>
    </td>
  </tr>
</tfoot>

      </table>
    </div>
  );
}

export default TabelaResultados;
