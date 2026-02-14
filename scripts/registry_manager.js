const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '../data/equipment_registry.json');

// Ensure registry exists
if (!fs.existsSync(REGISTRY_PATH)) {
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify({ _meta: { lastUpdated: new Date().toISOString(), totalCount: 0 } }, null, 2));
}

function loadRegistry() {
    return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
}

function saveRegistry(data) {
    data._meta.lastUpdated = new Date().toISOString();
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(data, null, 2));
}

const action = process.argv[2];
const args = process.argv.slice(3);

if (!action || action === 'help') {
    console.log(`
Usage: node registry_manager.js [action] [args]

Actions:
  add [sector] [group] [type] [category]   Add a new equipment type
  list [sector]                            List pending items for a sector
  stats                                    Show registry statistics
`);
    process.exit(0);
}

const registry = loadRegistry();

if (action === 'add') {
    const [sector, group, type, category] = args;
    if (!sector || !group || !type) {
        console.error('Error: specific sector, group, and type required.');
        process.exit(1);
    }

    if (!registry[sector]) registry[sector] = {};
    if (!registry[sector][group]) registry[sector][group] = [];

    // Check duplicate
    const exists = registry[sector][group].find(i => i.type === type);
    if (exists) {
        console.log(`Skipping: ${type} already exists in ${sector}/${group}`);
    } else {
        registry[sector][group].push({
            type,
            status: 'pending',
            category: category || 'unknown',
            addedAt: new Date().toISOString()
        });
        registry._meta.totalCount = (registry._meta.totalCount || 0) + 1;
        saveRegistry(registry);
        console.log(`Added: ${type} to ${sector}/${group}`);
    }
} else if (action === 'stats') {
    console.log('Registry Stats:');
    console.log(`Total Types: ${registry._meta.totalCount}`);
    Object.keys(registry).forEach(sector => {
        if (sector === '_meta') return;
        let count = 0;
        Object.values(registry[sector]).forEach(group => count += group.length);
        console.log(`  ${sector}: ${count}`);
    });
} else if (action === 'list') {
    const sector = args[0];
    if (!sector || !registry[sector]) {
        console.log('Please specify a valid sector.');
        Object.keys(registry).forEach(s => s !== '_meta' && console.log(`- ${s}`));
        process.exit(1);
    }

    console.log(`Pending Items in ${sector}:`);
    Object.entries(registry[sector]).forEach(([group, items]) => {
        items.filter(i => i.status === 'pending').forEach(i => {
            console.log(`[${group}] ${i.type}`);
        });
    });
}
