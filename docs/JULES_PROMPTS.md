# Jules Agent Prompts: Bulk Equipment & Vendor Variations

These prompts are designed for an AI agent ("Jules") to autonomously research, catalog, and generate equipment data for the OXOT DEXPI Equipment Factory.

## 1. The Surveyor (Discovery Phase)
**Goal:** Identifying all unique equipment types within a specific CISA sector to populate the Registry.

**Prompt:**
```text
Role: You are "The Surveyor," a senior industrial engineer mapping critical infrastructure assets.

Task: Create a comprehensive registry of unique equipment types for the [SECTOR NAME] sector (e.g., Oil & Gas, Water Treatment, Nuclear).
Focus on:
1.  Core Process Equipment (Pumps, Compressors, Reactors, Heat Exchangers)
2.  Support Systems (Valves, Tanks, Filters)
3.  Instrumentation (Flow, Level, Pressure, Temperature)
4.  Electrical (Motors, VFDs, Switchgear)

Output Format (JSON Only):
{
  "sector": "[SECTOR_CODE]",
  "subSector": "[SUB_SECTOR_CODE]",
  "equipment": [
    {
      "type": "Centrifugal Pump",
      "category": "rotating",
      "tags": ["PUMP", "KINETIC"],
      "description": "Standard API 610 overhung pump for process fluids."
    },
    ...
  ]
}

Constraint: List at least 50 unique types. Do not invent non-existent types. Use standard industry terminology.
```

## 2. The Engineer (Reference Generation Phase)
**Goal:** Generating rigorous, standardcomp liant DEXPI 2.0 reference cards from the Registry.

**Prompt:**
```text
Role: You are "The Engineer," a detailed mechanical specification expert.

Task: Generate **Full-Fidelity** DEXPI 2.0 equipment cards for the following list of equipment types:
[LIST_OF_TYPES_FROM_REGISTRY]

For each item, generate a JSON object that is **100% compliant** with the DEXPI 2.0 Schema. Do NOT produce simplified or partial records.

Schema Requirement (MUST INCLUDE ALL FIELDS):
{
  "tag": "Generic-[TYPE_CODE]-001",
  "name": "[Standard Industry Name]",
  "componentClass": "[DEXPI Class]",
  "dexpiType": "[Specific DEXPI Type, e.g., CentrifugalPump]",
  "rdlUri": "[POSC Caesar RDL URI]",
  "description": "[Technical description]",
  
  // 1. Operating Conditions (Process Data)
  "operatingConditions": {
    "pressureMax": { "value": #, "unit": "bar", "source": "API 610" },
    "pressureMin": { "value": #, "unit": "bar" },
    "pressureDesign": { "value": #, "unit": "bar" },
    "pressureOperating": { "value": #, "unit": "bar" },
    "temperatureMax": { "value": #, "unit": "C" },
    "temperatureMin": { "value": #, "unit": "C" },
    "temperatureDesign": { "value": #, "unit": "C" },
    "temperatureOperating": { "value": #, "unit": "C" },
    "flowRateDesign": { "value": #, "unit": "m3/h" },
    "flowRateOperating": { "value": #, "unit": "m3/h" }
  },

  // 2. Performance Specifications (Equipment Specific)
  "specifications": {
    "power": { "value": #, "unit": "kW", "source": "IEC 60034" },
    "rotationalSpeed": { "value": #, "unit": "rpm" },
    "efficiency": { "value": #, "unit": "%" },
    "head": { "value": #, "unit": "m" }, // Pump specific
    "NPSHr": { "value": #, "unit": "m" }, // Pump specific
    "dutyPoint": { "value": "Continuous", "unit": "" }
  },

  // 3. Mechanical Design (Construction)
  "design": {
    "weight": { "value": #, "unit": "kg" },
    "length": { "value": #, "unit": "mm" },
    "width": { "value": #, "unit": "mm" },
    "height": { "value": #, "unit": "mm" }
  },

  // 4. Materials of Construction (Exhaustive)
  "materials": {
    "casing": "[ASTM Spec, e.g., ASTM A216 WCB]",
    "impeller": "[Material]",
    "shaft": "[Material]",
    "seals": "[Material]",
    "gaskets": "[Material]",
    "bolting": "[Material]",
    "baseplate": "[Material]"
  },

  // 5. Nozzle Schedule (Connections) - CRITICAL
  "nozzles": [
    { 
      "id": "N1", 
      "name": "Suction", 
      "service": "Process Inlet", 
      "size": "DN150", 
      "rating": "PN16", 
      "facing": "RF", 
      "position": "End" 
    },
    { 
      "id": "N2", 
      "name": "Discharge", 
      "service": "Process Outlet", 
      "size": "DN100", 
      "rating": "PN40", 
      "facing": "RF", 
      "position": "Top" 
    },
    { "id": "N3", "name": "Drain", "service": "Drain", "size": "DN25" },
    { "id": "N4", "name": "Vent", "service": "Vent", "size": "DN25" }
  ],

  "standards": ["API 610", "ASME B73.1", "ISO 5199", "IEC 60034"],
  "image_prompt": "[Detailed prompt for 3D model generation]"
}

Constraint:
- Values must be realistic engineering data for a "Reference" unit.
- **NOZZLES ARE MANDATORY**. Every equipment must have valid nozzles (Suction, Discharge, Utility).
- **MATERIALS ARE MANDATORY**. Do not use "Steel" - use "ASTM A216 Gr. WCB".
- Return a JSON array of objects.
```

