'use client';

/**
 * NuclearStepSection — Client wrapper for Nuclear sector step viewer.
 * @module app/wiki/nuclear/NuclearStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getNuclearStepData } from '@/components/wiki/step-data/nuclear';

const stepData = getNuclearStepData();

export default function NuclearStepSection() {
    return <SectorStepViewer data={stepData} />;
}
