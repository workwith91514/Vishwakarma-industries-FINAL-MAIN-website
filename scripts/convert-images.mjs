// One-time script to convert remaining non-webp images to webp
// Run with: node scripts/convert-images.mjs

import sharp from 'sharp';
import { existsSync } from 'fs';
import { resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = resolve(__dirname, '../src/assets');

// List of images to convert (path relative to src/assets)
const toConvert = [
  // About page images
  'About001.png',
  'Malaram.jpeg',
  'GlobalReach.jpg',
  'SustainableGrowth.jpg',
  'BuyersSatisfaction.jpg',
  'UnmatchDeatail.jpg',
  'Homexyz.jpg',
  // Product images (old jpgs still referenced)
  'products/55.jpeg',
  'products/44.jpeg',
  'products/66.jpeg',
  'products/77.jpeg',
  'products/88.jpeg',
  'products/99.jpeg',
  'products/22.jpeg',
];

let converted = 0;
let skipped = 0;
let failed = 0;

for (const rel of toConvert) {
  const srcPath = resolve(assetsDir, rel);
  const ext = extname(rel);
  const outPath = srcPath.replace(ext, '.webp');

  if (!existsSync(srcPath)) {
    console.warn(`⚠️  Not found, skipping: ${rel}`);
    skipped++;
    continue;
  }

  if (existsSync(outPath)) {
    console.log(`✅ Already exists: ${basename(outPath)}`);
    skipped++;
    continue;
  }

  try {
    const info = await sharp(srcPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(outPath);

    const srcSizeMB = (existsSync(srcPath) ? (await import('fs')).statSync(srcPath).size : 0) / 1024 / 1024;
    const outSizeKB = info.size / 1024;
    console.log(`🔄 ${basename(rel)} → ${basename(outPath)} (${outSizeKB.toFixed(0)} KB, was ~${(srcSizeMB * 1024).toFixed(0)} KB)`);
    converted++;
  } catch (err) {
    console.error(`❌ Failed: ${rel} — ${err.message}`);
    failed++;
  }
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped, ${failed} failed.`);
