/**
 * Regional Sorting Facility Deep-Dive Reference Architecture.
 * Conveyors, scanning, robotics, WMS/WCS, building systems.
 * @module wiki/transportation/sorting-facility/page
 */
export const metadata = {
    title: 'Regional Sorting Facility — Transportation Wiki',
    description: 'TOGAF reference architecture for automated parcel/mail regional sorting facilities: cross-belt conveyors, 3D scanning, robotic induction, WMS/WCS, and building systems.',
};
export default function SortingFacilityPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A855F7, #9333EA)' }}>📦</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">TRAN-PS-SORT</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Regional Sorting Facility Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for automated regional mail/parcel sorting facilities covering high-speed cross-belt and tilt-tray sorters (10,000-30,000 items/hr), 3D volumetric scanning, robotic induction (AMRs and pick arms), WMS/WCS integration, and building systems including dock management and HVAC.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Postal Operators', 'Owner/Operator', 'USPS, Royal Mail, DHL — throughput, accuracy'],
                    ['E-commerce Retailers', 'Customer', 'Amazon, Walmart — SLA, cut-off times'],
                    ['Integrators', 'Partner', 'FedEx, UPS — hub/sort interline volume'],
                    ['Equipment OEMs', 'Supplier', 'Beumer, Vanderlande, Interroll — sorters, conveyors'],
                    ['Robotics Vendors', 'Supplier', 'GreyOrange, Locus, Boston Dynamics — pick/induction'],
                    ['IT/WMS Vendors', 'Supplier', 'Manhattan, Blue Yonder, SAP EWM — software'],
                    ['Regulatory (PRC)', 'Oversight', 'Postal Regulatory Commission — service standards'],
                    ['Labor Unions (APWU)', 'Labor', 'Mail handlers, clerks, equipment operators'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['USPS DMM', 'Domestic Mail Manual', 'Mailpiece dimensions, addressing, barcodes'],
                    ['GS1', 'Barcode Standards', 'GS1-128, DataMatrix, SSCC for parcels'],
                    ['OSHA 29 CFR 1910', 'General Industry Safety', 'Machine guarding, lockout/tagout, ergonomics'],
                    ['NFPA 13', 'Sprinkler Systems', 'Commodity classification, high-pile storage'],
                    ['UL 583', 'Electric Conveyors', 'Safety, overload protection, E-stop'],
                    ['ISO 3691', 'Industrial Trucks', 'AGV/AMR safety, path planning, collision'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌────────── DOCK & INBOUND ─────────────────────────────┐
│ Truck dock doors (50-100) → Dock mgmt system          │
│ Pallet/bulk unload → 3D volumetric scan → Barcode/OCR │
├──────────────────────────────────────────────────────┤
│ INDUCTION                                             │
│  Manual stations (12-20) + Robotic pick arms (4-8)    │
│  AMRs (50-100 fleet) for tote transport                │
│  Singulation → Orientation → Belt feed to sorter      │
├──────────────────────────────────────────────────────┤
│ PRIMARY SORT (Cross-belt / Tilt-tray)                 │
│  Loop 1: 10,000-20,000 items/hr (small parcel)       │
│  Loop 2: 5,000-10,000 items/hr (medium/large)        │
│  OCR/barcode at divert → 200-300 chutes/destinations  │
├──────────────────────────────────────────────────────┤
│ OUTBOUND                                              │
│  Chute → Gaylord/cage/bag → Route staging → Truck load │
│  Manifest print → Dock assignment → Dispatch           │
└──────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Conveyor &amp; Sorter Systems</H4>
                <Tbl heads={['Equipment', 'Technology', 'Throughput / Rating']} rows={[
                    ['Cross-Belt Sorter', 'Individual belt carriers', '10,000-20,000 items/hr, 2 m/s'],
                    ['Tilt-Tray Sorter', 'Mechanical tilt divert', '8,000-15,000 items/hr, 1.5 m/s'],
                    ['Sliding Shoe Sorter', 'Pin divert', '4,000-10,000 items/hr, 1.5-2.5 m/s'],
                    ['Belt Conveyor', 'Flat belt, accumulation', '0.5-3.0 m/s, 50 kg max'],
                    ['Roller Conveyor', 'MDR (motor-driven roller)', 'Zone-controlled, E-stop'],
                    ['Spiral Conveyors', 'Gravity/powered spiral', 'Elevation change 3-10 m'],
                ]} />
                <H4>3.2 Scanning &amp; Identification</H4>
                <Tbl heads={['System', 'Technology', 'Specification']} rows={[
                    ['3D Volumetric Scanner', 'Laser + structured light', 'L×W×H ±1 mm, 2000+ scans/hr'],
                    ['6-sided OCR', 'Multi-camera array', '99.5% read rate, 0-3 m/s belt speed'],
                    ['Barcode Scanner', '1D/2D laser/imager', 'GS1-128, DataMatrix, QR, 99.9%'],
                    ['RFID Tunnel', 'UHF 860-960 MHz', 'Batch read 500 tags/sec, 99%+ accuracy'],
                    ['Dimensioning', 'Time-of-flight', '0-80 kg, ±5 mm accuracy'],
                    ['Weight Scale', 'In-motion, belt-type', '0-50 kg, ±10 g, legal-for-trade'],
                ]} />
                <H4>3.3 Robotics &amp; AMRs</H4>
                <Tbl heads={['System', 'Type', 'Specification']} rows={[
                    ['Robotic Pick Arms', '6-DOF articulated', 'Payload 5-15 kg, cycle 600-900 picks/hr'],
                    ['AMR Fleet', 'Autonomous mobile robots', '50-100 units, 200 kg payload, LiDAR nav'],
                    ['Goods-to-Person', 'Rack-moving AMRs', '1000-2000 cycle/hr per station'],
                    ['Palletizing Robot', 'SCARA/articulated', 'Mixed-case, 10-20 cases/min'],
                    ['Fleet Manager', 'Central software', 'Dynamic path planning, charging, assignment'],
                ]} />
                <H4>3.4 WMS / WCS / WES</H4>
                <p className="text-sm text-gray-400 leading-relaxed">
                    The Warehouse Management System (WMS — e.g. Manhattan/Blue Yonder) handles inventory, orders and labor. The Warehouse Control System (WCS) orchestrates sorter PLCs, conveyor zones, and divert logic providing real-time material flow. The Warehouse Execution System (WES) bridges WMS/WCS with wave planning, waving, and put-wall logic. All communicate via REST APIs, MQTT, and OPC UA.
                </p>
                <H4>3.5 Building Systems</H4>
                <Tbl heads={['System', 'Type', 'Specification']} rows={[
                    ['HVAC', 'Rooftop units', '300,000 sq ft, 55-75°F, 2 ACH'],
                    ['Dock Levelers', 'Hydraulic/air', '50 lb/ft capacity, 6×8 ft pad'],
                    ['LED Lighting', 'High-bay', '200 lux sort floor, 300 lux induction'],
                    ['Fire Sprinklers', 'NFPA 13 ESFR', 'K-25.2, 40x40 ft coverage'],
                    ['Dock Door Seals', 'Foam compression', '9x10 ft, insulated'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Inbound Processing</H4>
                <Ascii>{`Truck dock → Pallet unload → 3D scan + weight → Barcode/OCR
  → Label validation → Singulation → Orientation → Belt induct`}</Ascii>
                <H4>4.2 Sort Flow</H4>
                <Ascii>{`Induct belt → Cross-belt sorter loop (2 m/s, 15k items/hr)
  → OCR read → Divert to chute (200-300 destinations)
  → Chute-full sensor → Alert if overflow → Gaylord staging`}</Ascii>
                <H4>4.3 Outbound Dispatch</H4>
                <Ascii>{`Chute → Gaylord/cage fill → Route staging area
  → Manifest print (GS1 SSCC) → Dock assignment → Truck load
  → Driver scan → Dispatch → GPS tracking`}</Ascii>
                <H4>4.4 Exception Handling</H4>
                <Ascii>{`No-read / damaged barcode → Manual encode station
  → Re-scan → Sort or ship as exception
  Oversize → Divert to manual sort lane → Bypass chute`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">300,000 sq ft regional hub (&gt;1M items/day capacity)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Cross-Belt Sorter', '2 loops', '10,000-20,000 items/hr each'],
                    ['Tilt-Tray Sorter', '1 loop', '8,000 items/hr, large parcel'],
                    ['Belt Conveyors', '3 km total', 'MDR, 0.5-3 m/s, 50 kg max'],
                    ['3D Volumetric Scanners', '20', 'Laser, ±1 mm, 2000 scans/hr'],
                    ['6-Sided OCR Stations', '10', '5-camera array, 99.5% read'],
                    ['In-Motion Scales', '10', '0-50 kg, ±10 g, legal-for-trade'],
                    ['Robotic Pick Arms', '8', '6-DOF, 800 picks/hr'],
                    ['AMRs', '80', '200 kg payload, LiDAR nav'],
                    ['Induction Stations', '16 manual', '1000 items/hr per station'],
                    ['Sort Chutes', '250', '250 mm belt, full sensors'],
                    ['Barcode Scanners', '100', '1D/2D, GS1-128/DataMatrix'],
                    ['RFID Readers', '20', 'UHF 915 MHz, 500 tags/sec'],
                    ['Sorter PLCs', '30', 'Siemens S7/AB, EtherNet/IP'],
                    ['WMS Servers', '6', 'HA cluster, Manhattan/Blue Yonder'],
                    ['WCS Controllers', '4', 'Real-time, OPC UA'],
                    ['Fire Sprinklers', '800', 'ESFR K-25.2, NFPA 13'],
                    ['HVAC RTUs', '12', '30-ton each, BACnet/IP'],
                    ['Dock Levelers', '80', 'Hydraulic, 50 lb/ft'],
                    ['LED High-Bay', '500', '200 lux sort floor'],
                    ['UPS', '4', '200 kVA, 15 min'],
                    ['Diesel Generators', '2', '1 MW, 480V, 72-hr fuel'],
                    ['CCTV', '200', '4K IP, AI analytics'],
                    ['Wi-Fi 6E APs', '150', '6 GHz, industrial IP67'],
                    ['Fleet Mgr Server', '2', 'AMR dispatch, path planning'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Facility Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Barcode scanners, weight scales, photo-eyes', 'Discrete I/O, RS-232'],
                    ['L1', 'Control', 'Sorter PLCs, conveyor zone controllers', 'EtherNet/IP, Profibus'],
                    ['L2', 'Supervisory', 'WCS, sorter HMI, fleet manager', 'OPC UA, MQTT'],
                    ['L3', 'Operations', 'WMS (Manhattan), labor mgmt, wave planning', 'REST API, EDI'],
                    ['L3.5', 'DMZ', 'IT/OT firewall, protocol break', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'ERP (SAP), carrier TMS, e-commerce portal', 'REST, AS2 EDI'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Machine Guarding', 'OSHA 1910.212', 'Light curtains, interlock gates, E-stop chain'],
                    ['LOTO', 'OSHA 1910.147', 'Group lockout for sorter maintenance, annual audit'],
                    ['Fire Protection', 'NFPA 13', 'ESFR K-25.2, high-pile storage commodity class'],
                    ['AMR Safety', 'ISO 3691-4', 'LiDAR obstacle detect, 50 mm resolution'],
                    ['Ergonomics', 'OSHA', 'Adjustable induction stations, anti-fatigue mats'],
                    ['Emergency Egress', 'IBC', 'Illuminated exits, 10 sec occupant notification'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  REST API (WMS↔ERP) │ EDI (AS2 856/945) │ GS1 EPCIS
Network:     Wi-Fi 6E (6 GHz) │ Industrial Ethernet │ 5G CBRS
Supervisory: OPC UA │ MQTT │ REST (WCS ↔ WMS)
Control:     EtherNet/IP │ PROFINET │ Modbus TCP
Field:       Discrete I/O │ RS-232 (scanners) │ BLE (AMR)`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       WCS (L2)
Barcode──RS-232───►Induct PLC──EIP───►WCS Divert Logic
Scale──4-20───────►Conv PLC───EIP───►WCS Tracking
Photo-eye──DI/O──►Zone ctrl──EIP───►WCS Zone Map
AMR status──BLE──►Fleet Mgr──MQTT──►WCS Task Queue
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
WMS◄─────REST─────►ERP (SAP)
Wave Planner◄──EDI►Carrier TMS
Labor Mgmt◄───────►HR/Payroll`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'USPS. (2024). Domestic Mail Manual (DMM). USPS.',
                    'GS1. (2023). GS1-128 barcode standard. GS1.',
                    'OSHA. (2023). 29 CFR 1910: General industry safety standards. DOL.',
                    'NFPA. (2022). NFPA 13: Standard for installation of sprinkler systems. NFPA.',
                    'ISO. (2020). ISO 3691-4: Industrial trucks — Driverless trucks. ISO.',
                    'MHI. (2024). Automated material handling technology guide. MHI.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'Beumer Group. (2023). Cross-belt sorter technical specifications.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/transportation', label: 'Transportation Hub', color: '#0EA5E9' },
                { href: '/wiki/sectors/TRAN', label: 'Sector Overview', color: '#0EA5E9' },
                { href: '/wiki/transportation/commercial-airport', label: 'Commercial Airport', color: '#0EA5E9' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#A855F7] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
