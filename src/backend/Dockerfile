FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /app

# Copia apenas os arquivos necessários
COPY ./app/main.py /app/main.py
COPY ./app/requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
