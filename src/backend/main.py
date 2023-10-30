from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from fastai.tabular.all import Categorify
from fastai.callback.core import Callback
from fastai.metrics import mse
import mysql.connector
from typing import List
import os
import pandas as pd
import mysql.connector.pooling
import asyncio
from dotenv import load_dotenv
from fastai.tabular.all import *
import joblib

from classes.PessoaAluno import PessoaAluno
from classes.Instituicao import InstituicaoLogin, Instituicao
from classes.Unidade import Unidade
from classes.Turma import Turma
from classes.Disciplina import Disciplina
from classes.PessoaProfessor import PessoaProfessor
from classes.Avaliacao import Avaliacao

#region Configurações
# Carrega as variáveis do arquivo .env
load_dotenv()

origins = [
    os.getenv("FRONT_URL"),
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASS"),
    "database": os.getenv("DB_NAME"),
    "port": "3306"
}


async def check_db_availability():
    while True:
        try:
            # Tente conectar-se ao banco de dados
            cnx = mysql.connector.connect(**DB_CONFIG)
            cnx.close()
            # Conexão bem-sucedida, retorne o connection_pool
            return mysql.connector.pooling.MySQLConnectionPool(
                pool_name="my_pool",
                pool_size=5,
                **DB_CONFIG
            )
        except mysql.connector.Error as err:
            print("------- MySQL is still unavailable. Trying again. -------")
            await asyncio.sleep(10)


@app.on_event("startup")
async def on_startup():
    global connection_pool  # Torna a variável connection_pool global
    connection_pool = await check_db_availability()
    print("------- Database is available. FastAPI started. -------")
#endregion

@app.get("/")
async def root():
    return "FastAPI Working!"


# region Instituições
@app.get("/instituicoes")
async def listar_instituicoes():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute(
            """SELECT cnpj, nome, cpfDirecao, email FROM INSTITUICAO""")
        instituicoes = cursor.fetchall()
        return JSONResponse(content=instituicoes)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar instituições: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.post("/instituicoes")
async def cadastrar_instituicao(instituicao: Instituicao):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO INSTITUICAO (cnpj, nome, cpfDirecao, email, senha) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (instituicao.cnpj, instituicao.nome,
                       instituicao.cpfDirecao, instituicao.email, instituicao.senha))
        cnx.commit()
        return {"message": "Instituicao cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.post("/login")
async def login(instituicao_login: InstituicaoLogin):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT * FROM INSTITUICAO WHERE email = %s AND senha = %s",
                       (instituicao_login.email, instituicao_login.senha))
        instituicao = cursor.fetchone()
        if instituicao:
            return {"message": "Login efetuado com sucesso!", "instituicao": instituicao}
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email ou senha incorretos!"
            )
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar instituicoes: {err}")
    finally:
        cursor.close()
        cnx.close()

# endregion

# region Unidades
@app.get("/unidades")
async def listar_unidades():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT I.nome, U.*, U.telefone FROM UNIDADE U
            JOIN INSTITUICAO I ON U.cnpjInstituicao = I.cnpj
        """)
        unidades = cursor.fetchall()
        return JSONResponse(content=unidades)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar as unidades: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.get("/instituicoes/{cnpj}/unidades")
async def listar_unidades_instituicao(cnpj: str):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT * FROM UNIDADE
            WHERE cnpjInstituicao = %s
        """, (cnpj,))
        unidades = cursor.fetchall()
        return JSONResponse(content=unidades)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar as unidades da instituição: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.post("/unidades")
async def cadastrar_unidade(unidade: Unidade):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO UNIDADE (cnpjInstituicao, nivelEducacao, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento, cpfCoordenador, telefone) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (unidade.cnpjInstituicao, unidade.nivelEducacao, unidade.siglaEstado, unidade.cidade,
                       unidade.bairro, unidade.cep, unidade.logradouro, unidade.numero, unidade.complemento, unidade.cpfCoordenador, unidade.telefone))
        cnx.commit()
        return {"message": "Unidade cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
# endregion

# region Disciplinas
@app.get("/disciplinas")
async def listar_disciplinas():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT codigo, nome, idUnidade FROM DISCIPLINA D
            JOIN oferta O ON D.codigo = O.codigoDisciplina
        """)
        disciplinas = cursor.fetchall()
        return JSONResponse(content=disciplinas)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar disciplinas: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.get("/unidades/{idUnidade}/disciplinas")
async def listar_disciplinas_unidade(idUnidade: str):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT codigo, nome FROM DISCIPLINA D
            JOIN oferta O ON D.codigo = O.codigoDisciplina
            WHERE O.idUnidade = %s""", (idUnidade,))
        disciplinas = cursor.fetchall()
        return JSONResponse(content=disciplinas)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar as disciplinas da unidade: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.post("/unidades/{idUnidade}/disciplinas")
