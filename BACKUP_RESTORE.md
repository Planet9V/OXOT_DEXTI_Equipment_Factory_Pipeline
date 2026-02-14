# Memgraph Backup & Restore Guide

This guide explains how to backup and restore the Memgraph database for the OXOT DEXTI Equipment Factory pipeline.

## Scripts Overview

We provide robust Node.js scripts to handle data persistence via standard Cypher export/import. These scripts work with the internal Bolt protocol and are compatible with the project's defaults.

### 1. Backup (`scripts/backup_memgraph.js`)
Connects to Memgraph and exports all nodes and relationships into a single Cypher file containing `CREATE` statements.

**Usage:**
```bash
node scripts/backup_memgraph.js [output_file.cypher]
```
*Default output:* `memgraph_backup.cypher`

### 2. Restore (`scripts/restore_memgraph.js`)
**WARNING:** This script wipes the database before loading!
Connects to Memgraph, clears all existing data, and executes the `CREATE` statements from the backup file in a single transaction.

**Usage:**
```bash
node scripts/restore_memgraph.js [input_file.cypher]
```
*Default input:* `memgraph_backup.cypher`

## Prerequisites
- Node.js installed (v18+)
- Dependencies installed (`npm install` or ensure `neo4j-driver` is present)
- Memgraph running (Docker container `dexpi-memgraph`)
- Env vars `MEMGRAPH_URI`, `MEMGRAPH_USER`, `MEMGRAPH_PASSWORD` (defaults to `bolt://localhost:7687` and empty auth)

## Workflow for Mass Migration or Deployment

1. **Capture State:** Run the backup script on the source (development) machine.
   ```bash
   node scripts/backup_memgraph.js
   ```
2. **Commit/Transfer:** Commit the `memgraph_backup.cypher` file to the repository or transfer it to the target machine.
3. **Restore:** Run the restore script on the target machine / fresh environment.
   ```bash
   node scripts/restore_memgraph.js
   ```

## Troubleshooting
- **Memory Issues:** The scripts load the full dataset into memory. For datasets >100MB, streaming logic would be required (currently optimized for <50MB / ~10k nodes).
- **Variable Scope:** The backup script avoids semicolons between node creations to ensure variable references (`v123`) persist for relationship creation. **Do not manually add semicolons** to the backup file unless you know what you are doing.
