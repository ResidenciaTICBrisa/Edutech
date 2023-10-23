-- Inserções na tabela INSTITUICAO
INSERT INTO INSTITUICAO (cnpj, nome, cpfDirecao, email, senha)
VALUES
    ('12345678901234', 'Instituicao A', '12345678901', 'insta@email.com', 'senha123'),
    ('98765432109876', 'Instituicao B', '98765432109', 'instb@email.com', 'senha456'),
    ('11111111111111', 'Instituicao C', '11111111111', 'instc@email.com', 'senha789'),
    ('22222222222222', 'Instituicao D', '22222222222', 'instd@email.com', 'senhaabc'),
    ('33333333333333', 'Instituicao E', '33333333333', 'inste@email.com', 'senhaxyz');

-- Inserções na tabela UNIDADE
INSERT INTO UNIDADE (cnpjInstituicao, nivelEducacao, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento, cpfCoordenador, telefone)
VALUES
    ('12345678901234', 'Superior', 'SP', 'Sao Paulo', 'Centro', '01234-567', 'Avenida 1', 123, 'Sala 101', '12345678901', '123-456-7890'),
    ('12345678901234', 'Médio', 'SP', 'Sao Paulo', 'Perdizes', '01234-567', 'Rua 2', 456, NULL, '12345678901', '123-456-7890'),
    ('98765432109876', 'Superior', 'RJ', 'Rio de Janeiro', 'Copacabana', '98765-432', 'Avenida 3', 789, NULL, '98765432109', '987-654-3210'),
    ('11111111111111', 'Fundamental', 'MG', 'Belo Horizonte', 'Savassi', '11111-111', 'Rua 4', 101, NULL, '11111111111', '111-111-1111'),
    ('22222222222222', 'Superior', 'SP', 'Sao Paulo', 'Vila Mariana', '22222-222', 'Avenida 5', 234, NULL, '22222222222', '222-222-2222');

-- Inserções na tabela PESSOA (Alunos)
INSERT INTO PESSOA (cpf, matricula, nome, genero, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento, telefone)
VALUES
    ('12345678901', 1, 'Joao Silva', 'M', 'SP', 'Sao Paulo', 'Centro', '01234-567', 'Avenida 1', 123, 'Apto 101', '111-111-1111'),
    ('98765432109', 2, 'Maria Souza', 'F', 'RJ', 'Rio de Janeiro', 'Copacabana', '98765-432', 'Rua 2', 456, NULL, '222-222-2222'),
    ('11111111111', 3, 'Pedro Santos', 'M', 'MG', 'Belo Horizonte', 'Savassi', '11111-111', 'Rua 3', 789, 'Sala 201', '333-333-3333'),
    ('22222222222', 4, 'Ana Ferreira', 'F', 'SP', 'Sao Paulo', 'Vila Mariana', '22222-222', 'Avenida 4', 101, NULL, '444-444-4444'),
    ('33333333333', 5, 'Lucas Oliveira', 'M', 'RJ', 'Rio de Janeiro', 'Ipanema', '33333-333', 'Rua 5', 567, 'Loja 301', '555-555-5555'),
	('66666666666', 6, 'Joao Silva', 'M', 'SP', 'Sao Paulo', 'Centro', '01234-567', 'Avenida 1', 123, 'Apto 101', '111-111-1111'),
    ('77777777777', 7, 'Maria Souza', 'F', 'RJ', 'Rio de Janeiro', 'Copacabana', '98765-432', 'Rua 2', 456, NULL, '222-222-2222'),
    ('88888888888', 8, 'Pedro Santos', 'M', 'MG', 'Belo Horizonte', 'Savassi', '11111-111', 'Rua 3', 789, 'Sala 201', '333-333-3333'),
    ('99999999999', 9, 'Ana Ferreira', 'F', 'SP', 'Sao Paulo', 'Vila Mariana', '22222-222', 'Avenida 4', 101, NULL, '444-444-4444'),
    ('10101010101', 10, 'Lucas Oliveira', 'M', 'RJ', 'Rio de Janeiro', 'Ipanema', '33333-333', 'Rua 5', 567, 'Loja 301', '555-555-5555');

-- Inserções na tabela ALUNO
INSERT INTO ALUNO (matricula, dataNascimento, acessaInternet, educacaoSuperior)
VALUES
    (1, '2000-01-01', 1, 1),
    (2, '2001-02-02', 1, 0),
    (3, '2002-03-03', 1, 1),
    (4, '2003-04-04', 1, 0),
    (5, '2004-05-05', 1, 1);

-- Inserções na tabela PROFESSOR
INSERT INTO PROFESSOR (matricula, formacao)
VALUES
    (6, 'Doutor em Matematica'),
    (7, 'Mestre em Portugues'),
    (8, 'Doutor em Historia'),
    (9, 'Mestre em Ciencias'),
    (10, 'Doutor em Geografia');

-- Inserções na tabela TURMA
INSERT INTO TURMA (serie, letra, ano, idUnidade)
VALUES
    (1, 'A', '2023-01-01', 1),
    (2, 'B', '2023-01-01', 2),
    (3, 'C', '2023-01-01', 3),
    (1, 'D', '2023-01-01', 4),
    (2, 'E', '2023-01-01', 5);

-- Inserções na tabela DISCIPLINA
INSERT INTO DISCIPLINA (nome)
VALUES
    ('Matematica'),
    ('Portugues'),
    ('Historia'),
    ('Ciencias'),
    ('Geografia');

-- Inserções na tabela ministra (associação de professores a disciplinas)
INSERT INTO ministra (codigoDisciplina, matriculaProfessor)
VALUES
    (1, 6),
    (2, 7),
    (3, 8),
    (4, 9),
    (5, 10);

-- Inserções na tabela oferta (associação de disciplinas a unidades)
INSERT INTO oferta (idUnidade, codigoDisciplina)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- Inserções na tabela compoe (associação de alunos a turmas)
INSERT INTO compoe (idTurma, matriculaAluno)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- Inserções na tabela cursa (registro de desempenho acadêmico de alunos)
INSERT INTO cursa (matricula, codigoDisciplina, horasEstudoSemana, reprovacoes, faltas, notaAvaliacao1, notaAvaliacao2, notaAvaliacao3)
VALUES
    (1, 1, 2, 1, 10, 5, 6, 7),
    (2, 2, 3, 0, 12, 7, 4, 5),
    (3, 3, 1, 0, 8, 3, 8, 9),
    (4, 4, 5, 0, 15, 2, 3, 4),
    (5, 5, 0, 0, 9, 9, 9, 2);