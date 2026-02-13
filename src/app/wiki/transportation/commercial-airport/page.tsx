/**
 * Commercial Airport Deep-Dive Reference Architecture.
 *
 * Covers airfield lighting & NAVAIDs, jet fuel hydrant systems, inline EDS
 * baggage handling, airport ground power, and HVAC terminal systems.
 *
 * @module wiki/transportation/commercial-airport/page
 */

export const metadata = {
    title: 'Commercial Airport — Transportation Wiki',
    description:
        'TOGAF reference architecture for FAA Part 139 commercial airports: airfield lighting, fuel farm, BHS, ground power, HVAC.',
};

export default function CommercialAirportPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <Header />
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl
                    heads={['Stakeholder', 'Role', 'Interest']}
                    rows={[
                        ['FAA', 'Regulatory', 'Safety oversight, Part 139 certification, ATC'],
                        ['TSA', 'Security', 'Passenger/baggage screening, 49 CFR 1542'],
                        ['Airport Authority', 'Owner/Operator', 'Infrastructure, revenue, tenants'],
                        ['Airlines', 'Operator', 'Gate allocation, turnaround, ops efficiency'],
                        ['ATC', 'Operational', 'Airspace management, SWIM integration'],
                        ['Ground Handlers', 'Service', 'Baggage, ramp, catering services'],
                        ['Fuel Operators', 'Service', 'Into-plane fueling, ASTM compliance'],
                        ['Tenants', 'Commercial', 'Retail, food & beverage, parking'],
                    ]}
                />
                <H4>Regulatory Framework</H4>
                <Tbl
                    heads={['Standard', 'Title', 'Scope']}
                    rows={[
                        ['14 CFR 139', 'Airport Certification', 'Operating standards for certified airports'],
                        ['49 CFR 1542', 'Airport Security', 'Access control, screening, perimeter security'],
                        ['ICAO Annex 14', 'Aerodromes', 'International aerodrome design standards'],
                        ['NFPA 415', 'Airport Fuel Facilities', 'Fire protection for aviation fuel ops'],
                        ['FAA AC 150/5340', 'Visual Aids', 'Airfield lighting, signage, marking'],
                        ['NFPA 403', 'Aircraft Rescue', 'ARFF vehicle and agent requirements'],
                    ]}
                />
            </S>

            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌────────────────────── AIRSIDE ──────────────────────┐
