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
from models.Escola import EscolaLogin, Escola
from models.Unidade import Unidade
from models.Turma import Turma
from models.Disciplina import Disciplina


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
            await asyncio.sleep(300)

@app.on_event("startup")
async def on_startup():
    global connection_pool  # Torna a variável connection_pool global
    connection_pool = await check_db_availability()
    print("------- Database is available. FastAPI started. -------")

@app.get("/")
async def root():
    return "FastAPI Working!"

############ ALUNOS ############
@app.post("/alunos")
async def cadastrar_alunos(alunos: List[PessoaAluno]):
    try:
        for aluno in alunos:
            inserir_no_banco(aluno)
        return {"message": "Alunos cadastrados com sucesso!."}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir dados no banco de dados: {err}")
    
@app.get("/alunos")
async def listar_alunos():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT * FROM PESSOA P
            JOIN ALUNO A ON P.matricula = A.matricula
            WHERE P.matricula = A.matricula
        """)
        alunos = cursor.fetchall()
        for aluno in alunos:
            aluno['dataNascimento'] = aluno['dataNascimento'].strftime('%Y-%m-%d')
        return JSONResponse(content=alunos)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar alunos: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.get("/alunos/{matricula}")
async def buscar_aluno(matricula: int):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT * FROM PESSOA P
            JOIN ALUNO A ON P.matricula = A.matricula
            WHERE A.matricula = %s
        """, (matricula,))
        aluno = cursor.fetchone()
        if aluno:
            aluno['dataNascimento'] = aluno['dataNascimento'].strftime('%Y-%m-%d')
            return JSONResponse(content=aluno)
        else:
            return {"message": "Aluno não encontrado!"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar aluno: {err}")
    finally:
        cursor.close()
        cnx.close()

def inserir_pessoa(cursor, aluno):
    try:
        cursor.execute("""
            INSERT INTO PESSOA (cpf, matricula, nome, genero, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (aluno.cpf, aluno.matricula, aluno.nome, aluno.genero, aluno.siglaEstado, aluno.cidade, aluno.bairro, aluno.cep, aluno.logradouro, aluno.numero, aluno.complemento))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir na tabela PESSOA: {err}")

def inserir_aluno(cursor, aluno):
    try:
        cursor.execute("""
            INSERT INTO ALUNO (matricula, dataNascimento, acessaInternet)
            VALUES (%s, %s, %s)
        """, (aluno.matricula, aluno.dataNascimento, aluno.acessaInternet))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao inserir na tabela ALUNO: {err}")

def inserir_no_banco(aluno: PessoaAluno):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        inserir_pessoa(cursor, aluno)
        inserir_aluno(cursor, aluno)
        cnx.commit()
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()

############ ESCOLAS e UNIDADES ############
@app.get("/escolas")
async def listar_escolas():
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""SELECT cnpj, nome, cpfDirecao, email FROM ESCOLA""")
        escolas = cursor.fetchall()
        return JSONResponse(content=escolas)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar escolas: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.post("/escolas")
async def cadastrar_escola(escola: Escola):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO ESCOLA (cnpj, nome, cpfDirecao, email, senha) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (escola.cnpj, escola.nome, escola.cpfDirecao, escola.email, escola.senha))
        cnx.commit()
        return {"message": "Escola cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.post("/login")
async def login(escola_login: EscolaLogin):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT * FROM ESCOLA WHERE email = %s AND senha = %s", 
                       (escola_login.email, escola_login.senha))
        escola = cursor.fetchone()
        if escola:
            return {"message": "Login efetuado com sucesso!", "escola": escola}
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email ou senha incorretos!"
            )
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar escolas: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.get("/escolas/{cnpj}")
async def buscar_escola(cnpj: str):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""SELECT * FROM ESCOLA WHERE cnpj = %s""", (cnpj,))
        escola = cursor.fetchone()
        if escola:
            return JSONResponse(content=escola)
        else:
            return {"message": "Escola não encontrada!"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar escola: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.get("/escolas/{cnpj}/unidades")
async def listar_unidades(cnpj: str):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT * FROM UNIDADE
            WHERE cnpjEscola = %s""", (cnpj,))
        unidades = cursor.fetchall()
        if unidades:
            return JSONResponse(content=unidades)
        else:
            return {"message": "Escola não existe ou nenhuma unidade foi encontrada!"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar as unidades da escola: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.post("/escolas/{cnpj}/unidades")
async def cadastrar_unidade(cnpj: str, unidade: Unidade):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO UNIDADE (idUnidade, cnpjEscola, nivelEducacao, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento, cpfCoordenador) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (unidade.idUnidade, cnpj, unidade.nivelEducacao, unidade.siglaEstado, unidade.cidade, unidade.bairro, unidade.cep, unidade.logradouro, unidade.numero, unidade.complemento, unidade.cpfCoordenador))
        cnx.commit()
        return {"message": "Unidade cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.get("/escolas/{cnpj}/unidades/{idUnidade}")
async def buscar_unidade(cnpj: str, idUnidade: int):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT * FROM UNIDADE
            WHERE cnpjEscola = %s AND idUnidade = %s""", (cnpj, idUnidade))
        unidade = cursor.fetchone()
        if unidade:
            return JSONResponse(content=unidade)
        else:
            return {"message": "Unidade não encontrada!"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar unidade: {err}")
    finally:
        cursor.close()
        cnx.close()

############ DISCIPLINAS ############
@app.get("/unidades/{idUnidade}/disciplinas")
async def listar_disciplinas(idUnidade: int):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""
            SELECT D.*
            FROM DISCIPLINA D
            JOIN oferta ON codigoDisciplina = D.codigo
            WHERE idUnidade = %s""", (idUnidade,))
        disciplinas = cursor.fetchall()
        return JSONResponse(content=disciplinas)
    except mysql.connector.Error as err:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro ao consultar disciplinas: {err}")
    finally:
        cursor.close()
        cnx.close()

@app.post("/unidades/{idUnidade}/disciplinas")
async def cadastrar_disciplina(idUnidade: int, disciplina: Disciplina):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO DISCIPLINA (codigo, nome) VALUES (%s, %s)"
        cursor.execute(sql, (disciplina.codigo, disciplina.nome))
        cnx.commit()

        sql = "INSERT INTO oferta (codigoDisciplina, idUnidade) VALUES (%s, %s)"  ### TODO: Caso esse insert não funcione, o insert anterior deve ser desfeito
        cursor.execute(sql, (disciplina.codigo, idUnidade))
        cnx.commit()
        return {"message": "Disciplina cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()

############ TURMAS ############
@app.get("/unidades/{idUnidade}/turmas")
async def listar_turmas(idUnidade: int):
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
        sql = "INSERT INTO TURMA (idTurma, serie, letra, ano, idUnidade) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (turma.idTurma, turma.serie, turma.letra, turma.ano, idUnidade))
        cnx.commit()
        return {"message": "Turma cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro no banco de dados: {err}")
    finally:
        cursor.close()
        cnx.close()