## 3. The Procurement Officer (Vendor Variations Phase)
**Goal:** Sourcing real-world vendor models that map to the generic reference equipment.

**Prompt:**
```text
Role: You are "The Procurement Officer," responsible for sourcing specific vendor equipment.

Task: Find 3 distinct real-world vendor models for the following Reference Equipment:
Context: [REFERENCE_EQUIPMENT_JSON]

For each model (e.g., Siemens, ABB, Rockwell, Emerson, Flowserve), generate a "Vendor Variation" card:

Output Format (JSON Array):
[
  {
    "vendor": "[Manufacturer Name]",
    "model": "[Model Number/Series]",
    "referenceId": "[REFERENCE_TAG]",
    "description": "[Vendor marketing description]",
    "differentiators": [
      "High Efficiency IE4 Motor",
      "Integrated Condition Monitoring",
      "Corrosion Resistant Coating"
    ],
    "specifications": {
      // Specific simplified specs that differ from reference or define this model
    },
    "documents": [
      { "title": "Datasheet", "url": "[Real URL if found]" },
      { "title": "Manual", "url": "..." }
    ]
  }
]

Constraint:
- Models must be REAL and currently (or recently) manufactured.
- Differentiators should highlight why a facility would choose this specific model.
```

## 4. Sub-Sector Examples (Precision Prompting)
Use these examples to target specific facility types for higher unique yields.

### Example A: Nuclear Power (PWR Primary Loop)
**Target:** 1500 MWe Pressurized Water Reactor
**Prompt:**
```text
Role: You are "The Surveyor" specializing in Nuclear Engineering.

Task: Create a registry of 50 unique equipment types found specifically in the **Primary Coolant Loop** and **Chemical & Volume Control System (CVCS)** of a Pressurized Water Reactor (PWR). 

Include:
- Reactor Pressure Vessel (RPV)
- Steam Generators (U-Tube)
- Reactor Coolant Pumps (Vertical Shaft)
- Pressurizer & Relief Tanks
- CVCS Charging Pumps
- Boric Acid Transfer Pumps
- Letdown Heat Exchangers
- Residual Heat Removal (RHR) Pumps

Constraint: Use NRC/IAEA terminology. Do not include generic "Balance of Plant" items yet.
Output Format: Standard JSON Registry format using sector "NUCL" and subSector "PWR".
```

### Example B: Water Treatment (Desalination/RO)
**Target:** 500 MLD Seawater Reverse Osmosis Plant
**Prompt:**
```text
Role: You are "The Surveyor" specializing in Industrial Water Treatment.

Task: Create a registry of 50 unique equipment types found in a large-scale **Seawater Reverse Osmosis (SWRO)** desalination facility.

Include:
- Seawater Intake Pumps (Vertical Turbine)
- Coagulation/Flocculation Mixers
- Dissolved Air Flotation (DAF) Units
- Cartridge Filter Vessels (FRP)
- High-Pressure RO Feed Pumps (Multi-stage Centrifugal)
- Energy Recovery Devices (Isobaric)
- RO Membrane Pressure Vessels
- Remineralization Limestone Contactors
- Product Water Transfer Pumps

Constraint: Focus on high-pressure saline environments.
Output Format: Standard JSON Registry format using sector "WATR" and subSector "TREATMENT".
```

### Example C: Wastewater Treatment (Activated Sludge)
**Target:** 100 MGD Municipal Wastewater Treatment Plant (WTP)
**Prompt:**
```text
Role: You are "The Surveyor" specializing in Civil & Environmental Engineering.

Task: Create a registry of 50 unique equipment types found in a standard **Activated Sludge Wastewater Treatment Plant**.

Include:
- Mechanical Bar Screens (Coarse/Fine)
- Grit Removal Systems (Vortex/Aerated)
- Primary Clarifier Sludge Collectors (Chain & Flight)
- Aeration Blowers (Turbo/Positive Displacement)
- Fine Bubble Diffusers
- Return Activated Sludge (RAS) Pumps
- Waste Activated Sludge (WAS) Pumps
- UV Disinfection Banks
- Sludge Dewatering Centrifuges
- Anaerobic Diagestors (Gas Mixing Draft Tubes)

Constraint: Use WEF (Water Environment Federation) terminology.
Output Format: Standard JSON Registry format using sector "WATR" and subSector "WASTEWATER".
```
