from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
import mysql.connector
from mysql.connector import errorcode
from typing import List
import pandas as pd
from models.PessoaAluno import PessoaAluno
from models.Escola import EscolaLogin, Escola
import os
import tempfile
import shutil
from datetime import date
import mysql.connector.pooling
from typing import Optional
import asyncio


origins = [
    "*"
    "http://localhost:3000",
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
    "host": "db",
    "user": "root",
    "password": "matrix123",
    "database": "studentdatabase",
    "port": "3306"
}

async def check_db_availability():
    while True:
        try:
            # Tente conectar-se ao banco de dados
            cnx = mysql.connector.connect(**DB_CONFIG)
            cnx.close()
            print("MySQL is up - executing command")
            # Conexão bem-sucedida, retorne o connection_pool
            return mysql.connector.pooling.MySQLConnectionPool(
                pool_name="my_pool",
                pool_size=5,
                **DB_CONFIG
            )
        except mysql.connector.Error as err:
            print("MySQL is unavailable - sleeping")
            await asyncio.sleep(1)

@app.on_event("startup")
async def on_startup():
    print("Checking database availability...")
    global connection_pool  # Torna a variável connection_pool global
    connection_pool = await check_db_availability()
    print("Database is available. Starting FastAPI.")


## Endpoints
@app.get("/")
@app.get("/alunos/")
async def listar_alunos():
    try:
        # Obter uma conexão do pool
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)

        cursor.execute("""
            SELECT A.cpf, A.matricula, nome, genero, dataNascimento, acessaInternet, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento
            FROM PESSOA P, ALUNO A
            WHERE P.cpf = A.cpf
        """)

        # Obter os resultados como uma lista de dicionários
        alunos = cursor.fetchall()

        # Fechar o cursor
        cursor.close()

        # Retornar a conexão ao pool
        cnx.close()

        # Converter objetos de data para strings
        for aluno in alunos:
            aluno['dataNascimento'] = aluno['dataNascimento'].strftime('%Y-%m-%d')

        return JSONResponse(content=alunos)

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar alunos: {err}")

@app.post("/alunos/")
async def cadastrar_alunos(file: UploadFile):
    temp_dir = tempfile.mkdtemp()

    try:
        # Crie o caminho para o arquivo temporário
        file_path = os.path.join(temp_dir, file.filename)

        # Salve o conteúdo do arquivo temporário
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Leia o arquivo Excel a partir do arquivo temporário
        df = pd.read_excel(file_path)

        # Inicialize uma lista para armazenar os dados
        dados_a_inserir = []

        # Iterar sobre as linhas do DataFrame e processar os dados
        for _, row in df.iterrows():
            data = PessoaAluno(
                cpf=row['cpf'],
                matricula=row['matricula'],
                nome=row['nome'],
                genero=row['genero'],
                siglaEstado=row['siglaEstado'],
                cidade=row['cidade'],
                bairro=row['bairro'],
                cep=row['cep'],
                logradouro=row['logradouro'],
                numero=row['numero'],
                complemento=row['complemento'],
                dataNascimento=row['dataNascimento'],
                acessaInternet=row['acessaInternet']
            )
            dados_a_inserir.append(data)

        # Inserir os dados no banco de dados dentro de uma transação
        try:
            for data in dados_a_inserir:
                inserir_no_banco(data)

        except mysql.connector.Error as err:
            # Reverter as alterações em caso de erro
            cnx.rollback()
            raise HTTPException(status_code=500, detail=f"Erro ao inserir dados no banco de dados: {err}")

    finally:
        # Limpe os arquivos temporários
        shutil.rmtree(temp_dir)

    return {"message": "Alunos cadastrados com sucesso!."}

@app.get("/alunos/{matricula}")
async def buscar_aluno(matricula: int):
    try:
        # Obter uma conexão do pool
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)

        cursor.execute("""
            SELECT A.cpf, A.matricula, nome, genero, dataNascimento, acessaInternet, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento
            FROM PESSOA P, ALUNO A
            WHERE P.cpf = A.cpf AND A.matricula = %s
        """, (matricula,))

        # Obter o resultado como um dicionário
        aluno = cursor.fetchone()

        # Fechar o cursor
        cursor.close()

        # Retornar a conexão ao pool
        cnx.close()

        # Converter objeto de data para string
        aluno['dataNascimento'] = aluno['dataNascimento'].strftime('%Y-%m-%d')

        return JSONResponse(content=aluno)

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar aluno: {err}")

