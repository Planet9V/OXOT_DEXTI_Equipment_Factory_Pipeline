import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import * as storage from '@/lib/storage';
import { EquipmentCard, EquipmentFilter } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const filter: EquipmentFilter = {
      sector: url.searchParams.get('sector') || undefined,
      subSector: url.searchParams.get('subSector') || undefined,
      facility: url.searchParams.get('facility') || undefined,
      category: (url.searchParams.get('category') as any) || undefined,
      componentClass: url.searchParams.get('componentClass') || undefined,
      searchTerm: url.searchParams.get('searchTerm') || url.searchParams.get('q') || undefined,
      source: url.searchParams.get('source') || undefined,
      minValidationScore: url.searchParams.get('minScore') ? Number(url.searchParams.get('minScore')) : undefined,
    };
    const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
    const pageSize = Math.min(parseInt(url.searchParams.get('pageSize') || '50', 10) || 50, 200);

    const result = await storage.searchEquipment(filter, page, pageSize);
    return NextResponse.json({ success: true, data: result, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const card: EquipmentCard = {
      ...body,
      id: body.id || crypto.randomUUID(),
      metadata: {
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'manual',
        contentHash: '',
        validationScore: body.metadata?.validationScore || 0,
        source: 'manual',
      },
    };
    if (!card.tag || !card.sector || !card.subSector || !card.facility) {
      return NextResponse.json({ success: false, error: 'tag, sector, subSector, and facility required', timestamp: new Date().toISOString() }, { status: 400 });
    }
    await storage.saveEquipment(card);
    return NextResponse.json({ success: true, data: card, timestamp: new Date().toISOString() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
