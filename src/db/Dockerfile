FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=matrix123
ENV MYSQL_DATABASE=studentdatabase

# Copie os scripts SQL para o diretório de inicialização do MySQL
COPY ./sql-scripts/* /docker-entrypoint-initdb.d/