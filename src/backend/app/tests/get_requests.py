import requests

### ALUNOS ###
url = "http://localhost:8000/api/alunos"
response = requests.get(url)
print("\nALUNOS\n")
print(response.json())
print("\n---------------------------------------\n")

### ALUNO POR MATRÍCULA ###
url = "http://localhost:8000/api/alunos/6902"
response = requests.get(url)
print("ALUNO POR MATRÍCULA\n")
print(response.json())
print("\n---------------------------------------\n")

### ESCOLAS ###
url = "http://localhost:8000/api/escolas"
response = requests.get(url)
print("ESCOLAS\n")
print(response.json())
print("\n---------------------------------------\n")

### ESCOLA POR CNPJ ###
url = "http://localhost:8000/api/escolas/75893"
response = requests.get(url)
print("ESCOLA POR CNPJ\n")
print(response.json())
print("\n---------------------------------------\n")
