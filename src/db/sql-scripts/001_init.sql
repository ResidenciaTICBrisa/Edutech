CREATE DATABASE IF NOT EXISTS studentdatabase;

USE studentdatabase;

CREATE TABLE IF NOT EXISTS INSTITUICAO (
    cnpj       VARCHAR(18) NOT NULL,
    nome       VARCHAR(50) NOT NULL,
    cpfDirecao VARCHAR(14) NOT NULL,
    email      VARCHAR(50) NOT NULL,
    senha      VARCHAR(30) NOT NULL,
    
    CONSTRAINT INSTITUICAO_PK PRIMARY KEY (cnpj)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS UNIDADE (
    idUnidade      INT          AUTO_INCREMENT,
    cnpjInstituicao     VARCHAR(18)  NOT NULL,
    nivelEducacao  ENUM('Superior', 'Médio', 'Fundamental', 'Cursinho') NOT NULL,
    siglaEstado    CHAR(2)      NOT NULL,
    cidade         VARCHAR(50)  NOT NULL,
    bairro         VARCHAR(30)  NOT NULL,
    cep            VARCHAR(9)   NOT NULL,
    logradouro     VARCHAR(200) NOT NULL,
    numero         INT          NOT NULL,
    complemento    VARCHAR(200),
    cpfCoordenador VARCHAR(14)  NOT NULL,
    telefone       VARCHAR(15)  NOT NULL,
    
    CONSTRAINT UNIDADE_PK PRIMARY KEY (idUnidade),
    CONSTRAINT UNIDADE_INSTITUICAO_FK FOREIGN KEY (cnpjInstituicao)
      REFERENCES INSTITUICAO (cnpj)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS PESSOA (
    cpf         VARCHAR(14)    NOT NULL,
    matricula   INT            NOT NULL,
    nome        VARCHAR(200)   NOT NULL,
    genero      VARCHAR(2)     NOT NULL,
    siglaEstado CHAR(2)        NOT NULL,
    cidade      VARCHAR(50)    NOT NULL,
    bairro      VARCHAR(30)    NOT NULL,
    cep         VARCHAR(9)     NOT NULL,
    logradouro  VARCHAR(200)   NOT NULL,
    numero      INT            NOT NULL,
    complemento VARCHAR(200),
    telefone    VARCHAR(15)    NOT NULL,
    
    CONSTRAINT PESSOA_PK PRIMARY KEY (matricula),
    CONSTRAINT PESSOA_UK UNIQUE KEY (cpf)
) ENGINE = InnoDB AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS ALUNO (
    matricula        INT     NOT NULL,
    dataNascimento   DATE    NOT NULL,
    acessaInternet   BOOLEAN NOT NULL,
    educacaoSuperior BOOLEAN NOT NULL,
    
    CONSTRAINT ALUNO_PK PRIMARY KEY (matricula),
    CONSTRAINT ALUNO_PESSOA_FK FOREIGN KEY (matricula)
      REFERENCES PESSOA (matricula)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS PROFESSOR (
    matricula INT          NOT NULL,
    formacao  VARCHAR(200) NOT NULL,

    CONSTRAINT PROFESSOR_PK PRIMARY KEY (matricula),
    CONSTRAINT PROFESSOR_PESSOA_FK FOREIGN KEY (matricula)
      REFERENCES PESSOA (matricula)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS TURMA (
    idTurma   INT     AUTO_INCREMENT,
    serie     INT     NOT NULL,
    letra     CHAR(2) NOT NULL,
    ano       DATE    NOT NULL,
    idUnidade INT     NOT NULL,
    
    CONSTRAINT TURMA_PK PRIMARY KEY (idTurma),
    CONSTRAINT TURMA_UNIDADE_FK FOREIGN KEY (idUnidade)
      REFERENCES UNIDADE (idUnidade)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS DISCIPLINA (
    codigo INT         AUTO_INCREMENT,
    nome   VARCHAR(30) NOT NULL,
    
    CONSTRAINT DISCIPLINA_PK PRIMARY KEY (codigo),
    CONSTRAINT DISCIPLINA_UK UNIQUE KEY (nome)
) ENGINE = InnoDB AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS ministra (
    idAlocacao         INT AUTO_INCREMENT,
    codigoDisciplina   INT NOT NULL,
    matriculaProfessor INT NOT NULL,
    
    CONSTRAINT ministra_PK PRIMARY KEY (idAlocacao),
    CONSTRAINT ministra_DISCIPLINA_FK FOREIGN KEY (codigoDisciplina)
      REFERENCES DISCIPLINA (codigo)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT ministra_PROFESSOR_FK FOREIGN KEY (matriculaProfessor)
      REFERENCES PROFESSOR (matricula)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT ministra_UK UNIQUE KEY (codigoDisciplina, matriculaProfessor)
) ENGINE = InnoDB AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS oferta (
    idUnidade        INT  NOT NULL,
    codigoDisciplina INT  NOT NULL,
    
    CONSTRAINT oferta_PK PRIMARY KEY (IdUnidade, codigoDisciplina),
    CONSTRAINT oferta_DISCIPLINA_FK FOREIGN KEY (idUnidade)
      REFERENCES UNIDADE (idUnidade)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS compoe (
    idTurma        INT NOT NULL,
    matriculaAluno INT NOT NULL,
    
    CONSTRAINT compoe_PK PRIMARY KEY (idTurma, matriculaAluno),
    CONSTRAINT compoe_TURMA_FK FOREIGN KEY (idTurma)
      REFERENCES TURMA (idTurma)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT compoe_ALUNO_FK FOREIGN KEY (matriculaAluno)
      REFERENCES ALUNO (matricula)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS cursa (
    matricula         INT NOT NULL,
    codigoDisciplina  INT NOT NULL,
    horasEstudoSemana INT NOT NULL DEFAULT 0,
    reprovacoes       INT NOT NULL DEFAULT 0,
    faltas            INT NOT NULL DEFAULT 0,
    notaAvaliacao1    FLOAT NOT NULL DEFAULT 0,
    notaAvaliacao2    FLOAT NOT NULL DEFAULT 0,
    notaAvaliacao3    FLOAT NOT NULL DEFAULT 0,
    
    CONSTRAINT cursa_PK PRIMARY KEY (matricula, codigoDisciplina),
    CONSTRAINT cursa_ALUNO_FK FOREIGN KEY (matricula)
      REFERENCES ALUNO (matricula)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT cursa_DISCIPLINA_FK FOREIGN KEY (codigoDisciplina)
      REFERENCES DISCIPLINA (codigo)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Views
DROP VIEW IF EXISTS DadosAlunosPredicao;

CREATE VIEW DadosAlunosPredicao AS
SELECT
    D.nome AS disciplina,
    A.matricula,
    P.nome
    I.nome AS school,
    P.genero AS sex,
    TIMESTAMPDIFF(YEAR, A.dataNascimento, CURDATE()) AS age,
    C.horasEstudoSemana AS studytime,
    C.reprovacoes AS failures,
    A.educacaoSuperior AS higher,
    A.acessaInternet AS internet,
    C.faltas AS absences,
    C.notaAvaliacao1 AS G1,
    C.notaAvaliacao2 AS G2,
    C.notaAvaliacao3 AS G3
FROM
    ALUNO A
    INNER JOIN PESSOA P ON A.matricula = P.matricula
    INNER JOIN cursa C ON A.matricula = C.matricula
    INNER JOIN DISCIPLINA D ON C.codigoDisciplina = D.codigo
    INNER JOIN compoe cp ON A.matricula = cp.matriculaAluno
    INNER JOIN TURMA T ON cp.idTurma = T.idTurma
    INNER JOIN UNIDADE U ON T.idUnidade = U.idUnidade
    INNER JOIN INSTITUICAO I ON U.cnpjInstituicao = I.cnpj;
