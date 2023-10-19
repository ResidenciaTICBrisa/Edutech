from pydantic import BaseModel

class PessoaProfessor(BaseModel):
    cpf: str
    matricula: int
    nome: str
    genero: str
    siglaEstado: str
    cidade: str
    bairro: str
    cep: str
    logradouro: str
    numero: int
    complemento: str
    formacao: str
    telefone: str
    disciplinas: list