│ Runway 28R ═══════════════════════ 12,000 ft        │
│  ├─ MALSR approach → ILS (LOC 108/GS 329 MHz)      │
│  ├─ PAPI (4-lamp, 3.0° GPA)                        │
│  └─ Edge lights (FAA L-862, 45 cd, 6.6A)           │
│ Taxiway A ──── Apron / Gates (30-80)                │
├─────────────────────────────────────────────────────┤
│ FUEL FARM: Tanks (4×50k bbl) → Filter → Loop       │
│   Hydrant Loop (8-12" steel, 150 psi)               │
├─────────────────────────────────────────────────────┤
│ TERMINAL: Check-in → EDS → Holdroom → Gate          │
│ BHS: Induct → CT scan → Sort (tilt-tray) → Makeup  │
│ Power: 13.8 kV sub → 480V → UPS (ATC/Nav)          │
│ HVAC: Chillers (500-3000 ton) → AHU → BACnet DDC   │
└─────────────────────────────────────────────────────┘`}</Ascii>
            </S>

            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Airfield Lighting &amp; NAVAIDs</H4>
                <Tbl
                    heads={['System', 'Spec', 'Parameters']}
                    rows={[
                        ['Runway Edge', 'FAA L-862 LED', '45-60 cd, 120V/6.6A, 200 ft spacing'],
                        ['PAPI', '4-lamp', '15° beam, 1000-3000 ft range'],
                        ['ILS Localizer', 'Cat III', '108-112 MHz, ±0.3° precision'],
                        ['ILS Glide Slope', 'Cat III', '329-335 MHz, 3.0° GPA'],
                        ['MALSR', 'Medium', '9-21 strobes, 1400-3000 ft'],
                        ['ADS-B', '1090ES', '250 NM range, 1 Hz update'],
                    ]}
                />
                <H4>3.2 Fuel Farm &amp; Hydrant Systems</H4>
                <Tbl
                    heads={['Component', 'Spec', 'Rating']}
                    rows={[
                        ['Storage Tanks', 'Fixed-roof steel', '50,000 bbl each, 4-8 tanks'],
                        ['Transfer Pumps', 'API 610 centrifugal', '1000-3000 gpm, 150 psi'],
                        ['Filter/Separators', 'API 1581, 10-micron', '500-2000 gpm flow'],
                        ['Hydrant Loop', 'ASME B31.3 steel', '8-12" NPS, 150 psi WP'],
                        ['Hydrant Pits', 'Flush-mount 8"', '300-1000 gpm/nozzle'],
                        ['Foam System', 'AFFF 6% deluge', '0.25 gpm/ft² coverage'],
                    ]}
                />
                <H4>3.3 Baggage Handling Systems (BHS)</H4>
                <Tbl
                    heads={['System', 'Technology', 'Throughput']}
                    rows={[
                        ['Inline EDS', 'CT-based detection', '1800-3000 bags/hr'],
                        ['Tilt-tray Sorters', 'Electromechanical', '200-400 m/min, 99.8% acc'],
                        ['Cross-belt Sorters', 'Belt divert', '12,000 items/hr'],
                        ['DCV (AGV)', 'Laser-guided', '0.5-1 m/s, 500 kg'],
                        ['BHS Controls', 'Siemens S7/AB', 'EtherNet/IP, SCADA'],
                    ]}
                />
                <H4>3.4 Ground Power &amp; Electrical</H4>
                <Tbl
                    heads={['Equipment', 'Spec', 'Rating']}
                    rows={[
                        ['Primary Substation', '69-138 kV → 13.8 kV', '50-200 MVA'],
                        ['Switchgear', 'Metal-clad 13.8 kV', '3000A bus, 40 kA'],
                        ['Emergency Gensets', 'Diesel MTU/Cat', '1-5 MW, 10-sec start'],
                        ['UPS (ATC/Nav)', 'Double-conversion', '100-500 kVA, 15 min'],
                        ['GPU', 'Gate-mounted', '90 kVA, 400 Hz/28V DC'],
                    ]}
                />
                <H4>3.5 HVAC &amp; Building Systems</H4>
                <Tbl
                    heads={['Equipment', 'Type', 'Rating']}
                    rows={[
                        ['Chillers', 'Water-cooled centrifugal', '500-3000 ton, COP 6.0'],
                        ['AHUs', 'VAV with VFD', '50k-200k CFM, MERV 13'],
                        ['BACnet DDC', 'IP controllers', '55-75°F zones'],
                        ['PCA', 'Gate-mounted', '30-60 tons/bridge'],
                    ]}
                />
            </S>

            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Passenger Flow</H4>
                <Ascii>{`Check-in → Security (EDS/ETD) → Holdroom → Biometric Board → Aircraft
  Self-bag kiosk       scan          (intl passport)      2000 pax/hr/conc`}</Ascii>
                <H4>4.2 Baggage Flow</H4>
                <Ascii>{`Induct → EDS CT Scan → Clear? → Tilt-tray Sort → Load ULD
  barcode       L1/L2       [NO→ ETD]    DCV to chute   Cycle: <20 min`}</Ascii>
                <H4>4.3 Fuel Distribution</H4>
                <Ascii>{`Pipeline/Truck → Tank Farm → 10μ Filter → Hydrant Loop → Into-plane
  offload         4×50k bbl   API 1581      150 psi loop   1000 gpm`}</Ascii>
                <H4>4.4 Aircraft Turnaround</H4>
                <Ascii>{`Gate Arrival → Deboard → GPU+PCA → Fuel+Cater+Clean → Board → Push
  45 min (narrow) / 90 min (wide)                       Cargo load`}</Ascii>
            </S>

            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Mid-size hub (30-60 gates, 2-3 runways, 20M+ pax/yr)</p>
                <Tbl
                    heads={['Equipment', 'Spec', 'Qty', 'Rating']}
                    rows={[
                        ['Runway Edge Lights', 'FAA L-862 LED', '200-800', '45-60 cd'],
                        ['PAPI Units', '4-lamp', '2-4/rwy', '1000-3000 ft'],
                        ['ILS System', 'Cat II/III', '2-4/rwy', '108/329 MHz'],
                        ['EDS Scanners', 'CT inline', '10-50', '2500 bags/hr'],
                        ['Tilt-Tray Sorters', 'Modular', '5-20', '300 m/min'],
                        ['DCV AGVs', 'Laser-guided', '50-200', '1 m/s, 400 kg'],
                        ['Fuel Tanks', 'Fixed-roof', '4-8', '50k bbl each'],
                        ['Fuel Pumps', 'API 610', '4-12', '1000-3000 gpm'],
                        ['Fuel Filters', 'API 1581', '8-20', '2000 gpm'],
                        ['Hydrant Pits', 'Flush 8"', '50-200', '500 gpm'],
                        ['Diesel Gensets', 'Emergency', '4-8', '2.5 MW, 480V'],
                        ['Switchgear', '13.8 kV', '2-4', '3000A bus'],
                        ['UPS Modules', 'Dbl-conv', '4-8', '250 kVA, 15 min'],
                        ['GPUs', 'Gate-mount', '20-50', '90 kVA, 400 Hz'],
                        ['Chillers', 'Centrifugal', '4-12', '1000 ton'],
                        ['AHUs', 'VAV/VFD', '20-100', '100k CFM'],
                        ['PLC Cabinets', 'S7-1500', '10-30', 'EtherNet/IP'],
                        ['ARFF Trucks', 'Index E', '3-6', '4000 gal, 1000 gpm'],
                        ['SCADA Servers', 'Redundant', '2-4', 'L2/L3'],
                        ['ADS-B Antennas', '1090ES', '4-8', '250 NM'],
                        ['CCTV', '4K PTZ IP', '200-500', 'ONVIF S/G'],
                        ['FOD Detection', 'Electro-optical', '20-50/rwy', '1 km range'],
                        ['BACnet DDC', 'IP-based', '50-200', '0-10V I/O'],
                    ]}
                />
            </S>

            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl
                    heads={['Level', 'Function', 'Airport Components', 'Protocols']}
                    rows={[
                        ['L0', 'Sensing/Actuation', 'Runway lights, PAPI, fuel Tx, temp Tx', 'HART, 4-20 mA'],
                        ['L1', 'Basic Control', 'BHS PLC, fuel PLC, lighting CCR, GPU', 'Modbus, Profibus'],
                        ['L2', 'Supervisory', 'BHS SCADA, FIDS, fuel SCADA, BMS', 'OPC UA, EtherNet/IP'],
                        ['L3', 'Operations', 'AODB, A-CDM, SWIM gateway', 'A-CDM, SWIM (FIXM)'],
                        ['L3.5', 'DMZ', 'Firewall, data diode, VPN', 'IEC 62443'],
                        ['L4', 'Enterprise', 'Airline ERP, revenue, flight ops', 'ADS-B, ACARS, SITA'],
                    ]}
                />
            </S>

            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl
                    heads={['System', 'Standard', 'Specification']}
                    rows={[
                        ['ARFF', '14 CFR 139.319', 'P19: 3000-4000 gal, 1000 gpm, AFFF 6%'],
                        ['Fuel Fire', 'NFPA 415', 'Deluge 0.25 gpm/ft², foam, containment'],
                        ['Bird Strike', 'AC 150/5200-33', 'Doppler radar 5 km, pyrotechnics'],
                        ['FOD Detection', 'AC 150/5210-24', 'Electro-optical, 95% detect >1 in'],
                        ['Environmental', 'EPA', 'NOx CEMS 0-500 ppm, noise 85-110 dBA'],
                        ['Perimeter', '49 CFR 1542', 'CCTV AI, fence intrusion, TWIC access'],
                    ]}
                />
            </S>

            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SWIM (FIXM/AIXM) │ A-CDM │ ACARS │ ADS-B │ SITA
Network:     ATN │ ARINC 629/664 │ TCP/IP │ OPC UA │ VPN/TLS
Supervisory: BACnet/IP │ OPC UA │ SNMP │ ONVIF
Control:     Modbus TCP │ EtherNet/IP │ Profibus │ MQTT
Field:       4-20 mA │ HART │ RS-485 │ 6.6A const current`}</Ascii>
            </S>

            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)          Control (L1)        SCADA (L2)
