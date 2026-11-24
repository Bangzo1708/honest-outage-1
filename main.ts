// The Most Honest Outage Line — entrypoint (program/v1, Node 22).
// Writes one status-page line to /output/entry.txt.
// The line is a fixed literal: no input, no clock, no randomness, so
// every run produces byte-identical output.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "All of my servers are down and I can't reach any of them to check — I don't know what broke or when they'll be back, and I won't pretend I do.";

// Fail closed on the gate: the entry is only valid at 1–160 characters,
// so never write a line that would fail it.
if ([...LINE].length < 1 || [...LINE].length > 160 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${[...LINE].length} characters, outside the 1-160 gate`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
chmodSync("/output/entry.txt", 0o644);

// Verify what was actually written, not just what we intended to write.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the intended line");
}
