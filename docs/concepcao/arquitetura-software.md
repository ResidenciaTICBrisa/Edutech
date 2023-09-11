# Visão Geral da Arquitetura de Software

Este documento apresenta a arquitetura de software adotada para o projeto, que se baseia em um monolito que combina React para o front-end e FastAPI para o back-end, com dados armazenados no MySQL. O React oferece uma interface de usuário amigável, enquanto o FastAPI fornece um backend rápido e escalável. O MySQL foi escolhido devido à sua confiabilidade e presença de uma interface gráfica para gerenciamento de dados. Essa arquitetura suporta a gestão e análise do desempenho acadêmico dos alunos de forma eficaz.

## Descrição da Arquitetura de Software

monolito, React, Fast API, MySQL

[descreva a arquitetura de software definida para o projeto, detalhando as decisões arquiteturais tomadas, como os componentes do sistema se relacionam e como a comunicação ocorre entre eles. Diagrama de Componentes, Diagrama de Pacotes...]

- **FastAPI**: O principal motivo pela escolha foi o fato de ser rápido, fácil e de ser a mesma linguagem usada para treinar os modelos de machine learning.

- **React**: Já a escolha do React foi por conta da baixa curva de aprendizado, popularidade no mercado e familiaridade por parte de algum dos membros.

- **MySQL**: Essa tecnologia foi definida por conta da familiridade de alguns membros da equipe, tal como a presença de uma interface gráfica para interação com o banco. Além disso, é um dos sistemas gerenciadores de banco de dados relacional mais comuns no mercado.

## Modelagem e Desenho do Banco de Dados

### Modelo Entidade-Relacionamento (ME-R)

#### Entidades

#### Atributos

#### Relacionamentos

### Diagrama Entidade-Relacionamento (DE-R)

### Diagrama Lógico de Dados (DLD)

## Referências Bibliográficas

1. https://fastapi.tiangolo.com
1. https://react.dev/learn
1. https://dev.mysql.com/doc/
1. https://numpy.org/doc/
1. https://pandas.pydata.org/docs/
1. https://scikit-learn.org/stable/
1. https://www.tensorflow.org/api_docs

## Versionamento

| Versão | Data       | Modificação                       | Autor        |
| ------ | ---------- | --------------------------------- | ------------ |
| 1.0    | 20/08/2023 | Criação do conteúdo               | Fause Carlos |
| 2.0    | 21/08/2023 | Melhoria da formatação e conteúdo | Luís Lins    |
| 3.0    | 06/09/2023 | Adição de texto introdutório      | Carlos Vaz   |