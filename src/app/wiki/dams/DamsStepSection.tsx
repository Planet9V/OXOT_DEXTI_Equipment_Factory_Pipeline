'use client';

/**
 * DamsStepSection — Client wrapper for Dams sector step viewer.
 * @module app/wiki/dams/DamsStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getDamsStepData } from '@/components/wiki/step-data/dams';

const stepData = getDamsStepData();

export default function DamsStepSection() {
    return <SectorStepViewer data={stepData} />;
}
