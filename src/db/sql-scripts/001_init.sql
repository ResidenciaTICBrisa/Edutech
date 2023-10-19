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

CREATE TABLE IF NOT EXISTS AVALIACAO (
    idAvaliacao  INT         AUTO_INCREMENT,
    descricao    VARCHAR(30) NOT NULL,
    peso         FLOAT       NOT NULL,
    idDisciplina INT         NOT NULL,
    
    CONSTRAINT AVALIACAO_PK PRIMARY KEY (idAvaliacao),
    CONSTRAINT AVALIACAO_DISCIPLINA_FK FOREIGN KEY (idDisciplina)
      REFERENCES DISCIPLINA (codigo)
      ON DELETE CASCADE
      ON UPDATE CASCADE
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

CREATE TABLE IF NOT EXISTS NOTA_ALUNO (
    idNota INT AUTO_INCREMENT,
    matriculaAluno INT NOT NULL,
    idAvaliacao INT NOT NULL,
    nota        FLOAT NOT NULL,
    
    CONSTRAINT NOTA_ALUNO_PK PRIMARY KEY (idNota),
    CONSTRAINT NOTA_ALUNO_ALUNO_FK FOREIGN KEY (matriculaAluno)
      REFERENCES ALUNO (matricula)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT NOTA_ALUNO_AVALIACAO_FK FOREIGN KEY (idAvaliacao)
      REFERENCES AVALIACAO (idAvaliacao)
      ON DELETE CASCADE
      ON UPDATE CASCADE
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
    faltas            INT NOT NULL,
    situacao          ENUM('Aprovado', 'Reprovado', 'Cursando') NOT NULL,
    horasEstudoSemana INT NOT NULL,
    reprovacoes       INT NOT NULL,
  
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


-- VIEWS
CREATE VIEW DadosAlunosPredicao AS
SELECT
    P.nome AS NomeDoAluno,
    P.matricula AS Matricula,
    T.serie AS Serie,
    T.letra AS Letra,
    T.ano AS Ano,
    C.horasEstudoSemana AS HorasDeEstudoSemanal,
    C.faltas AS Faltas,
    D.nome AS NomeDaDisciplina,
    GROUP_CONCAT(
        CONCAT(AV.descricao, ': ', COALESCE(NA.nota, 'N/A')) 
        ORDER BY AV.idAvaliacao 
        SEPARATOR ', '
    ) AS NotasDasAvaliacoes
FROM PESSOA P
JOIN ALUNO A ON P.matricula = A.matricula
JOIN cursa C ON A.matricula = C.matricula
JOIN DISCIPLINA D ON C.codigoDisciplina = D.codigo
JOIN compoe CP ON A.matricula = CP.matriculaAluno
JOIN TURMA T ON CP.idTurma = T.idTurma
LEFT JOIN ministra M ON D.codigo = M.codigoDisciplina
LEFT JOIN AVALIACAO AV ON M.codigoDisciplina = AV.idDisciplina
LEFT JOIN NOTA_ALUNO NA ON C.matricula = NA.matriculaAluno AND AV.idAvaliacao = NA.idAvaliacao
GROUP BY P.nome, P.matricula, T.serie, T.letra, T.ano, C.horasEstudoSemana, C.faltas, D.nome