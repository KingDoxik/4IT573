const instructionsFile = Bun.file("instrukce.txt");
if (!(await instructionsFile.exists())) {
  console.error("Soubor instrukce.txt neexistuje");
  process.exit(1);
}

const instructions = await instructionsFile.text();

// Počet souborů
const numOfFiles = parseInt(instructions);
if (isNaN(numOfFiles)) {
  console.error("Počet souborů není číslo");
  process.exit(1);
}

// Vytvoření souborů
const createFile = async (number: number) => {
  const file = Bun.file(`${number}.txt`);
  await Bun.write(file, `Soubor ${number}`);
};

await Promise.all(Array.from({ length: numOfFiles }, (_, i) => createFile(i)));
console.log(`Vytvořeno ${numOfFiles} souborů`);
