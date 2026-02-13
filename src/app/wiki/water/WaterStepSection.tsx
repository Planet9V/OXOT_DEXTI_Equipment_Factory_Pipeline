'use client';

/**
 * WaterStepSection — Client wrapper for Water sector step viewer.
 * @module app/wiki/water/WaterStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getWaterStepData } from '@/components/wiki/step-data/water';

const stepData = getWaterStepData();

export default function WaterStepSection() {
    return <SectorStepViewer data={stepData} />;
}
