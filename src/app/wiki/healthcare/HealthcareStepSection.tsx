'use client';

/**
 * HealthcareStepSection — Client wrapper for Healthcare step viewer.
 * @module app/wiki/healthcare/HealthcareStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getHealthcareStepData } from '@/components/wiki/step-data/healthcare';

const stepData = getHealthcareStepData();

export default function HealthcareStepSection() {
    return <SectorStepViewer data={stepData} />;
}