Runway lights─HART─►Lighting CCR─EIP───►Airfield SCADA
Fuel level Tx─4-20─►Fuel PLC────OPC───►Fuel SCADA
BHS sensors──DI/O──►BHS PLC(S7)─OPC───►BHS SCADA
HVAC─────────BACn──►DDC Ctrl───BACn───►BMS HMI
                                           │ L3.5 DMZ
Operations (L3)         Enterprise (L4)
AODB/A-CDM◄──AMXM──►Airline ERP
SWIM gw◄─────FIXM──►FAA NAS
Airport Ops◄─REST──►Revenue Mgmt`}</Ascii>
            </S>

            <S n={10} t="References" id="references">
                <Refs
                    items={[
                        'Federal Aviation Administration. (2023). 14 CFR Part 139: Certification of airports. U.S. GPO.',
                        'International Civil Aviation Organization. (2022). Annex 14: Aerodromes (Vol. I). ICAO.',
                        'National Fire Protection Association. (2021). NFPA 415: Airport terminal buildings & fuel facilities. NFPA.',
                        'Transportation Security Administration. (2020). 49 CFR Part 1542: Airport security. DHS.',
                        'Federal Aviation Administration. (2024). AC 150/5340-30: Airport visual aids. FAA.',
                        'The Open Group. (2022). TOGAF Standard, Version 10.',
                        'ASCE. (2023). Airport design guidelines. ASCE.',
                        'IEEE. (2021). IEEE 1100: Powering and grounding electronic equipment.',
                    ]}
                />
            </S>

            <SeeAlso
                links={[
                    { href: '/wiki/transportation', label: 'Transportation Hub', color: '#0EA5E9' },
                    { href: '/wiki/sectors/TRAN', label: 'Sector Overview', color: '#0EA5E9' },
                    { href: '/wiki/transportation/sorting-facility', label: 'Sorting Facility', color: '#A855F7' },
                ]}
            />
        </div>
    );
}

/* ── Shared Components ── */
function Header() {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}>✈️</div>
                <div>
                    <span className="text-[10px] text-gray-500 font-mono block">TRAN-AV-ARPT</span>
                    <h1 className="text-2xl font-heading font-bold text-white">Commercial Airport Reference Architecture</h1>
                </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for FAA Part 139 certified commercial airports covering airfield lighting &amp; NAVAIDs, jet fuel hydrant systems, inline EDS baggage handling, airport ground power, and terminal HVAC systems.</p>
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#0EA5E9] mr-2">{n}.</span>{t}</h2>{children}</section>);
}
function H4({ children }: { children: React.ReactNode }) {
    return <h4 className="text-sm font-semibold text-gray-200 mt-4 mb-2">{children}</h4>;
}
function Tbl({ heads, rows }: { heads: string[]; rows: string[][] }) {
    return (
        <div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'text-gray-300 font-medium' : 'text-gray-400'}`}>{c}</td>)}</tr>)}</tbody></table></div>
    );
}
function Ascii({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function Refs({ items }: { items: string[] }) {
    return (<div className="space-y-2 text-xs text-gray-400 leading-relaxed">{items.map((item, i) => <p key={i}>{item}</p>)}</div>);
}
function SeeAlso({ links }: { links: { href: string; label: string; color: string }[] }) {
    return (<section className="space-y-3"><h2 className="text-lg font-heading font-semibold text-white">See Also</h2><div className="flex flex-wrap gap-2">{links.map(l => <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} &rarr;</a>)}</div></section>);
}
