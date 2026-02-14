# How to Restore Memgraph Backup

This guide explains the simplest way to restore the database from a backup file.

## Quick Start (One Command)

If you are on the machine with the source code, run this command in your terminal:

```bash
node scripts/restore_memgraph.js
```

This will:
1. Connect to your local Memgraph database.
2. **WIPE** all current data.
3. Import the data from `memgraph_backup.cypher` (located in the root folder).

---

## Detailed Instructions

### 1. Ensure Prerequisites
- You must have **Node.js** installed.
- The project dependencies must be installed (`npm install`).
- Use the `dexpi-memgraph` container running (standard setup).

### 2. Locate the Backup File
The restore script looks for `memgraph_backup.cypher` in the root directory by default.
- If your backup file has a different name, pass it as an argument:
  ```bash
  node scripts/restore_memgraph.js my_custom_backup.cypher
  ```

### 3. Run the Restore Script
Run the following command from the project root (`OXOT_DEXTI_Equipment_Factory_Pipeline`):

```bash
npm run restore
``` 
*(Note: You need to add `"restore": "node scripts/restore_memgraph.js"` to package.json scripts for this shortcut to work, or just use `node scripts/restore_memgraph.js`)*

### 4. Verify Restoration
After the script finishes, it will print the total number of nodes in the database.
You can also visit the **Coverage** page (via URL `/coverage` although hidden from menu) or the **Dashboard** to see the data.

---

## Troubleshooting

**"Connection refused"**
- Ensure Docker is running: `docker ps` should show `dexpi-memgraph`.
- If not, run `docker-compose up -d`.

**"Backup file not found"**
- Make sure `memgraph_backup.cypher` exists in the folder you are running the command from.

**"Auth failed"**
- If you changed the default password, update `MEMGRAPH_PASSWORD` in your environment or `.env` file before running.
