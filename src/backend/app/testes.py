import requests

### GET ###
# url = "http://localhost:8000/alunos"
# response = requests.get(url)
# print(response.json())


# ### POST ###
# # URL do endpoint
# url = "http://localhost:8000/alunos"

# # Carregar o arquivo Excel
# files = {"file": open("lista_alunos.xlsx", "rb")}

# try:
#     # Enviar a requisição POST com o arquivo anexado
#     response = requests.post(url, files=files)

#     print(response.json())

#     # Verifique se a requisição foi bem-sucedida
#     if response.status_code == 200:
#         print("Dados importados com sucesso.")
#     else:
#         print(f"Erro ao importar dados: {response.json()}")

# except requests.exceptions.RequestException as e:
#     print(f"Erro ao fazer a requisição: {e}")


import requests
import json

# URL base do seu servidor FastAPI
base_url = "http://localhost:8000"  # Atualize com o URL do seu servidor

# Dados para o cadastro
cadastro_data = {
    "cnpj": 12344,
    "nome": "Escola Exemplo",
    "cpf_responsavel": 123901,
    "email": "exemplo@escola.com",
    "senha": "minhasenha"
}

# Dados para o login
login_data = {
    "email": "exemplo@escola.com",
    "senha": "minhasenha"
}

# Endpoint para cadastro
cadastro_endpoint = base_url + "/cadastro-escola/"

# Endpoint para login
login_endpoint = base_url + "/login-escola/"

# Realiza o cadastro
# response_cadastro = requests.post(cadastro_endpoint, json=cadastro_data)
# print("Resposta do cadastro:", response_cadastro.json())

# Realiza o login
response_login = requests.post(login_endpoint, json=login_data)
print("Resposta do login:", response_login.json())