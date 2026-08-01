#!/bin/bash
# =============================================================================
# FUND FIT AI - AUTOMATED POSTGRESQL BACKUP & S3 DISASTER RECOVERY SCRIPT
# =============================================================================

set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/tmp/pg_backups"
BACKUP_FILE="fundfit_db_${TIMESTAMP}.sql.gz"
S3_BUCKET="s3://fundfit-ai-documents-prod/backups"

mkdir -p ${BACKUP_DIR}

echo "[$(date)] Starting PostgreSQL Backup for FUND FIT AI..."

# Perform pg_dump with compression
PGPASSWORD="${POSTGRES_PASSWORD}" pg_dump \
  -h "${POSTGRES_HOST:-postgres}" \
  -U "${POSTGRES_USER:-fundfit_user}" \
  -d "${POSTGRES_DB:-fundfit_db}" \
  -F p | gzip > "${BACKUP_DIR}/${BACKUP_FILE}"

echo "[$(date)] Backup file generated: ${BACKUP_FILE} ($(du -sh ${BACKUP_DIR}/${BACKUP_FILE} | cut -f1))"

# Upload to AWS S3 Bucket
if command -v aws &> /dev/null; then
  echo "[$(date)] Uploading backup to AWS S3 storage: ${S3_BUCKET}/${BACKUP_FILE}..."
  aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}" "${S3_BUCKET}/${BACKUP_FILE}"
  echo "[$(date)] S3 upload complete."
fi

# Retention policy: remove backups older than 30 days locally
find ${BACKUP_DIR} -name "fundfit_db_*.sql.gz" -mtime +30 -exec rm -f {} \;
echo "[$(date)] Local cleanup executed. PostgreSQL backup successfully finished."
