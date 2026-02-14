#!/usr/bin/env bash
# =============================================================================
# Memgraph Backup Script
#
# Creates a snapshot of the Memgraph database and copies it to a host-side
# backup directory. Safe to run while Memgraph is live.
#
# Usage:
#   ./scripts/backup_memgraph.sh                    # Backup to ./backups/
#   BACKUP_DIR=/mnt/backups ./scripts/backup_memgraph.sh  # Custom dir
#
# Cron example (daily at 2 AM):
#   0 2 * * * cd /path/to/project && ./scripts/backup_memgraph.sh >> logs/backup.log 2>&1
#
# @module scripts/backup_memgraph
# =============================================================================

set -euo pipefail

CONTAINER_NAME="${MEMGRAPH_CONTAINER:-dexpi-memgraph}"
BACKUP_DIR="${BACKUP_DIR:-./backups/memgraph}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_PATH="${BACKUP_DIR}/${TIMESTAMP}"

echo "=== Memgraph Backup ==="
echo "Time:      $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "Container: ${CONTAINER_NAME}"
echo "Target:    ${BACKUP_PATH}"

# 1. Create backup directory
mkdir -p "${BACKUP_PATH}"

# 2. Trigger a snapshot inside the container
echo "[1/3] Triggering snapshot..."
docker exec "${CONTAINER_NAME}" bash -c \
  "echo 'CALL mg.create_snapshot();' | mgconsole" 2>/dev/null || {
    echo "[WARN] Could not trigger snapshot via mgconsole. Copying existing data."
}

# 3. Copy the data directory from the container
echo "[2/3] Copying /var/lib/memgraph from container..."
docker cp "${CONTAINER_NAME}:/var/lib/memgraph/snapshots" "${BACKUP_PATH}/snapshots" 2>/dev/null || true
docker cp "${CONTAINER_NAME}:/var/lib/memgraph/wal" "${BACKUP_PATH}/wal" 2>/dev/null || true

# 4. Calculate size
BACKUP_SIZE=$(du -sh "${BACKUP_PATH}" 2>/dev/null | cut -f1)

echo "[3/3] Backup complete."
echo "  Size: ${BACKUP_SIZE}"
echo "  Path: ${BACKUP_PATH}"

# 5. Prune old backups (keep last 7)
KEEP_COUNT=7
BACKUP_COUNT=$(ls -1d "${BACKUP_DIR}"/20* 2>/dev/null | wc -l | tr -d ' ')

if [ "${BACKUP_COUNT}" -gt "${KEEP_COUNT}" ]; then
  PRUNE_COUNT=$((BACKUP_COUNT - KEEP_COUNT))
  echo "[Prune] Removing ${PRUNE_COUNT} old backup(s)..."
  ls -1d "${BACKUP_DIR}"/20* | head -n "${PRUNE_COUNT}" | xargs rm -rf
fi

echo "=== Backup Complete ==="
