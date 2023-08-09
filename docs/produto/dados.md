# Dados

## Introdução

O dataset utilizado nesta etapa inicial é um dado mockado (falso) vindo do Kaggle, que pode ser encontrado [aqui](https://www.kaggle.com/datasets/devansodariya/student-performance-data). Isso se deu pois até o momento da elaboração deste documento, não temos os dados reais da instituição de ensino com a qual estamos trabalhando.

Esse dataset foi obtido por uma pesquisa em estudantes da disciplina de matemática de escolas de ensino médio. É composto por 33 informações sobre cada aluno, sendo algumas delas elas:

- school ID
- gender
- age
- size of family
- Father education
- Mother education
- Occupation of Father and Mother
- Family Relation
- Health
- Grades

Sendo as colunas de "Grades" as mais importantes para o nosso projeto, pois são elas que foram utilizadas para a previsão de notas dos alunos.

## Dicionário de Dados

| Coluna     | Descrição                            | Tipo           | Qtd. Valores Únicos | Valores                                                                               |
| ---------- | ------------------------------------ | -------------- | ------------------- | ------------------------------------------------------------------------------------- |
| school     | Tipo de escola                       | Texto          | 2                   | GP(Gabriel Pereira), MS(Mousinho da Silveira)                                         |
| sex        | Gênero do estudante                  | Caracter       | 2                   | M(Male), F(Female)                                                                    |
| age        | Idade do estudante                   | Número inteiro | 8                   | 15 - 22                                                                               |
| address    | Tipo de endereço do estudante        | Caracter       | 2                   | U(Urban), R(Rural)                                                                    |
| famsize    | Tamanho da família                   | Texto          | 2                   | GT3(>3), LE3(<=3)                                                                     |
| Pstatus    | Situação de coabitação dos parentes  | Caracter       | 2                   | T(Together), A(Apart)                                                                 |
| Medu       | Nível de educação da mãe             | Número Inteiro | 5                   | 0(none), 1(primary education), 2(5th to 9th grade), 3(secondary), 4(higher education) |
| Fedu       | Nível de educação do pai             | Número Inteiro | 5                   | 0(none), 1(primary education), 2(5th to 9th grade), 3(secondary), 4(higher education) |
| Mjob       | Ocupação da mãe                      | Texto          | 5                   | teacher, health, civil, at_home, other                                                |
| Fjob       | Ocupação do pai                      | Texto          | 5                   | teacher, health, civil, at_home, other                                                |
| reason     | Razão pela escolha da escola         | Texto          | 4                   | home, reputation, course, other                                                       |
| guardian   | Guardião da criança                  | Texto          | 3                   | mother, father, other                                                                 |
| traveltime | Tempo de trajeto até a escola        | Número inteiro | 4                   | 1(<5 min), 2(15 to 30 min), 3(30 min to 1 hour), 4(>1 hour)                           |
| studytime  | Tempo de estudo semanal              | Número inteiro | 4                   | 1(<2 hours), 2(2 to 5 hours), 3(5 to 10 hours), 4(>10 hours)                          |
| failures   | Número de reprovações                | Número inteiro | 4                   | 0 - 3                                                                                 |
| schoolsup  | Suporte educacional da escola        | Booleano       | 2                   | True(yes), False(no)                                                                  |
| famsup     | Suporte educacional da família       | Booleano       | 2                   | True(yes), False(no)                                                                  |
| paid       | Aulas de reforço pagas               | Booleano       | 2                   | True(yes), False(no)                                                                  |
| activities | Atividades extra-curriculares        | Booleano       | 2                   | True(yes), False(no)                                                                  |
| nursery    | Já precisou usar a enfermaria        | Booleano       | 2                   | True(yes), False(no)                                                                  |
| higher     | Quer fazer educação superior         | Booleano       | 2                   | True(yes), False(no)                                                                  |
| internet   | Tem acesso à internet em casa        | Booleano       | 2                   | True(yes), False(no)                                                                  |
| romantic   | Está em um relacionamento romântico  | Booleano       | 2                   | True(yes), False(no)                                                                  |
| famrel     | Qualidade do relacionamento familiar | Número Inteiro | 5                   | 1 - 5                                                                                 |
| freetime   | Tempo livre após escola              | Número Inteiro | 5                   | 1 - 5                                                                                 |
| goout      | Sai com os amigos                    | Número Inteiro | 5                   | 1 - 5                                                                                 |
| Dalc       | Consumo de álcool em dia de semana   | Número Inteiro | 5                   | 1 - 5                                                                                 |
| Walc       | Consumo de álcool em final de semana | Número Inteiro | 5                   | 1 - 5                                                                                 |
| health     | Estado de saúde                      | Número Inteiro | 5                   | 1 - 5                                                                                 |
| absenses   | Número de faltas                     | Número Inteiro | 94                  | 0 - 93                                                                                |
| G1         | Nota do primeiro período             | Número Inteiro | 21                  | 0 - 20                                                                                |
| G2         | Nota do segundo período              | Número Inteiro | 21                  | 0 - 20                                                                                |
| G3         | Nota final                           | Número Inteiro | 21                  | 0 - 20                                                                                |

## Versionamento

| Versão | Data       | Modificação         | Autor     |
| ------ | ---------- | ------------------- | --------- |
| 1.0    | 09/08/2023 | Criação do conteúdo | Luís Lins |
