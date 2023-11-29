from pydantic import BaseModel

class Instituicao(BaseModel):
    cnpj: str
    nome: str
    cpfDirecao: str
    email: str
    senha: str

class InstituicaoLogin(BaseModel):
    email: str
    senha: str