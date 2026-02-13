'use client';

/**
 * FinancialStepSection — Client wrapper for Financial Services step viewer.
 * @module app/wiki/financial-services/FinancialStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getFinancialStepData } from '@/components/wiki/step-data/financial';

const stepData = getFinancialStepData();

export default function FinancialStepSection() {
    return <SectorStepViewer data={stepData} />;
}
