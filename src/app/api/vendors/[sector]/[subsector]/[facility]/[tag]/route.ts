import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import * as storage from '@/lib/storage';
import { VendorVariation } from '@/lib/types';

type Params = { params: Promise<{ sector: string; subsector: string; facility: string; tag: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { sector, subsector, facility, tag } = await params;
  try {
    const variations = await storage.listVendorVariations(sector, subsector, facility, tag);
    return NextResponse.json({ success: true, data: variations, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const { sector, subsector, facility, tag } = await params;
  try {
    const body = await req.json();
    const variation: VendorVariation = {
      id: crypto.randomUUID(),
      baseEquipmentId: tag,
      manufacturer: body.manufacturer,
      model: body.model,
      partNumber: body.partNumber,
      catalogUrl: body.catalogUrl,
      specifications: body.specifications || {},
      differentials: body.differentials || [],
      metadata: { version: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    };
    if (!variation.manufacturer || !variation.model) {
      return NextResponse.json({ success: false, error: 'manufacturer and model required', timestamp: new Date().toISOString() }, { status: 400 });
    }
    await storage.saveVendorVariation(sector, subsector, facility, tag, variation);
    return NextResponse.json({ success: true, data: variation, timestamp: new Date().toISOString() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
