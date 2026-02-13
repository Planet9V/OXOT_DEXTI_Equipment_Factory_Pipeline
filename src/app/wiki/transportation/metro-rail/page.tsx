/**
 * Metro Rail System Deep-Dive Reference Architecture.
 * Traction power, CBTC signaling, TVE, station systems, comms.
 * @module wiki/transportation/metro-rail/page
 */
export const metadata = {
    title: 'Metro Rail System — Transportation Wiki',
    description: 'TOGAF reference architecture for urban heavy rail metro systems: traction power, CBTC/ETCS signaling, NFPA 130 tunnel ventilation, station systems.',
};
export default function MetroRailPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EC4899, #DB2777)' }}>🚇</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">TRAN-MT-METRO</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Metro Rail System Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for urban heavy rail rapid transit (metro) systems covering 750 VDC traction power with 12/18/24-pulse rectifier substations, CBTC signaling for GoA4 driverless operation, NFPA 130 compliant tunnel ventilation, station fare/PSD systems, and TETRA/LTE communications.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Transit Authority', 'Owner/Operator', 'Service delivery, ridership, asset management'],
                    ['FTA', 'Regulatory', 'Grants, safety oversight, State Safety Oversight'],
                    ['FRA', 'Regulatory', '49 CFR 238/239, shared corridors'],
                    ['Rolling Stock OEMs', 'Supplier', 'Alstom, Bombardier, Siemens — trainsets & support'],
                    ['Unions (ATU/SMART-TD)', 'Labor', 'Operators, maintenance, safety representatives'],
                    ['Passengers', 'End User', 'Safe, reliable, accessible transit service'],
                    ['City DOT', 'Coordination', 'Street-level integration, bus connections'],
                    ['Utility Companies', 'Infrastructure', 'Power feed, fiber co-location'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['49 CFR 238', 'Passenger Equipment Safety', 'Structural, fire, emergency standards'],
                    ['49 CFR 239', 'Emergency Preparedness', 'Plans, drills, communication protocols'],
                    ['NFPA 130', 'Fixed Guideway Transit', 'Fire/life safety for tunnels & stations'],
                    ['IEC 62278', 'Railway RAMS', 'Reliability, availability, maintainability, safety'],
                    ['IEEE 1474.1', 'CBTC Systems', 'Communication-based train control standard'],
                    ['APTA Standards', 'Transit Operations', 'RT-OP-S-002, maintenance, accessibility'],
                    ['ADA', 'Accessibility', 'Station access, platform edge, tactile guidance'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── TRACTION POWER ───────────────────────────────────┐
│ Grid (13.8-34.5 kV AC) → Rectifier Substation        │
│   12/18/24-pulse thyristor/IGBT, 5-10 MVA            │
│   → 750 VDC Third Rail (or 1500 VDC OCS)             │
│   Substations spaced 1-2 km, regen braking 30-40%    │
├──────────────────────────────────────────────────────┤
│ SIGNALING & TRAIN CONTROL                             │
│  CBTC: radio-based (2.4 GHz / LTE), GoA4 capable    │
│  ATP + ATO + ATS → 90-sec headway, 35-40 tph        │
│  Interlocking: electronic SIL4 zone controllers      │
├──────────────────────────────────────────────────────┤
│ STATIONS (20×)                                        │
│  Fare gates (40 pps) │ PSD (2-3 m/s) │ CCTV/PA      │
│  Escalators/elevators │ BMS (BACnet)                  │
├──────────────────────────────────────────────────────┤
│ OCC (Operations Control Center)                       │
│  ATS/SCADA │ TETRA/LTE │ Fiber backbone (DWDM)      │
├──────────────────────────────────────────────────────┤
│ DEPOT/YARD: Stabling, maintenance, heavy inspection  │
└──────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Traction Power System</H4>
                <Tbl heads={['Component', 'Specification', 'Rating']} rows={[
                    ['Rectifier Substations', '12/18/24-pulse thyristor/IGBT', '5-10 MVA, 750/1500 VDC out'],
                    ['DC Switchgear', 'Vacuum circuit breakers', '2000-4000 A, 50 kA AIC'],
                    ['Third Rail', 'Aluminum/stainless steel', '120-150 mm², insulated clips @3m'],
                    ['OCS (alternative)', 'Cu messenger wire', '100-200 mm², 1500-3000 VDC'],
                    ['Regen Braking', 'IGBT inverters on trains', '30-40% energy recovery'],
                    ['Stray Current Mgmt', 'Insulated track base', 'IEC 62128, corrosion monitoring'],
                ]} />
                <H4>3.2 Signaling &amp; Train Control (CBTC)</H4>
                <Tbl heads={['System', 'Technology', 'Performance']} rows={[
                    ['Thales SelTrac', 'Radio-based 2.4 GHz', 'GoA4, Vancouver SkyTrain'],
                    ['Siemens Trainguard MT', 'LTE option, virtual balises', 'GoA2-4, configurable'],
                    ['Alstom Urbalis 400', 'ETCS L2/3 hybrid', 'GoA4, interoperable'],
                    ['Track Circuits', 'Audio-frequency 156-250 Hz', '1500m range, fallback'],
                    ['Interlocking', 'Electronic SIL4 (EN 50128)', 'Zone controllers, redundant'],
                    ['Balises/Loops', 'Wayside transponders', 'Position reference, vital'],
                ]} />
                <H4>3.3 Tunnel Ventilation Emergency (TVE)</H4>
                <Tbl heads={['Equipment', 'Type', 'Rating']} rows={[
                    ['Jet Fans', 'Axial, reversible', '20-50 kW, 10-20 m³/s thrust'],
                    ['Station Exhaust', 'Platform ventilation', '5000-10000 CFM per zone'],
                    ['Smoke Control', 'SES-modeled zones', 'Critical velocity 2.5-3.5 m/s'],
                    ['Fire Resistance', 'Tunnel lining', '4-hour rated concrete'],
                    ['Emergency Lighting', 'Battery backed', '1 lux min, 90-min runtime'],
                ]} />
                <H4>3.4 Station Systems</H4>
                <Tbl heads={['System', 'Product', 'Specification']} rows={[
                    ['Fare Gates', 'Cubic / Scheidt & Bachmann', '40 pps, contactless, 99.5% MTBF'],
                    ['Platform Screen Doors', 'Pneumatic/hydraulic', '2-3 m/s open, 3.2m high, EN 81-41'],
                    ['PA/CCTV', 'IP-based distributed', '4K, 30 fps, H.265, EN 54-24'],
                    ['Escalators', 'Otis/KONE', '1000 kg, 0.65 m/s, ADA-compliant'],
                    ['Elevators', 'MRL regenerative', '1600 kg, 1.6 m/s, ADA'],
                ]} />
                <H4>3.5 Communications</H4>
                <Tbl heads={['System', 'Technology', 'Specification']} rows={[
                    ['TETRA', 'ETSI EN 300 392', '25 kHz channel, trunked voice/data'],
                    ['LTE', '3GPP Rel-14 MCX', '700/850 MHz, 100 Mbps, <100 ms'],
                    ['Fiber Backbone', 'DWDM', '100 Gbps per lambda, C-band'],
                    ['DAS', 'Distributed antennas', '+17 dB gain, 95% signal coverage'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Passenger Journey</H4>
                <Ascii>{`Entry (fare gate scan) → Platform wait → PSD opens on train arrival
  → Board (ATO dwell 30s) → Ride (CBTC 90s headway) → Exit gate`}</Ascii>
                <H4>4.2 Train Movement (Headway Management)</H4>
                <Ascii>{`CBTC computes Movement Authority (MA) via radio
  → ATS adjusts speed profile → 90-sec headway target
  → Fallback: fixed-block track circuits (120-sec headway)`}</Ascii>
                <H4>4.3 Traction Power Flow</H4>
                <Ascii>{`Grid (13.8 kV AC) → Rectifier (AC→DC) → DC Switchgear
  → Third Rail → Train pantograph → Inverter → Traction Motors
  Regen: Motors → Inverter → Third Rail → Adjacent train/capacitor bank`}</Ascii>
                <H4>4.4 Emergency Ventilation Sequence</H4>
                <Ascii>{`Fire detection → Alarm (2s) → Jet fans ramp to full (10s)
  → Platform exhaust activate → Smoke extraction (hold Cv 3 m/s)
  → Evacuation via cross-passages (15 min/100m capacity)`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">20-station metro line (~25 km, 750 VDC, CBTC)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Rectifier Substations', '15', '6 MVA, 18-pulse, 750 VDC, IP54'],
                    ['DC Switchgear', '30', '3000A, 50 kA, vacuum breakers'],
                    ['Third Rail', '25 km', '120 mm² Al, 750 VDC, insulated'],
                    ['CBTC Zone Controllers', '20', 'SIL4, dual-redundant'],
                    ['Track Circuit Tx/Rx', '500', '170/1500 Hz, 2 km spacing'],
                    ['Jet Fans (tunnel)', '200', '30 kW, 15 m³/s, VFD'],
                    ['Platform Screen Doors', '400', '3.2m, 1.2s cycle, 500k ops'],
                    ['Fare Gates', '80', '40 pps, contactless, IP65'],
                    ['Escalators', '80', '35°, 0.65 m/s, 800 pph'],
                    ['TETRA Base Stations', '50', '10W ERP, 99.999% uptime'],
                    ['Fiber Cable', '50 km', 'SMF-28, 96-core, G.657A'],
                    ['CCTV Cameras', '1000', '4K IP66, IR 50m, H.265'],
                    ['PA Speakers', '800', '100W, EN 54-24'],
                    ['UPS (OCC/station)', '40', '500 kVA, 15 min, VFI'],
                    ['Linear Heat Detect', '50 km', '68/88°C, SIL2'],
                    ['Point Machines', '400', 'Electro-hydraulic, 10s, SIL4'],
                    ['Axle Counters', '500', '99.999% availability'],
                    ['DAS Antennas', '1000', '698-2700 MHz, 8 dBi'],
                    ['Seismic Sensors', '40', 'Triaxial, 0.01g, EN 50155'],
                    ['Elevators', '40', '1600 kg, 1.6 m/s, regen'],
                    ['SCADA HMI', '20', '24" touch, Wonderware'],
                    ['Regen Inverters', '50', '1500 kW, IGBT, 750 VDC'],
                    ['DWDM MUX', '25', '40-ch, 100 Gbps total'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Metro Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Track circuits, point machines, axle counters', 'Audio-freq, inductive'],
                    ['L1', 'Control', 'Interlocking, zone controller, CBTC wayside', 'CBTC radio 2.4 GHz'],
                    ['L2', 'Supervisory', 'ATS/OCC consoles, SCADA (power/signal)', 'OPC UA, TCP/IP'],
                    ['L3', 'Operations', 'TMMS, asset management (CMMS/ISO 55000)', 'REST API, MQTT'],
                    ['L3.5', 'DMZ', 'IEC 62443 firewalls, IDS for OT/IT', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'ERP (SAP), ridership analytics, planning', 'REST, GTFS'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Tunnel Fire/Life', 'NFPA 130', '4-hr fire resistance, emergency lighting 1 lux'],
                    ['Fire Detection', 'Linear heat/VESDA', 'FibreSense 1°C, aspirating 0.005% obs/m'],
                    ['Platform Edge', 'Lidar/IR detect', '0.1m resolution, SIL2, PSD interlock'],
                    ['Emergency Walkways', 'NFPA 130', '1.2m wide, blue-lit, every 100m'],
                    ['Detrainment', '49 CFR 239', 'Right-of-way kits, procedure training'],
                    ['Seismic Detection', 'Accelerometers', 'Trigger PSD closure at 0.2g PGA'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  GTFS │ ridership analytics │ ERP integration
Network:     TETRA (25 kHz) │ LTE Rel-14 MCX │ TCP/IP
Supervisory: OPC UA │ CBTC ATS link │ BACnet/IP (station BMS)
Control:     CBTC radio (2.4/5 GHz or LTE) │ serial interlocking
Field:       Audio-freq track circuits │ inductive axle counters
Backbone:    SONET OC-192 / DWDM C-band 80-ch fiber`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)        SCADA (L2)
Track circuit─AF────►Interlocking──SER──►ATS Console
Point machine─enc──►Zone Controller─CB─►OCC SCADA
Axle counter─ind───►CBTC Wayside───rad─►ATS Display
                                           │ L3.5 DMZ
Operations (L3)         Enterprise (L4)
Train Mgmt (TMMS)◄─API─►SAP ERP
CMMS◄──────────────────►Ridership Analytics
Revenue (AFC)◄───GTFS──►Passenger App`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'FTA. (2023). Rail transit vehicle inspection guidance (FTA-RV-1). DOT.',
                    'NFPA. (2022). NFPA 130: Standard for fixed guideway transit systems. NFPA.',
                    'IEC. (2018). IEC 62278: Railway applications — RAMS. IEC.',
                    'IEEE. (2021). IEEE 1474.1: CBTC systems standard. IEEE.',
                    'APTA. (2020). RT-OP-S-002-02: Transit operations management. APTA.',
                    'UITP. (2024). Metro automation and driverless systems. UITP.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'IEC. (2021). IEC 62443: Industrial network security. IEC.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/transportation', label: 'Transportation Hub', color: '#0EA5E9' },
                { href: '/wiki/sectors/TRAN', label: 'Sector Overview', color: '#0EA5E9' },
                { href: '/wiki/transportation/highway-tunnel', label: 'Highway Tunnel', color: '#10B981' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#EC4899] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
