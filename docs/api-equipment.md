# Equipment API

[← Back to Index](./index.md)

> Equipment CRUD, search, export, standalone management, and facility assignment.

---

## Equipment Data Model

Every equipment card follows the `EquipmentCard` interface:

```typescript
{
  id: string;              // UUID
  tag: string;             // ISA-5.1 tag (e.g., "P-1001")
  componentClass: string;  // DEXPI class (e.g., "CentrifugalPump")
  componentClassURI: string; // PCA RDL URI
  displayName: string;     // Human-readable name
  category: string;        // rotating | static | heat-transfer | ...
  description: string;     // ≥50 character description
  sector: string;
  subSector: string;
  facility: string;        // Optional for standalone
  specifications: Record<string, { value: number, unit: string }>;
  operatingConditions: {
    designPressure?: number;
    operatingPressure?: number;
    designTemperature?: number;
    operatingTemperature?: number;
    flowRate?: number;
    units?: Record<string, string>;
  };
  materials: { body?: string; internals?: string; gaskets?: string; bolting?: string };
  standards: string[];     // ["API 610", "ASME B73.1"]
  manufacturers: string[];
  nozzles: NozzleSpec[];
  metadata: {
    version: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    contentHash: string;
    validationScore: number;
    source: "manual" | "ai-generated" | "imported" | "vendor" | "dexpi-verified";
  };
}
```

---

## Standalone Equipment

### `POST /api/equipment/standalone`

Create equipment not tied to any facility.

**Request:**
```json
{
  "tag": "P-5001",
  "componentClass": "CentrifugalPump",
  "componentClassURI": "http://data.posccaesar.org/rdl/RDS416239",
  "displayName": "Centrifugal Pump",
  "category": "rotating",
  "description": "Single-stage centrifugal pump for process fluids",
  "specifications": {
    "capacity": { "value": 500, "unit": "m³/h" },
    "head": { "value": 75, "unit": "m" }
  },
  "standards": ["API 610"],
  "manufacturers": ["Sulzer", "KSB"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": { /* full EquipmentCard */ },
  "timestamp": "2026-02-14T00:00:00.000Z"
}
```

### `GET /api/equipment/standalone`

List standalone equipment with optional filters.

| Param | Type | Description |
|-------|------|-------------|
| `search` | query | Text search on name/tag/class |
| `category` | query | Filter by category |
| `page` | query | Page number (default: 1) |
| `pageSize` | query | Items per page (default: 50) |

---

## Equipment by UUID

### `GET /api/equipment/by-id/:id`

Retrieve a single equipment card by UUID.

### `PUT /api/equipment/by-id/:id`

Update an equipment card. Send partial data — only provided fields are updated.

**Request:**
```json
{
  "description": "Updated description",
  "specifications": {
    "capacity": { "value": 600, "unit": "m³/h" }
  }
}
```

### `DELETE /api/equipment/by-id/:id`

Delete an equipment card and its child nodes (nozzles, material links, etc.).

---

## Facility Assignment

### `POST /api/equipment/by-id/:id/assign`

Assign equipment to a facility. Equipment can be assigned to multiple facilities (many-to-many).

**Request:**
```json
{ "facilityCode": "CDU" }
```

### `DELETE /api/equipment/by-id/:id/assign`

Remove equipment from a facility. Does **not** delete the equipment — only the relationship.

**Request:**
```json
{ "facilityCode": "CDU" }
```

---

## Legacy Tag-Based Access

### `GET /api/equipment/:sector/:subsector/:facility/:tag`

Retrieve equipment by its ISA tag within a facility context.

```
GET /api/equipment/CHEMICAL/REFINERY/CDU/P-1001
```

### `PUT /api/equipment/:sector/:subsector/:facility/:tag`

Update equipment by tag.

### `DELETE /api/equipment/:sector/:subsector/:facility/:tag`

Delete equipment by tag.

---

## Equipment Categories

### `GET /api/equipment/categories`

Returns the list of DEXPI equipment categories aligned to ISO 10628:

```json
{
  "data": [
    "rotating",
    "static",
    "heat-transfer",
    "instrumentation",
    "electrical",
    "piping"
  ]
}
```

---

## Equipment Search

### `GET /api/equipment/standalone` with search params

Supports faceted search across all equipment:

| Filter | Type | Example |
|--------|------|---------|
| `search` | Text | `"pump"` |
| `category` | Enum | `"rotating"` |
| `componentClass` | String | `"CentrifugalPump"` |
| `sector` | String | `"CHEMICAL"` |
| `facility` | String | `"CDU"` |

**Response includes pagination:**
```json
{
  "data": {
    "items": [ /* EquipmentCard[] */ ],
    "total": 42,
    "page": 1,
    "pageSize": 50
  }
}
```

---

## Equipment Copy

### `POST /api/equipment/copy`

Copy an equipment card to a different facility.

**Request:**
```json
{
  "sourceTag": "P-1001",
  "sourceFacility": "CDU",
  "targetFacility": "FCC"
}
```

---

## DEXPI XML Export

### `POST /api/equipment/export`

Export equipment cards as DEXPI 2.0 XML.

**Request:**
```json
{
  "facility": "CDU",
  "format": "dexpi-xml"
}
```

**Response:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<PlantModel xmlns="http://sandbox.dexpi.org/rdl/">
  <Equipment Tag="P-1001" ComponentClass="CentrifugalPump" ...>
    <Nozzle ID="N1" Size="6in" Rating="150#" />
  </Equipment>
</PlantModel>
```

---

## Vendor Variations

### `GET /api/vendors/:sector/:subsector/:facility/:tag`

List vendor-specific variations for an equipment item.

### `POST /api/vendors/:sector/:subsector/:facility/:tag`

Add a vendor variation (manufacturer-specific specs, part numbers, pricing).

---

## Related Pages

- [API Reference](./api-reference.md) — All API endpoints overview
- [External Integration](./api-external-guide.md) — External app guide
- [Graph Schema](./storage-graph-schema.md) — Database model behind Equipment
- [Pipeline Process](./pipeline-process.md) — How cards are generated
