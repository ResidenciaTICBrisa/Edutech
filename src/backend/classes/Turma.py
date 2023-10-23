from pydantic import BaseModel

class Turma(BaseModel):
    serie: int
    letra: str
    ano: str
    idUnidade: int