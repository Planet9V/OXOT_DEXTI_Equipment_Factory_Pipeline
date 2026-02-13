'use client';

/**
 * DefenseStepSection — Client wrapper for Defense Industrial Base sector step viewer.
 * @module app/wiki/defense/DefenseStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getDefenseStepData } from '@/components/wiki/step-data/defense';

const stepData = getDefenseStepData();

export default function DefenseStepSection() {
    return <SectorStepViewer data={stepData} />;
}
