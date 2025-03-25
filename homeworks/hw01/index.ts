

const instructionsFile = Bun.file("instrukce.txt");
if (!(await instructionsFile.exists())) {
  console.error("Soubor instrukce.txt neexistuje");
  process.exit(1);
}

const instructions = await instructionsFile.text();
const [src, dst] = instructions.split(" ");

if (!src || !dst) {
  console.error("Soubor instrukce.txt je ve špatném formátu");
  process.exit(1);
}

const srcFile = Bun.file(src);
if (!(await srcFile.exists())) {
  console.error(`Soubor ${src} neexistuje`);
  process.exit(1);
}

const dstFile = Bun.file(dst);
await Bun.write(dstFile, await srcFile.text());

console.log("Soubor byl úspěšně zkopírován");