# Função para inserir dados na tabela PESSOA
def inserir_pessoa(cursor, data):
    try:
        cursor.execute("""
            INSERT INTO PESSOA (cpf, matricula, nome, genero, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (data.cpf, data.matricula, data.nome, data.genero, data.siglaEstado, data.cidade, data.bairro, data.cep, data.logradouro, data.numero, data.complemento))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Erro ao inserir na tabela PESSOA: {err}")

# Função para inserir dados na tabela ALUNO
def inserir_aluno(cursor, data):
    try:
        cursor.execute("""
            INSERT INTO ALUNO (cpf, matricula, dataNascimento, acessaInternet)
            VALUES (%s, %s, %s, %s)
        """, (data.cpf, data.matricula, data.dataNascimento, data.acessaInternet))
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Erro ao inserir na tabela ALUNO: {err}")

# Função para inserir os dados no banco
def inserir_no_banco(data):
    try:
        # Obter uma conexão do pool
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()

        # Inserir na tabela PESSOA
        inserir_pessoa(cursor, data)

        # Inserir na tabela ALUNO
        inserir_aluno(cursor, data)

        # Commit para efetivar as inserções
        cnx.commit()

    except mysql.connector.Error as err:
        # Reverter as alterações em caso de erro
        cnx.rollback()
        raise HTTPException(status_code=500, detail=f"Erro no banco de dados: {err}")

    finally:
        # Fechar o cursor e retornar a conexão ao pool
        cursor.close()
        cnx.close()

@app.get("/escolas/")
async def listar_escolas():
    try:
        # Obter uma conexão do pool
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)

        cursor.execute("""SELECT * FROM ESCOLA""")

        # Obter os resultados como uma lista de dicionários
        escolas = cursor.fetchall()

        # Fechar o cursor
        cursor.close()

        # Retornar a conexão ao pool
        cnx.close()

        return JSONResponse(content=escolas)

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar escolas: {err}")

@app.post("/escolas/")
@app.post("/cadastro/")
async def cadastrar_escola(escola: Escola):
    try:
        # Obter uma conexão do pool
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor()
        sql = "INSERT INTO ESCOLA (cnpj, nome, cpfDirecao, email, senha) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (escola.cnpj, escola.nome, escola.cpfDirecao, escola.email, escola.senha))
        # Commit para efetivar as inserções
        cnx.commit()
        return {"message": "Escola cadastrada com sucesso!"}
    except mysql.connector.Error as err:
        cnx.rollback()
        raise HTTPException(status_code=500, detail=f"Erro no banco de dados: {err}")
    finally:
        # Fechar o cursor e retornar a conexão ao pool
        cursor.close()
        cnx.close()

@app.get("/escolas/{cnpj}")
async def buscar_escola(cnpj: str):
    try:
        # Obter uma conexão do pool
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)

        cursor.execute("""SELECT * FROM ESCOLA WHERE cnpj = %s""", (cnpj,))

        # Obter o resultado como um dicionário
        escola = cursor.fetchone()

        # Fechar o cursor
        cursor.close()

        # Retornar a conexão ao pool
        cnx.close()

        return JSONResponse(content=escola)

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar escola: {err}")

@app.post("/login/")
async def login(escola_login: EscolaLogin):
    try:
        cnx = connection_pool.get_connection()
        cursor = cnx.cursor(dictionary=True)

        cursor.execute("SELECT * FROM ESCOLA WHERE email = %s AND senha = %s", 
                       (escola_login.email, escola_login.senha))

        escola = cursor.fetchone()

        cursor.close()
        cnx.close()

        if escola:
            return {"message": "Login efetuado com sucesso!", "escola": escola}
        else:
            return {"message": "Email ou senha incorretos!"}

    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Erro ao consultar escolas: {err}")
