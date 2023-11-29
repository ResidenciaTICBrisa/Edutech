FROM tiangolo/uvicorn-gunicorn:python3.9

COPY . /app/

# RUN pip install -qqq --upgrade pip

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload","--host", "0.0.0.0", "--port", "8000"]
