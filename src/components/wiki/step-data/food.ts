/**
 * Food and Agriculture Sector Step Data.
 *
 * @module components/wiki/step-data/food
 */

import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';
import { FOOD_SECTOR } from '@/lib/sectors/food';

/**
 * Builds the complete step viewer data for the Food and Agriculture sector.
 *
 * @returns SectorStepData for Food and Agriculture.
 */
export function getFoodStepData(): SectorStepData {
    return {
        name: FOOD_SECTOR.name,
        code: FOOD_SECTOR.code,
        color: FOOD_SECTOR.color,
        srma: FOOD_SECTOR.srma,

        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 10 — Food and Agriculture' },
                { label: 'SRMA', value: 'USDA / Department of Health and Human Services (HHS)' },
                {
                    label: 'Sub-Sectors',
                    value: `${FOOD_SECTOR.subSectors.length} sub-sectors · ${FOOD_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${FOOD_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Water, Transportation, Chemical, Energy' },
                { label: 'Regulatory Framework', value: 'FSMA, USDA FSIS, FDA 21 CFR, HACCP, CARVER+Shock' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Production (crop farming, animal husbandry, aquaculture) → Harvesting → Processing (slaughter, milling, pasteurization) → Packaging → Cold chain logistics → Distribution → Retail. Farm-to-fork traceability.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'USDA (FSIS, APHIS), FDA, EPA, Food-Ag ISAC, commodity groups (NCGA, NPC), processors (Cargill, Tyson, ADM, JBS), precision ag OEMs (John Deere, CNH, AGCO), food safety labs.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'HACCP (Hazard Analysis Critical Control Points) as safety framework. FSMA preventive controls and supply chain program. Precision agriculture with GPS/RTK and IoT sensors. Cold chain integrity monitoring.',
                },
                {
                    title: 'Key Standards',
                    body: 'FSMA (21 CFR 117/507), USDA FSIS HACCP (9 CFR 417), ISO 22000, GFSI (SQF, BRC, FSSC 22000), GS1 traceability, ISOBUS/AEF for ag equipment.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Ransomware targeting meatpacking plants and grain processors (JBS 2021 precedent)',
                    'Precision ag attacks: GPS spoofing of autonomous equipment, seed/fertilizer formula theft',
                    'Food safety sabotage: SCADA manipulation of pasteurization temps or CIP cycles',
                    'Supply chain: contamination of animal feed or crop inputs via compromised systems',
                    'Agroterrorism: intentional biological/chemical contamination enabled by cyber access',
                ],
                bottomLine: 'USDA/FDA mandate: FSMA Section 106 intentional adulteration vulnerability assessments',
            },
        },

        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Sensors (temp, humidity, flow, weight), vision systems, GPS receivers. L1: PLCs, RTUs, CIP controllers, pasteurizer controls. L2: HMI, SCADA, batch system. L3: MES, LIMS, ERP integration, HACCP monitoring. L3.5: DMZ. L4/L5: ERP, traceability (GS1), regulatory reporting.',
                },
                {
                    title: 'Food Safety Zones',
                    body: 'Zone 1 (CCP): Critical control point devices — metal detectors, pasteurizer interlocks, CIP validation. Zone 2 (Control): Process PLCs, packaging lines. Zone 3 (Quality): LIMS, SPC, quality management. Zone 4 (Enterprise): ERP, supply chain, traceability.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Farm: ISOBUS telemetry → fleet management. Processing: PLC → OPC → historian → HACCP CCP records. Traceability: GS1 EPCIS events (lot, batch, ship). Cold chain: IoT temp loggers → cloud analytics. Regulatory: FDA FSMA records, FSIS inspection reports.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: OPC UA, ISOBUS/ISO 11783, GS1 EPCIS, MQTT. Transport: Ethernet/IP, serial (RS-232/485). Network: plant Ethernet, LoRaWAN (field), cellular (4G/5G), satellite (precision ag). Physical: stainless-rated enclosures, IP69K sensors, food-grade cabling.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Plant floor: managed switches with VLAN per production line. Cold storage: low-power wireless (BLE, LoRa) for temp monitoring. Field: RTK correction via cellular, drone imagery via 5G. CIP system: isolated network for clean-in-place automation.',
                },
                {
                    title: 'Control Systems',
                    body: 'PLCs (Rockwell, Siemens, Schneider for food lines), SCADA (Ignition, Wonderware), pasteurizers (custom PLC logic), CIP skids (Alfa Laval, GEA, SPX), precision ag (John Deere Operations Center, Climate FieldView), cold chain (Emerson Cargo Solutions, Sensitech).',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 model: pasteurizers, CIP skids, conveyors, metal detectors, filling lines',
                    'HACCP CCP mapping: critical control points with setpoint and deviation modeling',
                    'GS1 traceability: lot-level farm-to-fork chain for recall simulation',
                    'Precision ag: GPS/RTK equipment → field operation → yield correlation',
                    'Graph ontology: CVE ↔ food processing equipment ↔ contamination scenario modeling',
                ],
                bottomLine: '89% equipment coverage · 5 facility archetypes · Full HACCP modeling',
            },
        },

        subSectors: FOOD_SECTOR.subSectors.map(sub => ({
            code: sub.code,
            name: sub.name,
            description: sub.description,
            facilities: sub.facilities.map(fac => ({
                code: fac.code,
                name: fac.name,
                description: fac.description,
                equipment: fac.equipment.map(eq => ({
                    componentClass: eq.componentClass,
                    displayName: eq.displayName,
                    category: eq.category,
                    typicalQuantity: eq.typicalQuantity,
                })),
            })),
        })),
    };
}

/**
 * Returns a lightweight summary of the Food sector for the hub page.
 */
export function getFoodSummary(): SectorSummary {
    const data = getFoodStepData();
    return {
        profile: data.architectureVision.profile,
        businessBlurb: data.architectureVision.businessArchitecture[0]?.body || '',
        subSectors: data.subSectors.map(s => ({
            code: s.code,
            name: s.name,
            description: s.description,
        })),
    };
}
