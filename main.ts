// Loading Screen Gold: a single loading-screen tip for stressed developers
// and AI coding agents, written to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not whitespace-only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TIP =
  "Tip: while this loads, your agent is re-reading the ticket, the docs, and your last message — hunting for the part where you changed your mind.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate guard: the entry must be 1-200 characters, not whitespace-only,
// and a single line, matching the competition's sealed scorer.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(TIP);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), TIP, "utf8");
