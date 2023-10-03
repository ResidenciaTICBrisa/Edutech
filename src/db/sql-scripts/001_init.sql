CREATE DATABASE IF NOT EXISTS studentdatabase;

USE studentdatabase; -- TODO: Ids autoincrement e Alterar tipos numéricos como cnpj e cpf para varchar

CREATE TABLE IF NOT EXISTS ESCOLA (
    cnpj       INT         NOT NULL AUTO_INCREMENT,
    nome       VARCHAR(50) NOT NULL,
    cpfDirecao INT         NOT NULL,
    email      VARCHAR(50) NOT NULL,
    senha      VARCHAR(30) NOT NULL,
    
	CONSTRAINT ESCOLA_PK PRIMARY KEY (cnpj)
) ENGINE = InnoDB AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS UNIDADE (
    idUnidade      INT          AUTO_INCREMENT,
    cnpjEscola     INT          NOT NULL,
    nivelEducacao  ENUM('Superior', 'Médio', 'Fundamental', 'Cursinho') NOT NULL,
    siglaEstado    CHAR(2)      NOT NULL,
    cidade         VARCHAR(50)  NOT NULL,
    bairro         VARCHAR(30)  NOT NULL,
    cep            INT          NOT NULL,
    logradouro     VARCHAR(200) NOT NULL,
    numero         INT          NOT NULL,
    complemento    VARCHAR(200),
    cpfCoordenador INT          NOT NULL,
    
    CONSTRAINT UNIDADE_PK PRIMARY KEY (idUnidade),
    CONSTRAINT UNIDADE_ESCOLA_FK FOREIGN KEY (cnpjEscola)
		REFERENCES ESCOLA (cnpj)
		ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1;

CREATE VIEW nomePrecoProduto AS
SELECT Nome AS Produto,
       vlUnitario AS Preco
FROM Produtos;

CREATE TABLE IF NOT EXISTS PESSOA (
    cpf         INT            NOT NULL,
    matricula   INT            NOT NULL,
    nome        VARCHAR(200)   NOT NULL,
    genero      ENUM('F', 'M') NOT NULL,
    siglaEstado CHAR(2)        NOT NULL,
    cidade      VARCHAR(50)    NOT NULL,
    bairro      VARCHAR(30)    NOT NULL,
    cep         INT            NOT NULL,
    logradouro  VARCHAR(200),
    numero      INT            NOT NULL,
    complemento VARCHAR(200)   NOT NULL,
    
    CONSTRAINT PESSOA_PK PRIMARY KEY (cpf, matricula)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS TURMA (
    idTurma   INT     NOT NULL,
    serie     INT     NOT NULL,
    letra     CHAR(2) NOT NULL,
    ano       DATE    NOT NULL,
    idUnidade INT     NOT NULL,
    
    CONSTRAINT TURMA_PK PRIMARY KEY (idTurma),
    CONSTRAINT TURMA_UNIDADE_FK FOREIGN KEY (idUnidade)
		REFERENCES UNIDADE (idUnidade)
		ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS DISCIPLINA (
    codigo INT         NOT NULL,
    nome   VARCHAR(30) NOT NULL,
    
    CONSTRAINT DISCIPLINA_PK PRIMARY KEY (codigo)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS AVALIACAO (
    idAvaliacao INT         NOT NULL,
    tipo        VARCHAR(30) NOT NULL,
    peso        FLOAT       NOT NULL,
    
    CONSTRAINT AVALIACAO_PK PRIMARY KEY (idAvaliacao)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS ALUNO (
	  cpf            INT     NOT NULL,
    matricula      INT     NOT NULL,
    dataNascimento DATE    NOT NULL,
    acessaInternet BOOLEAN NOT NULL,
    
    CONSTRAINT ALUNO_PK PRIMARY KEY (matricula),
    CONSTRAINT ALUNO_PESSOA_FK FOREIGN KEY (cpf, matricula)
		REFERENCES PESSOA (cpf, matricula)
		ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS PROFESSOR (
    cpf       INT          NOT NULL,
    matricula INT          NOT NULL,
    formacao  VARCHAR(200) NOT NULL,

	CONSTRAINT PROFESSOR_PK PRIMARY KEY (matricula),
    CONSTRAINT PROFESSOR_PESSOA_FK FOREIGN KEY (cpf, matricula)
		REFERENCES PESSOA (cpf, matricula)
		ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS ALOCACAO_leciona (
    idAlocacao         INT NOT NULL,
    codigoDisciplina   INT NOT NULL,
    matriculaProfessor INT NOT NULL,
    
    CONSTRAINT ALOCACAO_leciona_PK PRIMARY KEY (idAlocacao),
    CONSTRAINT ALOCACAO_leciona_DISCIPLINA_FK FOREIGN KEY (codigoDisciplina)
		REFERENCES DISCIPLINA (codigo)
		ON DELETE CASCADE,
	CONSTRAINT ALOCACAO_leciona_PROFESSOR_FK FOREIGN KEY (matriculaProfessor)
		REFERENCES PROFESSOR (matricula)
		ON DELETE CASCADE,
    CONSTRAINT ALOCACAO_leciona_UK UNIQUE KEY (codigoDisciplina, matriculaProfessor)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS telefone_UNIDADE (
    idUnidade INT NOT NULL,
    telefone  INT NOT NULL,
    
    CONSTRAINT telefone_UNIDADE_PK PRIMARY KEY (idUnidade, telefone),
    CONSTRAINT telefone_UNIDADE_UNIDADE_FK FOREIGN KEY (idUnidade)
		REFERENCES UNIDADE (idUnidade)
		ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS telefone_PESSOA (
    cpf      INT NOT NULL,
    telefone INT NOT NULL,
	
    CONSTRAINT telefone_PESSOA_PK PRIMARY KEY (cpf, telefone),
    CONSTRAINT telefone_PESSOA_PESSOA_FK FOREIGN KEY (cpf)
		REFERENCES PESSOA (cpf)
		ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS oferta (
    idUnidade        INT  NOT NULL,
    codigoDisciplina INT  NOT NULL,
    
    CONSTRAINT oferta_PK PRIMARY KEY (IdUnidade, codigoDisciplina),
    CONSTRAINT oferta_DISCIPLINA_FK FOREIGN KEY (idUnidade)
		REFERENCES UNIDADE (idUnidade)
		ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS compoe (
    idTurma        INT NOT NULL,
    matriculaAluno INT NOT NULL,
    
    CONSTRAINT compoe_PK PRIMARY KEY (idTurma, matriculaAluno),
    CONSTRAINT compoe_TURMA_FK FOREIGN KEY (idTurma)
		REFERENCES TURMA (idTUrma)
		ON DELETE CASCADE,
	CONSTRAINT compoe_ALUNO_FK FOREIGN KEY (matriculaAluno)
		REFERENCES ALUNO (matricula)
		ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS cursa (
    idTurma          INT NOT NULL,
    codigoDisciplina INT NOT NULL,
    
    CONSTRAINT compoe_PK PRIMARY KEY (idTurma, codigoDisciplina),
    CONSTRAINT cursa_TURMA_FK FOREIGN KEY (idTurma)
		REFERENCES TURMA (idTUrma)
		ON DELETE CASCADE,
	CONSTRAINT cursa_DISCIPLINA_FK FOREIGN KEY (codigoDisciplina)
		REFERENCES DISCIPLINA (codigo)
		ON DELETE CASCADE
) ENGINE = InnoDB;