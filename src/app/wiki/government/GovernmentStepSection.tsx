'use client';

/**
 * GovernmentStepSection — Client wrapper for Government Facilities sector step viewer.
 * @module app/wiki/government-facilities/GovernmentStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getGovernmentStepData } from '@/components/wiki/step-data/government';

const stepData = getGovernmentStepData();

export default function GovernmentStepSection() {
    return <SectorStepViewer data={stepData} />;
}
