#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🧹 Cleaning up containers..."

# Remove old container if it exists
if [ "$(docker ps -aq -f name=^goldex-landing$)" ]; then
    echo "Removing 'goldex-landing' container..."
    docker rm -f goldex-landing
fi

echo "🚀 Updating GoldEx Landing services..."

# Perform Docker Compose update
docker compose -f "$SCRIPT_DIR/docker-compose.yaml" up -d --remove-orphans

echo "🧹 Cleaning old GoldEx Landing images..."

KEEP=1

docker images localhost:5000/goldex-landing --format "{{.Repository}}:{{.Tag}} {{.CreatedAt}}" \
  | grep -v latest \
  | sort -rk2 \
  | tail -n +$((KEEP+1)) \
  | awk '{print $1}' \
  | xargs -r docker rmi

echo "🧹 Removing dangling images..."

docker image prune -f

echo "🧱 Pruning builder cache..."

docker builder prune -f --reserved-space 10GB

echo "✅ Services Updated & Running."
