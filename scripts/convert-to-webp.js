#!/usr/bin/env node
// Conversion ponctuelle des images lourdes de src/assets/ (.png, .jpg, .jpeg)
// vers .webp. Usage : node scripts/convert-to-webp.js
//
// Remplace aussi, dans tout le code source, les imports qui référencent
// l'ancienne extension par la nouvelle (ex: "./assets/foo.png" devient
// "./assets/foo.webp"), puis supprime les fichiers originaux une fois la
// conversion et la bascule des imports confirmées.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "src", "assets");
const SRC_DIR = path.join(ROOT, "src");
const EXTENSIONS = [".png", ".jpg", ".jpeg"];
const WEBP_QUALITY = 82; // bon compromis qualité/poids pour du contenu photo

function listSourceFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listSourceFiles(full));
    else if (/\.(js|jsx|ts|tsx|json)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function convertImages() {
  const files = fs
    .readdirSync(ASSETS_DIR)
    .filter((f) => EXTENSIONS.includes(path.extname(f).toLowerCase()));

  const converted = [];
  for (const file of files) {
    const inputPath = path.join(ASSETS_DIR, file);
    const outputPath = path.join(
      ASSETS_DIR,
      file.replace(/\.(png|jpe?g)$/i, ".webp")
    );
    const before = fs.statSync(inputPath).size;
    await sharp(inputPath).webp({ quality: WEBP_QUALITY }).toFile(outputPath);
    const after = fs.statSync(outputPath).size;
    converted.push({ file, before, after, outputPath, inputPath });
    console.log(
      `✓ ${file} -> ${path.basename(outputPath)} ` +
        `(${(before / 1024).toFixed(0)} Ko -> ${(after / 1024).toFixed(0)} Ko)`
    );
  }
  return converted;
}

function updateSourceReferences(converted) {
  const sourceFiles = listSourceFiles(SRC_DIR);
  let totalReplacements = 0;

  for (const filePath of sourceFiles) {
    let content = fs.readFileSync(filePath, "utf8");
    let fileChanged = false;

    for (const { file } of converted) {
      const oldName = file;
      const newName = file.replace(/\.(png|jpe?g)$/i, ".webp");
      // Ne remplace que le nom de fichier exact (évite de toucher un
      // autre fichier qui partagerait un préfixe de nom).
      const pattern = new RegExp(
        oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\w.-])",
        "g"
      );
      if (pattern.test(content)) {
        content = content.replace(pattern, newName);
        fileChanged = true;
        totalReplacements++;
      }
    }

    if (fileChanged) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`  → références mises à jour dans ${path.relative(ROOT, filePath)}`);
    }
  }

  return totalReplacements;
}

async function main() {
  console.log("Conversion des images de src/assets/ en .webp...\n");
  const converted = await convertImages();

  if (converted.length === 0) {
    console.log("Aucune image .png/.jpg/.jpeg trouvée dans src/assets/.");
    return;
  }

  console.log("\nMise à jour des références dans le code source...\n");
  const replacements = updateSourceReferences(converted);
  console.log(`\n${replacements} référence(s) mise(s) à jour.`);

  console.log("\nSuppression des fichiers originaux...\n");
  for (const { inputPath, file } of converted) {
    fs.unlinkSync(inputPath);
    console.log(`  ✗ supprimé : ${file}`);
  }

  const totalBefore = converted.reduce((s, c) => s + c.before, 0);
  const totalAfter = converted.reduce((s, c) => s + c.after, 0);
  console.log(
    `\nTerminé : ${converted.length} image(s) converties, ` +
      `${(totalBefore / 1024 / 1024).toFixed(2)} Mo -> ${(totalAfter / 1024 / 1024).toFixed(2)} Mo.`
  );
}

main().catch((err) => {
  console.error("Échec de la conversion :", err);
  process.exit(1);
});
