import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const line = "A slightly burnt grilled cheese eaten on the kitchen floor at 2 AM after moving into my first apartment with nothing else unpacked.";
if (Array.from(line).length < 1 || Array.from(line).length > 200 || /[\r\n]/.test(line)) {
  throw new Error("Entry must be a single line of 1 to 200 characters");
}

const outputDirectory = fileURLToPath(new URL("/output/", import.meta.url));
const outputFile = fileURLToPath(new URL("entry.txt", new URL("/output/", import.meta.url)));
const expected = Buffer.from(`${line}\n`, "utf8");

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputFile, expected);
if (!readFileSync(outputFile).equals(expected)) {
  throw new Error("Output does not match the expected bytes");
}
