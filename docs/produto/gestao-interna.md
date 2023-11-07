# Gestão Interna da Instituição
Este documento descreve as características e funcionalidades do WebApp EduTech Future. O sistema oferece uma série de recursos para o cadastro de alunos, gerenciamento de turmas, disciplinas e professores, controle de presenças, avaliações e notas, bem como a personalização de critérios de identificação de baixo desempenho, tudo adaptado às necessidades pedagógicas da instituição.

![Cadastro](../imagens/cadastro.jpg)

## Cadastro de Alunos
A área de gestão interna permite o cadastro de alunos de forma individual ou por meio da importação de dados a partir de um arquivo CSV. Os seguintes campos podem ser registrados para cada aluno:

| Coluna | Descrição |
|-------|-----------|
| CPF | O Cadastro de Pessoa Física do aluno. |
| Matrícula | Número de matrícula do aluno. |
| Nome | Nome completo do aluno. |
| Gênero | Gênero do aluno. |
| Estado | Estado de residência do aluno. |
| Cidade | Cidade de residência do aluno. |
| Bairro | Bairro de residência do aluno. |
| CEP | Código de Endereçamento Postal da residência do aluno. |
| Logradouro | Nome da rua ou avenida da residência do aluno. |
| Número | Número da residência do aluno. |
| Complemento | Informações adicionais sobre o endereço do aluno. |
| Telefone | Número de telefone de contato do aluno. |
| Data de Nascimento | Data de nascimento do aluno. |
| Acesso à Internet em Casa | Indica se o aluno possui acesso à Internet em casa. |
| Deseja fazer Educação Superior | Indica se o aluno tem interesse em cursar o ensino superior. |
| Série | Série do aluno. |
| Turma | Turma à qual o aluno está associado. |
| Ano de Ingresso | Ano em que o aluno ingressou na instituição. |

## Cadastro de Instituições
Além do cadastro de alunos, a área de gestão interna permite o cadastro de instituições de ensino. Os seguintes dados podem ser registrados para cada instituição:

| Coluna | Descrição |
|-------|-----------|
| Nome | Nome da instituição de ensino. |
| CNPJ | Cadastro Nacional da Pessoa Jurídica da instituição. |
| CPF da Direção | CPF da pessoa responsável pela direção da instituição. |
| Email | Endereço de e-mail de contato da instituição. |
| Senha | Senha de acesso à área de administração da instituição. |

## Cadastro de Unidades
O sistema também possibilita o cadastro de unidades de ensino vinculadas a cada instituição. Os campos a serem preenchidos incluem:

| Coluna | Descrição |
|-------|-----------|
| CNPJ da Instituição | CNPJ da instituição à qual a unidade está associada. |
| Nível de Educação | Nível de ensino oferecido pela unidade. |
| Sigla do Estado | Sigla do estado em que a unidade está localizada. |
| Cidade | Cidade onde a unidade está situada. |
| Bairro | Bairro da localização da unidade. |
| CEP | Código de Endereçamento Postal da unidade. |
| Logradouro | Nome da rua ou avenida da localização da unidade. |
| Número | Número do prédio da unidade. |
| Complemento | Informações adicionais sobre a localização da unidade. |
| CPF do Coordenador | CPF do coordenador responsável pela unidade. |
| Telefone | Número de telefone de contato da unidade. |

## Cadastro de Disciplinas e Turmas
A área de gestão interna também permite o cadastro de disciplinas e turmas. Os seguintes campos são requeridos:

| Coluna | Descrição |
|-------|-----------|
| Série | Série à qual a disciplina está associada. |
| Letra | Letra que identifica a turma. |
| Ano | Ano da turma. |
| ID da Unidade | Identificador único da unidade à qual a disciplina e a turma estão vinculadas. |

| Versão | Data       | Modificação                  | Autor       |
| ------ | ---------- | ---------------------------- | ----------- |
| 1.0    | 28/10/2023 | Adição de texto explicativo  | Carlos Vaz  |
