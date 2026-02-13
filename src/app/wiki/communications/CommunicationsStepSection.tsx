'use client';

/**
 * CommunicationsStepSection — Client wrapper for Communications sector step viewer.
 * @module app/wiki/communications/CommunicationsStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getCommunicationsStepData } from '@/components/wiki/step-data/communications';

const stepData = getCommunicationsStepData();

export default function CommunicationsStepSection() {
    return <SectorStepViewer data={stepData} />;
}
