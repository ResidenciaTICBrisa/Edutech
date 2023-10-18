from pydantic import BaseModel

class Avaliacao(BaseModel):
    tipo: str
    peso: float