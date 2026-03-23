import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, 'src/assets/profile-picture.jpg');

async function main() {
  // 1. Generate a 32x32 PNG from profile picture
  const smallPng = await sharp(inputPath)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toBuffer();
  const base64 = smallPng.toString('base64');

  // 2. Create SVG with circular clip and embedded image
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <clipPath id="circle">
      <circle cx="16" cy="16" r="16"/>
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${base64}" x="0" y="0" width="32" height="32" clip-path="url(#circle)"/>
</svg>`;
  fs.writeFileSync(path.join(__dirname, 'public/favicon.svg'), svg);
  console.log('Created favicon.svg (32x32 circular)');

  // 3. Generate circular PNG and save as .ico (modern browsers accept PNG as ICO)
  const circleSvg = Buffer.from(
    `<svg width="32" height="32"><circle cx="16" cy="16" r="16" fill="white"/></svg>`
  );
  const circularPng = await sharp(inputPath)
    .resize(32, 32, { fit: 'cover' })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(__dirname, 'public/favicon.ico'), circularPng);
  console.log('Created favicon.ico (32x32 circular PNG)');

  // 4. Also create a 180x180 for apple-touch-icon
  const appleTouchCircle = Buffer.from(
    `<svg width="180" height="180"><circle cx="90" cy="90" r="90" fill="white"/></svg>`
  );
  const applePng = await sharp(inputPath)
    .resize(180, 180, { fit: 'cover' })
    .composite([{ input: appleTouchCircle, blend: 'dest-in' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(__dirname, 'public/favicon.png'), applePng);
  console.log('Created favicon.png (180x180 circular)');
}

main().catch(e => { console.error(e); process.exit(1); });
