'use client';

/**
 * TransportationStepSection — Client wrapper for Transportation step viewer.
 * @module app/wiki/transportation/TransportationStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getTransportationStepData } from '@/components/wiki/step-data/transportation';

const stepData = getTransportationStepData();

export default function TransportationStepSection() {
    return <SectorStepViewer data={stepData} />;
}
