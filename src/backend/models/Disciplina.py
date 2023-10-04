from pydantic import BaseModel

class Disciplina(BaseModel):
    codigo: int
    nome: str