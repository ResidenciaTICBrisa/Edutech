from pydantic import BaseModel

class Turma(BaseModel):
    idTurma: int
    serie: int
    letra: str
    ano: str
    idUnidade: int