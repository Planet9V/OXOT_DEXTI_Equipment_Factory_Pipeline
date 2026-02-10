import { NextResponse } from 'next/server';
import * as storage from '@/lib/storage';

export async function GET() {
  try {
    const tree = await storage.getDirectoryTree();
    return NextResponse.json({ success: true, data: tree, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
