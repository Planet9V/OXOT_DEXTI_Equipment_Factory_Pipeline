/**
 * Container Port Terminal Deep-Dive Reference Architecture.
 * STS cranes, RTG/ASC yard automation, TOS, reefer, cold ironing.
 * @module wiki/transportation/container-port/page
 */
export const metadata = {
    title: 'Container Port Terminal — Transportation Wiki',
    description: 'TOGAF reference architecture for 1M+ TEU container port terminals: STS cranes, RTG/ASC, TOS, reefer management, IEC 80005 cold ironing.',
};
export default function ContainerPortPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }}>🚢</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">TRAN-MR-PORT</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Container Port Terminal Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for a 1M+ TEU deep-water container port terminal covering STS gantry cranes, RTG/RMG/ASC yard equipment, Terminal Operating Systems, reefer management, and IEC 80005 shore power.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Port Authority', 'Regulatory/Owner', 'Harbor master, land leases, infrastructure'],
                    ['Terminal Operators', 'Operator', 'PSA, APM, ICTSI — crane/yard ops, TOS'],
                    ['Shipping Lines', 'Customer', 'Vessel scheduling, berth allocation, bay plans'],
                    ['CBP / Customs', 'Regulatory', 'Container inspection, C-TPAT, manifest review'],
                    ['USCG', 'Security', 'MTSA compliance, waterside security, ISPS'],
                    ['Longshoremen (ILA/ILWU)', 'Labor', 'Crane operators, checker, equipment ops'],
                    ['Freight Forwarders', 'Logistics', 'Booking, documentation, intermodal coordination'],
                    ['Trucking Companies', 'Drayage', 'Gate appointments, chassis management'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['MTSA 33 CFR 105', 'Maritime Transportation Security Act', 'Facility security plans, access control'],
                    ['ISPS Code', 'International Ship & Port Facility Security', 'IMO security framework, MARSEC levels'],
                    ['SOLAS', 'Safety of Life at Sea', 'Vessel VGM, container weight verification'],
                    ['46 CFR', 'US Vessel Regulations', 'Marine terminal operations, inspections'],
                    ['CBP C-TPAT', 'Customs-Trade Partnership Against Terrorism', 'Supply chain security, trusted trader'],
                    ['IEC 80005', 'Shore Power / Cold Ironing', '6.6-11 kV, 50/60 Hz, emission reduction'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌──────────────────── BERTH / QUAY ────────────────────┐
│ STS Cranes (10×) ═══ 65t lift, 22-container outreach │
│ Vessel berth (1500m quay, 16m draft)                 │
├──────────────────────────────────────────────────────┤
│ CONTAINER YARD (40 ha)                                │
│  RTG (25×): 1-over-6, 45t, diesel-electric           │
│  RMG (8×): rail-mounted, 65t, electric                │
│  ASC (20×): automated, DGPS-guided                    │
│  Reefer plugs: 1000× at 460V/60Hz                    │
├──────────────────────────────────────────────────────┤
│ GATE COMPLEX: OCR/RFID (12 in / 12 out lanes)       │
│  TWIC check → RPM scan → TOS assignment → yard slot  │
├──────────────────────────────────────────────────────┤
│ INTERMODAL RAIL: RMG load → rail wagon → dispatch    │
└──────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Ship-to-Shore (STS) Cranes</H4>
                <Tbl heads={['Parameter', 'Specification', 'Notes']} rows={[
                    ['Outreach', '18-22 containers (60-75 m)', 'Post-Panamax / Neo-Panamax'],
                    ['Lift Capacity', '40-65 tonnes under spreader', 'Twin-lift capable'],
                    ['Hoist Speed', '90-120 m/min loaded, 180 empty', 'VFD-controlled'],
                    ['Power', '5-10 MW via cable reel', '6.6 kV / 50 Hz supply'],
                    ['Anti-Sway', 'Laser-guided, VFD damping', '±50 mm positioning accuracy'],
                    ['Rate', '30 moves/hr/crane', 'Dual-trolley: 40+ moves/hr'],
                ]} />
                <H4>3.2 Yard Equipment</H4>
                <Tbl heads={['Equipment', 'Config', 'Rating']} rows={[
                    ['RTG', '1-over-5/6 high', '40-45t, diesel-electric, 1-2 MW'],
                    ['RMG', 'Rail-mounted, 1-over-6', '65t, electric, 2-3 MW'],
                    ['ASC', 'Automated straddle', '45t, DGPS/RTK, <2 cm accuracy'],
                    ['Straddle Carriers', '4-high stack', '45t, diesel, 300-500 kW'],
                    ['Reach Stackers', '5-high empty / 2 loaded', '45t, 250 kW diesel'],
                    ['Terminal Tractors', 'Horizontal transport', '45t, 200 kW, AGV-capable'],
                ]} />
                <H4>3.3 TOS &amp; Gate Automation</H4>
                <p className="text-sm text-gray-400 leading-relaxed">
                    The Terminal Operating System (e.g., NAVIS N4, Tideworks) optimizes vessel planning, yard stacking, and gate processing. Gate automation uses AI-powered OCR cameras for container/chassis ID and RFID for truck identification, reducing gate dwell time to under 30 minutes. EDI messaging (BAPLIE for bay plans, COPINO for gate messages) integrates with shipping line and customs systems.
                </p>
                <H4>3.4 Reefer Management</H4>
                <Tbl heads={['Component', 'Specification', 'Notes']} rows={[
                    ['Power Outlets', '460V / 60Hz, 32-63A, 3-phase', '1000+ plugs per terminal'],
                    ['Monitoring', 'TOS-linked temp/humidity sensors', 'Hourly polls, -30 to +30°C'],
                    ['Pre-Trip Inspect', 'Automated PTI stations', 'Functional test before vessel'],
                    ['Alarms', 'Real-time alerting', 'Temp deviation >2°C triggers alarm'],
                ]} />
                <H4>3.5 Shore Power / Cold Ironing</H4>
                <Tbl heads={['Parameter', 'Specification', 'Standard']} rows={[
                    ['Voltage', '6.6-11 kV, 50/60 Hz', 'IEC 80005-1'],
                    ['Power per Vessel', '5-10 MW', 'Cruise: 10-16 MW'],
                    ['Connector', 'Liquid-cooled cable', '7.5 MVA rating'],
                    ['Emission Reduction', '95% NOx/SOx at berth', 'CARB compliance'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Vessel Discharge / Load</H4>
                <Ascii>{`BAPLIE manifest → Berth plan → STS unload (30 mvs/hr/crane)
  → Tractor/AGV → RTG/ASC stack → yard → reverse for load
  Cycle: 24-48 hrs for 8000 TEU vessel`}</Ascii>
                <H4>4.2 Gate In / Out</H4>
                <Ascii>{`Truck arrives → OCR/RFID scan → TWIC check → RPM radiation scan
  → TOS slot assignment → yard direction → dwell <20 min`}</Ascii>
                <H4>4.3 Intermodal Rail Transfer</H4>
                <Ascii>{`Yard slot → RMG picks container → rail wagon placement
  → TOS/PCS manifest sync → customs clearance → train departure`}</Ascii>
                <H4>4.4 Reefer Monitoring Cycle</H4>
                <Ascii>{`Gate plug-in → TOS scan → hourly temp/humidity poll → alarm check
  → pre-trip inspection before vessel → load confirmation`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">1M+ TEU terminal (1500m quay, 40 ha yard, 10-12 berths)</p>
                <Tbl heads={['Equipment', 'Spec', 'Qty', 'Rating']} rows={[
                    ['STS Cranes', 'Post-Panamax', '10', '65t, 22-row, 10 MW'],
                    ['RTG Cranes', 'Diesel-electric', '25', '45t, 1-over-6, 1.5 MW'],
                    ['RMG Cranes', 'Rail-mounted', '8', '65t, 1-over-6, 2.5 MW'],
                    ['ASC Units', 'DGPS-guided', '20', '45t, 1 MW electric'],
                    ['Terminal Tractors', 'Diesel/electric', '150', '45t, 200 kW'],
                    ['Reach Stackers', 'Container handler', '15', '45t, 5-high empty'],
                    ['Reefer Plugs', '460V/60Hz', '1000', '32-63A, 3-phase'],
                    ['OCR Gate Lanes', 'AI cameras + RFID', '24', '12 in + 12 out'],
                    ['RPM', 'Radiation portal', '24', 'PVT scintillator'],
                    ['TOS Servers', 'NAVIS N4 HA', '6', 'Redundant cluster'],
                    ['DGPS Base Stations', 'RTK', '4', '<2 cm accuracy'],
                    ['CCTV Cameras', '4K AI analytics', '500', 'IP67, ONVIF'],
                    ['Shore Power', 'IEC 80005', '6', '7.5 MVA cabinets'],
                    ['Fire Suppression', 'Foam/deluge', '20 zones', 'NFPA compliant'],
                    ['TWIC Readers', 'Biometric RFID', '50', 'Access control'],
                    ['Wi-Fi 6E APs', 'Industrial', '300', '6 GHz, 10 Gbps'],
                    ['5G Base Stations', 'Private CBRS', '20', 'URLLC for AGVs'],
                    ['Crane PLCs', 'Safety-rated', '100', 'PROFINET, SIL-2'],
                    ['EDI Gateways', 'BAPLIE/COPINO', '4', 'UN/EDIFACT'],
                    ['Fender Systems', 'Cone/cell', '60', '2000 kJ energy abs.'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Port Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Spreader sensors, RTG position, container RFID', '4-20 mA, RFID 915 MHz'],
                    ['L1', 'Control', 'Crane PLC, RTG PLC, gate OCR controller', 'PROFINET, Modbus'],
                    ['L2', 'Supervisory', 'TOS (NAVIS N4), DGPS, yard planning HMI', 'OPC UA, TCP/IP'],
                    ['L3', 'Operations', 'Terminal mgmt, vessel planning, rail planning', 'BAPLIE/COPINO EDI'],
                    ['L3.5', 'DMZ', 'IDMZ firewalls, protocol gateway', 'IEC 62443'],
                    ['L4', 'Enterprise', 'Port community system (PCS), customs EDI', 'REST, X12/EDIFACT'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['ISPS/MTSA Security', '33 CFR 105', 'TWIC access, MARSEC levels, FSP'],
                    ['Radiation Monitors', 'CBP/DNDO', 'PVT scintillator RPMs at all gates'],
                    ['Fire Protection', 'NFPA 72/750', 'Sprinklers, deluge on cranes/quays'],
                    ['STS Anti-Collision', 'Vendor spec', 'Laser/encoder-based, 3D proximity'],
                    ['Man-Down System', 'OSHA', 'Wearable with GPS geofencing alert'],
                    ['CCTV Analytics', 'MTSA', 'AI-powered perimeter & pier monitoring'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  BAPLIE/COPINO (EDI) │ PCS REST API │ Customs X12
Network:     Wi-Fi 6E (6 GHz) │ 5G Private (CBRS) │ Fiber DWDM
Supervisory: OPC UA │ NAVIS API │ SNMP
Control:     PROFINET │ Modbus TCP │ DGPS/RTK
Field:       RFID (UHF 915 MHz) │ OCR (vision) │ 4-20 mA`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
Spreader sens─4-20──►Crane PLC──PNET──►TOS (NAVIS N4)
RFID tag────UHF────►Gate OCR PLC─TCP─►Yard Planning
RTG pos───encoder──►RTG PLC───OPC───►ASC Dispatch
                                         │ L3.5 DMZ
Operations (L3)         Enterprise (L4)
Terminal Mgmt◄──EDI──►Port Community Sys
Vessel Plan◄──BAPLIE─►Shipping Line
Rail Plan◄────X12───►Customs / CBP`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'IMO. (2004). International Ship & Port Facility Security Code (ISPS). IMO.',
                    'PIANC. (2020). WG 169: Innovative container terminal design. PIANC.',
                    'IEEE. (2019). IEC/IEEE 80005-1: Shore connection systems. IEEE.',
                    'ASCE. (2025). Ports 2025: Conference proceedings. ASCE.',
                    'UNCTAD. (2024). Review of maritime transport. United Nations.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'NFPA. (2020). NFPA 307: Standard for marine terminals. NFPA.',
                    'U.S. Coast Guard. (2023). 33 CFR 105: Maritime facility security. USCG.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/transportation', label: 'Transportation Hub', color: '#0EA5E9' },
                { href: '/wiki/sectors/TRAN', label: 'Sector Overview', color: '#0EA5E9' },
                { href: '/wiki/transportation/classification-yard', label: 'Classification Yard', color: '#EF4444' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#6366F1] mr-2">{n}.</span>{t}</h2>{children}</section>);
}
function H4({ children }: { children: React.ReactNode }) { return <h4 className="text-sm font-semibold text-gray-200 mt-4 mb-2">{children}</h4>; }
function Tbl({ heads, rows }: { heads: string[]; rows: string[][] }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'text-gray-300 font-medium' : 'text-gray-400'}`}>{c}</td>)}</tr>)}</tbody></table></div>);
}
function Ascii({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function Refs({ items }: { items: string[] }) { return (<div className="space-y-2 text-xs text-gray-400 leading-relaxed">{items.map((item, i) => <p key={i}>{item}</p>)}</div>); }
function SeeAlso({ links }: { links: { href: string; label: string; color: string }[] }) {
    return (<section className="space-y-3"><h2 className="text-lg font-heading font-semibold text-white">See Also</h2><div className="flex flex-wrap gap-2">{links.map(l => <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} &rarr;</a>)}</div></section>);
}
