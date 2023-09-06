# Backlog do Produto

Esse documento visa fornecer uma visão geral do backlog do nosso produto, pontuando as funcionalidades, melhorias e tarefas prioritárias que nossa equipe de desenvolvimento pretende elaborar. Ele serve como um guia fundamental para alinhar nossos esforços com as necessidades dos clientes e os objetivos do negócio, permitindo uma gestão eficaz do ciclo de desenvolvimento e a entrega contínua de valor aos usuários finais.

## Escopo do Produto

Para a definição do escopo do produto e seus requisitos, a metodologia usada será a de Histórias de Usuário. Entretanto, visto que não temos um cliente direto, os requisitos serão levantados internamente mediante pesquisa e Brainstorming. Dessa forma, para cada história de usuário, tentaremos seguir o conceito INVEST, ou seja, cada história de usuário deve ser:

**Independent (Independente):** pode ser implementada em qualquer ordem;

**Negotiable (Negociável):** pode ser negociada e alterada a qualquer instante;

**Valuable (Valorosa):** entregar valor;

**Estimable (Estimável):** capaz de ser estimada;

**Small (Pequena):** caber em uma Sprint (uma a duas semanas);

**Testable (Testável):** possível de ser validada.

## Histórias de Usuário
| "US/TS" | Eu, como    | Quero / Preciso / Devo / Gostaria de                                  | Para / A fim de       |
| ------- | ----------- | --------------------------------------------------------------------- | --------------------- |
|US01	  |Direção   	|Cadastrar os meus alunos a partir de uma planilha de excel    |Facilitar a importação de dados dos vários alunos da minha instituição para a plataforma|
|US02	  |	Direção	    |Gerenciar as turmas e os alunos que as compõem	                 |Organizar os alunos em suas turmas|
|US03	  |	Direção	    |Gerenciar as disciplinas que serão lecionadas pela instituição	   |Permitir o acompanhamento de cada uma individualmente|
|US04	  |	Direção   	|Associar as turmas às disciplinas que serão lecionadas à elas      |Especificar as disciplinas que cada ano vai ter|
|US05	  |	Direção     |Gerenciar os professores e associá-los às suas disciplinas          |Acompanhar a performance dos alunos em uma disciplina com determinado professor|
|US06	  |	Professor	|Gerenciar o controle de presença dos alunos de uma turma em uma disciplina	       |Alertar os alunos que se aproximarem do número máximo de faltas|
|US07	  |	Professor	|Gerenciar as avaliações e tarefas de cada disciplina	              |Possibilitar a organização avaliativa da disciplina|
|US08	  |	Professor	|Gerenciar as notas dos alunos em cada avaliação de uma disciplina	    |A plataforma armazenar e usar esses valores|
|US09	  |	Direção	    |Personalizar os critérios para identificação de baixo desempenho com base nas necessidades pedagógicas da minha instituição	|Que a plataforma atenda às nossas práticas únicas|
|US10	  |	Todos	    |Receber notificações sobre alunos em risco de baixo desempenho ou de reprovação   |Permitir que a instituição e o aluno intervenham e tomem uma decisão
|US11	  |	Direção e Professor	| Visualizar relatórios detalhados sobre o desempenho acadêmico de nossos alunos ao longo do tempo             |Identificar tendências e tomar decisões informadas para aprimorar o ensino|
|US12	  |	Direção e Professor |	Acessar análises preditivas do desempenho dos alunos para identificar fatores que levam ao baixo desempenho	    |Tomarmos medidas preventivas|
|US13	  |	Aluno	    |Ter acesso a relatórios individuais e personalizados sobre meu desempenho acadêmico	|Entender meu progresso e áreas que precisam de mais atenção| 
|US14	  |	Aluno	    |Receber recomendações de estudo com base nas análises e nas predições de desempenho	  |Me ajudar a focar em áreas específicas de aprendizado|
|US15	  |	BRISA	    |Ter acesso a um relatório que ilustra como a plataforma contribuiu para a melhoria do rendimento acadêmico nas instituições   |Compartilhar com investidores e stakeholders|
<!-- |TS01	  |	Desenvolvedor |	Fazer a modelagem do banco de dados	| Possiblitar o registro e funcionamento da aplicação	|
|TS02	  |	Desenvolvedor |	Implementar algoritmos de aprendizado de máquina para prever o desempenho dos alunos	| Fornecer insights valiosos para as instituições mediante a plataforma|
|TS03	  |	Desenvolvedor |	Garantir a segurança dos dados dos alunos |	Implementando medidas de criptografia e conformidade com regulamentações de privacidade	| -->

## Requisitos
<table>
    <tr>
        <td rowspan="4" colspan="2">US01</td>
        <td></td>
        <td>RF01</td>	
        <td>Cadastrar instituições de ensino</td>
    </tr>
    <tr>
        <td></td>
        <td>RF02</td>
        <td>Exportar uma planilha com as colunas necessárias para cadastrar alunos</td>
    </tr>
    <tr>
        <td></td>
        <td >RF03</td>
        <td>Importar a planilha preenchida para cadastrar alunos</td>
    </tr>
    <tr>
        <td></td>
        <td>RF04</td>
        <td>Cadastrar alunos</td>
    </tr>
</table>

## Versionamento

| Versão | Data       | Modificação                         | Autor       |
| ------ | ---------- | ----------------------------------- | ----------- |
| 1.0    | 06/09/2023 | Criação do conteúdo                 | Mariana Rio |