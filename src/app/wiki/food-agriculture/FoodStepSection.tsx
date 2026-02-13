'use client';

/**
 * FoodStepSection — Client wrapper for Food and Agriculture step viewer.
 * @module app/wiki/food-agriculture/FoodStepSection
 */

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { getFoodStepData } from '@/components/wiki/step-data/food';

const stepData = getFoodStepData();

export default function FoodStepSection() {
    return <SectorStepViewer data={stepData} />;
}
