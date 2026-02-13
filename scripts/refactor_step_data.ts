import fs from 'fs';
import path from 'path';

const dir = '/Users/jim/Documents/OXOT_DEXTI_Equipment_Factory_Pipeline/src/components/wiki/step-data';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Update import
    if (!content.includes('SectorSummary')) {
        content = content.replace(
            /import \{ type SectorStepData \} from '\.\.\/SectorStepViewer';/,
            "import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';"
        );
    }

    // 2. Identify the function name and sector constant
    const funcMatch = content.match(/export function get(\w+)StepData\(\)/);
    const sectorMatch = content.match(/import \{ (\w+) \} from '@\/lib\/sectors\//);

    if (funcMatch && sectorMatch) {
        const name = funcMatch[1];
        const sectorConst = sectorMatch[1];
        const summaryFuncName = `get${name}Summary`;

        if (!content.includes(summaryFuncName)) {
            const summaryFunc = `
/**
 * Returns a lightweight summary of the ${name} sector for the hub page.
 */
export function ${summaryFuncName}(): SectorSummary {
    const data = get${name}StepData();
    return {
        profile: data.architectureVision.profile,
        businessBlurb: data.architectureVision.businessArchitecture[0]?.body || '',
        subSectors: data.subSectors.map(s => ({
            code: s.code,
            name: s.name,
            description: s.description,
        })),
    };
}
`;
            content = content.trimEnd() + '\n' + summaryFunc;
            fs.writeFileSync(filePath, content);
            console.log(`Refactored ${file}`);
        }
    }
});
