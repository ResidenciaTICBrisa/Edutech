#!/bin/bash

# Execute os scripts SQL
for f in /docker-entrypoint-initdb.d/*; do
  case "$f" in
    *.sql)    echo "$0: running $f"; mysql -u root -p"$MYSQL_ROOT_PASSWORD" < "$f"; echo ;;
    *)        echo "$0: ignoring $f" ;;
  esac
done

# Inicie o MySQL
exec mysqld