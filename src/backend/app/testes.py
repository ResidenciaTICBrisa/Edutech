import requests

### GET ###
# url = "http://localhost:8000/escolas"
# response = requests.get(url)
# print(response.json())

# ### POST ###
# url = "http://localhost:8000/login"
# data = {
#     "email": "escola@email.com",
#     "senha": "senhaEscola"
# }
# response = requests.post(url, json=data)
# print(response.json())

### POST ESCOLA ###
# url = "http://localhost:8000/escolas"
# data = {
#     "cnpj": "75893",
#     "nome": "Escola Teste 2",
#     "cpfDirecao": "92311",
#     "email": "escola2@email.com",
#     "senha": "senhaEscola2"
# }
# response = requests.post(url, json=data)
# print(response.json())

url = "http://localhost:8000/escolas/75893"
response = requests.get(url)
print(response.json())


# ### POST ###
# URL do endpoint
# url = "http://localhost:8000/alunos"

# # Carregar o arquivo Excel
# files = {"file": open("lista_alunos.xlsx", "rb")}

# try:
#     # Enviar a requisição POST com o arquivo anexado
#     response = requests.post(url, files=files)

#     # Verifique se a requisição foi bem-sucedida
#     if response.status_code == 200:
#         print("Alunos cadastrados com sucesso.")
#     else:
#         print(f"Erro ao importar dados: {response.json()}")

# except requests.exceptions.RequestException as e:
#     print(f"Erro ao fazer a requisição: {e}")