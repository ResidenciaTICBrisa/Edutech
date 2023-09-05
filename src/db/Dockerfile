FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=matrix123
ENV MYSQL_DATABASE=studentdatabase

COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
