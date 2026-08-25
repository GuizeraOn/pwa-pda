const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate valid SVG icon
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="120" fill="#567856"/>
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8A84F"/>
      <stop offset="100%" stop-color="#B87823"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.25"/>
    </filter>
  </defs>
  <!-- Decorative Ring -->
  <circle cx="256" cy="256" r="180" fill="none" stroke="#F4EFE6" stroke-width="6" opacity="0.2"/>
  <!-- Bottle / Droplet Emblem -->
  <g filter="url(#shadow)">
    <path d="M256 95 C256 95 155 230 155 325 C155 381 200 425 256 425 C312 425 357 381 357 325 C357 230 256 95 256 95 Z" fill="url(#grad)"/>
    <path d="M256 160 C256 160 190 255 190 320 C190 357 220 387 256 387 C292 387 322 357 322 320 C322 255 256 160 256 160 Z" fill="#F4EFE6" opacity="0.95"/>
    <!-- Herbal Leaf interior line -->
    <path d="M256 210 Q285 270 270 340" stroke="#567856" stroke-width="14" stroke-linecap="round" fill="none"/>
    <path d="M256 255 Q230 285 230 310" stroke="#567856" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M260 285 Q285 305 285 320" stroke="#567856" stroke-width="9" stroke-linecap="round" fill="none"/>
    <circle cx="256" cy="80" r="22" fill="#E8A84F"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svg);

// Generate simple valid transparent/colored PNG placeholders using pure Node buffer if needed,
// or convert via canvas / svg if available
// Let's generate a minimal valid 1x1 PNG or valid PNG chunks for 192 and 512 so browsers have real PNGs
// We can use a pure JS PNG generator helper:
function createSolidPng(size, r, g, b, a = 255) {
  const zlib = require('zlib');
  const width = size;
  const height = size;
  
  // PNG signature
  const signature = Buffer.from([138, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8 bit depth
  ihdrData.writeUInt8(6, 9); // RGBA color type
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  // Raw image data with scanline filter bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      // Draw rounded rect border / green background
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const isInside = dist < width * 0.46;
      const isCore = dist < width * 0.28;
      
      if (isCore) {
        // Gold #E8A84F
        rawData[pxOffset] = 232;
        rawData[pxOffset + 1] = 168;
        rawData[pxOffset + 2] = 79;
        rawData[pxOffset + 3] = 255;
      } else if (isInside) {
        // Deep Green #567856
        rawData[pxOffset] = 86;
        rawData[pxOffset + 1] = 120;
        rawData[pxOffset + 2] = 86;
        rawData[pxOffset + 3] = 255;
      } else {
        // Soft outer #567856
        rawData[pxOffset] = 86;
        rawData[pxOffset + 1] = 120;
        rawData[pxOffset + 2] = 86;
        rawData[pxOffset + 3] = 255;
      }
    }
  }
  
  const idatData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', idatData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(12 + length);
  chunk.writeUInt32BE(length, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  
  // CRC calculation
  const crc = crc32(chunk.subarray(4, 8 + length));
  chunk.writeUInt32BE(crc >>> 0, 8 + length);
  return chunk;
}

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

const png192 = createSolidPng(192, 86, 120, 86);
const png512 = createSolidPng(512, 86, 120, 86);

fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), png192);
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), png512);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), png192);
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), png192);

console.log('Icons generated successfully: icon-192.png, icon-512.png, icon.svg, apple-touch-icon.png');
