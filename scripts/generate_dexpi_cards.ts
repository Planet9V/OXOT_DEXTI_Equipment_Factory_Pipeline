import * as fs from 'fs';
import * as path from 'path';

export interface DexpiCard {
    tag: string;
    name: string;
    componentClass: string;
    dexpiType: string;
    rdlUri: string;
    description: string;
    operatingConditions: any;
    specifications: any;
    design: any;
    materials: any;
    nozzles: any[];
    standards: string[];
    image_prompt: string;
}

export function generateAllCards(): DexpiCard[] {
    const registryPath = path.join(__dirname, '../src/lib/resources/oil_gas_registry.json');
    if (!fs.existsSync(registryPath)) return [];

    const registryData = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const cards: DexpiCard[] = [];

    for (let i = 0; i < registryData.equipment.length; i++) {
        const eq = registryData.equipment[i];
        const t = eq.type;
        const tag = `Generic-OG-${String(i+1).padStart(3, '0')}`;
        const name = eq.type;
        const desc = eq.description;

        const card: DexpiCard = {
            tag: tag,
            name: name,
            componentClass: "Unknown",
            dexpiType: "Unknown",
            rdlUri: "http://posccaesar.org/rdl/unknown",
            description: desc,
            operatingConditions: {},
            specifications: {},
            design: {},
            materials: {},
            nozzles: [],
            standards: [],
            image_prompt: ""
        };

        if (t === "Atmospheric Distillation Column") {
            card.componentClass = "ProcessColumn";
            card.dexpiType = "DistillationColumn";
            card.operatingConditions = {
                "pressureMax": { "value": 5.0, "unit": "bar", "source": "ASME VIII" },
                "pressureMin": { "value": 0.5, "unit": "bar" },
                "pressureDesign": { "value": 4.5, "unit": "bar" },
                "pressureOperating": { "value": 3.0, "unit": "bar" },
                "temperatureMax": { "value": 400, "unit": "C" },
                "temperatureMin": { "value": -20, "unit": "C" },
                "temperatureDesign": { "value": 380, "unit": "C" },
                "temperatureOperating": { "value": 350, "unit": "C" },
                "flowRateDesign": { "value": 12000, "unit": "m3/h" },
                "flowRateOperating": { "value": 10000, "unit": "m3/h" }
            };
            card.specifications = {
                "stages": { "value": 50, "unit": "" },
                "diameter": { "value": 6.5, "unit": "m" }
            };
            card.design = {
                "weight": { "value": 150000, "unit": "kg" },
                "length": { "value": 6500, "unit": "mm" },
                "width": { "value": 6500, "unit": "mm" },
                "height": { "value": 45000, "unit": "mm" }
            };
            card.materials = {
                "shell": "ASTM A516 Gr. 70",
                "heads": "ASTM A516 Gr. 70",
                "internals": "Stainless Steel 410",
                "trays": "Stainless Steel 410",
                "bolting": "ASTM A193 Gr. B7"
            };
            card.nozzles = [
                { "id": "N1", "name": "Feed", "service": "Process Inlet", "size": "DN600", "rating": "PN16", "facing": "RF", "position": "Side" },
                { "id": "N2", "name": "Overhead Vapor", "service": "Process Outlet", "size": "DN800", "rating": "PN16", "facing": "RF", "position": "Top" },
                { "id": "N3", "name": "Bottoms", "service": "Process Outlet", "size": "DN400", "rating": "PN16", "facing": "RF", "position": "Bottom" },
                { "id": "N4", "name": "Reflux", "service": "Process Inlet", "size": "DN250", "rating": "PN16", "facing": "RF", "position": "Side" }
            ];
            card.standards = ["ASME VIII Div 1", "API 650"];
            card.image_prompt = "3D model of a massive atmospheric distillation column in a refinery with ladders and platforms.";
        } else if (t === "Vacuum Distillation Column") {
            card.componentClass = "ProcessColumn";
            card.dexpiType = "VacuumColumn";
            card.operatingConditions = {
                "pressureMax": { "value": 2.0, "unit": "bar", "source": "ASME VIII" },
                "pressureMin": { "value": 0.01, "unit": "bar" },
                "pressureDesign": { "value": 1.0, "unit": "bar" },
                "pressureOperating": { "value": 0.05, "unit": "bar" },
                "temperatureMax": { "value": 450, "unit": "C" },
                "temperatureMin": { "value": 10, "unit": "C" },
                "temperatureDesign": { "value": 420, "unit": "C" },
                "temperatureOperating": { "value": 400, "unit": "C" },
                "flowRateDesign": { "value": 5000, "unit": "m3/h" },
                "flowRateOperating": { "value": 4500, "unit": "m3/h" }
            };
            card.specifications = {
                "stages": { "value": 20, "unit": "" },
                "diameter": { "value": 10.0, "unit": "m" }
            };
            card.design = {
                "weight": { "value": 200000, "unit": "kg" },
                "length": { "value": 10000, "unit": "mm" },
                "width": { "value": 10000, "unit": "mm" },
                "height": { "value": 30000, "unit": "mm" }
            };
            card.materials = {
                "shell": "ASTM A516 Gr. 70 Clad with SS316",
                "heads": "ASTM A516 Gr. 70 Clad with SS316",
                "internals": "Stainless Steel 316L",
                "packing": "Stainless Steel 316L",
                "bolting": "ASTM A193 Gr. B7"
            };
            card.nozzles = [
                { "id": "N1", "name": "Feed", "service": "Process Inlet", "size": "DN800", "rating": "PN16", "facing": "RF", "position": "Side" },
                { "id": "N2", "name": "Overhead Vapor", "service": "Process Outlet", "size": "DN1200", "rating": "PN16", "facing": "RF", "position": "Top" },
                { "id": "N3", "name": "Bottoms", "service": "Process Outlet", "size": "DN300", "rating": "PN16", "facing": "RF", "position": "Bottom" }
            ];
            card.standards = ["ASME VIII Div 1", "API 650"];
            card.image_prompt = "3D model of a wide vacuum distillation column.";
        } else if (t === "FCC Reactor/Regenerator") {
            card.componentClass = "Reactor";
            card.dexpiType = "FCCUnit";
            card.operatingConditions = {
                "pressureMax": { "value": 4.5, "unit": "bar", "source": "ASME VIII" },
                "pressureMin": { "value": 1.0, "unit": "bar" },
                "pressureDesign": { "value": 4.0, "unit": "bar" },
                "pressureOperating": { "value": 2.5, "unit": "bar" },
                "temperatureMax": { "value": 800, "unit": "C" },
                "temperatureMin": { "value": 20, "unit": "C" },
                "temperatureDesign": { "value": 750, "unit": "C" },
                "temperatureOperating": { "value": 700, "unit": "C" },
                "flowRateDesign": { "value": 8000, "unit": "m3/h" },
                "flowRateOperating": { "value": 7500, "unit": "m3/h" }
            };
            card.specifications = {
                "catalystVolume": { "value": 500, "unit": "m3" }
            };
            card.design = {
                "weight": { "value": 300000, "unit": "kg" },
                "length": { "value": 12000, "unit": "mm" },
                "width": { "value": 12000, "unit": "mm" },
                "height": { "value": 35000, "unit": "mm" }
            };
            card.materials = {
                "shell": "ASTM A387 Gr. 11",
                "lining": "Refractory Brick",
                "internals": "Inconel 600",
                "cyclones": "Inconel 600"
            };
            card.nozzles = [
                { "id": "N1", "name": "Feed In", "service": "Process Inlet", "size": "DN500", "rating": "PN40", "facing": "RF" },
                { "id": "N2", "name": "Vapor Out", "service": "Process Outlet", "size": "DN1000", "rating": "PN40", "facing": "RF" },
                { "id": "N3", "name": "Catalyst Transfer", "service": "Solid Transfer", "size": "DN800", "rating": "PN40", "facing": "RF" }
            ];
            card.standards = ["ASME VIII Div 2"];
            card.image_prompt = "3D model of an FCC reactor unit.";
        } else if (t === "Hydrocracker Reactor") {
            card.componentClass = "Reactor";
            card.dexpiType = "Hydrocracker";
            card.operatingConditions = {
                "pressureMax": { "value": 180, "unit": "bar", "source": "ASME VIII" },
                "pressureMin": { "value": 10, "unit": "bar" },
                "pressureDesign": { "value": 160, "unit": "bar" },
                "pressureOperating": { "value": 140, "unit": "bar" },
                "temperatureMax": { "value": 500, "unit": "C" },
                "temperatureMin": { "value": 50, "unit": "C" },
                "temperatureDesign": { "value": 450, "unit": "C" },
                "temperatureOperating": { "value": 400, "unit": "C" },
                "flowRateDesign": { "value": 2000, "unit": "m3/h" },
                "flowRateOperating": { "value": 1800, "unit": "m3/h" }
            };
            card.specifications = {
                "catalystBeds": { "value": 3, "unit": "" }
            };
            card.design = {
                "weight": { "value": 800000, "unit": "kg" },
                "length": { "value": 4500, "unit": "mm" },
                "width": { "value": 4500, "unit": "mm" },
                "height": { "value": 25000, "unit": "mm" }
            };
            card.materials = {
                "shell": "ASTM A336 Gr. F22V",
                "overlay": "Stainless Steel 347",
                "internals": "Stainless Steel 321",
                "bolting": "ASTM A193 Gr. B16"
            };
            card.nozzles = [
                { "id": "N1", "name": "Feed Inlet", "service": "Process Inlet", "size": "DN300", "rating": "PN250", "facing": "RTJ" },
                { "id": "N2", "name": "Effluent Outlet", "service": "Process Outlet", "size": "DN300", "rating": "PN250", "facing": "RTJ" },
                { "id": "N3", "name": "Quench Gas", "service": "Utility", "size": "DN100", "rating": "PN250", "facing": "RTJ" }
            ];
            card.standards = ["ASME VIII Div 2"];
            card.image_prompt = "3D model of a heavy-wall hydrocracker reactor.";
        } else if (t === "Crude Heater") {
            card.componentClass = "FiredHeater";
            card.dexpiType = "FiredHeater";
            card.operatingConditions = {
                "pressureMax": { "value": 30, "unit": "bar", "source": "API 560" },
                "pressureMin": { "value": 5, "unit": "bar" },
                "pressureDesign": { "value": 25, "unit": "bar" },
                "pressureOperating": { "value": 15, "unit": "bar" },
                "temperatureMax": { "value": 450, "unit": "C" },
                "temperatureMin": { "value": 20, "unit": "C" },
                "temperatureDesign": { "value": 400, "unit": "C" },
                "temperatureOperating": { "value": 360, "unit": "C" },
                "flowRateDesign": { "value": 4000, "unit": "m3/h" },
                "flowRateOperating": { "value": 3500, "unit": "m3/h" }
            };
            card.specifications = {
                "duty": { "value": 85000, "unit": "kW" },
                "efficiency": { "value": 90, "unit": "%" }
            };
            card.design = {
                "weight": { "value": 150000, "unit": "kg" },
                "length": { "value": 15000, "unit": "mm" },
                "width": { "value": 10000, "unit": "mm" },
                "height": { "value": 20000, "unit": "mm" }
            };
            card.materials = {
                "radiantTubes": "ASTM A335 Gr. P9",
                "convectionTubes": "ASTM A106 Gr. B",
                "casing": "ASTM A36",
                "refractory": "Castable Refractory"
            };
            card.nozzles = [
                { "id": "N1", "name": "Crude In", "service": "Process Inlet", "size": "DN300", "rating": "PN40", "facing": "RF" },
                { "id": "N2", "name": "Crude Out", "service": "Process Outlet", "size": "DN300", "rating": "PN40", "facing": "RF" },
                { "id": "N3", "name": "Fuel Gas In", "service": "Utility", "size": "DN100", "rating": "PN16", "facing": "RF" }
            ];
            card.standards = ["API 560"];
            card.image_prompt = "3D model of a box-type crude fired heater.";
        } else if (t === "Crude Preheat Exchanger") {
            card.componentClass = "HeatExchanger";
            card.dexpiType = "ShellAndTubeHeatExchanger";
            card.operatingConditions = {
                "pressureMax": { "value": 20, "unit": "bar", "source": "TEMA R" },
                "pressureMin": { "value": 2, "unit": "bar" },
                "pressureDesign": { "value": 18, "unit": "bar" },
                "pressureOperating": { "value": 12, "unit": "bar" },
                "temperatureMax": { "value": 300, "unit": "C" },
                "temperatureMin": { "value": 10, "unit": "C" },
                "temperatureDesign": { "value": 280, "unit": "C" },
                "temperatureOperating": { "value": 250, "unit": "C" },
                "flowRateDesign": { "value": 1000, "unit": "m3/h" },
                "flowRateOperating": { "value": 850, "unit": "m3/h" }
            };
            card.specifications = {
                "heatTransferArea": { "value": 850, "unit": "m2" },
                "duty": { "value": 12000, "unit": "kW" }
            };
            card.design = {
                "weight": { "value": 18000, "unit": "kg" },
                "length": { "value": 6000, "unit": "mm" },
                "width": { "value": 1500, "unit": "mm" },
                "height": { "value": 1800, "unit": "mm" }
            };
            card.materials = {
                "shell": "ASTM A516 Gr. 70",
                "tubes": "ASTM A213 TP316L",
                "tubesheet": "ASTM A266 Cl. 2",
                "baffles": "ASTM A240 TP316L"
            };
            card.nozzles = [
                { "id": "N1", "name": "Shell In", "service": "Process Inlet", "size": "DN250", "rating": "PN16", "facing": "RF" },
                { "id": "N2", "name": "Shell Out", "service": "Process Outlet", "size": "DN250", "rating": "PN16", "facing": "RF" },
                { "id": "N3", "name": "Tube In", "service": "Process Inlet", "size": "DN200", "rating": "PN40", "facing": "RF" },
                { "id": "N4", "name": "Tube Out", "service": "Process Outlet", "size": "DN200", "rating": "PN40", "facing": "RF" }
            ];
            card.standards = ["TEMA R", "ASME VIII Div 1"];
            card.image_prompt = "3D model of a shell and tube heat exchanger.";
        } else if (t === "Air Fin Cooler") {
            card.componentClass = "HeatExchanger";
            card.dexpiType = "AirCooledHeatExchanger";
            card.operatingConditions = {
                "pressureMax": { "value": 15, "unit": "bar", "source": "API 661" },
                "pressureMin": { "value": 1, "unit": "bar" },
                "pressureDesign": { "value": 12, "unit": "bar" },
                "pressureOperating": { "value": 8, "unit": "bar" },
                "temperatureMax": { "value": 200, "unit": "C" },
                "temperatureMin": { "value": -10, "unit": "C" },
                "temperatureDesign": { "value": 180, "unit": "C" },
                "temperatureOperating": { "value": 140, "unit": "C" },
                "flowRateDesign": { "value": 500, "unit": "m3/h" },
                "flowRateOperating": { "value": 450, "unit": "m3/h" }
            };
            card.specifications = {
                "heatTransferArea": { "value": 2500, "unit": "m2" },
                "fanPower": { "value": 45, "unit": "kW" }
            };
            card.design = {
                "weight": { "value": 25000, "unit": "kg" },
                "length": { "value": 12000, "unit": "mm" },
                "width": { "value": 4000, "unit": "mm" },
                "height": { "value": 3500, "unit": "mm" }
            };
            card.materials = {
                "header": "ASTM A516 Gr. 70",
                "tubes": "ASTM A214",
                "fins": "Aluminum 1060",
                "structure": "ASTM A36 Galvanized"
            };
            card.nozzles = [
                { "id": "N1", "name": "Inlet", "service": "Process Inlet", "size": "DN300", "rating": "PN16", "facing": "RF" },
                { "id": "N2", "name": "Outlet", "service": "Process Outlet", "size": "DN300", "rating": "PN16", "facing": "RF" }
            ];
            card.standards = ["API 661", "ASME VIII Div 1"];
            card.image_prompt = "3D model of an air fin cooler bank.";
        } else if (t === "Process Pump") {
            card.componentClass = "Pump";
            card.dexpiType = "CentrifugalPump";
            card.operatingConditions = {
                "pressureMax": { "value": 45, "unit": "bar", "source": "API 610" },
                "pressureMin": { "value": 2, "unit": "bar" },
                "pressureDesign": { "value": 40, "unit": "bar" },
                "pressureOperating": { "value": 30, "unit": "bar" },
                "temperatureMax": { "value": 250, "unit": "C" },
                "temperatureMin": { "value": -20, "unit": "C" },
                "temperatureDesign": { "value": 200, "unit": "C" },
                "temperatureOperating": { "value": 150, "unit": "C" },
                "flowRateDesign": { "value": 250, "unit": "m3/h" },
                "flowRateOperating": { "value": 200, "unit": "m3/h" }
            };
            card.specifications = {
                "power": { "value": 132, "unit": "kW", "source": "API 610" },
                "rotationalSpeed": { "value": 2950, "unit": "rpm" },
                "efficiency": { "value": 78, "unit": "%" },
                "head": { "value": 120, "unit": "m" },
                "NPSHr": { "value": 3.5, "unit": "m" },
                "dutyPoint": { "value": "Continuous", "unit": "" }
            };
            card.design = {
                "weight": { "value": 1500, "unit": "kg" },
                "length": { "value": 1800, "unit": "mm" },
                "width": { "value": 800, "unit": "mm" },
                "height": { "value": 900, "unit": "mm" }
            };
            card.materials = {
                "casing": "ASTM A216 Gr. WCB",
                "impeller": "ASTM A351 Gr. CF8M",
                "shaft": "ASTM A276 Type 410",
                "seals": "API 682 Plan 53B",
                "baseplate": "ASTM A36"
            };
            card.nozzles = [
                { "id": "N1", "name": "Suction", "service": "Process Inlet", "size": "DN150", "rating": "PN16", "facing": "RF", "position": "End" },
                { "id": "N2", "name": "Discharge", "service": "Process Outlet", "size": "DN100", "rating": "PN40", "facing": "RF", "position": "Top" },
                { "id": "N3", "name": "Drain", "service": "Utility", "size": "DN25", "rating": "PN16", "facing": "RF" }
            ];
            card.standards = ["API 610", "ISO 13709"];
            card.image_prompt = "3D model of a centrifugal process pump.";
        } else if (t === "Wet Gas Compressor") {
            card.componentClass = "Compressor";
            card.dexpiType = "CentrifugalCompressor";
            card.operatingConditions = {
                "pressureMax": { "value": 35, "unit": "bar", "source": "API 617" },
                "pressureMin": { "value": 1.5, "unit": "bar" },
                "pressureDesign": { "value": 30, "unit": "bar" },
                "pressureOperating": { "value": 22, "unit": "bar" },
                "temperatureMax": { "value": 180, "unit": "C" },
                "temperatureMin": { "value": -10, "unit": "C" },
                "temperatureDesign": { "value": 160, "unit": "C" },
                "temperatureOperating": { "value": 120, "unit": "C" },
                "flowRateDesign": { "value": 15000, "unit": "m3/h" },
                "flowRateOperating": { "value": 13000, "unit": "m3/h" }
            };
            card.specifications = {
                "power": { "value": 3500, "unit": "kW", "source": "API 617" },
                "rotationalSpeed": { "value": 8500, "unit": "rpm" },
                "efficiency": { "value": 82, "unit": "%" }
            };
            card.design = {
                "weight": { "value": 15000, "unit": "kg" },
                "length": { "value": 4500, "unit": "mm" },
                "width": { "value": 3000, "unit": "mm" },
                "height": { "value": 3500, "unit": "mm" }
            };
            card.materials = {
                "casing": "ASTM A216 Gr. WCB",
                "impeller": "ASTM A182 F6a",
                "shaft": "ASTM A434 Cl. BD",
                "seals": "Dry Gas Seals API 614",
                "baseplate": "ASTM A36"
            };
            card.nozzles = [
                { "id": "N1", "name": "Suction", "service": "Process Inlet", "size": "DN400", "rating": "PN16", "facing": "RF" },
                { "id": "N2", "name": "Discharge", "service": "Process Outlet", "size": "DN300", "rating": "PN40", "facing": "RF" },
                { "id": "N3", "name": "Lube Oil In", "service": "Utility", "size": "DN50", "rating": "PN16", "facing": "RF" }
            ];
            card.standards = ["API 617"];
            card.image_prompt = "3D model of a large centrifugal compressor.";
        } else if (t === "Floating Roof Tank" || t === "Crude Storage Tank") {
            card.componentClass = "Tank";
            card.dexpiType = "StorageTank";
            card.operatingConditions = {
                "pressureMax": { "value": 1.1, "unit": "bar", "source": "API 650" },
                "pressureMin": { "value": 0.9, "unit": "bar" },
                "pressureDesign": { "value": 1.05, "unit": "bar" },
                "pressureOperating": { "value": 1.013, "unit": "bar" },
                "temperatureMax": { "value": 60, "unit": "C" },
                "temperatureMin": { "value": -20, "unit": "C" },
                "temperatureDesign": { "value": 50, "unit": "C" },
                "temperatureOperating": { "value": 25, "unit": "C" },
                "flowRateDesign": { "value": 2000, "unit": "m3/h" },
                "flowRateOperating": { "value": 1000, "unit": "m3/h" }
            };
            card.specifications = {
                "volume": { "value": 50000, "unit": "m3" }
            };
            card.design = {
                "weight": { "value": 450000, "unit": "kg" },
                "length": { "value": 60000, "unit": "mm" },
                "width": { "value": 60000, "unit": "mm" },
                "height": { "value": 18000, "unit": "mm" }
            };
            card.materials = {
                "shell": "ASTM A36",
                "bottom": "ASTM A36",
                "roof": "ASTM A36",
                "seals": "Buna-N Wiper Seal"
            };
            card.nozzles = [
                { "id": "N1", "name": "Fill", "service": "Process Inlet", "size": "DN600", "rating": "PN16", "facing": "FF" },
                { "id": "N2", "name": "Suction", "service": "Process Outlet", "size": "DN600", "rating": "PN16", "facing": "FF" },
                { "id": "N3", "name": "Drain", "service": "Utility", "size": "DN100", "rating": "PN16", "facing": "FF" },
                { "id": "M1", "name": "Manway", "service": "Access", "size": "DN600", "rating": "PN16", "facing": "FF" }
            ];
            card.standards = ["API 650"];
            card.image_prompt = `3D model of a massive ${t.toLowerCase()} crude storage tank.`;
        } else if (["HV Electric Motor", "Backup Diesel Generator", "MV Switchgear", "UPS System", "Pump Drive Motor", "Variable Frequency Drive"].includes(t)) {
            card.componentClass = "Electrical";
            card.dexpiType = "ElectricalEquipment";
            card.operatingConditions = {
                "pressureMax": { "value": 1.013, "unit": "bar", "source": "IEC 60034" },
                "pressureMin": { "value": 1.013, "unit": "bar" },
                "pressureDesign": { "value": 1.013, "unit": "bar" },
                "pressureOperating": { "value": 1.013, "unit": "bar" },
                "temperatureMax": { "value": 55, "unit": "C" },
                "temperatureMin": { "value": -10, "unit": "C" },
                "temperatureDesign": { "value": 40, "unit": "C" },
                "temperatureOperating": { "value": 25, "unit": "C" },
                "flowRateDesign": { "value": 0, "unit": "m3/h" },
                "flowRateOperating": { "value": 0, "unit": "m3/h" }
            };
            if (t === "HV Electric Motor" || t === "Pump Drive Motor") {
                card.specifications = {
                    "power": { "value": 2500, "unit": "kW", "source": "IEC 60034" },
                    "voltage": { "value": 6600, "unit": "V" }
                };
                card.materials = {
                    "casing": "Cast Iron ASTM A48 Cl. 30",
                    "rotor": "Electrical Steel Sheet",
                    "windings": "Copper",
                    "bearings": "Chrome Steel AISI 52100"
                };
            } else if (t === "Backup Diesel Generator") {
                card.specifications = {
                    "powerOutput": { "value": 1500, "unit": "kW", "source": "ISO 8528" },
                    "voltage": { "value": 400, "unit": "V" }
                };
                card.materials = {
                    "enclosure": "Galvanized Sheet Steel ASTM A653",
                    "block": "Cast Iron ASTM A48",
                    "alternator": "Copper Windings"
                };
            } else if (t === "MV Switchgear") {
                card.specifications = {
                    "voltage": { "value": 11000, "unit": "V" },
                    "currentRating": { "value": 1250, "unit": "A" }
                };
                card.materials = {
                    "enclosure": "Powder Coated Carbon Steel ASTM A1008",
                    "busbars": "Copper C11000",
                    "insulators": "Epoxy Resin"
                };
            } else if (t === "UPS System") {
                card.specifications = {
                    "capacity": { "value": 200, "unit": "kVA" },
                    "voltage": { "value": 400, "unit": "V" }
                };
                card.materials = {
                    "enclosure": "Carbon Steel ASTM A1008",
                    "batteries": "Lead-Acid / VRLA",
                    "wiring": "PVC Insulated Copper"
                };
            } else if (t === "Variable Frequency Drive") {
                card.specifications = {
                    "power": { "value": 500, "unit": "kW" },
                    "voltage": { "value": 400, "unit": "V" }
                };
                card.materials = {
                    "enclosure": "Carbon Steel ASTM A1008",
                    "heatsink": "Aluminum Alloy 6061",
                    "busbars": "Copper C11000"
                };
            }

            card.design = {
                "weight": { "value": 3500, "unit": "kg" },
                "length": { "value": 2500, "unit": "mm" },
                "width": { "value": 1500, "unit": "mm" },
                "height": { "value": 2200, "unit": "mm" }
            };
            card.nozzles = [
                { "id": "C1", "name": "Power Inlet", "service": "Electrical", "size": "M63" },
                { "id": "C2", "name": "Control Cable", "service": "Signal", "size": "M25" },
                { "id": "V1", "name": "Cooling Louver", "service": "Ventilation", "size": "400x400mm" }
            ];
            card.standards = ["IEC 60034", "IEEE 841"];
            card.image_prompt = `3D model of ${t} in an industrial setting.`;
        } else if (["Globe Control Valve", "Butterfly Control Valve", "Swing Check Valve", "Gate Valve", "Ball Valve", "Relief Valve", "Pipeline Strainer", "Rupture Disc"].includes(t)) {
            card.componentClass = "Valve";
            card.dexpiType = "Valve";
            card.operatingConditions = {
                "pressureMax": { "value": 50, "unit": "bar", "source": "ASME B16.34" },
                "pressureMin": { "value": 1, "unit": "bar" },
                "pressureDesign": { "value": 40, "unit": "bar" },
                "pressureOperating": { "value": 25, "unit": "bar" },
                "temperatureMax": { "value": 300, "unit": "C" },
                "temperatureMin": { "value": -20, "unit": "C" },
                "temperatureDesign": { "value": 250, "unit": "C" },
                "temperatureOperating": { "value": 150, "unit": "C" },
                "flowRateDesign": { "value": 500, "unit": "m3/h" },
                "flowRateOperating": { "value": 400, "unit": "m3/h" }
            };
            if (["Globe Control Valve", "Butterfly Control Valve"].includes(t)) {
                card.specifications = {
                    "cv": { "value": 350, "unit": "" },
                    "leakageClass": { "value": "IV", "unit": "" }
                };
            } else {
                card.specifications = {
                    "cv": { "value": 800, "unit": "" }
                };
            }

            card.design = {
                "weight": { "value": 250, "unit": "kg" },
                "length": { "value": 400, "unit": "mm" },
                "width": { "value": 300, "unit": "mm" },
                "height": { "value": 600, "unit": "mm" }
            };

            if (t === "Pipeline Strainer") {
                card.materials = {
                    "body": "ASTM A216 WCB",
                    "screen": "Stainless Steel 316L",
                    "gasket": "Spiral Wound SS316/PTFE",
                    "bolting": "ASTM A193 Gr. B7"
                };
            } else if (t === "Rupture Disc") {
                card.materials = {
                    "holder": "ASTM A216 WCB",
                    "disc": "Nickel Alloy 200",
                    "gasket": "PTFE",
                    "bolting": "ASTM A193 Gr. B7"
                };
            } else {
                 card.materials = {
                    "body": "ASTM A216 WCB",
                    "trim": "Stainless Steel 316L",
                    "stem": "Stainless Steel 410",
                    "packing": "Graphite",
                    "bolting": "ASTM A193 Gr. B7"
                };
            }
            card.nozzles = [
                { "id": "N1", "name": "Inlet", "service": "Process", "size": "DN150", "rating": "PN40", "facing": "RF" },
                { "id": "N2", "name": "Outlet", "service": "Process", "size": "DN150", "rating": "PN40", "facing": "RF" }
            ];
            card.standards = ["ASME B16.34", "API 600", "ISA 75.01"];
            card.image_prompt = `3D model of an industrial ${t}.`;
        } else if (["Coriolis Flow Meter", "Vortex Flow Meter", "Ultrasonic Flow Meter", "Radar Level Transmitter", "Displacer Level Transmitter", "Pressure Transmitter", "Temperature Transmitter", "Gas Chromatograph", "pH Analyzer", "Custody Transfer Meter"].includes(t)) {
            card.componentClass = "Instrumentation";
            card.dexpiType = "Instrument";
            card.operatingConditions = {
                "pressureMax": { "value": 40, "unit": "bar", "source": "ISA" },
                "pressureMin": { "value": 1, "unit": "bar" },
                "pressureDesign": { "value": 30, "unit": "bar" },
                "pressureOperating": { "value": 15, "unit": "bar" },
                "temperatureMax": { "value": 150, "unit": "C" },
                "temperatureMin": { "value": -20, "unit": "C" },
                "temperatureDesign": { "value": 120, "unit": "C" },
                "temperatureOperating": { "value": 80, "unit": "C" },
                "flowRateDesign": { "value": 0, "unit": "m3/h" },
                "flowRateOperating": { "value": 0, "unit": "m3/h" }
            };
            card.specifications = {
                "accuracy": { "value": 0.1, "unit": "%" },
                "signalOut": { "value": "4-20mA HART", "unit": "" }
            };
            card.design = {
                "weight": { "value": 15, "unit": "kg" },
                "length": { "value": 250, "unit": "mm" },
                "width": { "value": 150, "unit": "mm" },
                "height": { "value": 300, "unit": "mm" }
            };
            if (["Coriolis Flow Meter", "Vortex Flow Meter"].includes(t)) {
                 card.materials = {
                    "wettedParts": "Hastelloy C276",
                    "housing": "Aluminum Alloy 356",
                    "flanges": "Stainless Steel 316L",
                    "sensor": "Piezoelectric Ceramic"
                };
            } else {
                card.materials = {
                    "wettedParts": "Stainless Steel 316L",
                    "housing": "Aluminum Alloy 356",
                    "sensor": "Platinum Resistance Element",
                    "bolting": "Stainless Steel 304"
                };
            }
            card.nozzles = [
                { "id": "N1", "name": "Process Conn", "service": "Measurement", "size": "1/2 inch NPT" },
                { "id": "C1", "name": "Cable Gland", "service": "Signal", "size": "M20" }
            ];
            card.standards = ["IEC 61508", "ISA-5.1"];
            card.image_prompt = `3D model of ${t}.`;
        } else if (["Reciprocating Compressor", "Steam Turbine Driver", "Instrument Air Compressor"].includes(t)) {
            card.componentClass = t.includes("Compressor") ? "Compressor" : "Turbine";
            card.dexpiType = t.includes("Compressor") ? "Compressor" : "SteamTurbine";
            card.operatingConditions = {
                "pressureMax": { "value": 60, "unit": "bar", "source": t.includes("Compressor") ? "API 618" : "API 611" },
                "pressureMin": { "value": 1.5, "unit": "bar" },
                "pressureDesign": { "value": 50, "unit": "bar" },
                "pressureOperating": { "value": 40, "unit": "bar" },
                "temperatureMax": { "value": 200, "unit": "C" },
                "temperatureMin": { "value": 10, "unit": "C" },
                "temperatureDesign": { "value": 180, "unit": "C" },
                "temperatureOperating": { "value": 150, "unit": "C" },
                "flowRateDesign": { "value": 1000, "unit": "m3/h" },
                "flowRateOperating": { "value": 850, "unit": "m3/h" }
            };
            card.specifications = {
                "power": { "value": 850, "unit": "kW", "source": "API" },
                "rotationalSpeed": { "value": t.includes("Compressor") ? 1500 : 3600, "unit": "rpm" },
                "efficiency": { "value": 85, "unit": "%" }
            };
            card.design = {
                "weight": { "value": 12000, "unit": "kg" },
                "length": { "value": 4000, "unit": "mm" },
                "width": { "value": 2500, "unit": "mm" },
                "height": { "value": 3000, "unit": "mm" }
            };
            card.materials = {
                "casing": "ASTM A216 WCB",
                "rotor": t.includes("Compressor") ? "Alloy Steel AISI 4140" : "ASTM A470 Cl 4",
                "bearings": "Babbitt Metal",
                "baseplate": "ASTM A36 Carbon Structural"
            };
            card.nozzles = [
                { "id": "N1", "name": "Inlet", "service": "Process Inlet", "size": "DN200", "rating": "PN40", "facing": "RF" },
                { "id": "N2", "name": "Outlet", "service": "Process Outlet", "size": "DN150", "rating": "PN63", "facing": "RF" },
                { "id": "N3", "name": "Lube Oil In", "service": "Utility", "size": "DN50", "rating": "PN16" }
            ];
            card.standards = [t.includes("Compressor") ? "API 618" : "API 611"];
            card.image_prompt = `3D model of ${t}.`;
        } else if (["Fire Water Pump", "Main Line Pump"].includes(t)) {
            card.componentClass = "Pump";
            card.dexpiType = "CentrifugalPump";
            card.operatingConditions = {
                "pressureMax": { "value": 25, "unit": "bar", "source": t === "Fire Water Pump" ? "NFPA 20" : "API 610" },
                "pressureMin": { "value": 1, "unit": "bar" },
                "pressureDesign": { "value": 20, "unit": "bar" },
                "pressureOperating": { "value": 15, "unit": "bar" },
                "temperatureMax": { "value": 60, "unit": "C" },
                "temperatureMin": { "value": 5, "unit": "C" },
                "temperatureDesign": { "value": 50, "unit": "C" },
                "temperatureOperating": { "value": 20, "unit": "C" },
                "flowRateDesign": { "value": 1200, "unit": "m3/h" },
                "flowRateOperating": { "value": 1000, "unit": "m3/h" }
            };
            card.specifications = {
                "power": { "value": 450, "unit": "kW", "source": "API 610" },
                "rotationalSpeed": { "value": 1450, "unit": "rpm" },
                "head": { "value": 100, "unit": "m" }
            };
            card.design = {
                "weight": { "value": 3500, "unit": "kg" },
                "length": { "value": 2500, "unit": "mm" },
                "width": { "value": 1200, "unit": "mm" },
                "height": { "value": 1500, "unit": "mm" }
            };
            card.materials = {
                "casing": t === "Fire Water Pump" ? "Bronze Ni-Al Alloy ASTM B148" : "ASTM A216 WCB",
                "impeller": t === "Fire Water Pump" ? "Bronze ASTM B584" : "Stainless Steel 316L",
                "shaft": t === "Fire Water Pump" ? "Monel K500" : "Stainless Steel 410",
                "baseplate": "Galvanized Steel ASTM A123"
            };
            card.nozzles = [
                { "id": "N1", "name": "Suction", "service": "Process Inlet", "size": "DN250", "rating": "PN16", "facing": "RF" },
                { "id": "N2", "name": "Discharge", "service": "Process Outlet", "size": "DN200", "rating": "PN16", "facing": "RF" }
            ];
            card.standards = t === "Fire Water Pump" ? ["NFPA 20"] : ["API 610"];
            card.image_prompt = `3D model of ${t}.`;
        } else if (["Waste Heat Boiler", "Plate Heat Exchanger", "Kettle Reboiler"].includes(t)) {
            card.componentClass = "HeatExchanger";
            card.dexpiType = "HeatExchanger";
            card.operatingConditions = {
                "pressureMax": { "value": 45, "unit": "bar", "source": "ASME VIII" },
                "pressureMin": { "value": 2, "unit": "bar" },
                "pressureDesign": { "value": 35, "unit": "bar" },
                "pressureOperating": { "value": 25, "unit": "bar" },
                "temperatureMax": { "value": 400, "unit": "C" },
                "temperatureMin": { "value": 10, "unit": "C" },
                "temperatureDesign": { "value": 350, "unit": "C" },
                "temperatureOperating": { "value": 300, "unit": "C" },
                "flowRateDesign": { "value": 2500, "unit": "m3/h" },
                "flowRateOperating": { "value": 2000, "unit": "m3/h" }
            };
            card.specifications = {
                "heatTransferArea": { "value": 450, "unit": "m2" },
                "duty": { "value": 25000, "unit": "kW" }
            };
            card.design = {
                "weight": { "value": 8500, "unit": "kg" },
                "length": { "value": 4500, "unit": "mm" },
                "width": { "value": 1800, "unit": "mm" },
                "height": { "value": 2200, "unit": "mm" }
            };

            if (t === "Plate Heat Exchanger") {
                 card.materials = {
                    "plates": "Titanium Grade 2",
                    "gaskets": "EPDM Rubber",
                    "frame": "Carbon Steel ASTM A516",
                    "bolting": "High Tensile Steel ASTM A193 B7"
                 };
            } else {
                card.materials = {
                    "shell": "ASTM A516 Gr. 70",
                    "tubes": "ASTM A213 TP316L",
                    "tubesheet": "ASTM A266 Cl. 2",
                    "baffles": "Stainless Steel 316L"
                };
            }
            card.nozzles = [
                { "id": "N1", "name": "Hot In", "service": "Process Inlet", "size": "DN200", "rating": "PN40", "facing": "RF" },
                { "id": "N2", "name": "Hot Out", "service": "Process Outlet", "size": "DN200", "rating": "PN40", "facing": "RF" },
                { "id": "N3", "name": "Cold In", "service": "Utility Inlet", "size": "DN200", "rating": "PN40", "facing": "RF" },
                { "id": "N4", "name": "Cold Out", "service": "Utility Outlet", "size": "DN200", "rating": "PN40", "facing": "RF" }
            ];
            card.standards = ["ASME VIII Div 1", "TEMA R"];
            card.image_prompt = `3D model of ${t}.`;
        } else {
            // Fallback for static process vessels like Stripper Column, Splitter Column, Reformer Reactor, Alkylation Reactor, Coker Drum, Desalter Vessel
            card.componentClass = "ProcessVessel";
            card.dexpiType = "Vessel";
            card.operatingConditions = {
                "pressureMax": { "value": 25, "unit": "bar", "source": "ASME VIII" },
                "pressureMin": { "value": 1, "unit": "bar" },
                "pressureDesign": { "value": 20, "unit": "bar" },
                "pressureOperating": { "value": 12, "unit": "bar" },
                "temperatureMax": { "value": 250, "unit": "C" },
                "temperatureMin": { "value": -10, "unit": "C" },
                "temperatureDesign": { "value": 220, "unit": "C" },
                "temperatureOperating": { "value": 180, "unit": "C" },
                "flowRateDesign": { "value": 500, "unit": "m3/h" },
                "flowRateOperating": { "value": 450, "unit": "m3/h" }
            };
            card.specifications = {
                "volume": { "value": 150, "unit": "m3" }
            };
            card.design = {
                "weight": { "value": 25000, "unit": "kg" },
                "length": { "value": 8000, "unit": "mm" },
                "width": { "value": 3000, "unit": "mm" },
                "height": { "value": 4000, "unit": "mm" }
            };
            card.materials = {
                "shell": "ASTM A516 Gr. 70",
                "heads": "ASTM A516 Gr. 70",
                "internals": "Stainless Steel 316L",
                "supports": "ASTM A36 Carbon Steel"
            };
            card.nozzles = [
                { "id": "N1", "name": "Inlet", "service": "Process Inlet", "size": "DN200", "rating": "PN16", "facing": "RF" },
                { "id": "N2", "name": "Vapor Outlet", "service": "Process Outlet", "size": "DN200", "rating": "PN16", "facing": "RF" },
                { "id": "N3", "name": "Liquid Outlet", "service": "Process Outlet", "size": "DN150", "rating": "PN16", "facing": "RF" },
                { "id": "M1", "name": "Manway", "service": "Access", "size": "DN600", "rating": "PN16", "facing": "RF" }
            ];
            card.standards = ["ASME VIII Div 1"];
            card.image_prompt = `3D model of ${t}.`;
        }

        cards.push(card);
    }

    return cards;
}

// Execute if run directly
if (require.main === module) {
    const cards = generateAllCards();
    const outputDir = path.join(__dirname, '../src/lib/resources');

    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'dexpi-equipment-cards.json');
    fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2) + "\n");
    console.log(`Successfully generated ${cards.length} equipment cards at: ${outputPath}`);
}
