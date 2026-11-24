// Two Days of Quiet Dread — make.fun entry
// Writes a single-line code review comment that approves a pull request
// while carrying quiet existential dread, to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). Deterministic: same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "LGTM. This code will outlive us all, and honestly, good for it.";

// Kit gate: 1–140 characters, not only whitespace, exactly one line.
function validateEntry(text: string): void {
  const length = [...text].length; // code points, not UTF-16 code units
  if (length < 1 || length > 140) {
    throw new Error(
      `entry must be 1-140 characters, got ${length}`
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validateEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
