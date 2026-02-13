/**
 * Petrochemical Complexes — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for integrated steam
 * cracking complexes producing ethylene, propylene, butadiene, and BTX
 * aromatics from naphtha/ethane feedstocks at 800-850 deg C, with downstream
 * fractionation trains and polymerization units (PE, PP, synthetic rubber).
 *
 * Covers furnace design, cracked gas compression, cryogenic separation,
 * polymerization reactor types, SIS/ESD architecture per IEC 61511, and
 * DCS integration across a 1 MTPA ethylene-equivalent complex.
 *
 * @module wiki/chemical/petrochemical/page
 */

export const metadata = {
    title: 'Petrochemical Complexes (Steam Cracking & Polymerization) — Chemical Wiki',
    description:
        'TOGAF reference architecture for integrated petrochemical complexes: steam cracking furnaces, ' +
        'cryogenic fractionation, polymerization reactors, bills of materials, and Purdue model mapping.',
};

export default function PetrochemicalPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#EF4444' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CHEMICAL &middot; BASIC CHEMICALS &middot; PETROCHEMICAL
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Petrochemical Complexes
                </h1>
                <p className="text-sm text-gray-500 font-mono">Steam Cracking &amp; Polymerization &middot; 1 MTPA Ethylene</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Integrated petrochemical complexes convert hydrocarbon feedstocks — naphtha, ethane, propane,
                    and gas oil — into base olefins and aromatics through thermal cracking at 800&ndash;850 &deg;C,
                    followed by cryogenic fractionation and catalytic polymerization. A world-scale complex
                    producing 1 million tonnes per annum (MTPA) of ethylene typically co-produces 500 kt/a
                    propylene, 150 kt/a butadiene, and 300 kt/a BTX aromatics, feeding downstream polyethylene,
                    polypropylene, and synthetic rubber units. These facilities operate under OSHA Process Safety
                    Management (29 CFR 1910.119) and EPA Risk Management Programs (40 CFR 68), with Safety
                    Instrumented Systems designed to IEC 61511 SIL 2/3 (Towler &amp; Sinnott, 2022).
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture for a petrochemical complex is organized around the continuous
                    transformation of hydrocarbon feedstocks into high-value polymer products and chemical
                    intermediates. The complex operates as a tightly integrated system where upstream cracking
                    furnaces feed downstream separation and polymerization units through a network of compressors,
                    heat exchangers, and fractionation columns. Business drivers include feedstock flexibility
                    (naphtha vs. ethane economics), product slate optimization, energy integration, and compliance
                    with stringent process safety and environmental regulations (The Open Group, 2022).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Plant Operations &amp; Production Management — olefins and polymers divisions</li>
                    <li>Process Safety Management (PSM) teams — PHA, MOC, mechanical integrity</li>
                    <li>Maintenance &amp; Reliability Engineering — turnaround planning, RBI programs</li>
                    <li>Regulatory bodies — OSHA, EPA, state environmental agencies, TCEQ</li>
                    <li>Feedstock procurement &amp; energy trading desks — naphtha/ethane hedging</li>
                    <li>EPC contractors &amp; technology licensors — Lummus, KBR, Technip Energies</li>
                    <li>Downstream polymer customers — converters, compounders, packaging manufacturers</li>
                    <li>Emergency response &amp; fire brigade — on-site and mutual aid</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Standard</th>
                                <th className="text-left px-3 py-2 font-medium">Scope</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['OSHA 29 CFR 1910.119', 'Process Safety Management: PHA, MOC, mechanical integrity, hot work permits, contractor safety for HHC facilities'],
                                ['EPA 40 CFR 68', 'Risk Management Program: worst-case release scenarios, 5-year accident history, prevention programs for listed substances'],
                                ['API 560 / API 530', 'Fired heater design (steam cracking furnaces), tube stress analysis, allowable tube metal temperatures'],
                                ['API 521', 'Pressure-relieving and depressuring systems: flare header sizing, relief valve capacity for cracker relief scenarios'],
                                ['IEC 61511', 'Safety Instrumented Systems for process industry: SIL verification, SIF design, proof testing for ESD and fire/gas systems'],
                                ['NFPA 30 / NFPA 15', 'Flammable liquid storage and handling; water spray fixed systems for transformer and vessel fire protection'],
                                ['ATEX / IECEx', 'Equipment certification for explosive atmospheres: Zone 1/2 classification, Ex d/Ex e/Ex ia protection concepts'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 2. High-Level Design */}
            <Section title="2. High-Level Design" id="high-level-design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The high-level process design follows the classical{' '}
                    <span className="text-[#EF4444] font-medium">steam cracking pathway</span>: hydrocarbon
                    feedstock is preheated and mixed with dilution steam before entering the radiant coil
                    section of pyrolysis furnaces at 800&ndash;850 &deg;C with a residence time of
                    0.1&ndash;0.5 seconds. The cracked gas is immediately quenched to 350 &deg;C in
                    transfer-line exchangers (TLEs) to arrest secondary reactions, then compressed in
                    a multi-stage cracked gas compressor before entering the cryogenic fractionation train.
                    Separated olefin streams feed polymerization reactors producing polyethylene and
                    polypropylene pellets for global markets (Zimmermann &amp; Walzl, 2012).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">One-Line Process Diagram</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Naphtha/Ethane Feedstock
    │
    ▼
