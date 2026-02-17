import { getAgent } from '../src/lib/agents/agent';

async function main() {
    if (!process.env.OPENROUTER_API_KEY) {
        console.log("OPENROUTER_API_KEY is not set. Skipping real API call.");
        console.log("Please set OPENROUTER_API_KEY in .env or environment variables to run this script fully.");
        return;
    }

    const agent = getAgent();

    // Mock Reference Equipment
    const referenceEquipment = {
        "tag": "P-101A",
        "componentClass": "CentrifugalPump",
        "componentClassURI": "http://posccaesar.org/rdl/RDS321456",
        "displayName": "Boiler Feed Pump",
        "description": "Boiler Feed Pump for Combined Cycle Power Plant",
        "specifications": {
            "flowRate": "500 m3/h",
            "head": "1200 m",
            "temperature": "140 C",
            "pressure": "150 bar",
            "fluid": "Boiler Feed Water",
            "standard": "API 610"
        }
    };

    console.log("Finding vendor variations for:", referenceEquipment.displayName);

    try {
        const variations = await agent.findVendorVariations(referenceEquipment);
        console.log("---------------------------------------------------");
        console.log(JSON.stringify(variations, null, 2));
        console.log("---------------------------------------------------");
    } catch (error) {
        console.error("Error finding vendor variations:", error);
    }
}

main();
