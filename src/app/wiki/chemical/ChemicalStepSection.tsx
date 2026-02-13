'use client';

/**
 * ChemicalStepSection — Client wrapper for Chemical sector step viewer.
 * @module app/wiki/chemical/ChemicalStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getChemicalStepData } from '@/components/wiki/step-data/chemical';

const stepData = getChemicalStepData();

export default function ChemicalStepSection() {
    return <SectorStepViewer data={stepData} />;
}
