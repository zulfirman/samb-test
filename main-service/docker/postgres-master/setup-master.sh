#!/bin/bash
echo "host replication all 0.0.0.0/0 trust" >> "$PGDATA/pg_hba.conf"
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE USER $PG_REP_USER REPLICATION LOGIN CONNECTION LIMIT 300 ENCRYPTED PASSWORD '$PG_REP_PASSWORD';
EOSQL

cat >> ${PGDATA}/postgresql.conf <<EOF
wal_level = replica
archive_mode = on
archive_command = 'cd .'
max_wal_senders = 10
hot_standby = on
# pecifies the minimum size of past log file segments kept in the pg_wal directory to prevent replica error
wal_keep_size = 50

#https://pgtune.leopard.in.ua/ tune postgresql db
# DB Version: 17
# OS Type: linux
# DB Type: web
# Total Memory (RAM): 1 GB
# CPUs num: 1
# Connections num: 300
# Data Storage: ssd

max_connections = 300
shared_buffers = 256MB
effective_cache_size = 768MB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 7864kB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 436kB
huge_pages = off
min_wal_size = 1GB
max_wal_size = 4GB
EOF
