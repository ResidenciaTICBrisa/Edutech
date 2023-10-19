USE studentdatabase;

INSERT INTO INSTITUICAO (cnpj, nome, cpfDirecao, email, senha) VALUES
('31726521000154', 'Instituicao Teste', '000.000.000-00', 'escola@email.com', 'senha');

INSERT INTO UNIDADE (cnpjInstituicao, nivelEducacao, siglaEstado, cidade, bairro, cep, logradouro, numero, cpfCoordenador)
VALUES
('31726521000154', 'Superior', 'SP', 'São Paulo', 'Centro', '00000-000', 'Rua A', 123, '111.111.111-11'),
('31726521000154', 'Médio', 'RJ', 'Rio de Janeiro', 'Copacabana', '11111-111', 'Avenida B', 456, '222.222.222-22'),
('31726521000154', 'Fundamental', 'MG', 'Belo Horizonte', 'Barreiro', '22222-222', 'Travessa C', 789, '333.333.333-33');

INSERT INTO TURMA (serie, letra, ano, idUnidade)
VALUES
(1, 'A', '2023-01-01', 1),
(2, 'B', '2023-01-01', 2),
(3, 'C', '2023-01-01', 3);

INSERT INTO DISCIPLINA (nome)
VALUES
('Matemática'),
('História'),
('Ciências');

INSERT INTO PESSOA (cpf, matricula, nome, genero, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento)
VALUES
('111.111.111-11', 1, 'Aluno 1', 'M', 'SP', 'São Paulo', 'Centro', '00000-000', 'Rua A', 123, 'Apto 101'),
('222.222.222-22', 2, 'Aluno 2', 'F', 'RJ', 'Rio de Janeiro', 'Copacabana', '11111-111', 'Avenida B', 456, 'Casa 2'),
('333.333.333-33', 3, 'Aluno 3', 'M', 'MG', 'Belo Horizonte', 'Barreiro', '22222-222', 'Travessa C', 789, NULL),
('444.444.444-44', 4, 'Professor 1', 'M', 'SP', 'São Paulo', 'Centro', '00000-000', 'Rua D', 321, 'Sala 101'),
('555.555.555-55', 5, 'Professor 2', 'F', 'RJ', 'Rio de Janeiro', 'Copacabana', '11111-111', 'Avenida E', 654, 'Sala 2'),
('666.666.666-66', 6, 'Professor 3', 'M', 'MG', 'Belo Horizonte', 'Barreiro', '22222-222', 'Travessa F', 987, 'Sala 3');

INSERT INTO ALUNO (matricula, dataNascimento, acessaInternet)
VALUES
(1, '2000-01-01', 1),
(2, '2001-02-02', 0),
(3, '2002-03-03', 1);

INSERT INTO PROFESSOR (matricula, formacao)
VALUES
(4, 'Doutor em Matemática'),
(5, 'Mestre em História'),
(6, 'Bacharel em Ciências');

INSERT INTO AVALIACAO (descricao, peso)
VALUES
('Prova 1', 0.3),
('Trabalho em Grupo', 0.2),
('Apresentação Oral', 0.1);

INSERT INTO ALOCACAO_leciona (codigoDisciplina, matriculaProfessor)
VALUES
(1, 4),
(2, 5),
(3, 6);

INSERT INTO telefone_UNIDADE (idUnidade, telefone)
VALUES
(1, '123-456-7890'),
(2, '987-654-3210'),
(3, '555-555-5555');

INSERT INTO telefone_PESSOA (matricula, telefone)
VALUES
(1, '111-222-3333'),
(2, '444-555-6666'),
(3, '777-888-9999');

INSERT INTO oferta (idUnidade, codigoDisciplina)
VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO compoe (idTurma, matriculaAluno)
VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO cursa (idTurma, codigoDisciplina)
VALUES
(1, 1),
(2, 2),
(3, 3);