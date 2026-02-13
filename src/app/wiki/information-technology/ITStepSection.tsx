'use client';

/**
 * ITStepSection — Client wrapper for Information Technology sector step viewer.
 * @module app/wiki/information-technology/ITStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getITStepData } from '@/components/wiki/step-data/it';

const stepData = getITStepData();

export default function ITStepSection() {
    return <SectorStepViewer data={stepData} />;
}
