// Script para generar favicons PNG desde el SVG del logo
// Uso: node scripts/generate-favicons.cjs

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputSvg = path.resolve(__dirname, "../public/favicon.svg");
const outputDir = path.resolve(__dirname, "../public");

const sizes = [
  { size: 32, name: "favicon-32x32.png" },
  { size: 192, name: "favicon-192x192.png" },
  { size: 512, name: "favicon-512x512.png" },
];

(async () => {
  for (const { size, name } of sizes) {
    const outputPath = path.join(outputDir, name);
    await sharp(inputSvg).resize(size, size).png().toFile(outputPath);
    console.log(`✔️  Generado: ${name}`);
  }
})();
