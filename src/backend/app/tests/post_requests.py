import requests


### CADASTRO DE ALUNOS POR ARQUIVO ###
url = "http://localhost:8000/alunos"
files = {"file": open("lista_alunos.xlsx", "rb")}
response = requests.post(url, files=files)
print("\nCADASTRO DE ALUNO POR ARQUIVO\n")
print(response.json())
print("\n---------------------------------------\n")

## CADASTRO DE ESCOLA ###
url = "http://localhost:8000/escolas"
data = {
    "cnpj": "75893",
    "nome": "Escola Teste 2",
    "cpfDirecao": "92311",
    "email": "escola2@email.com",
    "senha": "senhaEscola2"
}
response = requests.post(url, json=data)
print("CADASTRO DE ESCOLA\n")
print(response.json())
print("\n---------------------------------------\n")

### FAZER LOGIN ###
url = "http://localhost:8000/login"
data = {
    "email": "escola2@email.com",
    "senha": "senhaEscola2"
}
response = requests.post(url, json=data)
print("LOGIN DE ESCOLA\n")
print(response.json())
print("\n---------------------------------------\n")
