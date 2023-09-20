CREATE DATABASE IF NOT EXISTS studentdatabase;

USE studentdatabase;

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT
);

-- CREATE DATABASE studentdatabase;
CREATE DATABASE IF NOT EXISTS studentdatabase;
USE studentdatabase;

CREATE TABLE escola (
    cnpj INT AUTO_INCREMENT PRIMARY KEY,
    nome TEXT,
    cpfDirecao INT
);

CREATE TABLE UNIDADE (
    idUnidade INT PRIMARY KEY,
    cnpjEscola INT,
    nivelEducacao ENUM('Superior', 'Médio', 'Fundamental', 'Cursinho'),
    siglaEstado CHAR(2),
    cidade VARCHAR(50),
    bairro VARCHAR(30),
    cep INT,
    logradouro VARCHAR(200),
    numero INT,
    complemento VARCHAR(200),
    cpfCoordenador INT
);

CREATE TABLE PESSOA (
    cpf INT,
    matricula INT,
    nome VARCHAR(200),
    genero ENUM('F', 'M'),
    siglaEstado CHAR(2),
    cidade VARCHAR(50),
    bairro VARCHAR(30),
    cep INT,
    logradouro VARCHAR(200),
    numero INT,
    complemento VARCHAR(200),
    PRIMARY KEY (cpf, matricula)
);

CREATE TABLE TURMA (
    idTurma INT PRIMARY KEY,
    serie INT,
    letra CHAR(2),
    ano DATE,
    idUnidade INT
);

CREATE TABLE DISCIPLINA (
    codigo INT PRIMARY KEY,
    nome VARCHAR(30)
);

CREATE TABLE AVALIACAO (
    idAvaliacao INT PRIMARY KEY,
    tipo VARCHAR(30),
    peso INT
);

CREATE TABLE ALUNO (
    cpf INT,
    matricula INT,
    dataNascimento DATE,
    acessaInternet Boolean,
    PRIMARY KEY (cpf, matricula)
);

CREATE TABLE PROFESSOR (
    cpf INT,
    matricula INT,
    formacao VARCHAR(200),
    PRIMARY KEY (cpf, matricula)
);

CREATE TABLE ALOCACAO_leciona (
    idAlocacao INT PRIMARY KEY,
    codigo INT,
    cpf INT,
    matricula INT,
    UNIQUE (codigo, matricula)
);

CREATE TABLE telefone_unidade (
    idUnidade INT NOT NULL,
    telefone INT,
    PRIMARY KEY (idUnidade, telefone)
);

CREATE TABLE telefone (
    cpf INT NOT NULL,
    telefone INT,
    PRIMARY KEY (cpf, telefone)
);

CREATE TABLE oferta (
    IdUnidade INT,
    codigo INT
);

CREATE TABLE compoe (
    idTurma INT,
    cpf INT,
    matricula INT
);

CREATE TABLE cursa (
    idTurma INT,
    codigo INT
);
 
ALTER TABLE UNIDADE ADD CONSTRAINT FK_UNIDADE_3
    FOREIGN KEY (cnpjEscola)
    REFERENCES ESCOLA (cnpj)
    ON DELETE RESTRICT;

ALTER TABLE TURMA ADD CONSTRAINT FK_TURMA_2
    FOREIGN KEY (idUnidade)
    REFERENCES UNIDADE (idUnidade)
    ON DELETE RESTRICT;
 
ALTER TABLE AVALIACAO ADD CONSTRAINT FK_AVALIACAO_2
    FOREIGN KEY (idAvaliacao)
    REFERENCES ALOCACAO_leciona (idAlocacao);
 
ALTER TABLE ALUNO ADD CONSTRAINT FK_ALUNO_2
    FOREIGN KEY (cpf, matricula)
    REFERENCES PESSOA (cpf, matricula)
    ON DELETE CASCADE;
 
ALTER TABLE PROFESSOR ADD CONSTRAINT FK_PROFESSOR_2
    FOREIGN KEY (cpf, matricula)
    REFERENCES PESSOA (cpf, matricula)
    ON DELETE CASCADE;
 
ALTER TABLE ALOCACAO_leciona ADD CONSTRAINT FK_ALOCACAO_leciona_1
    FOREIGN KEY (codigo)
    REFERENCES DISCIPLINA (codigo);
 
ALTER TABLE ALOCACAO_leciona ADD CONSTRAINT FK_ALOCACAO_leciona_2
    FOREIGN KEY (cpf, matricula)
    REFERENCES PROFESSOR (cpf, matricula);
 
ALTER TABLE telefone_unidade ADD CONSTRAINT FK_telefone_unidade_1
    FOREIGN KEY (idUnidade)
    REFERENCES UNIDADE (idUnidade);
 
ALTER TABLE oferta ADD CONSTRAINT FK_oferta_1
    FOREIGN KEY (IdUnidade)
    REFERENCES UNIDADE (idUnidade)
    ON DELETE RESTRICT;
 
ALTER TABLE oferta ADD CONSTRAINT FK_oferta_2
    FOREIGN KEY (codigo)
    REFERENCES DISCIPLINA (codigo)
    ON DELETE RESTRICT;
 
ALTER TABLE compoe ADD CONSTRAINT FK_compoe_1
    FOREIGN KEY (idTurma)
    REFERENCES TURMA (idTurma)
    ON DELETE RESTRICT;
 
ALTER TABLE compoe ADD CONSTRAINT FK_compoe_2
    FOREIGN KEY (cpf, matricula)
    REFERENCES ALUNO (cpf, matricula)
    ON DELETE RESTRICT;
 
ALTER TABLE cursa ADD CONSTRAINT FK_cursa_1
    FOREIGN KEY (idTurma)
    REFERENCES TURMA (idTurma)
    ON DELETE RESTRICT;
 
ALTER TABLE cursa ADD CONSTRAINT FK_cursa_2
    FOREIGN KEY (codigo)
    REFERENCES DISCIPLINA (codigo)
    ON DELETE RESTRICT;