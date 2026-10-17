"use server";

import fs from 'fs/promises';
import path from 'path';

export async function saveProfileImage(base64Data: string) {
  try {
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });

    const jpgPath = path.join(publicDir, 'christian-christensen.jpg');
    const pngPath = path.join(publicDir, 'christian-christensen.png');

    await fs.writeFile(jpgPath, buffer);
    await fs.writeFile(pngPath, buffer);

    const timestamp = Date.now();
    return {
      success: true,
      url: `/christian-christensen.jpg?v=${timestamp}`
    };
  } catch (error: any) {
    console.error('Fejl ved gemning af profilbillede:', error);
    return { success: false, error: error.message };
  }
}
