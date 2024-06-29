#!/bin/bash
set -e

# Substitute environment variables in init.sql.template and create init.sql
envsubst < /docker-entrypoint-initdb.d/init.sql.template > /docker-entrypoint-initdb.d/init.sql
chown postgres:postgres /docker-entrypoint-initdb.d/init.sql
chmod 600 /docker-entrypoint-initdb.d/init.sql

psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -a -f /docker-entrypoint-initdb.d/init.sql
