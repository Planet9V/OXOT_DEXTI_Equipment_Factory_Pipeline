/**
 * Semiconductor Fabrication Plant (Fab) Reference Architecture — Deep Dive.
 * @module wiki/information-technology/semiconductor-fab/page
 */
export const metadata = {
    title: 'Semiconductor Fab Reference Architecture — Wiki',
    description: 'TOGAF reference architecture for a 300mm leading-edge semiconductor fab.',
};

const C = '#8B5CF6';
const BG = 'rgba(255,255,255,0.02)';

const REGS = [
    ['SEMI S2', 'EHS guidelines for semiconductor manufacturing equipment'],
    ['SEMI S8', 'Ergonomic guidelines for semiconductor manufacturing equipment'],
    ['SEMI S23', 'Guide for conservation of water and energy in semiconductor mfg'],
    ['ISO 14644-1/2', 'Cleanroom classification and monitoring by particle concentration'],
    ['NFPA 318', 'Standard for protection of semiconductor fabrication facilities'],
    ['ASHRAE TC 9.10', 'Cleanroom design and environmental control guidelines'],
    ['EPA RCRA/TSCA', 'Hazardous waste disposal (RCRA), toxic substances control (TSCA)'],
    ['SEMI E30 (GEM)', 'Generic Equipment Model for tool-host communication'],
    ['SEMI E164 (EDA)', 'Equipment Data Acquisition — Interface A real-time data access'],
];

const BOM = [
    ['EUV Scanner', 'ASML NXE:3600D, 185 W', '15–20', '< 3 nm resolution'],
    ['DUV Immersion Scanner', 'ASML NXT:2050i', '30–40', '38 nm resolution'],
    ['PECVD Reactor', 'Applied Materials Producer', '40–60', 'SiO₂/SiN deposition'],
    ['ALD System', 'ASM EmerALD, thermal/plasma', '20–30', 'Atomic-layer conformal'],
    ['ICP Etch', 'Lam 2300 Kiyo, F-based', '40–60', 'High-AR anisotropic'],
    ['CMP Polisher', 'Applied Reflexion LK, 4-platen', '15–25', 'Cu/oxide planarization'],
    ['Ion Implanter', 'Applied VIISta, high-energy', '10–15', '1 keV – 3 MeV'],
    ['Wet Bench / Clean', 'Screen SPM/SC-1/SC-2', '30–50', 'Megasonic + chemical'],
    ['CD-SEM', 'Hitachi CG7300', '20–30', 'Critical dimension < 1 nm'],
    ['Defect Inspector', 'KLA Surfscan SP7', '10–15', '≥ 15 nm sensitivity'],
    ['PVD/Sputter', 'Applied Endura, multi-chamber', '20–30', 'Cu/Ta/TiN metallization'],
    ['FFU (Fan Filter Unit)', 'ULPA 99.9995% @ 0.12 µm', '4 000–8 000', '0.3–0.5 m/s face vel.'],
    ['Makeup Air Handler', '100% outside air, DX/CHW', '8–16', '50K–100K CFM ea'],
    ['UPW Plant', 'RO/EDI/UV/UF, 18.2 MΩ·cm', '1', '200–400 gpm'],
    ['Bulk N₂ Generator', 'Cryogenic ASU / PSA', '1–2', '50K–100K Nm³/h'],
    ['Gas Cabinet', 'Double-contained, auto-switch', '200–400', 'SiH₄/NF₃/WF₆'],
    ['POU Scrubber', 'Burn box / wet scrub', '200–500', '> 99% DRE'],
    ['Substation Xfmr', '34.5/4.16 kV, ONAN', '4–8', '20–40 MVA each'],
    ['Static UPS', 'Double-conversion per tool grp', '40–80', '100–500 kVA ea'],
    ['OHT (AMHS)', 'Overhead hoist, FOUP transport', '200–400', '1.5 m/s, 25 kg'],
    ['Chiller', 'Centrifugal, process cooling', '8–16', '500–2000 ton ea'],
];

