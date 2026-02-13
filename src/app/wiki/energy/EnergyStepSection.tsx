'use client';

/**
 * EnergyStepSection — Client wrapper for Energy sector step viewer.
 * @module app/wiki/energy/EnergyStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getEnergyStepData } from '@/components/wiki/step-data/energy';

const stepData = getEnergyStepData();

export default function EnergyStepSection() {
    return <SectorStepViewer data={stepData} />;
}
