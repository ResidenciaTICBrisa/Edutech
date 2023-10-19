from pydantic import BaseModel

class PessoaAluno(BaseModel):
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
    dataNascimento: str
    acessaInternet: bool
    idTurma: int