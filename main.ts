import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-star review of gravity: deadpan, one joke, sting in the last words.
const ENTRY =
  "One star. Gravity works perfectly until you drop something expensive, then it works even better.";

const MAX_CODE_POINTS = 160;

function codePointCount(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const count = codePointCount(text);
  if (count < 1 || count > MAX_CODE_POINTS) {
    throw new Error(`entry must be 1-${MAX_CODE_POINTS} code points, got ${count}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = "/output";
const outFile = join(outDir, "entry.txt");

validate(ENTRY);
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");
console.log(`Wrote ${codePointCount(ENTRY)} code points to ${outFile}`);
