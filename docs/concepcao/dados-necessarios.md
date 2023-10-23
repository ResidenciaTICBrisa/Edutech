# Dados

Este documento apresenta os dados necessários para o desenvolvimento e o melhor aproveitamento do sistema EduTech, bem como a descrição do dataset utilizado para o treinamento dos modelos de machine learning.

## Descrição

# Descrições das Colunas de Dados

Aqui estão as descrições para as colunas de dados:

1. **sex** (Gênero do estudante):
   - **Descrição**: Esta coluna indica o gênero do estudante.
   - **Tipo**: Caracter
   - **Quantidade de Valores Únicos**: 2
   - **Valores**: M (Male), F (Female)

2. **age** (Idade do estudante):
   - **Descrição**: Esta coluna representa a idade do estudante.
   - **Tipo**: Número inteiro
   - **Quantidade de Valores Únicos**: 8
   - **Valores**: 15 a 22

3. **studytime** (Tempo de estudo semanal):
   - **Descrição**: Esta coluna indica o tempo de estudo semanal do estudante.
   - **Tipo**: Número inteiro
   - **Quantidade de Valores Únicos**: 4
   - **Valores**: 1 (<2 hours), 2 (2 to 5 hours), 3 (5 to 10 hours), 4 (>10 hours)

4. **failures** (Número de reprovações):
   - **Descrição**: Esta coluna representa o número de reprovações do estudante.
   - **Tipo**: Número inteiro
   - **Quantidade de Valores Únicos**: 4
   - **Valores**: 0 a 3

5. **higher** (Quer fazer educação superior):
   - **Descrição**: Esta coluna indica se o estudante tem interesse em prosseguir com a educação superior.
   - **Tipo**: Booleano
   - **Quantidade de Valores Únicos**: 2
   - **Valores**: True (yes), False (no)

6. **internet** (Tem acesso à internet em casa):
   - **Descrição**: Esta coluna indica se o estudante tem acesso à internet em casa.
   - **Tipo**: Booleano
   - **Quantidade de Valores Únicos**: 2
   - **Valores**: True (yes), False (no)

7. **absences** (Número de faltas):
   - **Descrição**: Esta coluna representa o número de faltas do estudante.
   - **Tipo**: Número Inteiro
   - **Quantidade de Valores Únicos**: 94
   - **Valores**: 0 a 93

## Dicionário de Dados

| Coluna    | Descrição                     | Tipo           | Qtd. Valores Únicos | Valores                                                      |
| --------- | ----------------------------- | -------------- | ------------------- | ------------------------------------------------------------ |
| sex       | Gênero do estudante           | Caracter       | 2                   | M(Male), F(Female)                                           |
| age       | Idade do estudante            | Número inteiro | 8                   | 15 - 22                                                      |
| studytime | Tempo de estudo semanal       | Número inteiro | 4                   | 1(<2 hours), 2(2 to 5 hours), 3(5 to 10 hours), 4(>10 hours) |
| failures  | Número de reprovações         | Número inteiro | 4                   | 0 - 3                                                        |
| higher    | Quer fazer educação superior  | Booleano       | 2                   | True(yes), False(no)                                         |
| internet  | Tem acesso à internet em casa | Booleano       | 2                   | True(yes), False(no)                                         |
| absenses  | Número de faltas              | Número Inteiro | 94                  | 0 - 93                                                       |

## Versionamento

| Versão | Data       | Modificação                                             | Autor          |
| ------ | ---------- | ------------------------------------------------------- | -------------- |
| 1.0    | 09/08/2023 | Criação do conteúdo                                     | Luís Lins      |
| 2.0    | 08/09/2023 | Atualização do conteúdo                                 | FauseSkyWalker |
| 3.0    | 14/09/2023 | Remove informações sobre dataset antigo e melhora texto | Luís Lins      |
