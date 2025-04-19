#!/bin/bash
set -e

docker-entrypoint.sh --replSet rs0 --auth --keyFile /etc/mongo-keyfile &

until mongosh -u admin -p 1234 --authenticationDatabase admin --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  sleep 2
done

mongosh -u admin -p 1234 --authenticationDatabase admin /manual-scripts/02init-replica.js || true

until mongosh -u admin -p 1234 --authenticationDatabase admin --quiet --eval \
'rs.status().myState === 1' | grep -q "true"; do
  sleep 2
done

mongosh -u admin -p 1234 --authenticationDatabase admin /manual-scripts/03seed.js

wait


