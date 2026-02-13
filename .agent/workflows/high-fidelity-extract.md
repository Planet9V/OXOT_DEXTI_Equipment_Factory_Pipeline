---
description: High-Fidelity Document Intel Extraction (10/10 Quality)
---

# /high-fidelity-extract

Use this workflow for "10/10" high-resolution, multi-pass conversion of complex PDFs, infographics, and technical drawings to Markdown.

## Protocol: Logic-First Document Processor (LFDP)

Follow these steps exactly to ensure zero data loss and structural integrity.

### 1. Structural Scan (Pass 1)
Identify page counts and all "High-Value Objects" (tables, diagrams, charts). Note them in a "Topology Report".

### 2. Narrative Baseline (Pass 2)
Extract the primary text. Maintain heading hierarchy. 
- **Rule**: If an image is identified as an infographic, do NOT summarize it yet. Replace it with a placeholder like `<!-- INFOGRAPHIC_01_DEEP_SCAN_REQUIRED -->`.

### 3. Tabular Reconstruction (Pass 3)
Reconstruct all tables using Markdown formatting.
- **Merge Logic**: For merged cells, repeat the header value or use `^` to indicate a merge to the previous row.
- **Verification**: Cross-reference 3 random numeric values from each table against the source.

### 4. Diagram & Infographic Decomposition (Pass 4)
For each placeholder created in Step 2:
- **Diagrams**: Convert to Mermaid.js code.
- **Charts**: Extract raw data points into a Markdown table.
- **Schematics**: Describe connections and signal flows (e.g., `[Sensor A] -> (Analog Signal) -> [PLC Input 4]`).

### 5. Gap Analysis Audit (Pass 5)
Perform a final audit. Compare the source document to the Markdown output side-by-side.
- **Audit Checklist**:
    - [ ] Are all footnote references captured?
    - [ ] Do units (e.g., `m³/h`) match exactly?
    - [ ] Is the logic of the diagrams preserved?
    - [ ] Are all small-print legends extracted?

## Reporting Format
Every high-fidelity extraction must end with a **Quality Report**:
- **Objects Scanned**: [Count]
- **Tables Reconstructed**: [Count]
- **Diagrams Mermaided**: [Count]
- **Gap Analysis Result**: [Details of any unavoidable simplifications]
