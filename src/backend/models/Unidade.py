from pydantic import BaseModel

class Unidade(BaseModel):
    cnpjInstituicao: str
    nivelEducacao: str
    siglaEstado: str
    cidade: str
    bairro: str
    cep: str
    logradouro: str
    numero: int
    complemento: str
    cpfCoordenador: str
