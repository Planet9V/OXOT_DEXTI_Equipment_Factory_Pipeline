const fs = require('fs');
const content = fs.readFileSync('src/lib/agents/agent.ts', 'utf8');
const match = content.match(/const PERSONAS = \{([\s\S]*?)\};\n\n\/\*\*/);
if (match) {
    console.log(match[1].split('\n').filter(line => line.match(/^\s+[a-zA-Z]+:/)).map(line => line.trim().split(':')[0]));
} else {
    console.log("No match found for PERSONAS object.");
}
