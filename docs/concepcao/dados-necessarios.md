# Dados

Este documento apresenta os dados necessários para o desenvolvimento e o melhor aproveitamento do sistema EduTech, bem como a descrição do dataset utilizado para o treinamento dos modelos de machine learning.

## Introdução

O dataset utilizado nesta etapa inicial é um dado mockado (falso) vindo do Kaggle, que pode ser encontrado [aqui](https://www.kaggle.com/datasets/devansodariya/student-performance-data). Isso ocorre por conta do sistema necessitar da injeção dos dados da instituição para retornar as informações previstas

Esse dataset foi obtido por uma pesquisa em estudantes da disciplina de matemática de escolas de ensino médio. É composto por 33 informações sobre cada aluno, sendo algumas delas elas:

- school ID
- gender
- age
- Health
- Grades

Sendo as colunas de "Grades" as mais importantes para o nosso projeto, pois são elas que foram utilizadas para a previsão de notas dos alunos.

## Dicionário de Dados

| Coluna     | Descrição                            | Tipo           | Qtd. Valores Únicos | Valores                                                                               |
| ---------- | ------------------------------------ | -------------- | ------------------- | ------------------------------------------------------------------------------------- |
| school     | Tipo de escola                       | Texto          | 2                   | GP(Gabriel Pereira), MS(Mousinho da Silveira)                                         |
| sex        | Gênero do estudante                  | Caracter       | 2                   | M(Male), F(Female)                                                                    |
| age        | Idade do estudante                   | Número inteiro | 8                   | 15 - 22                                                                               |
| studytime  | Tempo de estudo semanal              | Número inteiro | 4                   | 1(<2 hours), 2(2 to 5 hours), 3(5 to 10 hours), 4(>10 hours)                          |
| failures   | Número de reprovações                | Número inteiro | 4                   | 0 - 3                                                                                 |
| higher     | Quer fazer educação superior         | Booleano       | 2                   | True(yes), False(no)                                                                  |
| internet   | Tem acesso à internet em casa        | Booleano       | 2                   | True(yes), False(no)                                                                                         |
| absenses   | Número de faltas                     | Número Inteiro | 94                  | 0 - 93                                                                                |
| G1         | Nota do primeiro período             | Número Inteiro | 21                  | 0 - 20                                                                                |
| G2         | Nota do segundo período              | Número Inteiro | 21                  | 0 - 20                                                                                |
| G3         | Nota final                           | Número Inteiro | 21                  | 0 - 20                                                                                |

## Versionamento

| Versão | Data       | Modificação         | Autor     |
| ------ | ---------- | ------------------- | --------- |
| 1.0    | 09/08/2023 | Criação do conteúdo | Luís Lins |
| 2.0    | 08/09/2023 | Atualização do conteúdo | FauseSkyWalker |
