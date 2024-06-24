#!/bin/bash
set -e

# Substitute environment variables in init.sql.template and create init.sql
envsubst < /docker-entrypoint-initdb.d/init.sql.template > /docker-entrypoint-initdb.d/init.sql

# Execute the original PostgreSQL entrypoint script
exec /usr/local/bin/docker-entrypoint.sh postgres

# sleep infinity