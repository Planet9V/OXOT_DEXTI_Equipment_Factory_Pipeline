'use client';

/**
 * ManufacturingStepSection — Client wrapper for Critical Manufacturing step viewer.
 * @module app/wiki/critical-manufacturing/ManufacturingStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getManufacturingStepData } from '@/components/wiki/step-data/manufacturing';

const stepData = getManufacturingStepData();

export default function ManufacturingStepSection() {
    return <SectorStepViewer data={stepData} />;
}
