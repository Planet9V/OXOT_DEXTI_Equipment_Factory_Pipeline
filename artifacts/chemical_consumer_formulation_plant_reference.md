# Consumer Chemical Formulation Plant (CHEM-CP-FORM)
## TOGAF-Based Reference Architecture, Process Diagrams & Bill of Materials

**CISA Sector:** 01 -- Chemical
**Sub-Sector:** Consumer Products (CHEM-CP)
**Facility Code:** CHEM-CP-FORM
**Version:** 1.0
**Date:** 12 February 2026
**Classification:** DEXPI 2.0 Equipment Factory -- Chemical Sector Reference
**Author:** OXOT Engineering -- Claude Opus 4.6 Deep Research Agent

---

## Table of Contents

1. [TOGAF Business Architecture](#1-togaf-business-architecture)
2. [High-Level Design](#2-high-level-design)
3. [Detailed Technical Description](#3-detailed-technical-description)
4. [Bill of Materials](#4-bill-of-materials)
5. [Purdue Model Mapping](#5-purdue-model-mapping)
6. [Safety Systems](#6-safety-systems)
7. [Communication Protocol Stack](#7-communication-protocol-stack)
8. [Process Flow Diagrams](#8-process-flow-diagrams)
9. [Supporting Infrastructure](#9-supporting-infrastructure)
10. [References](#10-references)

---

## 1. TOGAF Business Architecture

### 1.1 Purpose

High-speed formulation, blending, and packaging of consumer cleaning products (laundry detergents, all-purpose cleaners, disinfectants), personal care items (shampoos, body washes, lotions), and OTC drug-monograph products (hand sanitizers, antimicrobial soaps). The facility converts bulk surfactants, fragrances, active ingredients, and water into shelf-ready consumer units at rates of 200--600 bottles per minute per line.

### 1.2 Key Stakeholders

| # | Stakeholder | Role & Interest |
|---|-------------|-----------------|
| 1 | **Plant Manager / Site Director** | Overall P&L accountability, production targets (OEE > 85%), safety (TRIR), environmental compliance, and capital planning |
| 2 | **Quality Assurance / Regulatory Affairs** | Lot release, cGMP compliance for OTC products (21 CFR 210/211), stability testing, label claims verification, EPA FIFRA registration for antimicrobials |
| 3 | **Operations / Production Manager** | Shift scheduling, batch recipe management (ISA-88), line changeover efficiency, throughput optimization, yield tracking |
| 4 | **EHS Manager (Environment, Health & Safety)** | OSHA Process Safety Management (29 CFR 1910.119), HazCom/GHS SDS authoring, NFPA 30 flammable-liquid compliance, chemical splash and dust/mist exposure controls |
| 5 | **Supply Chain / Procurement** | Raw material sourcing, inbound logistics (tank truck / railcar / IBC), inventory turns, supplier qualification, MRP/ERP integration |
| 6 | **Engineering & Maintenance** | Asset lifecycle management, preventive/predictive maintenance programs, capital project execution, OEM spare parts, calibration management |
| 7 | **IT / OT Cybersecurity** | ICS/SCADA network segmentation (Purdue Model), patch management, IEC 62443 zone/conduit architecture, MES/ERP integration security |
| 8 | **Marketing / Brand Owners** | Product formulation requirements, packaging specifications, fragrance/color palettes, SKU proliferation management, seasonal campaign demands |

### 1.3 Regulatory Framework

| Regulation / Standard | Scope & Applicability |
|------------------------|----------------------|
| **FDA 21 CFR Parts 210 & 211** | Current Good Manufacturing Practice (cGMP) for OTC drug products manufactured under monograph. Applies to hand sanitizers, antimicrobial soaps, sunscreens, and other OTC-classified consumer products. Requires batch records, equipment qualification (IQ/OQ/PQ), and annual product reviews. |
| **FDA OTC Drug Monographs (CARES Act 2020)** | Product-specific monographs define permissible active ingredients, concentrations, dosage forms, and labeling for OTC drugs marketed without individual NDA/ANDA. Key monographs: Topical Antimicrobial (tentative final), Skin Protectant, Sunscreen. |
| **EPA FIFRA (40 CFR Parts 152--180)** | Federal Insecticide, Fungicide, and Rodenticide Act registration for antimicrobial products making pesticidal claims (disinfectants, sanitizers). Requires EPA Establishment Number, efficacy data per AOAC/ASTM methods, and product-specific EPA Registration Number on labels. |
| **OSHA HazCom / GHS (29 CFR 1910.1200)** | Hazard Communication Standard requiring Safety Data Sheets (SDS) in 16-section GHS format, container labeling with pictograms/signal words/hazard statements, and employee training on chemical hazards for all raw materials and intermediates. |
| **CPSC / FHSA (16 CFR Part 1500)** | Federal Hazardous Substances Act labeling requirements for consumer products: signal words (DANGER, WARNING, CAUTION), principal hazard statements, first-aid instructions, and child-resistant packaging per PPPA (16 CFR 1700). |
| **OSHA 29 CFR 1910.119** | Process Safety Management for facilities handling threshold quantities of highly hazardous chemicals (e.g., > 10,000 lb chlorine, > 15,000 lb ethylene oxide). Requires PHA, MOC procedures, mechanical integrity programs. |
| **ISO 22716:2007** | Cosmetics Good Manufacturing Practices. International guideline for production, control, storage, and shipment of cosmetic products. Referenced by FDA MoCRA (Modernization of Cosmetics Regulation Act, 2022). |
| **NFPA 30** | Flammable and Combustible Liquids Code. Governs storage, handling, and use of flammable liquids (ethanol, isopropanol, fragrances with flash points < 100 deg F). Mandates secondary containment, bonding/grounding, ventilation rates. |

### 1.4 Business Capabilities

| Capability | Description |
|------------|-------------|
| **Formulation Management** | Recipe creation, scaling (lab to plant), version control, allergen/fragrance matrix management per ISA-88 batch control models |
| **Batch Execution** | Automated weighing, dispensing, mixing, heating/cooling, and pH adjustment per master batch records with electronic batch recording (EBR) |
| **Filling & Packaging** | High-speed rotary filling (200--600 BPM), capping, labeling, date/lot coding, shrink-wrapping, case packing, and palletizing |
| **Quality Control** | In-process testing (viscosity, pH, specific gravity, color, fragrance strength), finished-product release testing, retain sample management, stability studies |
| **Regulatory Compliance** | OTC monograph adherence, FIFRA registration maintenance, SDS authoring, label compliance review, FDA facility registration (21 CFR 207) |
| **Supply Chain Integration** | Raw material receiving/inspection, warehouse management (WMS), MRP-driven procurement, finished goods logistics, EDI 856/810 with retail customers |
| **Asset Management** | Preventive/predictive maintenance, spare parts inventory, calibration management per 21 CFR 211.68, OEE tracking (availability x performance x quality) |
| **EHS Management** | Permit management (air, water, waste), incident investigation, chemical exposure monitoring, ergonomic assessments, PSM program administration |

### 1.5 Value Streams

**Primary Value Stream: Raw Material to Shelf-Ready Product**

```
RM Receiving    Batching &     Quality      Filling &      Palletizing &
& Inspection -> Blending    -> Hold      -> Packaging   -> Warehousing -> Ship
   (Day 0)      (Day 0-1)     (Day 1)      (Day 1-2)      (Day 2-3)     (Day 3-5)
```

| Stage | Value Created | Enabling Capabilities |
|-------|---------------|----------------------|
| RM Receiving & Inspection | Verified, quarantined raw materials meeting COA specifications | Supply Chain, QC |
| Batching & Blending | Homogeneous product batch meeting in-process specifications | Formulation Management, Batch Execution |
| Quality Hold | Analytically confirmed batch meeting all release specifications | Quality Control, Regulatory Compliance |
| Filling & Packaging | Labeled, coded, sealed consumer units meeting packaging specifications | Filling & Packaging |
| Palletizing & Warehousing | Palletized, stretch-wrapped, scanned finished goods in WMS | Supply Chain Integration |

**Secondary Value Stream: New Product Introduction (NPI)**

```
Marketing Brief -> Lab Scale -> Pilot Scale -> Validation -> Line Qualification -> Launch
                   (500 mL)    (500 L)        (3 batches)   (Packaging trials)
```

---

## 2. High-Level Design

### 2.1 Canonical Plant Layout

The facility follows a linear process flow optimized for one-way material movement and clean/dirty zone separation:

```
  RECEIVING                    BATCHING / BLENDING               QUALITY           FILLING / PACKAGING          WAREHOUSE
  =========                    ===================               =======           ===================          =========

  Tank Farm        Day Tanks      Batch Mix        Hold           QC Lab     Filler   Labeler  Case     Palletizer  Finished
  (Bulk RM)  -->  (Working   --> Vessels     -->  Tanks    -->           --> Lines --> Lines -> Packer -> Robot   -> Goods
  IBCs/Drums       Storage)      (ISA-88)        (Agitated)     Sample              Coder              Stretch     Staging
  Railcar                        High-Shear                     Point                                   Wrap
  Unloading                      Homogenizer

  <-- Clean Zone (ISO 22716) --------------------------------->  <-- Packaging Zone (PackML) --------->  <-- Logistics ->
```

**Zone Separation:**
- **Outdoor Tank Farm:** Bulk liquid storage (surfactants, solvents, fragrances), secondary containment per NFPA 30, bonding/grounding
- **Raw Material Warehouse:** Drum/IBC/bag storage, FIFO rack systems, controlled temperature (15--25 deg C), relative humidity < 60%
- **Batching Suite:** Clean-zone controlled access, temperature-controlled (18--25 deg C), HVAC with fragrance exhaust, epoxy-coated floors with integral curbing
- **Quality Hold Area:** Segregated quarantine zone with positive lot identification, sampling stations
- **Packaging Hall:** High-bay open floor for filling lines, climate-controlled (20--28 deg C), compressed air Class 2 per ISO 8573-1
- **Finished Goods Warehouse:** High-density pallet racking, WMS-controlled locations, dock-leveled shipping bays

### 2.2 High-Speed Line Design (200--600 BPM)

Consumer chemical filling lines are configured as integrated high-speed lines using PackML/ISA-TR88.00.02 state models for machine-to-machine coordination.

**Typical Line Configuration (Liquid Fill, 500 mL Bottles):**

```
Bulk Product     Rotary         Rotary         Pressure-    Induction    Wrap-Around   Inkjet       Accumulation   Case        Robotic
Supply      -->  Unscrambler -> Filler      -> Sensitive -> Cap Seal -> Labeler    -> Date/Lot --> Table       -> Packer   -> Palletizer
(From hold       (Bottles)      (24-48 head,   Capper       Sealer       (Front +     Coder         (Buffer)      (RSC or     (Layer-pad,
 tanks via                       gravity or     (Chuck or    (Foil        Back + Wrap)  (Best-by,                   Wrap-       stretch-
 ring main)                      piston,        pick-and-    induction)                 Lot, EPA                    around)     wrap)
                                 200-600 BPM)   place)                                  Reg #)
```

**Line Speed Breakdown by Equipment (Targeting 400 BPM):**

| Equipment | Speed Rating | Constraint |
|-----------|-------------|------------|
| Bottle Unscrambler | 500 BPM | Hopper refill interval |
| Rotary Filler (36-head) | 400--450 BPM | Fill accuracy +/- 1% at rated speed |
| Rotary Capper | 500 BPM | Cap feed orientation |
| Induction Sealer | 600 BPM | Foil seal dwell time |
| Pressure-Sensitive Labeler | 500 BPM | Label web tracking |
| Inkjet Coder | 800+ BPM | Non-bottleneck |
| Case Packer (wrap-around) | 40 cases/min (12-pack = 480 BPM equiv.) | Case erection |
| Robotic Palletizer | 12 layers/min | Pattern complexity |

**Design Principle:** The filler is the pacemaker machine. All upstream and downstream equipment is rated at 110--125% of filler speed to maintain buffer margins and absorb micro-stoppages.

### 2.3 CIP (Clean-In-Place) System Design

The CIP system services all batch mix vessels, hold tanks, transfer lines, and fillers. It is a critical subsystem for preventing cross-contamination between product families, particularly for fragrance and color changeovers.

**CIP Skid Architecture:**

| Component | Specification |
|-----------|---------------|
| CIP Supply Pump | Centrifugal, 316L SS, 15 m3/h, 4 bar |
| CIP Return Pump | Self-priming, 316L SS, 15 m3/h |
| Caustic Tank (NaOH 2--5%) | 2,000 L, 316L SS, heated (60--80 deg C) |
| Acid Tank (Citric/Phosphoric 1--2%) | 1,000 L, 316L SS, ambient |
| Rinse Water Tank | 3,000 L, 316L SS, ambient, conductivity probe inline |
| Heat Exchanger | Plate type, 316L SS, 100 kW, steam-heated |
| Instrumentation | Inline conductivity, temperature, turbidity, flow |

**CIP Cycle (Fragrance Changeover, Worst-Case):**

| Step | Duration | Parameters |
|------|----------|------------|
| Pre-Rinse (Water) | 5 min | Ambient, 12 m3/h, drain to waste |
| Caustic Wash | 15 min | 2% NaOH, 70 deg C, recirculate |
| Intermediate Rinse | 5 min | Ambient water, conductivity < 50 uS/cm |
| Acid Wash (optional) | 10 min | 1% citric acid, 40 deg C, recirculate |
| Final Rinse | 5 min | Purified water, conductivity < 10 uS/cm |
| Sensory/Analytical Check | 5 min | Rinse sample: no detectable odor, color < 5 Pt-Co |

**Total changeover time (including CIP + mechanical):** 45--90 minutes depending on product family transition matrix.

**Allergen/Fragrance Changeover Protocol:**

- All product families are assigned to a fragrance/color transition matrix (worst-case pairing method)
- Clean-down validation follows ISO 22716 and MoCRA requirements
- Acceptance criteria: rinse water sensory panel (no detectable odor), analytical confirmation (GC headspace for fragrance residuals < 10 ppm), visual inspection (color < 5 Pt-Co units)
- Hard-gated SOP: MES will not release the line for the next batch until CIP completion and QC sign-off are electronically recorded

---

## 3. Detailed Technical Description

### 3.1 Functional Area 1: Raw Material Handling

**Purpose:** Receive, verify, store, and stage raw materials for batching operations. Materials include bulk surfactants (SLES, LAS, cocamidopropyl betaine), solvents (ethanol, isopropanol), fragrances, dyes, preservatives, active ingredients (triclosan, benzalkonium chloride), and packaging components.

**Equipment:**

| Equipment | Specification | Notes |
|-----------|---------------|-------|
| **Bulk Liquid Unloading Station** | 3" and 4" cam-lock connections, dry-break couplings, vapor recovery hood, grounding reel, flow totalizer | For tank truck (20,000 L) and railcar (60,000 L) unloading |
| **Bulk Storage Tanks (Surfactants)** | Vertical cylindrical, 316L SS or FRP, 50,000--100,000 L, cone bottom, side-entry agitator (0.5 kW), level transmitter (radar), temperature transmitter | Tank farm with secondary containment dike (110% capacity per NFPA 30) |
| **Bulk Storage Tanks (Solvents/Flammables)** | UL-142 double-wall steel, 20,000--50,000 L, nitrogen-blanketed, flame arrestor, emergency vent, bonded/grounded | Classified Area: NEC Class I, Div 2, Group D |
| **Day Tanks (Working Storage)** | 316L SS, 5,000--10,000 L, jacket or coil for temperature control (15--60 deg C), CIP connections, weigh cells or load cells | One per major raw material, gravity or pump feed to batching |
| **Drum/IBC Storage Racks** | FIFO flow-rack, 4-high pallet positions, spill containment sump, barcode/RFID label scanning | Temperature-controlled warehouse (15--25 deg C) |
| **Drum Pumps** | Air-operated diaphragm (AODD), 316L SS/PTFE wetted parts, 50--200 L/min, ATEX rated | For transferring from drums/IBCs to day tanks |
| **Dry Ingredient Handling** | Bag-dump station with dust collector (pulse-jet, 99.97% HEPA), pneumatic conveyor, loss-in-weight feeder (accuracy +/- 0.1%) | For powdered surfactants, builders (soda ash, STPP), opacifiers |
| **Weigh Scales** | Platform scale (0--3,000 kg, +/- 0.5 kg), bench scale (0--30 kg, +/- 1 g), legal-for-trade certified | Calibrated per 21 CFR 211.68 |

### 3.2 Functional Area 2: Batching & Blending

**Purpose:** Combine raw materials according to master batch records into homogeneous product formulations. This area operates under ISA-88 batch control with recipe-driven automation.

**Equipment:**

| Equipment | Specification | Notes |
|-----------|---------------|-------|
| **Main Batch Mixing Vessel** | 316L SS, 5,000--10,000 L working volume, dished heads, side/bottom-entry agitator (anchor + high-shear rotor-stator), jacket for heating/cooling (steam/chilled water), spray balls for CIP, sight glass, sampling valve, multiple inlet ports, weigh module (+/- 0.1%) | Typical plant has 4--8 vessels for parallel batching. Batch cycle time: 1--4 hours depending on product. |
| **High-Shear Mixer (Rotor-Stator)** | Inline or tank-mounted, 500--10,000 L batch capacity, rotor tip speed 20--25 m/s, motor 15--75 kW, 316L SS contact parts, mechanical seal, CIP-able | For emulsification (O/W and W/O), homogenization, and dispersion of thickeners (carbomers, xanthan gum). Tip speed controls droplet size (target 2--10 um for stable emulsions). |
| **Homogenizer (High-Pressure)** | Inline, 2-stage valve homogenizer, 100--400 bar operating pressure, throughput 5--20 m3/h, 316L SS, tungsten carbide valve seats | For personal care emulsions requiring sub-micron droplet size (< 1 um). Applied after premix vessel. |
| **Powder Induction System** | Venturi-type or rotor-stator eductor, inline, 316L SS, vacuum draws powder into liquid stream, integrated with loss-in-weight feeder | Eliminates floating clumps ("fish-eyes") when adding thickeners and gums. |
| **Inline Process Heater** | Plate heat exchanger, 316L SS, 200 kW, steam-heated, outlet temperature 40--80 deg C, integrated PID control | For dissolving solid surfactants, melting waxes (personal care), activating thickeners. |
| **Inline Process Cooler** | Plate heat exchanger, 316L SS, 150 kW, chilled water (7 deg C supply), outlet temperature 25--35 deg C | Post-blending cooling to filling temperature. Critical for maintaining fragrance top-note integrity. |
| **Transfer Pumps** | Positive displacement (lobe or progressive cavity) for viscous products (> 500 cP); centrifugal for low-viscosity (< 500 cP); 316L SS, CIP-able, variable-speed drive | Flow rates 5--30 m3/h. Lobe pumps for shear-sensitive products (conditioners, lotions). |
| **Inline Strainer / Polishing Filter** | Basket strainer (100--500 um) or bag filter (25--100 um), 316L SS housing, quick-open closure | Removes particulate, undissolved raw materials, or seal fragments before filling. |
| **pH Adjustment System** | Inline static mixer, metering pumps (diaphragm, 0--50 L/h), reagent tanks (citric acid, NaOH, triethanolamine), inline pH probe (4--20 mA, HART) | pH target range typically 5.0--8.0 depending on product family. |

**Batch Control Architecture (ISA-88 / IEC 61512):**

```
RECIPE MANAGEMENT (Level 3 / MES)
    |
    v
BATCH SUPERVISOR (Level 2 / Batch Server)
    |
    v
UNIT PROCEDURES -----> UNIT: MIX-001 (Vessel + Agitator + Heating + Instruments)
    |                        |
    v                        v
OPERATIONS:              EQUIPMENT MODULES:
  - Charge Water              - EM-AGT (Agitator speed control)
  - Heat to 60C               - EM-HTG (Jacket valve + temp control)
  - Add Surfactant             - EM-DOS (Dosing pump + weigh cell)
  - Mix 30 min                 - EM-HSM (High-shear mixer on/off + speed)
  - Add Fragrance              - EM-PH  (pH dosing + probe)
  - Cool to 30C               - EM-XFR (Transfer valve sequencing)
  - Transfer to Hold           - EM-CIP (CIP valve + pump sequencing)
    |
    v
PHASES (Lowest automation level):
  - Valve open/close, pump start/stop, PID setpoint, timer
```

### 3.3 Functional Area 3: Filling & Packaging

**Purpose:** Fill, seal, label, code, and case-pack finished product into retail-ready units. This area is dominated by high-speed discrete/hybrid automation governed by PackML (ISA-TR88.00.02) state models.

**Equipment:**

| Equipment | Specification | Notes |
|-----------|---------------|-------|
| **Bottle Unscrambler** | Rotary centrifugal type, hopper capacity 3,000--5,000 bottles, up to 500 BPM, integrated air rinser, servo-driven orientation | Handles HDPE, PET, PP bottles from 250 mL to 5 L. Quick-change tooling (< 15 min). |
| **Rotary Gravity/Piston Filler** | 24--48 filling heads, servo-driven volumetric pistons or mass-flow meters, fill accuracy +/- 0.5--1.0% of nominal volume, 316L SS product contact, CIP-able, rated 200--600 BPM | Gravity fillers for thin liquids (< 100 cP); piston fillers for viscous products (100--50,000 cP). Net-content compliance per NIST Handbook 133. |
| **Rotary Capper** | Chuck or pick-and-place type, 12--24 heads, servo-controlled torque (0.5--5.0 Nm adjustable), rated 500 BPM, integrated cap feeder/sorter/elevator | Handles screw caps, flip-top caps, pump dispensers, trigger sprayers. Torque monitoring with reject on out-of-spec. |
| **Induction Cap Sealer** | Tunnel or flat-head type, 2--6 kW RF generator, air-cooled, integrated foil detection sensor, rated 600+ BPM | Seals aluminum foil liners to bottle rim for tamper evidence and leak prevention. |
| **Pressure-Sensitive Labeler** | Rotary or blow-on type, front + back + wrap capability, label placement accuracy +/- 0.5 mm, servo-driven web tension, vision-verified, rated 500 BPM | Handles paper, film, shrink-sleeve labels. Integrated vision system verifies label presence, orientation, and print quality. |
| **Inkjet / Laser Coder** | Continuous inkjet (CIJ) or fiber laser, prints lot number, date code, best-by date, EPA Registration Number (if applicable), 5-line capability, rated 800+ BPM | Non-contact coding. FDA 21 CFR 211.130 traceability. Laser preferred for solvents/flammable environments. |
| **Vision Inspection System** | Multi-camera (2--6 cameras), label presence/orientation, fill level, cap presence/torque, code readability (OCR/OCV), date verification | Rejects non-conforming units to a locked reject bin. Image archive for 21 CFR 211 batch record. |
| **Checkweigher** | In-motion belt type, capacity 50--5,000 g, accuracy +/- 0.5 g, rejection by air blast or pusher, rated 600 BPM | Verifies net content per NIST HB 133 and FTC Fair Packaging and Labeling Act. |
| **Case Packer (Wrap-Around)** | Servo-driven, 30--50 cases/min, corrugated blanks, hot-melt glue closure, integrated case labeler (GS1-128 barcode) | Handles 6-pack, 12-pack, 24-pack configurations. Quick-change tooling (< 20 min). |
| **Robotic Palletizer** | 4-axis articulated robot, payload 100--250 kg, reach 3.2 m, layer pad/slip sheet dispenser, stretch wrapper integrated | Builds TI-HI pallet patterns per retailer specifications (Walmart, Target, Amazon). Throughput 8--15 layers/min. |
| **Stretch Wrapper** | Rotary turntable or ring type, 20--25 wraps/min, pre-stretch film 250%, integrated top-sheet dispenser | ASTM D4649 load unitization standard. |

### 3.4 Functional Area 4: Quality Control

**Purpose:** Analytical testing, in-process monitoring, and batch release per cGMP (21 CFR 210/211) for OTC products and ISO 22716 for cosmetics.

**Equipment:**

| Equipment | Specification | Notes |
|-----------|---------------|-------|
| **Viscosity Measurement** | Brookfield DV2T rotational viscometer, 1--6,000,000 cP range, cone-and-plate or spindle, temperature-controlled (25 +/- 0.5 deg C) | In-process and release testing per ASTM D2196. Inline process viscometer (vibrating element) optional at filler supply. |
| **pH Meter** | Benchtop, 0.00--14.00 pH, accuracy +/- 0.01 pH, temperature-compensated, 2-point calibration (4.00, 7.00 buffers) | Per USP <791> for OTC products. |
| **Specific Gravity / Density Meter** | Digital oscillating U-tube densitometer, range 0.5--3.0 g/mL, accuracy +/- 0.0001 g/mL, temperature-controlled | Per ASTM D4052. Used for batch identity confirmation and yield calculations. |
| **Colorimeter / Spectrophotometer** | Benchtop UV-Vis, 190--1100 nm, color measurement in Pt-Co (APHA), CIE L*a*b*, or Gardner scale | Per ASTM D1209 (Pt-Co) or ASTM E308 (CIE). Critical for color consistency across batches. |
| **Moisture Analyzer** | Karl Fischer titration (coulometric or volumetric), range 1 ppm to 100%, accuracy +/- 0.1% | Per ASTM E203. For powdered raw materials and anhydrous products. |
| **GC Headspace Analyzer** | Gas chromatograph with headspace autosampler, FID detector, capillary column (DB-WAX, 30 m x 0.25 mm) | Fragrance profile fingerprinting and CIP rinse-water residual testing. |
| **Microbiological Testing** | Laminar flow hood (ISO Class 5), incubators (25 deg C and 35 deg C), autoclaves, ATP bioluminescence for rapid screening | Aerobic plate count, yeast/mold, absence of objectionable organisms per USP <61>/<62> for OTC products. |
| **LIMS (Laboratory Information Management System)** | Enterprise LIMS integrated with MES and ERP, electronic signatures (21 CFR Part 11), specification management, COA generation, stability tracking | Manages sample login, test assignment, result entry, OOS investigations, batch disposition. |

---

## 4. Bill of Materials

**Scaled for a Medium Consumer Chemical Formulation Plant (4 filling lines, 200,000 consumer units/day capacity):**

| # | Equipment Type | Specification | Qty | Key Rating |
|---|---------------|---------------|-----|------------|
| 1 | Bulk Liquid Storage Tank (Surfactant) | 316L SS or FRP, vertical, cone bottom, side-entry agitator | 8 | 50,000--100,000 L each |
| 2 | Bulk Solvent Storage Tank (Flammable) | UL-142 double-wall steel, N2-blanketed, flame arrestor | 4 | 20,000--50,000 L each |
| 3 | Day Tank (Working Storage) | 316L SS, jacketed, weigh cells, CIP connections | 12 | 5,000--10,000 L each |
| 4 | Batch Mix Vessel | 316L SS, jacketed, anchor + high-shear agitator, spray balls | 6 | 5,000--10,000 L working vol. |
| 5 | High-Shear Rotor-Stator Mixer | Inline or top-entry, 316L SS, mechanical seal, VSD | 6 | 15--75 kW, tip speed 20--25 m/s |
| 6 | High-Pressure Homogenizer | 2-stage valve, inline, 316L SS, WC valve seats | 2 | 100--400 bar, 5--20 m3/h |
| 7 | Plate Heat Exchanger (Heating) | 316L SS, steam-heated, EPDM gaskets | 4 | 200 kW each |
| 8 | Plate Heat Exchanger (Cooling) | 316L SS, chilled water, EPDM gaskets | 4 | 150 kW each |
| 9 | Transfer Pump (Centrifugal) | 316L SS, CIP-able, VSD, mechanical seal | 20 | 5--30 m3/h, 3--7.5 kW |
| 10 | Transfer Pump (PD Lobe) | 316L SS, CIP-able, VSD, double mechanical seal | 8 | 5--15 m3/h, 5.5--11 kW |
| 11 | CIP Skid (Automated) | 316L SS, caustic/acid/rinse tanks, pumps, heat exchanger, instrumentation | 2 | 15 m3/h, PLC-controlled |
| 12 | Product Hold Tank | 316L SS, insulated, slow-speed agitator, CIP, weigh cells | 8 | 10,000--20,000 L each |
| 13 | Rotary Filler (Gravity/Piston) | 24--48 heads, servo-driven, 316L SS product path, CIP-able | 4 | 200--600 BPM per line |
| 14 | Rotary Capper | 12--24 heads, servo torque control, cap feeder/sorter | 4 | 500 BPM, 0.5--5.0 Nm |
| 15 | Pressure-Sensitive Labeler | Rotary, front + back + wrap, vision-verified, servo web | 4 | 500 BPM, +/- 0.5 mm accuracy |
| 16 | Inkjet / Laser Coder | CIJ or fiber laser, 5-line, OCR-verified | 4 | 800+ BPM |
| 17 | Vision Inspection System | Multi-camera (4--6), label/fill/cap/code inspection, reject station | 4 | 600 BPM throughput |
| 18 | Checkweigher | In-motion belt, air-blast reject, GS1 data capture | 4 | +/- 0.5 g, 600 BPM |
| 19 | Case Packer (Wrap-Around) | Servo-driven, hot-melt glue, integrated case labeler | 4 | 30--50 cases/min |
| 20 | Robotic Palletizer | 4-axis articulated, layer-pad dispenser, stretch wrapper | 2 | 100--250 kg payload, 12 layers/min |
| 21 | Batch Control System (DCS/PLC) | Redundant controllers, ISA-88 batch engine, 500+ I/O per vessel | 1 system | 6 batch units, 3,000+ total I/O |
| 22 | Packaging Line PLC + HMI | Machine-level PLCs with PackML state model, 15" HMI per machine | 4 lines | EtherCAT backbone, 200+ I/O/line |

---

## 5. Purdue Model Mapping

### 5.1 Level-by-Level Architecture

| Purdue Level | Components | Protocols / Functions |
|-------------|------------|----------------------|
| **Level 0 -- Physical Process** | Batch vessels, agitators, heat exchangers, filling valves, capping heads, conveyor belts, label applicators, sensors (level, temperature, pressure, pH, flow, conductivity, load cells), actuators (control valves, VSD motors, pneumatic cylinders) | Analog 4--20 mA / HART, discrete 24V DC, IO-Link for smart sensors/actuators, thermocouple/RTD inputs |
| **Level 1 -- Basic Control** | PLCs (batch area: redundant rack-mount; packaging lines: distributed modular), VFDs/servo drives, safety PLCs (SIL 2), motor control centers (MCCs), pneumatic valve islands | EtherCAT (packaging servo motion), Profinet (batch I/O), IO-Link (smart sensors), Modbus TCP (legacy instruments), HART (smart transmitters), ASi-5 (valve islands) |
| **Level 2 -- Supervisory Control** | SCADA/HMI workstations (batch operations: 4x dual-monitor; packaging: 1 per line), batch server (ISA-88 engine), historian (time-series, 1s resolution), alarm management server, recipe management server | OPC UA (batch-to-SCADA), Ethernet/IP (supervisory polling), PackML state model (ISA-TR88.00.02 over OPC UA for packaging line coordination), SQL (historian writes) |
| **Level 3 -- Manufacturing Operations** | Manufacturing Execution System (MES): electronic batch recording (EBR), schedule/dispatch, OEE dashboard, genealogy/traceability, weighing/dispensing management, CIP management, downtime tracking; LIMS interface; CMMS; WMS | OPC UA (MES-to-batch server), ISA-95/B2MML XML (MES-to-ERP), REST/JSON APIs (LIMS integration), MQTT (OEE data collection from PackML tags) |
| **Level 3.5 -- Industrial DMZ** | Next-gen firewalls (NGFW, paired in HA), application-layer proxy/relay servers, data diode (unidirectional gateway) for historian replication, patch management server (WSUS), antivirus/EDR definition server, jump server for remote access, syslog/SIEM collector | IEC 62443 zone/conduit model; TLS 1.3 encrypted tunnels; SAML/MFA for human access; unidirectional data flow for process data to enterprise; no direct OT-to-IT routing |
| **Level 4 -- Enterprise / Business** | ERP (SAP, Oracle): production planning, MRP, procurement, financial; PLM: formula/recipe lifecycle, packaging artwork management; CRM/order management; corporate historian (analytics); BI/reporting; regulatory submission systems | ISA-95/B2MML (ERP-to-MES), EDI X12 (856/810 to retail customers), GS1 EPCIS (serialization/traceability), SAP RFC/IDoc, REST APIs |

### 5.2 PackML Integration Detail (Packaging Lines)

The PackML (ISA-TR88.00.02) state model is implemented on each packaging machine PLC and exposed via OPC UA PackML Companion Specification (OPC 40084). The MES/line controller aggregates machine states to derive line-level OEE.

**PackML Unit/Machine States Used:**

| State | Description in Context |
|-------|----------------------|
| **Idle** | Machine ready, awaiting start command from line controller |
| **Starting** | Ramp-up sequence: conveyors start, filling heads purge, labeler web tensioned |
| **Execute** | Normal production at rated speed |
| **Completing** | Draining last bottles, clearing conveyors |
| **Complete** | Batch/order complete, awaiting new order or changeover |
| **Held** | Upstream/downstream machine stoppage (starved/blocked); automatic resume when cleared |
| **Suspended** | Operator-initiated pause (quality check, material replenishment) |
| **Stopping** | Controlled stop sequence initiated |
| **Stopped** | Machine stationary, safe for minor intervention |
| **Aborting** | Emergency stop or critical fault (e-stop, safety interlock) |
| **Aborted** | Machine in safe state after abort; requires "Clear" command to reset |
| **Clearing** | Reset sequence after abort; operator acknowledges fault cause |
| **Resetting** | Return machine to initial conditions from stopped state |

**PackTags Published (Per Machine):**

| PackTag Category | Examples |
|-----------------|----------|
| **Admin** | Machine ID, equipment module ID, product ID, batch ID |
| **Status** | Current state, current mode (Production/Maintenance/Manual), state change timestamp |
| **Command** | Start, stop, hold, unhold, suspend, unsuspend, abort, clear, reset |
| **Count** | Produced count (good), reject count (bad), total count, target count |
| **Speed** | Current speed (UPM), max speed, setpoint speed |
| **OEE** | Availability %, performance %, quality %, OEE % |

---

## 6. Safety Systems

### 6.1 Chemical Splash and Exposure Protection

| Hazard | Control Measure | Standard |
|--------|----------------|----------|
| **Skin/Eye Contact (Surfactants, Caustics, Acids)** | Emergency eyewash/shower stations within 10 seconds travel distance; splash-proof safety goggles, face shields, chemical-resistant gloves (nitrile), aprons | OSHA 29 CFR 1910.151; ANSI Z358.1 |
| **Inhalation (Fragrance Vapors, Dust)** | Local exhaust ventilation at batching vessels (capture velocity 0.5--1.0 m/s), enclosed powder handling with dust collection, area monitoring for VOCs | OSHA 29 CFR 1910.1000 (PEL/TLV); ACGIH TLV guidelines |
| **Dust/Mist Exposure** | LEV hoods at bag-dump stations, pulse-jet dust collector (99.97% efficiency, HEPA), enclosed conveying, mist eliminators on mixing vessels | OSHA 29 CFR 1910.94 (ventilation); NFPA 652 (combustible dust) |
| **Chemical Spill Containment** | Epoxy-coated concrete floors with integral curbing (50 mm height), floor drains to chemical sump, spill kits (absorbent pillows, neutralizers), secondary containment dikes for tank farm (110% volume) | NFPA 30 Section 22.11; EPA 40 CFR 112 (SPCC) |

### 6.2 Machine Guarding (OSHA 29 CFR 1910.212)

| Equipment | Guarding Method | Notes |
|-----------|----------------|-------|
| **High-Shear Mixers** | Interlock on vessel lid prevents agitator start when lid is open; rotary guard on coupling | OSHA 1910.212(a)(1); ANSI/PMMI B155.1 |
| **Rotary Fillers** | Perimeter safety fencing with interlocked access doors (safety-rated, Category 3 per ISO 13849-1), light curtains at infeed/outfeed openings | OSHA 1910.212(a)(1); ANSI/PMMI B155.1 |
| **Rotary Cappers** | Enclosed guarding around rotating turret, interlocked access panels | OSHA 1910.212(a)(3)(ii) |
| **Conveyor Systems** | Nip-point guards at drive/tail rollers, emergency pull-cord stop along conveyor length, underguarding to prevent contact with moving belt | OSHA 1910.212(a)(1); ANSI/ASME B20.1 |
| **Case Packers / Palletizers** | Full perimeter safety fencing (2.4 m height), safety-rated interlocked gates, area laser scanners (Type 3 per IEC 61496), muting sensors for product entry/exit | OSHA 1910.212(a)(1); ANSI/RIA 15.06 (robotic palletizer) |
| **Labelers** | Guards over rotating drums, interlocked access doors, label web tension guarding | OSHA 1910.212(a)(1) |

### 6.3 Flammable Liquid Handling (NFPA 30 / NEC)

| Requirement | Implementation |
|-------------|----------------|
| **Electrical Classification** | Bulk solvent tank farm and transfer areas: NEC Class I, Division 2, Group D. Equipment rated Ex d (flameproof) or Ex e (increased safety). |
| **Bonding & Grounding** | All metallic piping, tanks, drums, hoses, and transfer equipment bonded and grounded per NFPA 77. Resistance-to-ground < 10 ohms. Continuous bond verification during tank truck unloading. |
| **Ventilation** | Tank farm: natural ventilation (open-air). Indoor flammable storage rooms: mechanical ventilation providing 1 cfm/ft2 floor area minimum (NFPA 30 Section 10.4). |
| **Fire Suppression** | Tank farm: foam-water sprinkler system per NFPA 11/16. Indoor flammable storage: ESFR sprinklers per NFPA 13. Portable ABC extinguishers per NFPA 10 (travel distance < 50 ft). |
| **Secondary Containment** | Diked area sized to 110% of largest single tank volume or 100% of largest tank plus 10% of aggregate volume of all other tanks, whichever is greater (NFPA 30 Section 22.11.2). |
| **Spill Control** | Remote-actuated emergency block valves on tank outlets. Flame arrestors on tank vents. Conservation vents (pressure-vacuum) to minimize vapor losses. |

### 6.4 Ergonomic Considerations for High-Speed Lines

| Risk Factor | Control |
|-------------|---------|
| **Repetitive Motion (Manual Case Packing)** | Automated case packing/palletizing to eliminate manual lifting; ergonomic workstation design for manual inspection stations |
| **Noise** | High-speed packaging lines generate 80--95 dBA; engineering controls include acoustic enclosures around unscrambler/capper, vibration-dampened conveyors; hearing protection program per OSHA 29 CFR 1910.95 (action level 85 dBA TWA) |
| **Standing Fatigue** | Anti-fatigue mats at operator stations, sit-stand workstations at HMI panels, job rotation schedules |
| **Material Handling** | Pallet jacks, drum lifts, vacuum-assist bag lifters for 25 kg bags; maximum manual lift 23 kg per NIOSH lifting equation |

---

## 7. Communication Protocol Stack

### 7.1 Fieldbus Layer (Level 0--1)

| Protocol | Application | Key Characteristics |
|----------|-------------|---------------------|
| **IO-Link (IEC 61131-9)** | Smart sensors (level, temperature, pressure, flow, pH, conductivity), smart actuators (pneumatic valve positioners, VFDs), identification (RFID read-heads for material tracking) | Point-to-point, 3-wire, 230.4 kbaud, max 20 m cable, process data + diagnostics + parameterization. Enables predictive maintenance via sensor self-diagnostics. |
| **EtherCAT (IEC 61158)** | Packaging line servo drives (filler turret, capper turret, labeler web drive), high-speed I/O, vision system triggers | Sub-microsecond synchronization, 100 Mbit/s, daisy-chain topology, < 100 us cycle time for 100+ axes. Critical for electronic camming and coordinated motion on rotary packaging machines. |
| **HART (IEC 62591)** | Smart process transmitters (pressure, temperature, level, flow) in batching area | Superimposed on 4--20 mA analog, 1200 baud FSK, multi-drop capable. Provides access to transmitter diagnostics, calibration, and device description (DD). |
| **AS-Interface (ASi-5)** | Binary sensors/actuators, pneumatic valve islands, push-button stations, indicator lights | 2-wire (power + data), up to 96 devices per master, 1.27 ms cycle time, IP67 rated. Cost-effective for discrete I/O in packaging areas. |

### 7.2 Network Layer (Level 1--2)

| Protocol | Application | Key Characteristics |
|----------|-------------|---------------------|
| **Ethernet/IP (ODVA, CIP)** | PLC-to-PLC communication, batch system integration, VFD control in batch area | Standard Ethernet, TCP/UDP, implicit (cyclic) and explicit (acyclic) messaging, CIP safety for SIL 2/3 over same network. |
| **Profinet (IEC 61158)** | Batch area distributed I/O (ET200 remote I/O), process instrument integration, drive integration | Real-time Class 1 (RT, < 10 ms), Class 3 (IRT, < 1 ms) for motion, standard Ethernet frames, GSDML device descriptions. |
| **Modbus TCP** | Legacy instrument integration, utility metering (power, water, air), BMS interface | Simple, widely supported, register-based, polling architecture. Used for non-time-critical integrations. |

### 7.3 Enterprise / Integration Layer (Level 2--4)

| Protocol / Standard | Application | Key Characteristics |
|---------------------|-------------|---------------------|
| **OPC UA (IEC 62541)** | Universal integration backbone: batch server to SCADA, SCADA to MES, MES to ERP historian, PackML data model for packaging lines | Platform-independent, information modeling, security (X.509 certificates, TLS), pub/sub for efficient data distribution, companion specifications (PackML OPC 40084, ISA-95/B2MML). |
| **PackML State Model (ISA-TR88.00.02)** | Standardized machine state reporting from packaging lines to MES for OEE calculation, production reporting, and line coordination | 17 states, 3 modes (Production, Maintenance, Manual), standardized PackTags (Admin, Status, Command, Count), published via OPC UA. |
| **ISA-95 / B2MML (IEC 62264)** | MES-to-ERP integration: production orders, material consumption, batch genealogy, quality results | XML-based messaging per B2MML schema, defines Level 3--4 boundary, standardizes production schedule, performance, and material information exchange. |
| **MQTT (ISO/IEC 20922)** | Lightweight telemetry for IIoT dashboards, OEE data collection, predictive maintenance data streaming to cloud analytics | Pub/sub, QoS 0/1/2, TLS, Sparkplug B payload specification for industrial semantics. Used for edge-to-cloud data flow. |
| **GS1 Standards (EPCIS, GS1-128)** | Product serialization, case/pallet labeling, supply chain traceability, retailer compliance (Walmart, Target, Amazon) | GTIN-14 for cases, SSCC-18 for pallets, GS1-128 barcodes, EPCIS events for track-and-trace. |
| **EDI X12 (856/810/850)** | Electronic Data Interchange with retail customers: ASN (856), invoice (810), purchase order (850) | VAN or AS2 transport, ANSI X12 format, integrated with ERP. |

### 7.4 Protocol Stack Diagram

```
LEVEL 4   +-----------+    +---------+    +--------+    +---------+
ENTERPRISE| ERP (SAP) |<-->| PLM     |<-->| CRM    |<-->| BI/Rptg |
          +-----------+    +---------+    +--------+    +---------+
               |  ISA-95/B2MML                  |  EDI X12
               |  OPC UA                        |  GS1 EPCIS
- - - - - - - -|- - - - - - - - DMZ - - - - - - |- - - - - - - - - -
LEVEL 3.5      |  [NGFW] [Data Diode] [Jump]    |
               |  [Proxy] [Patch Svr] [SIEM]    |
- - - - - - - -|- - - - - - - - - - - - - - - - |- - - - - - - - - -
LEVEL 3   +-----------+    +---------+    +--------+    +---------+
MFG OPS   | MES (EBR) |<-->| LIMS    |<-->| CMMS   |<-->| WMS     |
          +-----------+    +---------+    +--------+    +---------+
               |  OPC UA                    |  REST/JSON
               |  MQTT (Sparkplug B)        |  SQL
- - - - - - - -|- - - - - - - - - - - - - - |- - - - - - - - - - -
LEVEL 2   +-----------+    +---------+    +--------+
SUPV CTRL | Batch Svr |<-->| SCADA   |<-->| Histn  |
          | (ISA-88)  |    | HMI x8  |    | 1s res |
          +-----------+    +---------+    +--------+
               |  OPC UA       |  OPC UA      |
               |  Ethernet/IP  |  PackML OPC  |
- - - - - - - -|- - - - - - - -|- - - - - - - |- - - - - - - - - -
LEVEL 1   +-----------+    +---------+    +--------+    +---------+
BASIC CTRL| Batch PLC |    | Pkg PLC |    | Safety |    | VFD/    |
          | (redund.) |    | (per    |    | PLC    |    | Servo   |
          |           |    |  machine|    | (SIL2) |    | Drives  |
          +-----------+    +---------+    +--------+    +---------+
               |  Profinet      |  EtherCAT    |  CIP Safety
               |  HART          |  IO-Link     |  ASi-5
- - - - - - - -|- - - - - - - -|- - - - - - - |- - - - - - - - - -
LEVEL 0   +-----------+    +---------+    +--------+    +---------+
PROCESS   | Batch:    |    | Pkg:    |    | Safety:|    | Utility:|
          | Valves,   |    | Fillers,|    | E-stops|    | Boiler, |
          | Agitators,|    | Cappers,|    | Guards,|    | Chiller,|
          | Sensors,  |    | Labelers|    | Light  |    | Comp.   |
          | HX, Pumps |    | Coders  |    | Curtns |    | Air     |
          +-----------+    +---------+    +--------+    +---------+
```

---

## 8. Process Flow Diagrams

### 8.1 Raw Material to Finished Goods Flow

```
                        CONSUMER CHEMICAL FORMULATION PLANT
                    Raw Material to Finished Goods Process Flow
 ==============================================================================

  RECEIVING                BATCHING                QUALITY         PACKAGING              WAREHOUSE
  =========                ========                =======         =========              =========

  Tank Truck  --+
  (Surfactant)  |   Bulk     Day        Batch     Hold      QC     Rotary    Rotary   Case    Robotic    Finished
                +--> Storage --> Tank  --> Mix   --> Tank --> Lab --> Filler --> Capper --> Packer -> Pallet --> Goods
  Railcar     --+   Tanks    (5-10kL)   Vessel   (10-20kL)  Hold   (24-48    (12-24    (Wrap-   izer      Warehouse
  (Solvent)     |   (50-     Weigh     (5-10kL)  Agitated  Zone    heads)    heads)    around)  + Stretch  (WMS)
                |    100kL)  Cells     ISA-88    Insulated         200-600   500 BPM   30-50    Wrap
  Drum/IBC    --+                      Batch                       BPM                 CPM
  (Fragrance,   |                      Control
   Dye, API)    |   Bag      Loss-in-                                Induction  PS       Inkjet    Check-
                |   Dump  -> Weight ------+                          Sealer     Labeler  Coder     weigher
  Bags/Sacks  --+   Station  Feeder      |                          (Foil)     (F+B+W)  (Lot#)    (+/-0.5g)
  (Powder)          w/Dust   (+/-0.1%)   |
                    Collect              High-Shear     pH           Vision Inspection
                                         Mixer     --> Adjust  +--> System (4-6 cameras)
                                         (15-75kW)     System  |    Label/Fill/Cap/Code
                                                               |
                                         Homogenizer           +--> Reject Bin
                                         (100-400 bar)              (Locked, Reconciled)
                                                |
                                         Inline          Inline
                                         Heater   -->    Cooler
                                         (200 kW)        (150 kW)
                                                |
                                         Polishing
                                         Filter
                                         (25-100 um)

  MATERIAL FLOW:  ===============================================>  (Left to Right)

  CIP SYSTEM:     <--- Caustic/Acid/Rinse Recirculation Loop --->
                  (Applied between batches; validated changeover)

  KEY:
    --> = Primary material flow
    kL  = Kiloliters (1,000 liters)
    BPM = Bottles Per Minute
    CPM = Cases Per Minute
    ISA-88 = Batch control standard (IEC 61512)
```

### 8.2 PackML State Model / Line Control

```
                     PackML (ISA-TR88.00.02) STATE MODEL
              Applied to Each Packaging Machine & Line Controller
 ==============================================================================

                               +----------+
                      +------->| STOPPED  |<-------+
                      |        +----------+        |
                      |             |               |
                   [Stop]       [Reset]          [Stop]
                      |             |               |
                      |             v               |
                 +----------+  +----------+   +----------+
                 | STOPPING |  | RESETTING|   | COMPLETING|
                 +----------+  +----------+   +----------+
                      ^             |               ^
                      |             v               |
                      |        +----------+         |
                      +--------| IDLE     |---------+
                      |        +----------+    [SC Complete]
                   [Stop]           |
                      |          [Start]
                      |             |
                      |             v
                      |        +----------+
                      +--------| STARTING |
                      |        +----------+
                      |             |
                      |        [SC Complete]
                      |             |
                      |             v
     +----------+     |        +==========+         +----------+
     | HOLDING  |-----|------->| EXECUTE  |-------->| UNHOLDING|
     +----------+  [Hold]     | (Normal  |  [Held] +----------+
          |                   |Production)|              |
       [Held]                 +==========+          [Unhold]
          |                        |                     |
          v                   [Suspend]                  v
     +----------+                  |              +----------+
     | HELD     |                  v              | HELD     |
     +----------+            +----------+         +----------+
                             |SUSPENDING|
                             +----------+
                                  |
                             [Suspended]
                                  |
                                  v
                             +----------+       +----------+
                             | SUSPENDED|------>|UNSUSPENDG|
                             +----------+       +----------+
                              [Unsuspend]

  EMERGENCY PATH (from any state):
  ================================
     ANY STATE ---[Abort]---> ABORTING ---> ABORTED ---[Clear]---> CLEARING ---> STOPPED

  LINE CONTROLLER AGGREGATION:
  ============================
     Machine_1 State + Machine_2 State + ... + Machine_N State
                            |
                            v
     Line State = Worst-case machine state
     (e.g., if any machine is HELD, line is HELD)

     PackTags published via OPC UA to MES:
       - Admin.ProductID, Admin.BatchID
       - Status.StateCurrent, Status.ModeCurrent
       - Count.ProducedCount, Count.DefectiveCount
       - Speed.SetSpeed (UPM), Speed.ActSpeed
```

### 8.3 Quality & Traceability Data Flow

```
               QUALITY & TRACEABILITY DATA FLOW
         (21 CFR 210/211, ISO 22716, GS1 Genealogy)
 ==============================================================

  RAW MATERIAL                  BATCHING                       PACKAGING
  LAYER                         LAYER                          LAYER
  ============                  ============                   ============

  Supplier COA ---+
  (PDF/EDI)       |
                  v
  RM Receiving ----> LIMS ----> Batch Record (EBR) ----> Packaging Record
  Inspection       Sample       in MES                   in MES
  - Identity test  Login        - RM lot genealogy       - Filler parameters
  - COA verify     - Assign     - Operator ID (21 CFR    - Torque values
  - Appearance      tests         Part 11 e-sig)        - Label verification
  - Weight check   - Enter      - Time-stamped steps     - Code verification
                    results     - In-process results     - Checkweigh data
  RM Lot # -----+  - OOS       - Deviation/CAPA         - Reject count
  Barcode/RFID  |   invest.    - Yield calculation       - Vision images
                |   - Release                            - PackML OEE data
                |    /Reject
                |       |              |                        |
                v       v              v                        v
            +----------------------------------------------+
            |           MES GENEALOGY ENGINE                |
            |  Links: RM Lots -> Batch # -> FG Lots        |
            |  Full forward/backward traceability           |
            +----------------------------------------------+
                        |                   |
                   [OPC UA]            [ISA-95/B2MML]
                        |                   |
                        v                   v
            +------------------+    +------------------+
            | Process Historian|    | ERP (SAP)        |
            | - Trend data     |    | - Batch cost     |
            | - Alarm log      |    | - Inventory      |
            | - Batch context  |    | - GR/GI postings |
            +------------------+    +------------------+
                        |
                   [Data Diode]
                   (DMZ, L3.5)
                        |
                        v
            +------------------+
            | Enterprise       |
            | Analytics / BI   |
            | - OEE trends     |
            | - Quality KPIs   |
            | - Yield analysis |
            | - Complaint link |
            +------------------+

  TRACEABILITY RECORD (per finished goods pallet):
  =================================================
    SSCC-18 (GS1)
      |-- GTIN-14 (case level)
      |     |-- GTIN-13 (consumer unit)
      |           |-- Lot Number
      |           |-- Best-By Date
      |           |-- Batch Number (internal)
      |           |-- Fill Line ID
      |           |-- Fill Date/Time
      |
      |-- Batch Record Reference
      |     |-- Master Batch Record Version
      |     |-- RM Lot Numbers (each ingredient)
      |     |-- Operator IDs (21 CFR Part 11)
      |     |-- In-Process Test Results
      |     |-- Deviation/CAPA References
      |
      |-- QC Release Record
            |-- Release Test Results
            |-- QA Disposition (e-signature)
            |-- Retain Sample Location
            |-- Stability Protocol Assignment

  RECALL CAPABILITY: Any single RM lot -> all affected batches
                     -> all affected FG lots -> retail distribution
                     (Target: < 4 hours for full trace)
```

---

## 9. Supporting Infrastructure

### 9.1 Bulk Liquid Storage and Transfer

| System | Specification |
|--------|---------------|
| **Surfactant Tank Farm** | 4--8 vertical tanks, 316L SS or FRP, 50,000--100,000 L each; concrete dike with 110% containment; side-entry agitators (0.5 kW) to prevent settling; radar level transmitters; steam tracing on viscous product lines (coconut-derived surfactants solidify below 20 deg C) |
| **Solvent/Flammable Tank Farm** | 2--4 UL-142 double-wall steel tanks, 20,000--50,000 L each; nitrogen blanketing (0.5--2.0 psig); conservation vents with flame arrestors; bonded/grounded per NFPA 77; NEC Class I, Div 2 electrical classification; foam sprinkler system per NFPA 11 |
| **Transfer Piping** | 316L SS orbital-welded tubing (1"--3"), 150# flanged connections for process; HDPE for dilute aqueous solutions; PTFE-lined for aggressive chemicals; slope-to-drain design for complete CIP drainage; pig-able headers for product changeover recovery |

### 9.2 Steam and Hot Water

| System | Specification |
|--------|---------------|
| **Steam Boiler** | Fire-tube, natural gas fired, 5--15 t/h saturated steam at 10 barg, 85--90% thermal efficiency, low-NOx burner (< 30 ppm), compliant with ASME Section I, NFPA 85 |
| **Steam Distribution** | Carbon steel piping (Schedule 40), PRV stations reducing from 10 barg to 3 barg (process jackets) and 1.5 barg (CIP), condensate return system, steam traps (thermodynamic/float type) |
| **Hot Water System** | Shell-and-tube or plate heat exchanger, steam-to-water, 80 deg C supply for CIP and process heating, recirculation loop with VFD pump, 316L SS |
| **Condensate Return** | Pressurized condensate return system (flash vessel, condensate pump), > 80% condensate recovery target, reduces boiler makeup water and chemical treatment costs |

### 9.3 Compressed Air

| System | Specification |
|--------|---------------|
| **Air Compressors** | Oil-free rotary screw (Class 0 per ISO 8573-1) for product-contact applications; oil-injected with filtration for general plant air; 7 barg operating pressure; N+1 redundancy |
| **Air Treatment** | Refrigerated dryer (dew point 3 deg C, Class 4); desiccant dryer (dew point -40 deg C, Class 2) for packaging area; coalescing filters (0.01 um, Class 1 oil); activated carbon filter for odor |
| **Air Quality (ISO 8573-1)** | Product-contact air: Class 1.2.1 (particles, moisture, oil). General instrument air: Class 1.4.1. Tested quarterly. |
| **Distribution** | Aluminum or galvanized steel ring main, 3" header, 3/4" drops, ball-valve isolation, FRLs at point-of-use, pressure regulators set to 6 barg |

### 9.4 Dust Collection

| System | Specification |
|--------|---------------|
| **Bag-Dump Dust Collector** | Pulse-jet cartridge type, 99.97% efficiency at 0.3 um (HEPA equivalent), airflow 2,000--5,000 m3/h, explosion venting per NFPA 68 (if combustible dust is handled), spark detection/extinguishing system |
| **Ductwork** | Galvanized steel, minimum 18 m/s transport velocity to prevent settling, blast gates at branch connections, grounded per NFPA 77 |
| **Dust Disposal** | Collected dust returned to process (if compatible) or drummed for waste disposal per RCRA |
| **Combustible Dust Assessment** | Per NFPA 652, all powdered materials undergo Kst, Pmax, MIE, and MEC testing; housekeeping program to prevent accumulation > 1/32" depth |

### 9.5 Effluent Treatment

| System | Specification |
|--------|---------------|
| **Equalization Tank** | 50,000--100,000 L, concrete or HDPE-lined, aerated (fine-bubble diffusers), pH monitoring, level control |
| **pH Neutralization** | Inline or batch neutralization, acid (H2SO4) and caustic (NaOH) dosing, target pH 6.0--9.0 per discharge permit |
| **Oil/Grease Separation** | API separator or dissolved air flotation (DAF) unit, < 100 mg/L oil & grease in effluent |
| **BOD/COD Reduction** | Activated sludge or sequencing batch reactor (SBR), target BOD < 30 mg/L, COD < 250 mg/L, MLSS 3,000--5,000 mg/L |
| **Surfactant (MBAS) Control** | Activated carbon polishing or advanced oxidation (ozone/UV) for MBAS < 1.0 mg/L if required by local permit |
| **Discharge** | To municipal POTW under industrial pretreatment permit (40 CFR 403) or direct discharge under NPDES permit (40 CFR 122) |

### 9.6 Warehousing and Logistics

| System | Specification |
|--------|---------------|
| **Finished Goods Warehouse** | High-density selective or drive-in pallet racking, 8--12 m clear height, 5,000--15,000 pallet positions, WMS-controlled (RF/barcode scanning), FIFO/FEFO rotation |
| **Dock Facilities** | 8--16 dock-leveled doors, hydraulic pit levelers, dock shelters, LED guide lights, temperature-controlled vestibules for heat-sensitive products |
| **Pallet Specifications** | GMA/CHEP 48" x 40" (North America) or EUR 800 x 1200 mm; TI-HI per retailer requirements; stretch-wrapped per ASTM D4649; max pallet weight 1,000 kg |
| **Shipping** | Full-truckload (FTL) and less-than-truckload (LTL), EDI 856 ASN generation, GS1-128 pallet labels, load optimization software |

---

## 10. References

1. International Society of Automation. (2010). *ANSI/ISA-88.01-2010 -- Batch control -- Part 1: Models and terminology*. ISA. [https://www.isa.org/standards-and-publications/isa-standards/isa-88-standards](https://www.isa.org/standards-and-publications/isa-standards/isa-88-standards)

2. International Society of Automation / OMAC. (2022). *ANSI/ISA-TR88.00.02-2022 -- Machine and unit states: An implementation example of ANSI/ISA-88.00.01 (PackML)*. ISA. [https://www.omac.org/packml](https://www.omac.org/packml)

3. U.S. Food and Drug Administration. (2023). *21 CFR Parts 210 and 211 -- Current good manufacturing practice in manufacturing, processing, packing, or holding of drugs*. U.S. Government Publishing Office. [https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-C/part-211)

4. U.S. Environmental Protection Agency. (2024). *Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA): 40 CFR Parts 152--180*. EPA. [https://www.epa.gov/pesticide-registration](https://www.epa.gov/pesticide-registration)

5. Occupational Safety and Health Administration. (2012). *29 CFR 1910.1200 -- Hazard Communication Standard (GHS)*. OSHA. [https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200)

6. Occupational Safety and Health Administration. (2012). *29 CFR 1910.212 -- General requirements for all machines*. OSHA. [https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.212](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.212)

7. National Fire Protection Association. (2021). *NFPA 30: Flammable and Combustible Liquids Code*. NFPA. [https://www.nfpa.org/codes-and-standards/nfpa-30-standard-development/30](https://www.nfpa.org/codes-and-standards/nfpa-30-standard-development/30)

8. International Electrotechnical Commission. (2020). *IEC 62443: Industrial communication networks -- Network and system security*. IEC. [https://www.iec.ch/isa-99-iec-62443](https://www.iec.ch/isa-99-iec-62443)

---

*Document generated for the DEXPI 2.0 Equipment Factory Pipeline -- Chemical Sector (CISA Sector 01). This reference architecture provides the engineering basis for populating equipment catalogs, process templates, and Purdue Model security zone mappings for consumer chemical formulation facilities.*