const PURDUE = [
    ['L4 Enterprise', 'ERP, yield mgmt, supply chain, capacity planning', 'SAP/Oracle, REST, OPC UA'],
    ['L3.5 DMZ', 'OPC UA gateway, historian, security broker', 'OPC UA, TLS 1.3, FW'],
    ['L3 Operations', 'MES, FDC/APM, recipe mgmt, R2R control', 'GEM300 (E40/E87/E94), EDA E164'],
    ['L2 Supervisory', 'Tool supervisory, SCADA, AMHS controller', 'SECS/GEM E30/E37, HSMS'],
    ['L1 Control', 'Tool PLC/embedded, gas interlock, TGM', 'SECS-II E5, DeviceNet, EtherCAT'],
    ['L0 Process', 'Wafer, process chamber, gas flow, UPW, RF plasma', 'Analog I/O, mass flow ctrl'],
];

const SUPPORT = [
    ['Fire Suppression', 'Clean agent (FM-200/Novec) in CR, pre-action in subfab', 'NFPA 318'],
    ['TGM System', 'Toxic gas monitoring — silane, arsine, phosphine, NF₃', '< 0.5 ppm, auto-shutoff'],
    ['Exhaust Abatement', 'POU burn/wet scrub + central packed tower scrubber', '> 99% DRE, NESHAP'],
    ['Seismic Isolation', 'Spring isolators, inertia blocks for litho tools', 'VC-D/VC-E (0.005–0.02 g)'],
    ['Physical Security', 'Card access, CCTV, escort, perimeter', 'ITAR/EAR export ctl'],
    ['Environmental', 'Wastewater treatment, hazwaste storage < 90 day', 'EPA RCRA, state POTW'],
];

const UTIL = [
    ['UPW', 'Ultra-pure water loop (RO/EDI/UV/UF)', '18.2 MΩ·cm, TOC < 2 ppb, 200–400 gpm'],
    ['N₂', 'Cryogenic ASU or PSA bulk generation', '99.9999%, 50K–100K Nm³/h'],
    ['CDA', 'Compressed dry air, oil-free compressor', '< -70°C dewpoint, 7 bar'],
    ['Process Gas', 'SiH₄, NF₃, WF₆, C₄F₈ via gas cabinets/VMB', 'SEMI S2, double-contained, TGM'],
    ['Chemicals', 'HF, H₂SO₄, HCl, IPA, acetone bulk dispense', 'PVDF/PFA piping, auto-blend'],
    ['CMP Slurry', 'Colloidal silica/ceria, centralized blend', '≤ 0.1 µm particle, pH-controlled'],
];

const REFS = [
    'ISO. (2015). ISO 14644-1:2015 Cleanrooms — Classification of air cleanliness. ISO.',
    'SEMI. (2020). SEMI E30-0300: Generic Equipment Model (GEM). SEMI.',
    'SEMI. (2019). SEMI E37-0417: High Speed SECS Message Services (HSMS). SEMI.',
    'SEMI. (2021). SEMI E164-0813: Equipment Data Acquisition (EDA). SEMI.',
    'SEMI. (2018). SEMI S2-0712: EHS Guideline for Semiconductor Mfg Equipment. SEMI.',
    'NFPA. (2021). NFPA 318: Protection of Semiconductor Fabrication Facilities. NFPA.',
    'SEMI. (2021). SEMI F51-1019: AMC Control in Cleanrooms. SEMI.',
    'Lord, H. (2019). Cleanroom design for semiconductor manufacturing. JSTS, 19(4), 456.',
    'SEMI. (2022). SEMI E187-0222: Cybersecurity of Fab Equipment. SEMI.',
];

