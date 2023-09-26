from pydantic import BaseModel

class Escola(BaseModel):
    cnpj: str
    nome: str
    cpf_responsavel: str
    email: str
    senha: str

class EscolaLogin(BaseModel):
    email: str
    senha: str