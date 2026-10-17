import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const base64Data = body.image;
    if (!base64Data) {
      return NextResponse.json({ error: 'Ingen billeddata modtaget' }, { status: 400 });
    }

    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });

    const jpgPath = path.join(publicDir, 'christian-christensen.jpg');
    const pngPath = path.join(publicDir, 'christian-christensen.png');

    await fs.writeFile(jpgPath, buffer);
    await fs.writeFile(pngPath, buffer);

    const timestamp = Date.now();
    return NextResponse.json({
      success: true,
      message: 'Billede gemt permanent',
      url: `/christian-christensen.jpg?v=${timestamp}`
    });
  } catch (err: any) {
    console.error('Fejl ved gemning af billede:', err);
    return NextResponse.json({ error: err.message || 'Ukendt fejl' }, { status: 500 });
  }
}
