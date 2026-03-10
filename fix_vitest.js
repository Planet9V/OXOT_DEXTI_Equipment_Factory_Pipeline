const fs = require('fs');
let newContent = fs.readFileSync('tests/pipeline-batch.test.ts', 'utf8');

if (newContent.includes("import { describe, it, expect, vi, beforeEach } from 'vitest';")) {
    newContent = newContent.replace("import { describe, it, expect, vi, beforeEach } from 'vitest';", "import { describe, test, expect, jest, beforeEach } from '@jest/globals';");
    newContent = newContent.replace(/vi\./g, "jest.");
    newContent = newContent.replace(/it\(/g, "test(");
    fs.writeFileSync('tests/pipeline-batch.test.ts', newContent);
    console.log("Patched pipeline-batch.test.ts successfully.");
} else {
    console.log("vitest import not found in tests/pipeline-batch.test.ts");
}
