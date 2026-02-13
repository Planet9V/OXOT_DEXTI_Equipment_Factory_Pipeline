'use client';

/**
 * CommercialStepSection — Client wrapper for Commercial Facilities sector step viewer.
 * @module app/wiki/commercial-facilities/CommercialStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getCommercialStepData } from '@/components/wiki/step-data/commercial';

const stepData = getCommercialStepData();

export default function CommercialStepSection() {
    return <SectorStepViewer data={stepData} />;
}
