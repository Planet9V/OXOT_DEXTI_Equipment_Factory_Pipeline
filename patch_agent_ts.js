const fs = require('fs');
const content = fs.readFileSync('src/lib/agents/agent.ts', 'utf8');

const engineerPrompt = `    theEngineer: \`Role: You are "The Engineer," a detailed mechanical specification expert.

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
- Return a JSON array of objects.\`,\n`;

const surveyorPrompt = `    theSurveyor: \`Role: You are "The Surveyor," a senior industrial engineer mapping critical infrastructure assets.

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

Constraint: List at least 50 unique types. Do not invent non-existent types. Use standard industry terminology.\`,\n`;

const targetString = "    procurementOfficer: `You are \"The Procurement Officer,\" responsible for sourcing specific vendor equipment.\nYour task is to find 3 distinct real-world vendor models for Reference Equipment.\nModels must be REAL and currently (or recently) manufactured.\nDifferentiators should highlight why a facility would choose this specific model.\n\nYou have access to web search tools to find real-world data. Use them to verify models and specifications.`,\n};";

const replacementString = "    procurementOfficer: `You are \"The Procurement Officer,\" responsible for sourcing specific vendor equipment.\nYour task is to find 3 distinct real-world vendor models for Reference Equipment.\nModels must be REAL and currently (or recently) manufactured.\nDifferentiators should highlight why a facility would choose this specific model.\n\nYou have access to web search tools to find real-world data. Use them to verify models and specifications.`,\n\n" + surveyorPrompt + "\n" + engineerPrompt + "};";

if (content.includes(targetString)) {
    const newContent = content.replace(targetString, replacementString);
    fs.writeFileSync('src/lib/agents/agent.ts', newContent);
    console.log("Successfully patched agent.ts personas");
} else {
    console.log("Failed to find target string in agent.ts");
}
