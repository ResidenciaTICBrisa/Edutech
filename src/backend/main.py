from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
import mysql.connector
from typing import List
import os
import mysql.connector.pooling
import asyncio
from dotenv import load_dotenv

from models.PessoaAluno import PessoaAluno
from models.Instituicao import InstituicaoLogin, Instituicao
from models.Unidade import Unidade
from models.Turma import Turma
from models.Disciplina import Disciplina
from models.PessoaProfessor import PessoaProfessor
from models.Avaliacao import Avaliacao


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
            await asyncio.sleep(1)

@app.on_event("startup")
async def on_startup():
    global connection_pool  # Torna a variável connection_pool global
    connection_pool = await check_db_availability()
    print("------- Database is available. FastAPI started. -------")

@app.get("/")
async def root():
    return "FastAPI Working!"

#region Alunos
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
            aluno['dataNascimento'] = aluno['dataNascimento'].strftime('%Y-%m-%d')
            aluno['ano'] = aluno['ano'].strftime('%Y-%m-%d')
        return JSONResponse(content=alunos)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar alunos: {err}")
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir dados no banco de dados: {err}")  

def inserir_pessoa(cursor, aluno):
    try:
        cursor.execute("""
            INSERT INTO PESSOA (cpf, matricula, nome, genero, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (aluno.cpf, aluno.matricula, aluno.nome, aluno.genero, aluno.siglaEstado, aluno.cidade, aluno.bairro, aluno.cep, aluno.logradouro, aluno.numero, aluno.complemento))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir na tabela PESSOA: {err}")

    try:
        cursor.execute("""
            INSERT INTO compoe (matricula, idTurma)
            VALUES (%s, %s)
        """, (aluno.matricula, aluno.idTurma))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir na tabela compoe: {err}")


def inserir_aluno(cursor, aluno):
    try:
        cursor.execute("""
            INSERT INTO ALUNO (matricula, dataNascimento, acessaInternet)
            VALUES (%s, %s, %s)
        """, (aluno.matricula, aluno.dataNascimento, aluno.acessaInternet))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir na tabela ALUNO: {err}")

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
        pass
        # cnx.rollback()
        # raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
#endregion

#region Instituições
@app.get("/instituicoes")
async def listar_instituicoes():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""SELECT cnpj, nome, cpfDirecao, email FROM INSTITUICAO""")
        instituicoes = cursor.fetchall()
        return JSONResponse(content=instituicoes)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar instituições: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.post("/instituicoes")
async def cadastrar_instituicao(instituicao: Instituicao):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO INSTITUICAO (cnpj, nome, cpfDirecao, email, senha) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (instituicao.cnpj, instituicao.nome, instituicao.cpfDirecao, instituicao.email, instituicao.senha))
        cnx.commit()
        return {"message": "Instituicao cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar instituicoes: {err}")
    finally:
        cursor.close()
        cnx.close()

#endregion

#region Unidades
@app.get("/unidades")
async def listar_unidades():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT I.nome, U.*, T.telefone FROM UNIDADE U
            JOIN INSTITUICAO I ON U.cnpjInstituicao = I.cnpj
            JOIN telefone_UNIDADE T ON U.idUnidade = T.idUnidade
        """)
        unidades = cursor.fetchall()
        return JSONResponse(content=unidades)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar as unidades: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.get("/instituicoes/{cnpj}/unidades")
async def listar_unidades_instituicao(cnpj: str):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT U.*, T.telefone FROM UNIDADE U
            JOIN telefone_UNIDADE T ON U.idUnidade = T.idUnidade
            WHERE cnpjInstituicao = %s
        """, (cnpj,))
        unidades = cursor.fetchall()
        return JSONResponse(content=unidades)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar as unidades da instituicao: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.post("/unidades")
async def cadastrar_unidade(unidade: Unidade):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO UNIDADE (cnpjInstituicao, nivelEducacao, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento, cpfCoordenador) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (unidade.cnpjInstituicao, unidade.nivelEducacao, unidade.siglaEstado, unidade.cidade, unidade.bairro, unidade.cep, unidade.logradouro, unidade.numero, unidade.complemento, unidade.cpfCoordenador))
        cnx.commit()
        return {"message": "Unidade cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
#endregion

#region Disciplinas
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar disciplinas: {err}")
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar as disciplinas da unidade: {err}")
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")

    try:
        sql = "SELECT codigo FROM DISCIPLINA WHERE nome = %s"
        cursor.execute(sql, (disciplina.nome,))
        codigo = cursor.fetchone()[0]
        sql = "INSERT INTO oferta (codigoDisciplina, idUnidade) VALUES (%s, %s)"
        cursor.execute(sql, (codigo, idUnidade))
        cnx.commit()
        return {"message": "Disciplina cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
#endregion

#region Turmas
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar turmas: {err}")
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar turmas: {err}")
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
#endregion

#region Professores
@app.get("/professores")
async def listar_professores():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""SELECT * FROM PESSOA P JOIN PROFESSOR A ON P.matricula = A.matricula""")
        professores = cursor.fetchall()
        return JSONResponse(content=professores)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar professores: {err}")
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
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir dados no banco de dados: {err}")
    
def inserir_professor(cursor, professor):
    try:
        cursor.execute("""
            INSERT INTO PROFESSOR (matricula, formacao)
            VALUES (%s, %s)
        """, (professor.matricula, professor.formacao))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir na tabela PESSOA: {err}")
#endregion

#region Avaliações
@app.get("/avaliacoes")
async def listar_avaliacoes():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""SELECT * FROM AVALIACAO""")
        avaliacoes = cursor.fetchall()
        return JSONResponse(content=avaliacoes)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar as avaliações: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.post("/avaliacoes")
async def cadastrar_avaliacao(avaliacao: Avaliacao):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO AVALIACAO (descricao, peso) VALUES (%s, %s)"
        cursor.execute(sql, (avaliacao.descricao, avaliacao.peso))
        cnx.commit()
        return {"message": "Avaliação cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
#endregion