Steam Cracking Furnaces (800–850°C, 0.1–0.5s residence)
    │
    ▼
Transfer-Line Exchangers (TLE) — Quench to 350°C
    │
    ▼
Quench Tower (water/oil quench to 40°C)
    │
    ▼
Cracked Gas Compressor (4–5 stages, 35 bar)
    │
    ├── Acid Gas Removal (caustic wash, amine)
    │
    ▼
Cryogenic Fractionation Train (cold box to –100°C)
    │
    ├── Demethanizer  → Fuel gas / H₂ recovery
    ├── Deethanizer   → C2 splitter → Ethylene (polymer grade 99.95%)
    ├── Depropanizer  → C3 splitter → Propylene (polymer grade 99.5%)
    ├── Debutanizer   → C4 raffinate → Butadiene extraction
    └── Pyrolysis Gasoline → BTX aromatics extraction
              │
              ▼
Polymerization Units
    ├── Gas-Phase Fluidized Bed  → HDPE / LLDPE pellets
    ├── Loop Slurry Reactor      → Polypropylene pellets
    └── Solution / CSTR          → Synthetic rubber (SBR, BR)
              │
              ▼
Product Storage & Loading (silos, tanks, rail/truck/ship)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Simplified one-line process diagram for a 1 MTPA ethylene steam cracking
                    complex with integrated polymerization and product handling.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                {/* 3.1 Steam Cracking Furnaces */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Steam Cracking Furnaces</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The pyrolysis section is the heart of the complex, comprising{' '}
                    <span className="text-[#EF4444] font-medium">4&ndash;12 parallel furnaces</span>, each
                    rated at 100&ndash;200 kt/a ethylene capacity. Feedstock (naphtha or ethane) is preheated
                    to 550&ndash;650 &deg;C in the convection section, mixed with dilution steam
                    (steam-to-hydrocarbon ratio 0.3&ndash;0.6 for naphtha, 0.25&ndash;0.4 for ethane), then
                    enters the radiant coil section. Radiant coil outlet temperatures reach 800&ndash;850 &deg;C
                    with coil metal temperatures up to 1,100 &deg;C, at pressures of 1.5&ndash;2.5 bara. Residence
                    time in the radiant coil is critically short at 0.1&ndash;0.5 seconds to maximize olefin
                    selectivity while minimizing coke formation. Transfer-line exchangers (TLEs) immediately
                    quench cracked gas from 850 &deg;C to approximately 350 &deg;C within milliseconds, generating
                    high-pressure steam (100&ndash;120 bara) as a valuable co-product. Furnace decoking is performed
                    every 20&ndash;60 days using steam/air mixtures at 900 &deg;C (Zimmermann &amp; Walzl, 2012).
                </p>

                {/* 3.2 Quench & Compression */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Quench &amp; Compression</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The quench system further cools cracked gas to approximately 40 &deg;C using a{' '}
                    <span className="text-[#EF4444] font-medium">water quench tower</span> (for gas crackers) or
                    oil quench tower (for liquid crackers), recovering pyrolysis gasoline and heavy fuel oil.
                    The cracked gas compressor is the single largest rotating machine in the complex — a{' '}
                    <span className="text-[#EF4444] font-medium">4&ndash;5 stage centrifugal compressor</span>{' '}
                    driven by a condensing steam turbine rated at 30&ndash;50 MW, compressing cracked gas from
                    near-atmospheric pressure to approximately 35 bara. Interstage cooling and knockout drums
                    remove condensed liquids at each stage. Acid gas removal follows compression, employing
                    caustic wash towers to remove CO&#8322; and H&#8322;S, plus molecular sieve dryers to achieve
                    &lt;1 ppm moisture specification required by the cryogenic section (Sadeghbeigi, 2020).
                </p>

                {/* 3.3 Fractionation */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Cryogenic Fractionation</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The fractionation train operates at progressively lower temperatures down to{' '}
                    <span className="text-[#EF4444] font-medium">&minus;100 &deg;C</span> using a cascade
                    refrigeration system with ethylene and propylene as refrigerants. The{' '}
                    <span className="text-white font-medium">demethanizer</span> operates at &minus;100 &deg;C
                    and 30 bara, separating methane and hydrogen as fuel gas overhead. The{' '}
                    <span className="text-white font-medium">deethanizer</span> separates the C2 fraction,
                    which passes through a C2 hydrogenation reactor (selective Pd catalyst) to remove acetylene
                    to &lt;1 ppm before entering the{' '}
                    <span className="text-white font-medium">C2 splitter</span> — a 120&ndash;180 tray column
                    with a reflux ratio of 3&ndash;5, producing polymer-grade ethylene (99.95% purity) overhead.
                    The <span className="text-white font-medium">depropanizer</span> separates the C3 fraction,
                    followed by MAPD hydrogenation and a C3 splitter (160&ndash;220 trays) producing polymer-grade
                    propylene (99.5%). The <span className="text-white font-medium">debutanizer</span> isolates
                    the C4 stream for butadiene extraction via extractive distillation (Kniel et al., 1980).
                </p>

                {/* 3.4 Polymerization */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 Polymerization Units</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Downstream polymerization converts monomer streams into solid polymer products using three
                    primary reactor technologies:{' '}
                    <span className="text-[#EF4444] font-medium">gas-phase fluidized bed reactors</span>{' '}
                    (UNIPOL/INNOVENE process) for HDPE and LLDPE at 80&ndash;110 &deg;C and 20&ndash;25 bara
                    using Ziegler-Natta or metallocene catalysts;{' '}
                    <span className="text-[#EF4444] font-medium">loop slurry reactors</span>{' '}
                    (Spheripol/Borstar process) for polypropylene at 60&ndash;80 &deg;C and 30&ndash;40 bara
                    in liquid propylene diluent; and{' '}
                    <span className="text-[#EF4444] font-medium">continuous stirred-tank reactors (CSTR)</span>{' '}
                    for solution-process synthetic rubber (SBR, polybutadiene) at 50&ndash;150 &deg;C. Polymer
                    powder is degassed, stabilized with antioxidants, and fed to twin-screw extruders
                    (3,000&ndash;5,000 kg/h) producing pellets for storage in 500&ndash;2,000 tonne silos
                    before packaging and shipment (Soares &amp; McKenna, 2012).
                </p>

                {/* 3.5 Utilities & Offsites */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.5 Utilities &amp; Offsites</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The utilities system provides{' '}
                    <span className="text-white font-medium">cooling water</span> (60,000&ndash;80,000 m&#179;/h
                    circulation rate, natural draft cooling towers),{' '}
                    <span className="text-white font-medium">steam at three pressure levels</span>{' '}
                    (HP: 100&ndash;120 bara, MP: 35&ndash;45 bara, LP: 3&ndash;5 bara) generated primarily by
                    TLE waste heat and supplemented by package boilers, and{' '}
                    <span className="text-white font-medium">electric power</span> (100&ndash;200 MW import plus
                    on-site steam turbine generation). The flare system includes an elevated flare stack
                    (120&ndash;150 m height) sized for worst-case emergency depressuring of the entire cracker
                    per API 521, plus a ground flare for routine low-pressure relief. The tank farm includes
                    atmospheric and pressurized storage for feedstocks, intermediates, and products, with
                    secondary containment bunds sized to 110% of the largest tank volume (Towler &amp; Sinnott, 2022).
                </p>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                {/* 4.1 Feedstock to Product Flow */}
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Feedstock to Product Material Balance</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Feed: 3,200 kt/a Naphtha (or 1,600 kt/a Ethane)
─────────────────────────────────────────────────────────
                    ┌──────────────┐
Naphtha ───────────►│   FURNACES   │──► Cracked Gas (mixed C1–C8+)
(3,200 kt/a)        │  8 × 130 kt/a│    35–40% ethylene yield (naphtha)
Dilution Steam ────►│  850°C, 0.2s │    80–85% ethylene yield (ethane)
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   QUENCH &   │──► Pyrolysis gasoline: 600 kt/a
                    │  COMPRESSION │    Fuel oil: 200 kt/a
                    │  5-stage CGC │    HP Steam: 300 t/h (co-product)
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
     ┌────────────┐ ┌────────────┐ ┌────────────┐
     │DEMETHANIZER│ │DEETHANIZER │ │DEPROPANIZER│
     │  –100°C    │ │ C2 SPLITTER│ │ C3 SPLITTER│
     └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
           ▼              ▼              ▼
     Fuel Gas +H₂   Ethylene        Propylene
     400 kt/a       1,000 kt/a      500 kt/a
                         │              │
                    ┌────▼────┐    ┌────▼────┐
                    │PE REACTOR│    │PP REACTOR│
                    │Fluidized │    │Loop Slurry│
                    │  Bed     │    │Spheripol │
                    └────┬─────┘   └────┬─────┘
                         ▼              ▼
                    HDPE/LLDPE      Polypropylene
                    800 kt/a        450 kt/a`}</pre>
                </div>

                {/* 4.2 Control & Safety System Architecture */}
                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Control &amp; Safety System Architecture</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────────────┐
│  SAFETY INSTRUMENTED SYSTEM (SIS) — IEC 61511              │
│  Separate from DCS, dedicated SIL 2/3 logic solvers        │
│                                                             │
│  ESD Levels:                                                │
│    ESD-0: Total plant shutdown (all units, flare)           │
│    ESD-1: Unit shutdown (single furnace/compressor)         │
│    ESD-2: Equipment isolation (single valve/motor)          │
│                                                             │
│  Fire & Gas:                                                │
│    Combustible gas detectors (IR point + open-path)         │
│    Flame detectors (UV/IR multi-spectrum)                   │
│    H₂S / toxic gas detectors (electrochemical)             │
├─────────────────────────────────────────────────────────────┤
│  DISTRIBUTED CONTROL SYSTEM (DCS)                           │
│  Honeywell Experion / Yokogawa CENTUM VP / Emerson DeltaV  │
│                                                             │
│  ├── Furnace Control: COT, TMT, draft, O₂ trim             │
│  ├── Compressor Control: anti-surge, load sharing           │
│  ├── Fractionation: APC (DMC/RMPCT), composition control   │
│  ├── Reactor Control: temperature, catalyst feed, MFI       │
│  └── Utilities: steam balance, CW, power distribution       │
├─────────────────────────────────────────────────────────────┤
│  ADVANCED PROCESS CONTROL (APC)                             │
│  Model-predictive control on furnace severity, C2 splitter  │
│  composition, reactor density. Typical 2–5% yield uplift.   │
└─────────────────────────────────────────────────────────────┘`}</pre>
                </div>

                {/* 4.3 SCADA/Data Flow Architecture */}
                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 SCADA / Data Flow Architecture</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Field Instruments (HART / FF H1 / WirelessHART)
    │
    ▼
I/O Marshalling (electronic marshalling / CHARM / FTA)
    │
    ▼
DCS Controllers ◄──────── SIS Controllers (separate network)
    │                          │
    ├── Operator Stations       ├── SIS Engineering WS (restricted)
    ├── Engineering WS          └── Cause & Effect display
    ├── APC Servers
    └── Historian (OSIsoft PI / Honeywell PHD)
              │
         ─────┼───── DMZ / Firewall (L3.5) ─────
              │
    ├── MES / Production Accounting
    ├── LIMS (laboratory data)
    ├── CMMS (SAP PM / Maximo)
    ├── ERP (SAP S/4HANA)
    └── Energy Trading & Risk Management (ETRM)`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Scaled for a 1 MTPA ethylene world-scale steam cracking complex with integrated PE/PP units.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment Type</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Steam Cracking Furnace', 'Radiant coil pyrolysis, Incoloy 800HT tubes', '8', '130 kt/a each, 850°C COT'],
                                ['Transfer-Line Exchanger (TLE)', 'Double-pipe waste heat boiler', '16', '850→350°C, 120 bara steam'],
                                ['Cracked Gas Compressor', '5-stage centrifugal, condensing steam turbine drive', '2', '35 MW each, 35 bara discharge'],
                                ['Quench Tower', 'Water quench, stainless internals', '1', '8 m dia × 40 m, 200 kt/h gas'],
                                ['Caustic Scrubber', 'Packed column, 10% NaOH circulation', '2', '4 m dia × 25 m, CO₂/H₂S removal'],
                                ['Demethanizer', 'Cryogenic distillation column', '1', '3.5 m dia × 60 m, –100°C, 30 bara'],
                                ['Deethanizer', 'Distillation column, 60 trays', '1', '4 m dia × 45 m, –25°C'],
                                ['C2 Splitter', 'High-purity distillation, 120–180 trays', '1', '5.5 m dia × 90 m, –25°C, R/R 3–5'],
                                ['C2 Hydrogenation Reactor', 'Fixed bed, Pd/Al₂O₃ catalyst', '2', '2.5 m dia × 8 m, 50°C, 25 bara'],
                                ['Depropanizer', 'Distillation column, 40 trays', '1', '4 m dia × 35 m'],
                                ['C3 Splitter', 'High-purity distillation, 160–220 trays', '1', '6 m dia × 95 m, 18 bara'],
                                ['Debutanizer', 'Distillation column, 35 trays', '1', '3 m dia × 30 m'],
                                ['Ethylene Refrigeration Compressor', 'Centrifugal, 3-stage cascade', '2', '15 MW each, –100°C evaporator'],
                                ['Propylene Refrigeration Compressor', 'Centrifugal, 2-stage cascade', '2', '12 MW each, –40°C evaporator'],
                                ['PE Reactor (Gas-Phase FB)', 'UNIPOL fluidized bed, Ziegler-Natta/metallocene', '2', '5 m dia × 25 m, 100°C, 25 bara'],
                                ['PP Reactor (Loop Slurry)', 'Spheripol loop, liquid propylene diluent', '2', '0.6 m dia loop, 70°C, 35 bara'],
                                ['Extruder / Pelletizer', 'Twin-screw, underwater pelletizing', '4', '4,000 kg/h each, 200–250°C'],
                                ['Product Silos', 'Concrete/steel, N₂ blanketed', '12', '500–2,000 t capacity each'],
                                ['Storage Tanks', 'Atmospheric (naphtha) + pressurized (C2/C3)', '30', '5,000–50,000 m³ per tank'],
                                ['Flare Stack', 'Elevated + ground flare, API 521 sized', '2', '150 m height, 2,000 t/h emergency'],
                                ['Control Valves', 'Globe/butterfly, SIL-rated for SIF service', '3,000+', 'ANSI 150–2500, SS/Alloy trim'],
                                ['Safety Relief Valves', 'Spring/pilot-operated, API 526', '500+', 'Sized per API 521 scenarios'],
                                ['Process Pumps', 'Centrifugal, API 610; reciprocating, API 674', '200+', '10–5,000 m³/h, SS/duplex'],
                                ['Online Analyzers', 'GC, NIR, O₂, combustibles, moisture', '150+', 'Process/emissions/quality'],
                                ['DCS Cabinets', 'Redundant controllers, electronic marshalling', '60+', 'Honeywell/Yokogawa/Emerson'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-right text-emerald-500/80 font-mono">{qty}</td>
                                    <td className="px-3 py-2 text-gray-400">{rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 6. Purdue Model Mapping */}
            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">Protocols / Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Level 0 — Process', 'Furnace thermocouples (COT/TMT), pressure transmitters, flow meters, gas detectors, flame detectors, control valves, ESD valves', 'HART 4–20 mA, Foundation Fieldbus H1, WirelessHART, hardwired discrete I/O'],
                                ['Level 1 — Basic Control', 'DCS I/O cards, SIS logic solvers (SIL 2/3), motor starters, VFDs, furnace burner management systems', 'Modbus RTU, PROFIBUS PA, HART, SOE recording (1 ms resolution)'],
                                ['Level 2 — Supervisory', 'DCS operator stations, SIS cause-and-effect displays, APC servers, compressor anti-surge controllers', 'OPC UA, Modbus TCP, proprietary DCS protocols, redundant Ethernet'],
                                ['Level 3 — Operations', 'Process historian (OSIsoft PI), LIMS, production accounting, maintenance management (SAP PM), shift log', 'OPC HDA, SQL, ISA-95 B2MML, PI Web API'],
                                ['Level 3.5 — DMZ', 'Industrial firewalls, data diodes (unidirectional gateways), protocol break servers, patch management servers', 'IEC 62443 zone/conduit model, VPN, HTTPS, encrypted OPC UA'],
                                ['Level 4 — Enterprise', 'ERP (SAP S/4HANA), energy trading/risk management (ETRM), supply chain optimization, corporate historian', 'SAP RFC, REST APIs, B2MML, cloud analytics (Azure/AWS)'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Mapping aligns with ISA-95 / IEC 62264 enterprise-control system integration and
                    IEC 62443 zone-and-conduit cybersecurity model (Williams, 1994).
                </p>
            </Section>

            {/* 7. Supporting Systems */}
            <Section title="7. Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Description</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Fire Protection', 'Deluge water spray on furnaces/columns; foam on tank farm; dry chemical on compressors; firewater ring main', 'NFPA 15/30, 15,000 GPM firewater pumps, diesel + electric'],
                                ['HVAC', 'Pressurized substations (ATEX Zone 2 exclusion), control room HVAC with gas detection interlocks', 'N+1 redundancy, HEPA filtration, 25°C setpoint'],
                                ['Power Distribution', 'Dual 132 kV grid feeds, on-site 30 MW steam turbine generators, 11 kV/6.6 kV/400 V distribution', 'IEC 61936, N-1 redundancy, auto-transfer switching'],
                                ['UPS Systems', 'Double-conversion UPS for DCS, SIS, and communications; separate UPS for each system', '200 kVA DCS, 100 kVA SIS, 30 min battery bridge'],
                                ['Diesel Generators', 'Emergency backup for firewater pumps, SIS power, critical lighting and communications', '2 × 3 MW, auto-start <10s, 72-hour fuel tank'],
                                ['Lightning Protection', 'Mast and catenary wire system over furnaces, columns, and tank farm; grounding per IEC 62305', 'Rolling sphere method, <10 ohm grounding resistance'],
                                ['Security Systems', 'Perimeter intrusion detection, CCTV (200+ cameras), access control, vehicle screening, CFATS compliance', 'DHS CFATS Tier 1–4, biometric access, 24/7 guard force'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. Water, Air & Gas Systems */}
            <Section title="8. Water, Air &amp; Gas Systems" id="water-air-gas">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Medium</th>
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Cooling Water', 'Recirculating system with natural draft cooling towers, chemical treatment (biocide, scale inhibitor)', '60,000–80,000 m³/h circulation, 8°C approach, 5 cycles of concentration'],
                                ['Instrument Air', 'Oil-free rotary screw compressors, regenerative desiccant dryers, air receiver vessels', '10,000 Nm³/h, –40°C dewpoint, 7 bara, Class 1.2.1 per ISO 8573'],
                                ['Nitrogen', 'Cryogenic air separation unit (ASU) or membrane generation; used for blanketing, purging, inerting', '5,000 Nm³/h, 99.99% purity, 10 bara header pressure'],
                                ['Steam (HP/MP/LP)', 'HP from TLEs + boilers; MP/LP by letdown; used for process heating, turbine drives, dilution steam', 'HP: 120 bara/520°C (1,200 t/h), MP: 40 bara (600 t/h), LP: 4 bara (800 t/h)'],
                                ['Fuel Gas', 'Demethanizer overhead + hydrogen recovery; supplemented by natural gas import during startup', 'Mixed C1/H₂, 400 kt/a, 3–5 bara distribution, Wobbe index controlled'],
                            ].map(([medium, system, spec]) => (
                                <tr key={medium} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{medium}</td>
                                    <td className="px-3 py-2 text-gray-300">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 9. Data Flow Architecture */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────────────┐
│  LEVEL 0–1: FIELD & BASIC CONTROL                           │
│                                                             │
│  25,000+ I/O Points:                                        │
│    Analog (4-20mA/HART) ─────► DCS I/O (1s scan)           │
│    Fieldbus (FF H1)      ─────► DCS I/O (250ms scan)       │
│    Discrete (24VDC)      ─────► DCS + SIS I/O              │
│    SIF Inputs (2oo3 voting) ──► SIS Logic Solvers           │
│    Gas/Fire Detectors    ─────► F&G Panel → SIS             │
├─────────────────────────────────────────────────────────────┤
│  LEVEL 2: DCS / APC / ANTI-SURGE                            │
│                                                             │
│  8,000+ Control Loops:                                      │
│    PID Loops (furnace, column, reactor) ──► DCS Historian   │
│    APC (DMC/RMPCT, 30-60s execution) ────► Yield Optimizer  │
│    Anti-Surge Controllers (5ms scan) ────► CGC Protection   │
│    Batch Sequencing (polymer grade changes) ► Recipe Mgmt   │
├─────────────────────────────────────────────────────────────┤
│  LEVEL 3: OPERATIONS & HISTORIAN                            │
│                                                             │
│  Data Rates:                                                │
│    Process Historian ──(1s snapshots)──► 500 GB/month       │
│    LIMS Results ──(per-sample)──────────► Quality Database  │
│    Production Accounting ──(hourly)─────► Material Balance  │
│    Alarm Management ──(per-event)───────► KPI Dashboard     │
│    Maintenance (SAP PM) ──(work orders)─► Asset Registry    │
├─────────────────────────────────────────────────────────────┤
│  LEVEL 3.5: DMZ (IEC 62443)                                │
│                                                             │
│    Data Diode ──(unidirectional)──► Replica Historian       │
│    Firewall    ──(stateful + DPI)──► Protocol Validation    │
│    Patch Server ──(WSUS proxy)────► Endpoint Updates        │
│    Jump Host   ──(MFA + session recording)──► Remote Access │
├─────────────────────────────────────────────────────────────┤
│  LEVEL 4: ENTERPRISE                                        │
│                                                             │
│    ERP (SAP S/4HANA) ◄──────── Production Orders / Actuals │
│    ETRM ◄────────────────────── Feedstock/Product Pricing   │
│    SCM  ◄────────────────────── Inventory / Logistics       │
│    Cloud Analytics ◄─────────── Predictive Maintenance ML   │
└─────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>International Electrotechnical Commission. (2016). <em>IEC 61511: Functional safety &mdash; Safety instrumented systems for the process industry sector</em>. IEC.</p>
                    <p>International Electrotechnical Commission. (2018). <em>IEC 62443: Industrial communication networks &mdash; Network and system security</em>. IEC.</p>
                    <p>Kniel, L., Winter, O., &amp; Stork, K. (1980). <em>Ethylene: Keystone to the petrochemical industry</em>. Marcel Dekker.</p>
                    <p>Occupational Safety and Health Administration. (1992). <em>29 CFR 1910.119: Process Safety Management of Highly Hazardous Chemicals</em>. OSHA.</p>
                    <p>Sadeghbeigi, R. (2020). <em>Fluid catalytic cracking handbook</em> (4th ed.). Butterworth-Heinemann.</p>
                    <p>Soares, J. B. P., &amp; McKenna, T. F. L. (2012). <em>Polyolefin reaction engineering</em>. Wiley-VCH.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>Towler, G., &amp; Sinnott, R. K. (2022). <em>Chemical engineering design: Principles, practice and economics of plant and process design</em> (3rd ed.). Butterworth-Heinemann.</p>
                    <p>Williams, T. J. (1994). The Purdue Enterprise Reference Architecture. <em>Computers in Industry</em>, 24(2&ndash;3), 141&ndash;158.</p>
                    <p>Zimmermann, H., &amp; Walzl, R. (2012). Ethylene. In <em>Ullmann&rsquo;s encyclopedia of industrial chemistry</em>. Wiley-VCH.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#8B5CF6' },
                        { href: '/wiki/chemical/chlor-alkali', label: 'Chlor-Alkali Plants', color: '#3B82F6' },
                        { href: '/wiki/chemical/batch-processing', label: 'Batch Chemical Manufacturing', color: '#8B5CF6' },
                        { href: '/wiki/chemical/ammonia-fertilizer', label: 'Ammonia & Fertilizer', color: '#10B981' },
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#06B6D4' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${link.color}30`, color: link.color }}
                        >
                            {link.label} &rarr;
                        </a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

/** Reusable section component. */
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
