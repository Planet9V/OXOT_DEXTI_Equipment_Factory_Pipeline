/**
 * Energy Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with Energy sector architecture
 * content, extracted from the TOGAF reference architecture and the
 * ENERGY_SECTOR data model.
 *
 * @module components/wiki/step-data/energy
 */

import { type SectorStepData } from '../SectorStepViewer';
import { ENERGY_SECTOR } from '@/lib/sectors/energy';

/**
 * Builds the complete step viewer data for the Energy sector.
 *
 * @returns SectorStepData populated with Energy sector architecture,
 *          sub-sectors, facilities, and equipment catalogs.
 */
export function getEnergyStepData(): SectorStepData {
    return {
        name: ENERGY_SECTOR.name,
        code: ENERGY_SECTOR.code,
        color: ENERGY_SECTOR.color,
        srma: ENERGY_SECTOR.srma,

        /* ── Tab 1: Architecture Vision (TOGAF Phase A–B) ───────────────── */
        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 08 — Energy' },
                { label: 'SRMA', value: 'Department of Energy (DOE)' },
                {
                    label: 'Sub-Sectors',
                    value: `${ENERGY_SECTOR.subSectors.length} sub-sectors · ${ENERGY_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${ENERGY_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Water, Transportation, Communications, IT' },
                { label: 'Regulatory Framework', value: 'NERC CIP, FERC, NRC, EPA, DOE' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'End-to-end energy chain: Generation (fossil, nuclear, renewable) → Transmission (230–765 kV) → Distribution (4–34.5 kV) → Last-mile delivery → Behind-the-meter prosumers. BESS and VPP/DERMS provide grid services and market participation.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'ISOs/RTOs (CAISO, PJM, ERCOT), utilities (investor-owned, municipal, co-op), regulators (FERC, state PUCs), equipment OEMs (GE, Siemens, ABB), and cybersecurity agencies (CISA, DOE CESER).',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Defense-in-depth per IEC 62443 zone-and-conduit model. ISA-95 Purdue hierarchy separation. Least-privilege access across OT/IT boundary (Level 3.5 DMZ).',
                },
                {
                    title: 'Key Standards',
                    body: 'NERC CIP-002 through CIP-013, IEC 61850, IEEE 1547, IEC 62443, NIST SP 800-82, API 610/650/661/670, NFPA 70/855.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'State-sponsored APTs targeting ICS/SCADA (XENOTIME, CHERNOVITE, ELECTRUM)',
                    'Ransomware on OT networks (Colonial Pipeline precedent)',
                    'Supply chain compromise of firmware and PLCs',
                    'Protocol exploitation: Modbus (unauth), DNP3 (replay), OPC UA (certificate hijack)',
                    'Physical-cyber convergence: substations, pipelines, generation control',
                ],
                bottomLine: 'DOE rates Energy as #1 targeted critical infrastructure sector',
            },
        },

        /* ── Tab 2: Reference Architecture (TOGAF Phase C–D) ────────────── */
        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Process sensors and actuators (CTs, VTs, breakers). L1: Protection relays and PLCs. L2: HMI, RTU, local SCADA. L3: Plant SCADA, EMS, historian. L3.5: DMZ with data diodes. L4/L5: Enterprise IT, cloud, market systems.',
                },
                {
                    title: 'ISA/IEC 62443 Zones',
                    body: 'Zone 1 (Safety): SIS, protective relays. Zone 2 (Control): PLCs, DCS, RTUs. Zone 3 (Supervision): SCADA, HMI. Zone 4 (Enterprise): EMS, billing, analytics. Conduits enforce firewall rules between zones.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Process variables → SCADA historian (time-series). IEC 61850 GOOSE for protection signaling (<4ms). DNP3/IEC 104 for wide-area telemetry. OpenADR for demand response. IEEE 2030.5 for DER management.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: ICCP/TASE.2, OpenADR, IEEE 2030.5, DLMS/COSEM. Transport: IEC 61850 MMS, DNP3/IEC 104, MQTT. Network: TCP/IP, RS-485, Zigbee, LoRaWAN. Physical: Fiber, Ethernet, LTE-M/5G, RF mesh.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Process bus (IEC 61850-9-2 sampled values), station bus (MMS/GOOSE), WAN (MPLS/VPN), cloud gateway. PRP/HSR redundancy for protection-critical paths. VLAN segmentation per IEC 62443.',
                },
                {
                    title: 'Control Systems',
                    body: 'DCS for generation, SCADA/RTU for T&D, ADMS for distribution automation, DERMS for DER aggregation, BMS/PCS for battery storage, MGMS for microgrids, HEMS for smart homes.',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: 40+ equipment classes mapped across 7 facility types',
                    'Purdue Level coverage: L0 through L4 with protocol simulation readiness',
                    'IEC 62443 zone model: automated conduit analysis and access control verification',
                    'SBOM integration: vendor firmware tracking per CISA BOD 23-01',
                    'Graph ontology: CVE ↔ CWE ↔ CAPEC ↔ MITRE ATT&CK full chain',
                ],
                bottomLine: '92% equipment coverage · 7 facility archetypes · Full protocol stack',
            },
        },

        /* ── Tabs 3 & 4: Sub-sectors (from data model) ──────────────────── */
        subSectors: ENERGY_SECTOR.subSectors.map(sub => ({
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
