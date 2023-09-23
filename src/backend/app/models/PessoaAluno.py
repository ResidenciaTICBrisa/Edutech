class PessoaAluno:
    cpf: int
    matricula: int
    nome: str
    genero: str
    siglaEstado: str
    cidade: str
    bairro: str
    cep: int
    logradouro: str
    numero: int
    complemento: str
    dataNascimento: str
    acessaInternet: bool

    def __init__(self, cpf, matricula, nome, genero, siglaEstado, cidade, bairro, cep, logradouro, numero, complemento, dataNascimento, acessaInternet):
        self.cpf = cpf
        self.matricula = matricula
        self.nome = nome
        self.genero = genero
        self.siglaEstado = siglaEstado
        self.cidade = cidade
        self.bairro = bairro
        self.cep = cep
        self.logradouro = logradouro
        self.numero = numero
        self.complemento = complemento
        self.dataNascimento = dataNascimento
        self.acessaInternet = acessaInternet