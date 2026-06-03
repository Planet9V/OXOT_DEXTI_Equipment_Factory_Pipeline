const fs = require('fs');

const registryData = JSON.parse(fs.readFileSync('src/lib/resources/oil_gas_registry.json', 'utf-8'));
const items = registryData.equipment;

const generatedCards = items.map((item, index) => {
    const type = item.type;
    const tag = `Generic-OG-${String(index + 1).padStart(3, '0')}`;
    let rdlUri = "http://posccaesar.org/rdl/RDS" + (10000 + index);

    let base = {
        tag: tag,
        name: type,
        componentClass: item.category || "General",
        dexpiType: type.replace(/[^a-zA-Z]/g, ''),
        rdlUri: rdlUri,
        description: `Reference unit for ${type} in typical Oil & Gas service.`,
        operatingConditions: {},
        specifications: {},
        design: {},
        materials: {},
        nozzles: [],
        standards: [],
        image_prompt: `Detailed industrial 3D model of a ${type}, high resolution, engineering accuracy, white background.`
    };

    const setCond = (pMax, pDes, pOp, tMax, tDes, tOp, fDes, fOp) => {
        base.operatingConditions = {
            pressureMax: { value: pMax, unit: "bar", source: "API/ASME" },
            pressureMin: { value: 0, unit: "bar" },
            pressureDesign: { value: pDes, unit: "bar" },
            pressureOperating: { value: pOp, unit: "bar" },
            temperatureMax: { value: tMax, unit: "C" },
            temperatureMin: { value: -20, unit: "C" },
            temperatureDesign: { value: tDes, unit: "C" },
            temperatureOperating: { value: tOp, unit: "C" }
        };
        if (fDes !== null) {
            base.operatingConditions.flowRateDesign = { value: fDes, unit: "m3/h" };
            base.operatingConditions.flowRateOperating = { value: fOp, unit: "m3/h" };
        }
    };

    const setDes = (w, l, wd, h) => {
        base.design = {
            weight: { value: w, unit: "kg" },
            length: { value: l, unit: "mm" },
            width: { value: wd, unit: "mm" },
            height: { value: h, unit: "mm" }
        };
    };

    if (type.includes("Column") || type.includes("Stripper") || type.includes("Splitter")) {
        setCond(5.5, 4.5, 3.0, 400, 380, 350, 2500, 2000);
        setDes(150000, 45000, 4000, 45000);
        base.specifications = { theoreticalTrays: { value: 45, unit: "ea" } };
        base.materials = { shell: "ASTM A516 Gr. 70", trays: "ASTM A240 Type 410", internals: "SS 316L", insulation: "Mineral Wool" };
        base.nozzles = [
            { id: "N1", name: "Feed", service: "Feed", size: "DN400", rating: "PN16", facing: "RF", position: "Side" },
            { id: "N2", name: "Overhead", service: "Vapor Outlet", size: "DN600", rating: "PN16", facing: "RF", position: "Top" },
            { id: "N3", name: "Bottoms", service: "Residue Outlet", size: "DN300", rating: "PN16", facing: "RF", position: "Bottom" }
        ];
        base.standards = ["ASME Sec VIII Div 1"];
    } else if (type.includes("Reactor") || type.includes("Drum")) {
        setCond(6.0, 5.0, 3.5, 750, 720, 690, 3000, 2500);
        setDes(400000, 50000, 10000, 50000);
        base.specifications = { capacity: { value: 100000, unit: "bpd" } };
        base.materials = { shell: "ASTM A387 Gr. 22", refractory: "Hexmesh Castable", internals: "Inconel 625" };
        base.nozzles = [
            { id: "N1", name: "Feed", service: "Feed", size: "DN600", rating: "PN40", facing: "RTJ", position: "Bottom" },
            { id: "N2", name: "VaporOut", service: "Effluent", size: "DN1000", rating: "PN40", facing: "RTJ", position: "Top" }
        ];
        base.standards = ["ASME Sec VIII Div 2"];
    } else if (type.includes("Heater") || type.includes("Boiler") || type.includes("Flare")) {
        setCond(40, 35, 25, 600, 550, 450, null, null);
        setDes(150000, 20000, 15000, 30000);
        base.specifications = { duty: { value: 50, unit: "MW" } };
        base.materials = { tubes: "ASTM A335 P9", casing: "Carbon Steel", refractory: "Ceramic Fiber" };
        base.nozzles = [
            { id: "N1", name: "Inlet", service: "Inlet", size: "DN250", rating: "Class 600", facing: "RF", position: "Bottom" },
            { id: "N2", name: "Outlet", service: "Outlet", size: "DN300", rating: "Class 600", facing: "RF", position: "Top" }
        ];
        base.standards = ["API 560"];
    } else if (type.includes("Exchanger") || type.includes("Cooler") || type.includes("Reboiler") || type.includes("Desalter")) {
        setCond(45, 40, 30, 250, 220, 180, 2500, 2000);
        setDes(12000, 6000, 1200, 1500);
        base.specifications = { surfaceArea: { value: 800, unit: "m2" } };
        base.materials = { shell: "ASTM A516 Gr. 70", tubes: "ASTM A213 TP316L", tubesheet: "ASTM A105", baffles: "ASTM A240" };
        base.nozzles = [
            { id: "N1", name: "ShellIn", service: "Hot Fluid In", size: "DN200", rating: "Class 300", facing: "RF", position: "Top" },
            { id: "N2", name: "ShellOut", service: "Hot Fluid Out", size: "DN200", rating: "Class 300", facing: "RF", position: "Bottom" }
        ];
        base.standards = ["TEMA R"];
    } else if (type.includes("Pump")) {
        setCond(60, 50, 40, 150, 130, 90, 500, 450);
        base.specifications = { power: { value: 150, unit: "kW" }, rotationalSpeed: { value: 2950, unit: "rpm" }, head: { value: 120, unit: "m" } };
        setDes(2500, 1800, 800, 1000);
        base.materials = { casing: "ASTM A216 WCB", impeller: "ASTM A351 CF8M", shaft: "ASTM A276 Type 410", seals: "Tungsten Carbide", baseplate: "Carbon Steel" };
        base.nozzles = [
            { id: "N1", name: "Suction", service: "Process Inlet", size: "DN150", rating: "Class 300", facing: "RF", position: "End" },
            { id: "N2", name: "Discharge", service: "Process Outlet", size: "DN100", rating: "Class 300", facing: "RF", position: "Top" }
        ];
        base.standards = ["API 610"];
    } else if (type.includes("Compressor") || type.includes("Turbine")) {
        setCond(40, 35, 25, 200, 180, 150, 3000, 2500);
        base.specifications = { power: { value: 2000, unit: "kW" }, rotationalSpeed: { value: 10000, unit: "rpm" } };
        setDes(15000, 4000, 2500, 3000);
        base.materials = { casing: "ASTM A352 LCC", rotor: "AISI 4340", impellers: "17-4 PH SS", seals: "Dry Gas Seals" };
        base.nozzles = [
            { id: "N1", name: "Suction", service: "Gas Inlet", size: "DN400", rating: "Class 300", facing: "RF", position: "Side" },
            { id: "N2", name: "Discharge", service: "Gas Outlet", size: "DN300", rating: "Class 600", facing: "RF", position: "Top" }
        ];
        base.standards = ["API 617"];
    } else if (type.includes("Tank")) {
        setCond(1.5, 1.2, 1.0, 90, 80, 60, null, null);
        setDes(300000, 60000, 60000, 20000);
        base.specifications = { capacity: { value: 50000, unit: "m3" } };
        base.materials = { shell: "ASTM A36", roof: "ASTM A36", bottom: "ASTM A36", coating: "Epoxy Phenolic" };
        base.nozzles = [
            { id: "N1", name: "Inlet", service: "Product In", size: "DN600", rating: "Class 150", facing: "FF", position: "Shell" },
            { id: "N2", name: "Outlet", service: "Product Out", size: "DN600", rating: "Class 150", facing: "FF", position: "Shell" }
        ];
        base.standards = ["API 650"];
    } else if (type.includes("Valve")) {
        setCond(100, 80, 50, 300, 250, 150, null, null);
        setDes(150, 400, 250, 500);
        base.specifications = { cv: { value: 120, unit: "gpm/psi" } };
        base.materials = { body: "ASTM A216 WCB", trim: "ASTM A182 F316", stem: "ASTM A276 316", seating: "Stellite" };
        base.nozzles = [
            { id: "N1", name: "Inlet", service: "Process", size: "DN100", rating: "Class 600", facing: "RF", position: "End" },
            { id: "N2", name: "Outlet", service: "Process", size: "DN100", rating: "Class 600", facing: "RF", position: "End" }
        ];
        base.standards = ["API 6D"];
    } else if (type === "Rupture Disc") {
        setCond(100, 80, 50, 300, 250, 150, null, null);
        setDes(10, 100, 100, 50);
        base.specifications = { burstPressure: { value: 50, unit: "bar" } };
        base.materials = { disc: "Inconel 600", holder: "ASTM A182 F316" };
        base.nozzles = [
            { id: "N1", name: "Inlet", service: "Process", size: "DN100", rating: "Class 600", facing: "RF", position: "End" },
            { id: "N2", name: "Outlet", service: "Process", size: "DN100", rating: "Class 600", facing: "RF", position: "End" }
        ];
        base.standards = ["ASME Sec VIII Div 1"];
    } else if (type.includes("Meter") || type.includes("Transmitter") || type.includes("Analyzer") || type.includes("Chromatograph")) {
        setCond(50, 40, 20, 150, 120, 80, null, null);
        setDes(20, 200, 200, 300);
        base.specifications = { accuracy: { value: 0.1, unit: "%" } };
        base.materials = { body: "ASTM A351 CF8M", sensor: "Hastelloy C276", housing: "Aluminum" };
        base.nozzles = [
            { id: "N1", name: "Process", service: "Measurement", size: "DN50", rating: "Class 300", facing: "RF", position: "Inline" }
        ];
        base.standards = ["IEC 61508"];
    } else if (type.includes("Motor") || type.includes("Generator")) {
        setCond(null, null, null, 60, 50, 40, null, null);
        base.specifications = { power: { value: 1000, unit: "kW" }, rotationalSpeed: { value: 1485, unit: "rpm" } };
        setDes(1500, 1200, 1000, 1000);
        base.materials = { frame: "Cast Iron", winding: "Copper", insulation: "Class F", shaft: "Carbon Steel" };
        base.nozzles = [
            { id: "N1", name: "AirInlet", service: "Cooling Air", size: "Louvers", rating: "N/A", facing: "N/A", position: "Side" }
        ];
        base.standards = ["IEC 60034"];
    } else if (type.includes("Switchgear") || type.includes("UPS") || type.includes("Drive")) {
        setCond(null, null, null, 40, 35, 30, null, null);
        base.specifications = { voltage: { value: 480, unit: "V" }, current: { value: 1200, unit: "A" } };
        setDes(800, 1200, 1000, 2200);
        base.materials = { enclosure: "NEMA 12 Steel", busbars: "Copper", contacts: "Silver Alloy" };
        base.nozzles = [
            { id: "N1", name: "CableEntry", service: "Power", size: "Conduit", rating: "N/A", facing: "N/A", position: "Bottom" }
        ];
        base.standards = ["IEC 61439"];
    } else if (type.includes("Strainer")) {
        setCond(50, 40, 20, 150, 120, 80, null, null);
        setDes(100, 500, 500, 800);
        base.specifications = { meshSize: { value: 40, unit: "mesh" } };
        base.materials = { body: "ASTM A216 WCB", basket: "SS 316", gasket: "Spiral Wound" };
        base.nozzles = [
            { id: "N1", name: "Inlet", service: "Process", size: "DN150", rating: "Class 300", facing: "RF", position: "End" },
            { id: "N2", name: "Outlet", service: "Process", size: "DN150", rating: "Class 300", facing: "RF", position: "End" }
        ];
        base.standards = ["ASME B16.34"];
    } else {
        setCond(20, 15, 10, 200, 180, 150, 500, 400);
        base.specifications = { customParam: { value: 1, unit: "unit" } };
        setDes(5000, 2000, 1500, 4000);
        base.materials = { shell: "ASTM A516 Gr. 70", internals: "SS 304L", supports: "Carbon Steel" };
        base.nozzles = [
            { id: "N1", name: "Inlet", service: "Process", size: "DN150", rating: "Class 150", facing: "RF", position: "Top" },
            { id: "N2", name: "Outlet", service: "Process", size: "DN150", rating: "Class 150", facing: "RF", position: "Bottom" }
        ];
        base.standards = ["ASME Sec VIII Div 1"];
    }

    if (base.operatingConditions.pressureMax && base.operatingConditions.pressureMax.value === null) delete base.operatingConditions;

    return base;
});

fs.writeFileSync('src/lib/resources/engineer_equipment_cards.json', JSON.stringify(generatedCards, null, 2));