async def cadastrar_disciplina(idUnidade: str, disciplina: Disciplina):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO DISCIPLINA (nome) VALUES (%s)"
        cursor.execute(sql, (disciplina.nome,))
        cnx.commit()
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro no banco de dados: {err}")

    try:
        sql = "SELECT codigo FROM DISCIPLINA WHERE nome = %s"
        cursor.execute(sql, (disciplina.nome,))
        disciplina = cursor.fetchone()[0]
        sql = "INSERT INTO oferta (codigoDisciplina, idUnidade) VALUES (%s, %s)"
        cursor.execute(sql, (disciplina, idUnidade))
        cnx.commit()
        return {"message": "Disciplina cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
# endregion

# region Turmas
@app.get("/turmas")
async def listar_turmas():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""SELECT * FROM TURMA""")
        turmas = cursor.fetchall()
        for turma in turmas:
            turma['ano'] = turma['ano'].strftime('%Y-%m-%d')
        return JSONResponse(content=turmas)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar turmas: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.get("/unidades/{idUnidade}/turmas")
async def listar_turmas_unidade(idUnidade: int):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT * FROM TURMA
            WHERE idUnidade = %s""", (idUnidade,))
        turmas = cursor.fetchall()
        for turma in turmas:
            turma['ano'] = turma['ano'].strftime('%Y-%m-%d')
        return JSONResponse(content=turmas)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar turmas: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.post("/unidades/{idUnidade}/turmas")
async def cadastrar_turma(idUnidade: int, turma: Turma):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO TURMA (serie, letra, ano, idUnidade) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (turma.serie, turma.letra, turma.ano, idUnidade))
        cnx.commit()
        return {"message": "Turma cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
# endregion

# region Professores
@app.get("/professores")
async def listar_professores():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT P.* , A.formacao, GROUP_CONCAT(D.nome) AS disciplinasMinistradas
            FROM PESSOA P
            JOIN PROFESSOR A ON P.matricula = A.matricula
            JOIN ministra M ON A.matricula = M.matriculaProfessor
            JOIN DISCIPLINA D ON M.codigoDisciplina = D.codigo
            GROUP BY P.matricula;
        """)
        professores = cursor.fetchall()
        return JSONResponse(content=professores)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar professores: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.post("/professores")
async def cadastrar_professores(professores: List[PessoaProfessor]):
    try:
        for professor in professores:
            inserir_no_banco(professor)
        return {"message": "Professores cadastrados com sucesso!."}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao inserir dados no banco de dados: {err}")


def inserir_professor(cursor, professor):
    try:
        cursor.execute("""
            INSERT INTO PROFESSOR (matricula, formacao)
            VALUES (%s, %s)
        """, (professor.matricula, professor.formacao))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao inserir na tabela PROFESSOR: {err}")

    try:
        for disciplina in professor.disciplinas:
            cursor.execute("""
                INSERT INTO ministra (matriculaProfessor, codigoDisciplina)
                VALUES (%s, %s)
            """, (professor.matricula, disciplina))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao inserir na tabela ministra: {err}")
# endregion

# region Alunos
@app.get("/alunos")
async def listar_alunos():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT P.*, A.*, T.serie, T.letra, T.ano FROM PESSOA P
            JOIN ALUNO A ON P.matricula = A.matricula
            JOIN compoe C ON A.matricula = C.matriculaAluno
            JOIN TURMA T ON C.idTurma = T.idTurma
        """)
        alunos = cursor.fetchall()
        for aluno in alunos:
            aluno['dataNascimento'] = aluno['dataNascimento'].strftime(
                '%Y-%m-%d')
            aluno['ano'] = aluno['ano'].strftime('%Y-%m-%d')
        return JSONResponse(content=alunos)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao consultar alunos: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.post("/alunos")
async def cadastrar_alunos(alunos: List[PessoaAluno]):
    try:
        for aluno in alunos:
            inserir_no_banco(aluno)
        return {"message": "Alunos cadastrados com sucesso!."}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao inserir dados no banco de dados: {err}")

def inserir_no_banco(pessoa: any):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        inserir_pessoa(cursor, pessoa)
        if isinstance(pessoa, PessoaAluno):
            inserir_aluno(cursor, pessoa)
        else:
            inserir_professor(cursor, pessoa)
        cnx.commit()
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()

