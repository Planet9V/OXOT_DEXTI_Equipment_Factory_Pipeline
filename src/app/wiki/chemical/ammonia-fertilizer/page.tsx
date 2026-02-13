/**
 * Ammonia & Fertilizer Complexes — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for integrated ammonia
 * and fertilizer facilities producing NH3 via Haber-Bosch synthesis
 * (150-300 atm, 400-500 C) with downstream urea, ammonium nitrate,
 * and NPK granulation for global food security.
 *
 * @module wiki/chemical/ammonia-fertilizer/page
 */

export const metadata = {
    title: 'Ammonia & Fertilizer Complexes — Chemical Sector Wiki',
    description:
        'TOGAF reference architecture for Ammonia & Fertilizer Complexes: Haber-Bosch synthesis, ' +
        'primary/secondary reforming, ammonia converter, urea/AN production, bill of materials, and Purdue model mapping.',
};

export default function AmmoniaFertilizerPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#10B981' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CHEMICAL · AGRICULTURAL CHEMICALS · AMMONIA/FERTILIZER
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Ammonia &amp; Fertilizer Complexes
                </h1>
                <p className="text-sm text-gray-500 font-mono">Haber-Bosch Process · 150 -- 300 atm</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    The Haber-Bosch process remains one of the most consequential inventions in human history,
                    enabling the synthesis of anhydrous ammonia from atmospheric nitrogen and hydrogen derived
                    from natural gas. Global ammonia production exceeds 180 Mt/yr, with roughly 80% consumed
                    as fertilizer feedstock. Without this single catalytic reaction, modern agriculture could
                    not sustain more than half of the current world population. Integrated ammonia-fertilizer
                    complexes convert synthesis gas through primary and secondary reforming, shift conversion,
                    CO2 removal, and high-pressure catalytic synthesis to produce NH3, which is subsequently
                    transformed into urea, ammonium nitrate (AN), and NPK granules under stringent OSHA PSM,
                    EPA RMP, and DHS CFATS regulations (Appl, 1999; USGS, 2024).
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture for ammonia-fertilizer complexes is driven by global food
                    security demand, natural gas pricing, and an exceptionally complex regulatory environment
                    spanning process safety, environmental compliance, explosives security, and transportation.
                    Revenue is tied directly to commodity fertilizer prices (urea, DAP, AN) which follow
                    seasonal agricultural cycles and are highly sensitive to natural gas cost, which typically
                    represents 70-90% of ammonia production cost.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Fertilizer Producers (CF Industries, Yara International, Nutrien, OCI, Koch Fertilizer)</li>
                    <li>Farmers, Agricultural Cooperatives, and Regional Distributors</li>
                    <li>Commodity Traders and Fertilizer Brokers (OTC and exchange-traded)</li>
                    <li>DOT Pipeline Operators and NH3 Terminal Operators</li>
                    <li>Regulatory Bodies: OSHA (PSM), EPA (RMP/CAA), DHS (CFATS), ATF (AN explosives)</li>
                    <li>EPC Contractors and Technology Licensors (KBR, Haldor Topsoe, ThyssenKrupp Uhde, Casale)</li>
                    <li>Catalyst Suppliers (Johnson Matthey, Clariant, Haldor Topsoe)</li>
                    <li>Natural Gas Utilities and Pipeline Operators</li>
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
                                ['OSHA 29 CFR 1910.119', 'Process Safety Management — NH3 threshold 10,000 lbs; covers PHA, MOC, MI, training'],
                                ['EPA 40 CFR 68', 'Risk Management Program — anhydrous ammonia >10,000 lbs triggers RMP Plan 3'],
                                ['DHS 6 CFR 27 (CFATS)', 'Chemical Facility Anti-Terrorism Standards — ammonium nitrate (release/theft/sabotage)'],
                                ['ATF 27 CFR 555', 'Explosives regulations — ammonium nitrate storage and sales tracking'],
                                ['DOT 49 CFR 172/173', 'Hazmat transport — NH3 (Division 2.2/2.3), AN (Division 5.1), placarding/routing'],
                                ['API 941', 'Steels for Hydrogen Service at Elevated Temperatures — Nelson curves for HTHA prevention'],
                                ['NFPA 55', 'Compressed Gases and Cryogenic Fluids Code — NH3 storage and handling requirements'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{standard}</td>
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
                    The canonical ammonia plant design centers on the{' '}
                    <span className="text-[#10B981] font-medium">steam-methane reforming front end</span>{' '}
                    followed by shift conversion, gas purification, and the high-pressure synthesis loop.
                    Natural gas is desulfurized, reformed with steam at 900 C, and mixed with air in the
                    secondary reformer to introduce nitrogen. The resulting synthesis gas (3:1 H2:N2) is
                    compressed to 150-200 bar and passed over an iron-based catalyst at 400-500 C. Per-pass
                    conversion is only 15-25%, requiring continuous recycle. Downstream, ammonia is converted
                    to urea or ammonium nitrate. Redundancy is applied as N+1 on synthesis gas compressor
                    trains in the largest facilities.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">One-Line Diagram</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`NATURAL GAS FEED
    |
    v
DESULFURIZATION (ZnO bed, <0.1 ppm S)
    |
    v
PRIMARY REFORMER (Ni catalyst, 900 C outlet, 25-35 barg) ---> HP Steam Gen
    |
    v
SECONDARY REFORMER (Air injection, 1100 C, adiabatic) <--- Process Air Compressor
    |
    v
HT SHIFT CONVERTER (Fe3O4/Cr2O3, 350-450 C)
    |
    v
LT SHIFT CONVERTER (Cu/ZnO/Al2O3, 200-250 C)
    |
    v
CO2 REMOVAL (aMDEA or Benfield absorber/regenerator) ---> CO2 to Urea Plant
    |
    v
METHANATOR (Ni catalyst, 300 C, residual CO/CO2 <5 ppm)
    |
    v
SYNTHESIS GAS COMPRESSOR (Centrifugal, steam turbine, 35 MW, 150-200 bar)
    |
    v
AMMONIA CONVERTER (Axial-radial, magnetite catalyst, 400-500 C, 150-300 atm)
    |  15-25% per-pass conversion
    v
AMMONIA SEPARATOR & REFRIGERATION (-33 C)
    |
    +---> NH3 STORAGE SPHERE (-33 C atm., 30,000 t)
    |
    +---> UREA REACTOR (NH3 + CO2, 180 C, 150 bar) --> Prilling/Granulation
    |
    +---> AN REACTOR (NH3 + HNO3, 180 C) --> Prilling Tower --> AN Storage`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Simplified Block Flow Diagram (BFD) of an integrated ammonia-urea-AN complex
                    showing the Haber-Bosch synthesis loop and downstream fertilizer production.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Primary Reforming</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The primary reformer is the largest single piece of equipment in the plant, consisting of
                    hundreds of vertical tubes packed with nickel catalyst, suspended in a top-fired radiant
                    box. Natural gas mixed with process steam (steam-to-carbon ratio 2.8-3.5) enters the
                    tubes at 500-600 C and exits at approximately 900 C. The tube metallurgy is critical:
                    HP Micro alloy (25Cr-35Ni with Nb/Ti stabilizers) withstands 100,000+ hour creep life
                    at operating temperatures. Modern plants may supplement or replace the primary reformer
                    with a Gas-Heated Reformer (GHR), using hot secondary reformer effluent as the heat
                    source to improve energy efficiency by up to 10%.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Catalyst:</span> Nickel on alpha-alumina carrier, 12-16% Ni, ring or multi-hole shapes</li>
                    <li><span className="text-white">Conditions:</span> 900 C outlet, 25-35 barg, S/C ratio 2.8-3.5</li>
                    <li><span className="text-white">Tubes:</span> 200-400 tubes, 10-13 m long, 100-130 mm ID, HP Micro alloy</li>
                    <li><span className="text-white">Duty:</span> 150-250 MW thermal input from natural gas burners</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Secondary Reforming &amp; Shift Conversion</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The secondary reformer injects process air (providing the stoichiometric nitrogen for
                    NH3 synthesis) into the partially reformed gas. The exothermic combustion of residual
                    methane with oxygen raises the temperature to approximately 1100 C in the adiabatic
                    reactor, completing the reforming reaction. The hot gas then passes through two stages
                    of water-gas shift conversion to maximize hydrogen yield and convert CO to CO2.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">HT Shift:</span> Fe3O4/Cr2O3 catalyst, 350-450 C inlet, CO reduced to ~3%</li>
                    <li><span className="text-white">LT Shift:</span> Cu/ZnO/Al2O3 catalyst, 200-250 C inlet, CO reduced to ~0.3%</li>
                    <li><span className="text-white">Reaction:</span> CO + H2O = CO2 + H2 (exothermic, delta-H = -41 kJ/mol)</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Gas Purification</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    CO2 removal is achieved using a chemical solvent system, typically activated
                    methyldiethanolamine (aMDEA) or hot potassium carbonate (Benfield process). The
                    absorber/regenerator column pair removes CO2 to less than 100 ppm. The recovered CO2
                    is a valuable feedstock for the downstream urea plant. Residual traces of CO and CO2
                    are then converted to methane in the methanation reactor (Ni catalyst at 300 C), and
                    the purified gas is dried over molecular sieves before compression.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">CO2 Removal:</span> aMDEA absorber (40 C, 25 bar) / regenerator (120 C, 1.5 bar)</li>
                    <li><span className="text-white">Methanation:</span> Ni catalyst, 300 C, CO + CO2 reduced to less than 5 ppm total</li>
                    <li><span className="text-white">Dehydration:</span> Molecular sieve beds (3A/4A), regenerated with hot synthesis gas</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 Ammonia Synthesis Loop</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The synthesis loop is the heart of the Haber-Bosch process. Purified synthesis gas
                    (3:1 H2:N2) is compressed from approximately 25 bar to 150-200 bar by a multi-stage
                    centrifugal compressor (20-40 MW, typically steam turbine driven). The compressed gas
                    enters the ammonia converter, an axial-radial flow reactor containing 50-150 tonnes
                    of promoted magnetite catalyst (Fe3O4 with K2O, Al2O3, CaO promoters). Operating at
                    400-500 C and 150-300 atm, per-pass conversion is 15-25%. Product ammonia is condensed
                    in a refrigeration cascade and separated; unconverted gas is recycled.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Compressor:</span> 3-4 stage centrifugal, 20-40 MW, steam turbine driven (condensing type)</li>
                    <li><span className="text-white">Converter:</span> Axial-radial flow, 2-3 beds with inter-bed exchangers, quench or indirect cooling</li>
                    <li><span className="text-white">Catalyst:</span> Promoted magnetite (Fe3O4), 1.5-3 mm granules, 10-15 year life</li>
                    <li><span className="text-white">Refrigeration:</span> Two-stage cascade, ammonia as refrigerant, product at -33 C atmospheric</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.5 Downstream Products</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Ammonia is further processed into solid fertilizer products. Urea synthesis combines
                    liquid NH3 with CO2 at 180 C and 150 bar, forming ammonium carbamate which dehydrates
                    to urea. Ammonium nitrate is produced by neutralizing NH3 with nitric acid. NPK compound
                    fertilizers are produced by granulating blends of urea, AN, phosphate, and potassium salts.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Urea:</span> NH3 + CO2 at 180 C / 150 bar, 65-75% per-pass conversion, 1800-3500 t/d</li>
                    <li><span className="text-white">AN:</span> NH3 + HNO3 neutralization, prilling tower 50-80 m, CFATS security-critical</li>
                    <li><span className="text-white">NPK:</span> Blending and granulation in rotary drum or pan granulator, multiple grades</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Natural Gas to Ammonia</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Natural Gas (35 bar, 40 C)
    |
    v
ZnO DESULF. (400 C) ---- S removed to <0.1 ppm
    |
    +-- Steam (S/C 3.0) -->+
                           |
                     PRIMARY REFORMER
                     (900 C, 30 barg)
                     200-400 Ni tubes
                           |
    Process Air -------> SECONDARY REFORMER
    (from PAC, 35 bar)   (1100 C, adiabatic)
                           |
                     HT SHIFT (Fe/Cr, 420 C in --> 350 C out)
                           |
                     LT SHIFT (Cu/Zn, 220 C in --> 200 C out)
                           |
                     CO2 ABSORBER (aMDEA, 40 C, 25 bar)
                       |         |
                   Clean Gas   CO2 ---> to Urea Plant
                       |
                     METHANATOR (Ni, 300 C)
                       |
                     MOL. SIEVE DRYER
                       |
                     SYNGAS COMPRESSOR (35 MW, 150-200 bar)
                       |
               +-------+-------+ (Recycle Loop)
               |               |
         NH3 CONVERTER    Unreacted Gas
         (Fe cat, 450 C)   (recycle)
               |
         NH3 SEPARATOR (-15 C)
               |
         REFRIG. CONDENSER (-33 C)
               |
         NH3 PRODUCT STORAGE (-33 C, atm.)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Ammonia to Urea/AN Process</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`UREA PRODUCTION:
                                                      Urea Solution
Liquid NH3 ----+                                         |
               +--> HP REACTOR (180 C, 150 bar) --> HP STRIPPER
CO2 (from      |    NH2COONH4 --> CO(NH2)2 + H2O         |
 gas purif.) --+                                    LP DECOMPOSER
                                                         |
                                                    EVAPORATOR (99.7%)
                                                         |
                              +----------+----------+
                              |                     |
                        PRILLING TOWER        GRANULATOR
                        (50-70 m height)      (Fluid bed)
                              |                     |
                        Urea Prills           Urea Granules
                        (1-2 mm)              (2-4 mm)

AMMONIUM NITRATE PRODUCTION:

Liquid NH3 ----+
               +--> NEUTRALIZER (180 C, atm.) --> EVAPORATOR (95-99.5%)
HNO3 (60%) ----+    NH3 + HNO3 --> NH4NO3                |
                     (highly exothermic)            PRILLING TOWER
                                                    (60-80 m height)
                                                         |
                                                    AN Prills + Coating`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 Control &amp; Safety System Architecture</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`                    ENTERPRISE (L4)
                    ERP / Commodity Trading / Supply Chain
                         |
                    -----+---- IDMZ Firewall / Data Diode (L3.5)
                         |
                    OPERATIONS (L3)
                    Historian (50k tags) | APC/MPC Servers | LIMS
                         |
                    -----+---- OT Network (Redundant Ring)
                         |
                    DCS CONTROLLERS (L2)            SIS CONTROLLERS (L2)
                    (ABB 800xA / Emerson DeltaV)    (HIMA HIMax / Triconex)
                    PID loops, sequences             SIL-2/3 trip logic
                         |                               |
                    -----+-----------+-------------------+
                         |           |                   |
                    FIELD (L0/L1)
                    +-- TT/PT/FT/AT (4-20mA HART) --+
                    +-- Control Valves (Fisher/Neles) +
                    +-- NH3 Gas Detectors (25 ppm)   +
                    +-- Fire & Gas System (UV/IR)    +
                    +-- Emergency Shutdown Valves    +`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Typical BoM for a 2,000 t/d (660 kTA) world-scale ammonia plant with integrated urea unit.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Primary Reformer', 'Top-fired radiant box, HP Micro alloy tubes, Ni catalyst', '1', '200 MW thermal duty'],
                                ['Secondary Reformer', 'Refractory-lined vessel, Ni catalyst bed', '1', '1100 C, 30 barg'],
                                ['HT Shift Converter', 'Fixed bed, Fe3O4/Cr2O3 catalyst', '1', '420 C inlet, 30 barg'],
                                ['LT Shift Converter', 'Fixed bed, Cu/ZnO/Al2O3 catalyst', '1', '220 C inlet, 28 barg'],
                                ['CO2 Absorber', 'Packed column, aMDEA solvent', '1', '12m dia x 45m, 25 barg'],
                                ['CO2 Stripper/Regenerator', 'Packed column, aMDEA regeneration', '1', '120 C, 1.5 barg'],
                                ['Methanator', 'Fixed bed, Ni catalyst', '1', '300 C, 27 barg'],
                                ['Syngas Compressor', 'Multi-stage centrifugal, API 617', '1', '35 MW, 150-200 bar'],
                                ['Steam Turbine Driver', 'Condensing, multi-stage extraction, API 612', '1', '35 MW, 100 bar inlet'],
                                ['Ammonia Converter', 'Axial-radial, 2-3 beds, inter-bed exchangers', '1', '150-300 atm, 400-500 C'],
                                ['Ammonia Separator', 'Vertical flash drum, cryogenic service', '1', '-15 C, 150 bar'],
                                ['NH3 Refrigeration Compressor', 'Centrifugal, 2-stage cascade', '2', '8 MW each, -33 C evap.'],
                                ['NH3 Storage Sphere', 'ASME VIII, low-temp carbon steel', '2', '30,000 t each, -33 C atm.'],
                                ['Waste Heat Boilers', 'Fire-tube type after reformers and shift reactors', '4', 'HP steam 100 barg'],
                                ['Process Condensate Stripper', 'Packed column, steam stripping', '1', 'Remove dissolved gases'],
                                ['Urea HP Reactor', 'Lined vessel (25Cr duplex SS)', '1', '180 C, 150 bar'],
                                ['Urea HP Stripper', 'Falling-film, titanium tubes', '1', '150 bar, steam heated'],
                                ['Prilling Tower', 'Reinforced concrete, natural draft', '1', '70m height, 16m dia'],
                                ['ID Fan (Prilling)', 'Axial flow, induced draft', '2', '500,000 m3/h each'],
                                ['Process Air Compressor', 'Centrifugal, gas turbine or motor driven', '1', '12 MW, 35 bar'],
                                ['HP Steam Drum', 'Boiler drum for waste heat recovery circuit', '1', '110 barg design'],
                                ['Cooling Water Tower', 'Induced draft, film fill, concrete basin', '1', '60,000 m3/h circ.'],
                                ['Flare Stack', 'Elevated, self-supporting, with KO drum', '1', '100m height, 500 t/h'],
                                ['DCS System', 'Redundant controllers, operator/engineering stations', '1', '15,000+ I/O points'],
                                ['SIS System', 'TMR logic solvers, SIL-2/3 rated', '6', 'IEC 61511 certified'],
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
                                ['Level 0 — Process', 'TT, PT, FT, AT (syngas GC), control valves, NH3 gas detectors, catalyst bed thermocouples', '4-20mA, HART, Foundation Fieldbus H1'],
                                ['Level 1 — Control', 'DCS I/O modules, SIS logic solvers (SIL-2/3), burner management system, anti-surge controller', 'Proprietary I/O bus, Modbus TCP, HART'],
                                ['Level 2 — Supervisory', 'DCS operator stations (HIS), alarm management, SIS engineering workstation', 'Proprietary Control Network, OPC DA'],
                                ['Level 3 — Operations', 'Process Historian (50k tags, 1s scan), APC/MPC servers, LIMS, asset management (APM)', 'OPC UA, ODBC, PI Interface nodes'],
                                ['Level 3.5 — DMZ', 'IDMZ firewalls, data diodes (Waterfall/Owl), jump hosts, patch management (WSUS)', 'HTTPS, RDP (secured), IEC 62443 zones'],
                                ['Level 4 — Enterprise', 'ERP (SAP), commodity trading (ETRM), production planning, regulatory reporting', 'HTTPS, REST/SOAP APIs, EDI'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                                ['Fire Suppression', 'Deluge systems on NH3 storage spheres, foam on fuel areas, fire water ring main', 'NFPA 15/20/24, 10,000 GPM fire water pumps'],
                                ['NH3 Leak Detection', 'Fixed toxic gas detectors (electrochemical + IR) at process and fence-line', 'TLV-TWA 25 ppm, IDLH 300 ppm, STEL 35 ppm'],
                                ['Emergency Procedures', 'Shelter-in-place for NH3 release, community notification system, wind socks/indicators', 'EPA RMP worst-case modeled (ALOHA/PHAST)'],
                                ['Steam System', 'Massive waste heat recovery: HP (100 barg), MP (40 barg), LP (4 barg) headers', 'Net steam exporter, powers all turbine drives'],
                                ['Backup Power', 'Emergency diesel generators for SIS, fire and gas, UPS, critical lighting', '2x 2 MW diesel gensets, 30-min UPS for DCS/SIS'],
                                ['Flare System', 'Elevated flare for emergency depressurization of synthesis loop and reformer inventory', 'Smokeless, steam/air-assisted, 500 t/h capacity'],
                                ['Process Water Treatment', 'Demineralization, deaeration, condensate polishing for boiler feed water', 'Conductivity <0.1 uS/cm, O2 <7 ppb'],
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

            {/* 8. Utility Systems */}
            <Section title="8. Utility Systems" id="utilities">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Utility</th>
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['HP Steam', 'Waste heat from primary reformer flue gas and shift reactors', '100-110 barg, 510 C superheated, drives syngas compressor'],
                                ['MP Steam', 'Extraction from HP turbine, process heating duties', '40 barg, reboilers and CO2 stripper heating'],
                                ['LP Steam', 'Turbine exhaust and letdown, condensate stripping, tracing', '4 barg, deaeration and process heating'],
                                ['Cooling Water', 'Open recirculating system for condensers, inter-coolers, product cooling', '60,000 m3/h circulation, 8 C delta-T'],
                                ['Boiler Feed Water', 'Demineralized, deaerated, polished for HP waste heat boilers', '<0.1 uS/cm, <7 ppb O2, silica <20 ppb'],
                                ['Instrument Air', 'Oil-free compressors, dryers, receivers for valve actuation', '7 barg, -40 C dew point, ISO 8573 Class 1.2.1'],
                                ['Nitrogen', 'Plant inert gas for purging, blanketing, and catalyst conditioning', '99.99% purity, from ASU or liquid N2 tank'],
                                ['Natural Gas Fuel', 'Supplemental fuel for primary reformer burners and auxiliary boiler', 'Pipeline quality, 35-70 bar supply pressure'],
                            ].map(([utility, system, spec]) => (
                                <tr key={utility} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{utility}</td>
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
                    <pre className="whitespace-pre leading-relaxed">{`+-------------------------------------------------------------+
| Enterprise Layer (L4)                                       |
|   ERP (SAP) <--> Production Planning / Yield Accounting     |
|   ETRM (Commodity Trading) <--> Gas Procurement / NH3 Sales |
+------^------------------------------------------------------+
       | HTTPS / REST API
+------v------------------------------------------------------+
| DMZ (L3.5) -- Data Diode / Historian Mirror / Jump Hosts    |
+------^------------------------------------------------------+
       | OPC UA (encrypted, certificate-based)
+------v------------------------------------------------------+
| Operations Layer (L3)                                       |
|   Process Historian (50k tags, 1s resolution)               |
|   APC/MPC Servers (reformer opt., converter control)        |
|   LIMS (catalyst analysis, product quality, water chem.)    |
|   Asset Performance Mgmt (vibration, corrosion monitoring)  |
+------^------------------------------------------------------+
       | Proprietary Control Network (redundant ring)
+------v------------------------------------------------------+
| Control Layer (L1/L2)                                       |
|   DCS Controllers: PID loops, cascade, ratio, sequence      |
|   SIS Logic Solvers: high-P trips, NH3 release ESD          |
|   Compressor Control: anti-surge, load sharing, speed       |
+------^------------------------------------------------------+
       | 4-20mA / HART / Foundation Fieldbus H1
+------v------------------------------------------------------+
| Field Layer (L0)                                            |
|   50,000+ field instruments: TT, PT, FT, LT, AT            |
|   NH3 toxic gas detectors (electrochemical + IR)            |
|   Online analyzers: syngas GC, moisture, O2, H2S           |
|   Control valves, on/off ESD valves, motor starters         |
+-------------------------------------------------------------+`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 4. Data flow architecture from field instrumentation through DCS/SIS control
                    layers, operations historian and APC, to enterprise ERP and commodity trading systems.
                </p>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Appl, M. (1999). <em>Ammonia: Principles and Industrial Practice</em>. Wiley-VCH.</p>
                    <p>American Petroleum Institute. (2016). <em>API Recommended Practice 941: Steels for Hydrogen Service at Elevated Temperatures and Pressures in Petroleum Refineries and Petrochemical Plants</em> (8th ed.). API.</p>
                    <p>International Fertilizer Association. (2024). <em>IFA Statistical Database: Global Ammonia Production Capacity and Trade Flows</em>. IFA.</p>
                    <p>Occupational Safety and Health Administration. (1992). <em>29 CFR 1910.119: Process Safety Management of Highly Hazardous Chemicals</em>. OSHA.</p>
                    <p>U.S. Environmental Protection Agency. (2017). <em>40 CFR Part 68: Chemical Accident Prevention Provisions (Risk Management Program)</em>. EPA.</p>
                    <p>U.S. Department of Homeland Security. (2007). <em>6 CFR Part 27: Chemical Facility Anti-Terrorism Standards (CFATS)</em>. DHS.</p>
                    <p>U.S. Geological Survey. (2024). <em>Mineral Commodity Summaries: Nitrogen (Fixed) — Ammonia</em>. USGS.</p>
                    <p>Haldor Topsoe. (2020). <em>Ammonia Converter Design: Radial Flow Technology for High-Pressure Synthesis</em>. Topsoe Technical Publications.</p>
                    <p>International Electrotechnical Commission. (2016). <em>IEC 61511: Functional Safety — Safety Instrumented Systems for the Process Industry Sector</em>. IEC.</p>
                    <p>National Fire Protection Association. (2020). <em>NFPA 55: Compressed Gases and Cryogenic Fluids Code</em>. NFPA.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#8B5CF6' },
                        { href: '/wiki/chemical/petrochemical', label: 'Petrochemical Complex', color: '#EF4444' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#06B6D4' },
                        { href: '/wiki/sectors/CHEM', label: 'Chemical Sector Overview', color: '#8B5CF6' },
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${link.color}30`, color: link.color }}
                        >
                            {link.label} →
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
