from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Configuração do CORS
origins = [
    "http://localhost:3000",    # Se o front-end estiver rodando em uma porta diferente
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    id: int
    content: str

@app.get("/")
def read_root():
    try:
        db_connection = mysql.connector.connect(
            host="db",   # Nome do serviço do banco de dados no Docker Compose
            user="root",
            password="matrix123",
            database="studentdatabase"
        )

        cursor = db_connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM messages")
        messages = cursor.fetchall()
        
        cursor.close()
        db_connection.close()
        
        return JSONResponse(content=messages)
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

@app.post("/add_message")
def add_message(message: Message):
    try:
        db_connection = mysql.connector.connect(
            host="db",   # Nome do serviço do banco de dados no Docker Compose
            user="root",
            password="matrix123",
            database="studentdatabase"
        )

        cursor = db_connection.cursor()
        insert_query = "INSERT INTO messages (id, content) VALUES (%s, %s)"
        data = (message.id, message.content)
        cursor.execute(insert_query, data)
        db_connection.commit()

        cursor.close()
        db_connection.close()
        
        return JSONResponse(content={"message": "Message added successfully"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})