export default function SemiconductorFabPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">ITEC · HW-FAB · Hardware Manufacturing</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Semiconductor Fabrication Plant (Fab)</h1>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    A 300 mm leading-edge fab (50 K WSPM) combines ISO 1–5 cleanrooms, 1 000–1 500 process tools,
                    18.2 MΩ·cm UPW, exotic bulk gases, AMHS automation, and 60–100 MW continuous power — all
                    governed by SEMI SECS/GEM standards and producing chips at ≤ 3 nm process nodes.
                </p>
            </header>

            {/* 1 */}
            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Stakeholders: foundry operators (TSMC, Samsung, Intel), fabless design houses (Apple,
                    NVIDIA, Qualcomm), equipment OEMs (ASML, Applied Materials, Lam Research, TEL), SEMI
                    standards body, EPA/state environmental regulators, and OSHA.
                </p>
                <T h={['Standard', 'Scope']} rows={REGS} />
            </S>

            {/* 2 */}
            <S t="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Ballroom layout: continuous cleanroom floor (100K+ sq ft per level), interstitial subfab
                    below for piping/exhaust, and CUB housing chillers, boilers, UPW, bulk gas, electrical.
                    ULPA-filtered laminar flow at positive pressure. AMHS rail with OHT FOUP transport.
                </p>
                <Pre>{`
┌──────────────────────────────────────────────────────────────────┐
│                    CLEANROOM (ISO 1-5)                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ EUV  │ │ CVD/ │ │ Etch │ │ CMP  │ │Implnt│ │Metro │        │
│  │Litho │ │ ALD  │ │ICP/  │ │      │ │      │ │ logy │        │
│  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘        │
│  ═══╧════════╧════════╧════════╧════════╧════════╧═══          │
│              OHT / AMHS RAIL (FOUP Transport)                   │
├──────────────────────────────────────────────────────────────────┤
│                  SUBFAB / INTERSTITIAL                           │
│  [Exhaust] [Gas Lines] [UPW Piping] [Vacuum] [POU Scrubbers]   │
├──────────────────────────────────────────────────────────────────┤
│              CENTRAL UTILITY BUILDING (CUB)                     │
│  ┌────────┐ ┌────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐   │
│  │UPW 18.2│ │Bulk Gas│ │Elec 34.5│ │Chiller  │ │Exhaust   │   │
│  │MΩ·cm   │ │N₂/Ar   │ │kV Sub   │ │5000 ton │ │Abatement │   │
│  └────────┘ └────────┘ └─────────┘ └─────────┘ └──────────┘   │
└──────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            {/* 3 */}
            <S t="3. Detailed Technical Description" id="tech">
                <h3 className="text-sm font-semibold text-white">3.1 Cleanroom & HVAC</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    FFU with ULPA filters (99.9995 % @ 0.12 µm) provide 100 % ceiling coverage at 0.3–0.5 m/s.
                    MAUs supply tempered outside air; recirculation AHUs maintain 20–30 ACH. Temperature 21 ± 1 °C
                    (litho bays ± 0.1 °C), humidity 43 ± 2 % RH. AMC control via SEMI F51 chemical filters.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.2 Process Tools</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    1 000–1 500 tools: EUV (ASML NXE:3600D, 185 W, &lt;3 nm), DUV immersion scanners, CVD (LPCVD/PECVD/ALD),
                    PVD sputtering, plasma etch (ICP/CCP), CMP, ion implant (1 keV–3 MeV), wet bench, metrology (CD-SEM,
                    scatterometry, KLA Surfscan darkfield).
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.3 Ultra-Pure Water</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    18.2 MΩ·cm, TOC &lt;2 ppb, dissolved O₂ &lt;1 ppb, bacteria &lt;1 CFU/100 mL, particles &lt;1/mL at
                    &gt;0.05 µm. Treatment: pre-treat → dual-pass RO → EDI → 185 nm UV → mixed-bed DI → 0.02 µm UF.
                    Flow: 200–400 gpm with continuous recirculation at 20–25 °C.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.4 Bulk Gas & Chemical Distribution</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    N₂ (99.9999 %) on-site via cryogenic ASU at 50K–100K Nm³/h. Process gases (SiH₄, WF₆, NF₃, C₄F₈)
                    in double-contained gas cabinets with VMB and TGM. PVDF/PFA piping for acids (HF, H₂SO₄, HCl),
                    solvents (IPA, acetone), CMP slurries with auto-blend/dispense.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.5 Electrical</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    60–100 MW load via 34.5 kV / 13.8 kV double-ended substations, 4.16 kV MV switchgear, PDUs per tool
                    group. Static UPS for litho/etch critical tools. Emergency generators 4–12 × 2.5 MW diesel (life safety).
                </p>
            </S>

            {/* 4 */}
            <S t="4. Process Diagrams" id="process">
                <Pre>{`
  Bare Wafer ──▶ Oxide ──▶ Photo ──▶ Etch ──▶ Strip ──▶ Deposit
                 CVD/ALD   EUV/DUV   ICP/CCP          PVD/ALD
                                                        │
       ┌────────────────────────────────────────────────┘
       ▼
     CMP ──▶ Implant ──▶ Anneal ──▶ Metrology ──▶ Test ──▶ Package
     Polish   1keV-3MeV   RTA 1050°C  CD-SEM       Sort    Assembly`}</Pre>
                <Pre>{`
  SECS/GEM AUTOMATION:
  ┌──────────┐ HSMS   ┌──────────┐ GEM300  ┌──────────┐
  │  Tool    │◀═════▶│  Host    │◀══════▶│   MES    │
  │ E5/E30   │ E37    │ E30/E87  │ E40/E94 │ Dispatch │
  └────┬─────┘        └────┬─────┘         └────┬─────┘
       ▼                   ▼                    ▼
  ┌──────────┐      ┌──────────┐         ┌──────────┐
  │ EDA E164 │      │ FDC/APM  │         │ AMHS OHT │
  │ Real-time│      │ R2R Ctrl │         │ FOUP     │
  └──────────┘      └──────────┘         └──────────┘`}</Pre>
            </S>

            {/* 5 */}
            <S t="5. Bill of Materials" id="bom">
                <p className="text-[11px] text-gray-600 mb-2">Scaled for 50K WSPM, 300 mm, ≤ 5 nm node fab.</p>
                <T h={['Equipment', 'Spec', 'Qty', 'Rating']} rows={BOM} />
            </S>

            {/* 6 */}
            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-[11px] text-gray-600 mt-2">SEMI E187 cybersecurity applies L0–L3; IEC 62443 zones at L3.5 DMZ.</p>
            </S>

            {/* 7 */}
            <S t="7. Supporting Systems" id="support">
                <T h={['System', 'Description', 'Standard']} rows={SUPPORT} />
            </S>

            {/* 8 */}
            <S t="8. Chemical, Gas & Water Systems" id="utility">
                <T h={['Medium', 'System', 'Specification']} rows={UTIL} />
            </S>

            {/* 9 */}
            <S t="9. Data Flow Architecture" id="dataflow">
                <Pre>{`
┌──────────────────────────────────────────────────────────────┐
│ TIER 5  ENTERPRISE        ERP / Yield DB / Supply Chain      │
│                            REST API · 15 min batch           │
├──────────────────────────────────────────────────────────────┤
│ TIER 4  MES / SCHEDULING  MES Dispatch, WIP Tracker          │
│                            GEM300 (E40/E94) · lot events     │
├──────────────────────────────────────────────────────────────┤
│ TIER 3  FDC / APM         Fault Detection, R2R Control       │
│                            EDA (E164) · 100 ms sampling      │
├──────────────────────────────────────────────────────────────┤
│ TIER 2  TOOL SUPERVISOR   Recipe Mgmt, State Machine         │
│                            SECS/GEM (E30/E37) · 1 s poll     │
├──────────────────────────────────────────────────────────────┤
│ TIER 1  TOOL CONTROLLER   PLC, MFC, RF Gen, Vacuum           │
│                            SECS-II (E5) · 10–100 ms          │
├──────────────────────────────────────────────────────────────┤
│ TIER 0  PROCESS           Wafer / plasma / gas / UPW / chem  │
│                            Analog I/O · µs response          │
└──────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            {/* 10 */}
            <S t="10. References" id="refs">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    {REFS.map((r) => <li key={r}>{r}</li>)}
                </ol>
            </S>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-400">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'IT Sector Hub', href: '/wiki/information-technology', color: C },
                        { label: 'Hyperscale DC', href: '/wiki/information-technology/hyperscale-dc', color: '#06B6D4' },
                        { label: 'CISA ITEC', href: '/wiki/sectors/ITEC', color: C },
                    ].map((l) => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}

/* ── Helpers ─────────────────────────────────────────────── */
function S({ t, id, children }: { t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 scroll-mt-24"><h2 className="text-xl font-heading font-semibold text-white">{t}</h2>{children}</section>);
}
function Pre({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function T({ h, rows }: { h: string[]; rows: string[][] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <table className="w-full text-xs border-collapse">
                <thead><tr className="border-b border-white/[0.08] text-gray-500">{h.map((c) => <th key={c} className="text-left px-3 py-2 font-medium">{c}</th>)}</tr></thead>
                <tbody className="text-gray-400">{rows.map((r) => (
                    <tr key={r[0]} className="border-b border-white/[0.04]">
                        <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{r[0]}</td>
                        {r.slice(1).map((c, i) => <td key={i} className="px-3 py-2">{c}</td>)}
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}
