from pydantic import BaseModel

class Avaliacao(BaseModel):
    descricao: str
    peso: float