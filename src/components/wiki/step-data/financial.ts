/**
 * Financial Services Sector Step Data.
 *
 * @module components/wiki/step-data/financial
 */

import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';
import { FINANCIAL_SECTOR } from '@/lib/sectors/financial';

/**
 * Builds the complete step viewer data for the Financial Services sector.
 *
 * @returns SectorStepData for Financial Services.
 */
export function getFinancialStepData(): SectorStepData {
    return {
        name: FINANCIAL_SECTOR.name,
        code: FINANCIAL_SECTOR.code,
        color: FINANCIAL_SECTOR.color,
        srma: FINANCIAL_SECTOR.srma,

        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 09 — Financial Services' },
                { label: 'SRMA', value: 'Department of the Treasury' },
                {
                    label: 'Sub-Sectors',
                    value: `${FINANCIAL_SECTOR.subSectors.length} sub-sectors · ${FINANCIAL_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${FINANCIAL_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'IT, Communications, Energy, Transportation' },
                { label: 'Regulatory Framework', value: 'SOX, GLBA, PCI DSS, FFIEC, OCC, SEC, SWIFT CSP' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Retail banking → Commercial banking → Investment/capital markets → Insurance → Payment processing (ACH, SWIFT, FedWire) → Securities clearing (DTCC) → Digital assets/crypto exchanges.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'Treasury, OCC, FDIC, SEC, CFTC, Federal Reserve, FS-ISAC, SWIFT, DTCC, major banks (JPMorgan, BofA, Citi), payment networks (Visa, Mastercard), fintech platforms.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Zero-trust architecture per NIST SP 800-207. Multi-region active-active data centers. Real-time fraud detection with ML/AI. SWIFT Customer Security Programme compliance.',
                },
                {
                    title: 'Key Standards',
                    body: 'PCI DSS v4.0, FFIEC CAT/IT Handbook, NIST CSF, ISO 27001/27002, SOC 2 Type II, SWIFT CSP, DORA (EU), Basel III operational resilience.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Nation-state attacks on SWIFT messaging and interbank settlement systems',
                    'Advanced persistent threats targeting trading platforms and market infrastructure',
                    'Ransomware and destructive malware against banking core systems',
                    'Payment card fraud: POS malware, ATM jackpotting, e-commerce skimming',
                    'Insider trading data exfiltration via privileged database access',
                ],
                bottomLine: 'Financial sector is #2 most targeted sector globally (after Energy)',
            },
        },

        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Core Systems Architecture',
                    body: 'Core banking (Temenos, FIS, Fiserv). Payment processing (ISO 20022, SWIFT gpi). Trading engines (FIX protocol, ultra-low-latency). Risk management (FRTB, VaR). Regulatory reporting (XBRL, SEC EDGAR).',
                },
                {
                    title: 'Security Zones',
                    body: 'Zone 1 (Core): Mainframe/core banking, HSM key management. Zone 2 (Processing): Payment switches, clearing. Zone 3 (DMZ): API gateway, web banking. Zone 4 (External): ATM network, merchant POS, mobile banking.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Payment: ISO 20022 XML over SWIFT/FedNow. Trading: FIX 4.4/5.0 multicast. Fraud: real-time event streaming (Kafka) → ML scoring. Regulatory: batch reporting (T+1). Customer: REST APIs via API gateway.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: SWIFT FIN/InterAct, FIX, ISO 20022, REST/GraphQL. Transport: TLS 1.3, MQ Series, Kafka. Network: MPLS WAN, private interconnect (Equinix), AWS/Azure Direct Connect. Physical: data center fiber, ATM network.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Multi-region active-active data centers with sub-ms latency. SWIFT Alliance Lite2 connectivity. Private exchange interconnects for HFT. ATM/POS network via VPN overlays. DDoS-resilient edge with CDN and scrubbing centers.',
                },
                {
                    title: 'Infrastructure',
                    body: 'Mainframes (IBM Z series for core banking), HSMs (Thales Luna, nCipher), trading platforms (Nasdaq matching engine, LSEG MillenniumIT), fraud (FICO Falcon, Featurespace), SIEM (Splunk, QRadar).',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'Payment flow modeling: end-to-end ISO 20022 transaction path mapping',
                    'Data center OT coverage: UPS, CRAC, PDU, generators as DEXPI equipment',
                    'SWIFT CSP compliance: automated control assessment per CSCF v2024',
                    'ATM/POS network mapping: terminal-to-switch-to-core transaction chains',
                    'Graph ontology: CVE ↔ banking system ↔ regulatory risk impact scoring',
                ],
                bottomLine: '85% infrastructure coverage · 4 facility archetypes · Full payment chain',
            },
        },

        subSectors: FINANCIAL_SECTOR.subSectors.map(sub => ({
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
 * Returns a lightweight summary of the Financial sector for the hub page.
 */
export function getFinancialSummary(): SectorSummary {
    const data = getFinancialStepData();
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
