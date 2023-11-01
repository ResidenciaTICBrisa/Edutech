# EduTech

## Pré-requisitos
* Docker:
* Docker Compose: Link

## Como Executar
### 1. Clone o repositório:


```
git clone https://github.com/ResidenciaTICBrisa/06_AcompanhamentoEnsinoMedio.git
cd 06_AcompanhamentoEnsinoMedio
```
### 2. Execute o Docker Compose:


```
docker-compose up --build
```
Este comando irá construir e iniciar todos os serviços definidos no arquivo docker-compose.yml.

### 3. Acesse a aplicação:
Depois que os contêineres estiverem em execução, você pode acessar a aplicação em:

**React**: http://localhost:3000

**FastAPI**: http://localhost:8000

**Documentação dos EndPoints**: http://localhost:8000/docs

## Encerrando a Execução

Para encerrar a execução da aplicação e parar os contêineres, você pode pressionar Ctrl + C no terminal onde o Docker Compose está sendo executado ou executar o seguinte comando:

```
docker-compose down
```
## Para contribuir

Leia o [CONTRIBUTING](https://github.com/ResidenciaTICBrisa/06_AcompanhamentoEnsinoMedio/blob/docs/CONTRIBUTING.md) deste repositório.
