/**
 * CISA Sector 09: Financial Services Sector.
 *
 * Encompasses depository institutions, providers of investment products, insurance
 * companies, other credit and financing organizations, and the critical financial
 * utilities and services that support these functions.
 *
 * SRMA: Department of the Treasury.
 *
 * References:
 *   - Treasury (2024). Financial Services Sector-Specific Plan.
 *   - Federal Financial Institutions Examination Council (FFIEC).
 *   - SEC Regulation SCI — Systems Compliance and Integrity.
 *
 * @module sectors/financial
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const FINANCIAL_SECTOR: DexpiSector = {
    code: 'FINA',
    name: 'Financial Services',
    icon: 'Landmark',
    description:
        'Banking institutions, insurance companies, securities exchanges, clearinghouses, ' +
        'and payment processing networks constituting the financial backbone of the economy.',
    color: '#14B8A6',
    srma: 'Treasury',
    subSectors: [
        {
            code: 'FINA-BK',
            name: 'Banking and Finance',
            description:
                'Commercial and investment banks, credit unions, savings institutions, and the ' +
                'Federal Reserve System providing depository, lending, and payment services.',
            facilities: [
                {
                    code: 'FINA-BK-DATA',
                    name: 'Financial Data Center',
                    description:
                        'Tier III/IV data center housing core banking systems, payment processing, ' +
                        'and disaster recovery infrastructure with redundant power and cooling.',
                    equipment: [
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Diesel Backup Generator', category: 'electrical', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Uninterruptible Power Supply', category: 'electrical', typicalQuantity: { min: 10, max: 50 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'PDU Transformer', category: 'electrical', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'CRAC Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Chilled Water Pump', category: 'rotating', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'Main Switchgear', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
            ],
        },
        {
            code: 'FINA-IN',
            name: 'Insurance',
            description:
                'Property/casualty, life, and health insurance companies, reinsurers, and ' +
                'their claims processing and actuarial operations.',
            facilities: [
                {
                    code: 'FINA-IN-PROC',
                    name: 'Insurance Processing Center',
                    description:
                        'Large-scale claims processing and policy administration facility with document ' +
                        'management systems and business continuity infrastructure.',
                    equipment: [
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Backup Generator', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Data Room UPS', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'HVAC Boiler', category: 'heat-transfer', typicalQuantity: { min: 1, max: 3 } },
                    ],
                },
            ],
        },
        {
            code: 'FINA-SM',
            name: 'Securities and Markets',
            description:
                'Stock exchanges, commodity exchanges, clearinghouses, broker-dealers, and ' +
                'alternative trading systems facilitating capital markets.',
            facilities: [
                {
                    code: 'FINA-SM-EXCH',
                    name: 'Securities Exchange Data Center',
                    description:
                        'Ultra-low-latency matching engine data center for securities trading with ' +
                        'redundant network paths, precision time synchronization, and 2N+1 power architecture.',
                    equipment: [
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Diesel Rotary UPS', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Double-Conversion UPS', category: 'electrical', typicalQuantity: { min: 8, max: 30 } },
                        { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Precision Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'ATS Switchgear', category: 'electrical', typicalQuantity: { min: 4, max: 16 } },
                    ],
                },
            ],
        },
    ],
};
