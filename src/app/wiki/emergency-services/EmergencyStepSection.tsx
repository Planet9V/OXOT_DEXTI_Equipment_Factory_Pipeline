'use client';

/**
 * EmergencyStepSection — Client wrapper for Emergency Services sector step viewer.
 * @module app/wiki/emergency-services/EmergencyStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getEmergencyStepData } from '@/components/wiki/step-data/emergency';

const stepData = getEmergencyStepData();

export default function EmergencyStepSection() {
    return <SectorStepViewer data={stepData} />;
}
