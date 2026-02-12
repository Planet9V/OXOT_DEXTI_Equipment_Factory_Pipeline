/**
 * Virtual Power Plants &amp; DERMS — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for Virtual Power Plants
 * (VPP) and Distributed Energy Resource Management Systems (DERMS),
 * covering aggregation, market participation, FERC Order 2222 compliance,
 * and bidirectional utility-DER orchestration.
 *
 * @module wiki/energy/vpp-derms/page
 */

export const metadata = {
    title: 'VPP / DERMS — Energy Wiki',
    description:
        'TOGAF reference architecture for Virtual Power Plants and DERMS: DER aggregation, ' +
        'wholesale market participation, FERC Order 2222, and orchestration platforms.',
};

export default function VPPDERMSPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#EC4899' }} />
                    <span className="text-xs font-mono text-gray-500">ENERGY · ORCHESTRATION · VPP/DERMS</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Virtual Power Plants &amp; DERMS</h1>
                <p className="text-sm text-gray-500 font-mono">Aggregation · Market Participation · Orchestration</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Virtual Power Plants (VPPs) and Distributed Energy Resource Management Systems (DERMS)
                    represent the software-defined orchestration layer that transforms millions of
                    small-scale distributed energy resources (DERs) — rooftop solar, home batteries,
                    EV chargers, smart thermostats — into a unified, dispatchable fleet that can
                    participate in wholesale electricity markets. FERC Order 2222 (2020) established
                    the regulatory foundation by requiring ISOs/RTOs to allow DER aggregations to
                    participate in all wholesale market products: energy, capacity, and ancillary
                    services (FERC, 2020).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The VPP/DERMS business architecture bridges the gap between millions of small,
                    distributed assets and the centralized wholesale market. The VPP Aggregator serves
                    as the intermediary, enrolling DER owners, forecasting fleet capacity, bidding into
                    ISO/RTO markets, dispatching assets in real-time, and settling revenue. DERMS
                    operates within the utility domain to manage DERs for grid reliability — hosting
                    capacity, Volt-VAR coordination, and congestion management (EPRI, 2021).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">VPP vs. DERMS</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Aspect</th>
                                <th className="text-left px-3 py-2 font-medium">VPP (Aggregator)</th>
                                <th className="text-left px-3 py-2 font-medium">DERMS (Utility)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Operator', 'Third-party aggregator or retailer', 'Distribution utility (DSO)'],
                                ['Objective', 'Market revenue maximisation', 'Grid reliability, power quality'],
                                ['Market Role', 'Wholesale market bidder (energy, capacity, AS)', 'Distribution system operator'],
                                ['DER Control', 'Economic dispatch, curtailment signals', 'Operating envelopes, Volt-VAR'],
                                ['Regulation', 'FERC Order 2222, ISO market rules', 'State PUC, IEEE 1547, utility tariffs'],
                                ['Interface', 'ISO/RTO market systems (EMS, AGC)', 'ADMS, SCADA, GIS, OMS'],
                                ['Scale', '10,000 – 1,000,000+ DERs', 'All DERs on utility distribution system'],
                            ].map(([aspect, vpp, derms]) => (
                                <tr key={aspect} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{aspect}</td>
                                    <td className="px-3 py-2 text-gray-400">{vpp}</td>
                                    <td className="px-3 py-2 text-gray-400">{derms}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Regulation</th>
                                <th className="text-left px-3 py-2 font-medium">Scope</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['FERC Order 2222', 'DER aggregation participation in wholesale markets (energy, capacity, AS)'],
                                ['FERC Order 841', 'Energy storage participation in wholesale markets'],
                                ['FERC Order 755', 'Frequency regulation performance payments (pay-for-performance)'],
                                ['IEEE 2030.5', 'Smart Energy Profile for DER communication and control'],
                                ['IEEE 1547-2018', 'DER interconnection and interoperability (Volt-VAR, ride-through)'],
                                ['OpenADR 2.0b', 'Automated demand response signaling'],
                                ['ISO 15118', 'Vehicle-to-grid (V2G) communication protocol'],
                            ].map(([reg, scope]) => (
                                <tr key={reg} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EC4899] font-medium whitespace-nowrap">{reg}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="high-level-design">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌──────────────────────────────────────────────────────────────┐
│  ISO/RTO MARKET LAYER                                        │
│    Day-Ahead Market ◄── VPP Market Engine ──► Real-Time Market│
│    Capacity Market                                           │
└────────────────────────────────────┬─────────────────────────┘
                                     │ Market API / ICCP
┌────────────────────────────────────┴─────────────────────────┐
│  VPP AGGREGATION PLATFORM (Cloud)                            │
│    ├── Fleet Forecast Engine (ML: solar, load, EV, weather)  │
│    ├── Bid Optimization Engine (stochastic MPC, 5-min/day)   │
│    ├── Real-Time Dispatch Engine (4-sec AGC, 5-min economic) │
│    ├── Settlement & Metering Engine (ISO telemetry, AMI)     │
│    └── DER Enrollment & Telemetry Gateway                    │
└────────────────────────────────────┬─────────────────────────┘
                                     │ IEEE 2030.5 / OpenADR
┌────────────────────────────────────┴─────────────────────────┐
│  DERMS (Utility Domain)                                      │
│    ├── Hosting Capacity Analysis                             │
│    ├── Dynamic Operating Envelopes                           │
│    ├── Volt-VAR Optimization (DER inverter coordination)     │
│    └── Congestion Management                                 │
└────────────────────────────────────┬─────────────────────────┘
                                     │ Smart Meter / Edge GW
┌────────────────────────────────────┴─────────────────────────┐
│  DER FLEET (100,000+ assets)                                 │
│    Solar PV ── Home Batteries ── EV Chargers ── Smart HVAC   │
│    C&I BESS ── Commercial Solar ── Fuel Cells ── Microgrids  │
└──────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 VPP Platform Architecture</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The VPP platform is a cloud-native, microservices-based system that orchestrates
                    the full lifecycle of DER aggregation: enrollment, forecasting, bidding, dispatch,
                    and settlement. The platform ingests telemetry from enrolled DERs via smart meters
                    (IEEE 2030.5), edge gateways (MQTT), and direct API integrations (Modbus TCP,
                    OCPP, SunSpec) to maintain real-time fleet state (EPRI, 2021).
                </p>

                <h4 className="text-sm font-semibold text-gray-300 mt-4 mb-2">Core Platform Services</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Service</th>
                                <th className="text-left px-3 py-2 font-medium">Function</th>
                                <th className="text-left px-3 py-2 font-medium">Technology</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Fleet Forecast', 'Predict solar generation, load patterns, EV availability', 'LSTM/Transformer ML, weather API, 15-min resolution'],
                                ['Bid Optimizer', 'Stochastic MPC for day-ahead and real-time market bidding', 'Mixed-integer LP, price forecast, risk constraints'],
                                ['Dispatch Engine', 'Real-time DER setpoint commands (4-sec AGC cycle)', 'Event-driven (Kafka), sub-second latency'],
                                ['Telemetry Gateway', 'Ingest DER state (kW, SOC, availability) from 100K+ devices', 'MQTT, IEEE 2030.5, REST API, time-series DB'],
                                ['Settlement', 'Reconcile ISO metering with DER-level AMI data', 'Bilateral netting, shadow settlement, audit trail'],
                                ['Enrollment', 'DER registration, capability profiling, contract management', 'CRM integration, IEEE 2030.5 device registration'],
                            ].map(([svc, func, tech]) => (
                                <tr key={svc} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EC4899] font-medium">{svc}</td>
                                    <td className="px-3 py-2 text-gray-300">{func}</td>
                                    <td className="px-3 py-2 text-gray-400">{tech}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 DERMS Integration</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    DERMS operates within the utility distribution control centre as a module of the
                    ADMS (Advanced Distribution Management System). Key DERMS functions include:
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Hosting Capacity Analysis:</span> Real-time thermal, voltage, and protection limits for DER interconnection per feeder segment</li>
                    <li><span className="text-white">Dynamic Operating Envelopes (DOE):</span> Time-varying export/import limits pushed to DER inverters, replacing static limits</li>
                    <li><span className="text-white">Volt-VAR Optimization:</span> Coordinating DER smart inverters with utility capacitor banks and voltage regulators</li>
                    <li><span className="text-white">Congestion Management:</span> Real-time curtailment dispatching when feeder/transformer limits are approached</li>
                    <li><span className="text-white">DER Visibility:</span> State estimation augmented with AMI and SCADA data for topology-aware control</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Market Participation</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Under FERC Order 2222, DER aggregations can participate in the following wholesale
                    market products:
                </p>
                <div className="overflow-x-auto mt-3">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Market Product</th>
                                <th className="text-left px-3 py-2 font-medium">VPP Bid Strategy</th>
                                <th className="text-left px-3 py-2 font-medium">Settlement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Day-Ahead Energy', 'Forecast net generation/consumption, price-quantity curves (24 × 1hr blocks)', 'LMP × MWh delivered/consumed'],
                                ['Real-Time Energy', 'Balancing market adjustments (5-min intervals)', 'RT LMP × deviation from DA'],
                                ['Frequency Regulation', 'RegD fast-response (4-sec AGC), mileage-based bidding', 'Capacity + mileage payments'],
                                ['Spinning Reserve', 'Pre-committed dispatchable capacity (10-min response)', 'Capacity payment ($/MW-hr)'],
                                ['Capacity', 'Seasonal resource adequacy, peak load contribution', 'Annual capacity payment'],
                                ['Demand Response', 'Curtailable load aggregation, event-based or price-based', 'Avoided LMP or DR program payment'],
                            ].map(([product, strategy, settlement]) => (
                                <tr key={product} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{product}</td>
                                    <td className="px-3 py-2 text-gray-400">{strategy}</td>
                                    <td className="px-3 py-2 text-gray-400">{settlement}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 VPP Market Lifecycle</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌─ DAY-AHEAD (10 AM, D-1) ─────────────────────────────────────┐
│ 1. Fleet Forecast: predict solar/load/EV for next 24 hours   │
│ 2. Bid Optimizer: generate price-quantity curves              │
│ 3. Submit bids to ISO/RTO Day-Ahead Market                   │
│ 4. Receive DA awards (hourly schedules)                      │
├─ REAL-TIME (continuous) ─────────────────────────────────────┤
│ 5. Monitor fleet telemetry (MQTT, 1-sec resolution)          │
│ 6. Receive AGC signals (4-sec) and RT price (5-min)          │
│ 7. Dispatch Engine: compute DER setpoints                    │
│ 8. Send control signals: IEEE 2030.5 / OpenADR               │
│ 9. DERs respond: adjust power output/consumption             │
│ 10. Report telemetry to ISO metering system                  │
├─ SETTLEMENT (D+2 to D+60) ──────────────────────────────────┤
│ 11. Reconcile ISO metering with DER-level AMI data           │
│ 12. Calculate revenue per asset (pro-rata or performance)    │
│ 13. Issue payments to DER owners                             │
│ 14. Audit trail and regulatory reporting                     │
└──────────────────────────────────────────────────────────────┘`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 DERMS Coordination with VPP</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`VPP Dispatch Command: "Export 50 MW from DER fleet"
     │
     ▼
DERMS Operating Envelope Check:
     ├── Feeder 12: Hosting capacity allows 5 MW export
     ├── Feeder 15: Thermal limit → curtail to 3 MW
     ├── Feeder 23: Voltage rise → limit to 4 MW export
     └── Remaining feeders: approved as requested
     │
     ▼
DERMS → VPP: "Approved: 45 MW (5 MW curtailed for grid constraints)"
     │
     ▼
VPP Dispatch Engine: Redistribute 5 MW to unconstrained DERs
     │
     ▼
DER Setpoint Commands → Smart Meters / Edge Gateways → DER Assets

KEY: VPP optimizes for MARKET revenue.
     DERMS constrains for GRID safety.
     Both coordinate in real-time via standardized APIs.`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 Communication Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`ISO/RTO ──(ICCP/MMS)──► VPP Platform (Cloud)
                              │
                    ┌─────────┴─────────┐
                    │                   │
              IEEE 2030.5          OpenADR 2.0b
                    │                   │
            Smart Meters          C&I Load Control
                    │                   │
              ┌─────┴──────┐      ┌────┴──────┐
              │ HAN (Zigbee)│      │ BACnet    │
              │ Matter      │      │ Modbus    │
              │ OCPP        │      │ EMS       │
              └────────────┘      └───────────┘
                    │                   │
              Residential DERs    Commercial DERs`}</pre>
                </div>
            </Section>

            <Section title="5. Technology Stack" id="tech-stack">
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    Modern VPP platforms are built on cloud-native, event-driven architectures
                    optimized for high-throughput telemetry ingestion and sub-second dispatch latency:
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Layer</th>
                                <th className="text-left px-3 py-2 font-medium">Technology</th>
                                <th className="text-left px-3 py-2 font-medium">Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Event Streaming', 'Apache Kafka / AWS Kinesis', 'Telemetry ingestion (100K+ msg/sec)'],
                                ['Time-Series DB', 'InfluxDB / TimescaleDB', 'DER state storage (kW, SOC, temp)'],
                                ['ML/AI', 'TensorFlow / PyTorch (LSTM, Transformer)', 'Solar/load/price forecasting'],
                                ['Optimization', 'Gurobi / CPLEX / OR-Tools', 'Bid optimization (MILP)'],
                                ['API Gateway', 'Kong / AWS API Gateway', 'IEEE 2030.5, OpenADR, OCPP routing'],
                                ['Container Orchestration', 'Kubernetes', 'Microservices deployment, auto-scaling'],
                                ['Edge Computing', 'AWS Greengrass / Azure IoT Edge', 'Local DER aggregation, offline capability'],
                                ['Security', 'mTLS, OAuth 2.0, IEC 62351', 'End-to-end encryption, authentication'],
                            ].map(([layer, tech, purpose]) => (
                                <tr key={layer} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{layer}</td>
                                    <td className="px-3 py-2 text-[#EC4899]">{tech}</td>
                                    <td className="px-3 py-2 text-gray-400">{purpose}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Level 0', 'DER assets (PV, battery, EV, HVAC), smart meters, CTs', 'Energy conversion, measurement'],
                                ['Level 1', 'Inverter controllers, BMS, EVSE firmware, thermostat logic', 'Device-level control'],
                                ['Level 2', 'Smart meter HAN, edge gateways, building EMS', 'Local aggregation, protocol translation'],
                                ['Level 3', 'VPP dispatch engine, DERMS, utility ADMS', 'Fleet optimization, grid management'],
                                ['Level 4', 'VPP market engine, ISO/RTO systems, settlement platforms', 'Market bidding, revenue settlement'],
                                ['Level 5', 'Enterprise analytics, regulatory reporting, customer apps', 'Business intelligence'],
                            ].map(([level, components, functions]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EC4899] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{functions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Electric Power Research Institute. (2021). <em>DERMS requirements and architecture</em>. EPRI Report 3002021095.</p>
                    <p>Federal Energy Regulatory Commission. (2020). <em>Order No. 2222: Participation of DER aggregations in markets operated by RTOs and ISOs</em>. 172 FERC ¶ 61,247.</p>
                    <p>Burger, S., Jenkins, J., Huntington, S., &amp; Pérez-Arriaga, I. (2019). Why distributed? A critical review of the tradeoffs between centralized and decentralized resources. <em>IEEE Power and Energy Magazine</em>, 17(2), 16–24.</p>
                    <p>IEEE. (2018). <em>IEEE Std 2030.5: Smart Energy Profile 2.0 application protocol</em>. IEEE.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/energy/bess', label: 'Battery Energy Storage', color: '#EF4444' },
                        { href: '/wiki/energy/microgrids', label: 'Microgrids', color: '#8B5CF6' },
                        { href: '/wiki/energy/smart-homes', label: 'Smart Homes', color: '#06B6D4' },
                        { href: '/wiki/energy/distribution', label: 'Distribution Facilities', color: '#3B82F6' },
                        { href: '/wiki/sectors/ENER', label: 'Energy Sector Overview', color: '#F59E0B' },
                    ].map((link) => (
                        <a key={link.href} href={link.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${link.color}30`, color: link.color }}>
                            {link.label} →
                        </a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
