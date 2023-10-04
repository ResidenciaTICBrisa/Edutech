from pydantic import BaseModel

class Unidade(BaseModel):
    idUnidade: int
    cnpjEscola: int
    nivelEducacao: str
    siglaEstado: str
    cidade: str
    bairro: str
    cep: int
    logradouro: str
    numero: int
    complemento: str
    cpfCoordenador: int