def inserir_pessoa(cursor, aluno):
    try:
        cursor.execute("""
            INSERT INTO PESSOA (cpf, matricula, nome, genero, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento, telefone)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (aluno.cpf, aluno.matricula, aluno.nome, aluno.genero, aluno.siglaEstado, aluno.cidade, aluno.bairro, aluno.cep, aluno.logradouro, aluno.numero, aluno.complemento, aluno.telefone))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao inserir na tabela PESSOA: {err}")

def inserir_aluno(cursor, aluno):
    try:
        cursor.execute("""
            INSERT INTO ALUNO (matricula, dataNascimento, acessaInternet, educacaoSuperior)
            VALUES (%s, %s, %s, %s)
        """, (aluno.matricula, aluno.dataNascimento, aluno.acessaInternet, aluno.educacaoSuperior))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao inserir na tabela ALUNO: {err}")

    try:
        cursor.execute("""
            SELECT idTurma FROM TURMA
            WHERE serie = %s AND letra = %s AND ano = %s""", (aluno.serie, aluno.letra, aluno.ano))
        idTurma = cursor.fetchone()[0]
        if idTurma:
            cursor.execute("""
                INSERT INTO compoe (matriculaAluno, idTurma)
                VALUES (%s, %s)
            """, (aluno.matricula, idTurma))
        else:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"Turma não encontrada!")
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao inserir na tabela compoe: {err}")

    try:
        for disciplina in aluno.disciplinasCursadas:
            cursor.execute("""
                INSERT INTO cursa (matricula, codigoDisciplina)
                VALUES (%s, %s)
            """, (aluno.matricula, disciplina))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Erro ao inserir na tabela cursa: {err}")

# endregion

# region Predição
async def listar_dados_alunos(disciplina: str):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        sql = "SELECT * FROM DadosAlunosPredicao WHERE disciplina = %s"
        cursor.execute(sql, (disciplina,))
        alunos = cursor.fetchall()
        return alunos
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar alunos: {err}")
    finally:
        cursor.close()
        cnx.close()


@app.get("/predicao/treinar/{disciplina}/avaliacao/{avaliacao}")
async def treinar_modelo_de_disciplina(disciplina: str, avaliacao: str):
    try:
        df = pd.read_csv("tests/student_data.csv", dtype={
            'school': str,
            'sex': str,
            'age': int,
            'studytime': int,
            'failures': int,
            'higher': int,
            'internet': int,
            'absences': int,
            'G1': float,
            'G2': float,
            'G3': float
        }) 

        cat_names = ["school", "sex", "higher", "internet"]
        cont_names = ['age', 'studytime', 'failures', 'absences']
        if avaliacao == "G2":
            cont_names.append("G1")
        elif avaliacao == "G3":
            cont_names.append("G1")
            cont_names.append("G2")

        procs = [Categorify, FillMissing, Normalize]
        to = TabularPandas(df, procs, cat_names, cont_names, y_names=avaliacao, splits=RandomSplitter(seed=42)(df)).dataloaders(bs=24)

        learn = tabular_learner(to)
        learn.fit_one_cycle(5)

        joblib.dump(learn, f"models/modelo_{disciplina}_{avaliacao}.pkl")

        return {"message": "Modelo treinado com sucesso!"}
    except Exception as e:
        return f"Erro ao treinar o modelo: {str(e)}"


@app.get("/predicao/{disciplina}/avaliacao/{avaliacao}")
async def predicao_desempenho_disciplina(disciplina: str, avaliacao: str):
    try:
        learn = joblib.load(f"models/modelo_{disciplina}_{avaliacao}.pkl")

        dados_alunos = await listar_dados_alunos(disciplina)
        new_df = pd.DataFrame(dados_alunos)
        new_df = new_df.astype({
            'disciplina': str,
            'matricula': int,
            'nome': str,
            'school': str,
            'sex': str,
            'age': int,
            'studytime': int,
            'failures': int,
            'higher': int,
            'internet': int,
            'absences': int,
            'G1': float,
            'G2': float,
            'G3': float
        })
        temp_df = new_df[["disciplina", "matricula"]]
        new_df.drop(["disciplina", "matricula"], axis=1, inplace=True)

        predictions, _ = learn.get_preds(dl=learn.dls.test_dl(new_df))
        previsaoAvaliacao = 'previsao_' + str(avaliacao)
        new_df[previsaoAvaliacao] = predictions[:, 0].numpy()
        resultado = pd.concat([temp_df, new_df], axis=1)
        resultado[previsaoAvaliacao] = resultado[previsaoAvaliacao].apply(lambda x: round(x, 2))

        return resultado.to_dict(orient="records")
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao fazer previsões.")

# endregion
