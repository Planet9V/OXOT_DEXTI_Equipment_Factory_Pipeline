import { NextRequest, NextResponse } from 'next/server';
import * as storage from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const { source, dest } = await req.json();
    if (!source?.tag || !dest?.tag) return NextResponse.json({ success: false, error: 'source and dest with tag required', timestamp: new Date().toISOString() }, { status: 400 });
    const card = await storage.copyEquipment(source, dest);
    if (!card) return NextResponse.json({ success: false, error: 'Source equipment not found', timestamp: new Date().toISOString() }, { status: 404 });
    return NextResponse.json({ success: true, data: card, timestamp: new Date().toISOString() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
