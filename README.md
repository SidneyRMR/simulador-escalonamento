# Simulação de Escalonamento de Processos

Este projeto é uma aplicação web desenvolvida em React que simula dois algoritmos de escalonamento de processos em sistemas operacionais: **Round Robin** e **Shortest Job First (SJF)**. A aplicação permite a criação e manipulação de processos, visualização do gráfico de Gantt e análise dos tempos de execução.

## Funcionalidades

- **Criar Processos Aleatórios**: Gera entre 3 a 8 processos aleatórios, com tempo de chegada e execução variando de 1 a 10.
- **Simulação de Algoritmos**: Executa as simulações de escalonamento usando os algoritmos Round Robin e SJF.
- **Gráfico de Gantt**: Exibe o tempo de execução de cada processo em um gráfico de Gantt.
- **Edição de Processos**: Permite editar os tempos de chegada, execução e restante dos processos.

## Tecnologias Utilizadas

- React
- CSS
- JavaScript

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/SidneyRMR/simulador-escalonamento
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd simulador-escalonamento
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie a aplicação:

   ```bash
   npm start
   ```

5. Abra seu navegador e acesse `http://localhost:3000`.

## Uso

- Crie processos aleatórios clicando no botão "Criar Processos Aleatórios".
- Edite os tempos de chegada e execução dos processos, se necessário.
- Escolha um algoritmo de escalonamento (Round Robin ou SJF) e clique no botão correspondente para iniciar a simulação.
- O gráfico de Gantt será atualizado em tempo real, mostrando a execução de cada processo.

## Contribuição

- `https://github.com/brendagaudencio`
- `https://github.com/renan-mazzilli`

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
