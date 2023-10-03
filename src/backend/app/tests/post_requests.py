import requests


### CADASTRO DE ALUNOS POR ARQUIVO ###
# url = "http://localhost:8000/alunos"
# files = {"file": open("lista_alunos.xlsx", "rb")}
# response = requests.post(url, files=files)
# print("\nCADASTRO DE ALUNO POR ARQUIVO\n")
# print(response.json())
# print("\n---------------------------------------\n")

### CADASTRO DE ESCOLA ###
# url = "http://localhost:8000/escolas"
# data = {
#     "cnpj": "75893",
#     "nome": "Escola Teste 2",
#     "cpfDirecao": "92311",
#     "email": "escola2@email.com",
#     "senha": "senhaEscola2"
# }
# response = requests.post(url, json=data)
# print("CADASTRO DE ESCOLA\n")
# print(response.json())
# print("\n---------------------------------------\n")

### CADASTRO DE UNIDADE ###
# url = "http://localhost:8000/escolas/75893/unidades"
# data = {
#     "idUnidade": "106",
#     "cnpjEscola": 75893,
#     "nivelEducacao": "Superior",
#     "siglaEstado": "DF",
#     "cidade": "Brasília",
#     "bairro": "Asa Norte",
#     "cep": 70762,
#     "logradouro": "SGAN 914, Módulo A",
#     "numero": 1,
#     "complemento": "",
#     "cpfCoordenador": 12567
# }
# response = requests.post(url, json=data)
# print("CADASTRO DE UNIDADE\n")
# print(response.json())
# print("\n---------------------------------------\n")

### FAZER LOGIN ###
# url = "http://localhost:8000/login"
# data = {
#     "email": "escola2@email.com",
#     "senha": "senhaEscola2"
# }
# response = requests.post(url, json=data)
# print("LOGIN DE ESCOLA\n")
# print(response.json())
# print("\n---------------------------------------\n")

### CADASTRO DE TURMA ###
# url = "http://localhost:8000/escolas/75893/unidades/106/turmas"
# data = {
#     "idTurma": 2,
#     "serie": 2,
#     "letra": "C",
#     "ano": "2020-01-01",
#     "idUnidade": 106
# }
# response = requests.post(url, json=data)
# print("CADASTRO DE TURMA\n")
# print(response.json())
# print("\n---------------------------------------\n")

### CADASTRO DE DISCIPLINA ###
url = "http://localhost:8000/unidades/107/disciplinas"
data = {
    "codigo": 4,
    "nome": "Geografia"
}
response = requests.post(url, json=data)
print("CADASTRO DE DISCIPLINA\n")
print(response.json())
print("\n---------------------------------------\n")
