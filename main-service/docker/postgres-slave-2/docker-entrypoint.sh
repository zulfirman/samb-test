#!/bin/bash

# Wait for a brief initial delay to allow other containers to start
sleep 5s

# Ensure PGDATA is initialized
if [ ! -s "$PGDATA/PG_VERSION" ]; then
  echo "*:*:*:$PG_REP_USER:$PG_REP_PASSWORD" > ~/.pgpass
  chmod 0600 ~/.pgpass

  # Wait for the master to be reachable and accepting connections
  echo "Waiting for master to become ready..."
  until pg_isready -h "${PG_MASTER_HOST}" -p 5432 -U "${PG_REP_USER}"
  do
    echo "Master database is not ready. Retrying in 1 second..."
    sleep 1s
  done

  # Attempt pg_basebackup once the master is ready
  until pg_basebackup -h "${PG_MASTER_HOST}" -D "${PGDATA}" -p 5432 -U "${PG_REP_USER}" -R -vP -W
  do
    echo "pg_basebackup failed. Retrying in 1 second..."
    sleep 1s
  done
fi

# Update PostgreSQL configuration for replication
cat >> "${PGDATA}/postgresql.conf" <<EOF
wal_level = replica
archive_mode = on
archive_command = 'cd .'
max_wal_senders = 10
hot_standby = on

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

# Ensure proper ownership and permissions
set -e
chown postgres:postgres "${PGDATA}" -R
chmod 700 "${PGDATA}" -R

# Adjust wal_level if needed
sed -i 's/wal_level = hot_standby/wal_level = replica/g' "${PGDATA}/postgresql.conf"

# Execute the provided command
exec "$@"
