/**
 * Portable checks for broken assets, duplicate project IDs, and stale code previews.
 * Run: node scripts/check-portfolio.mjs
 * These verify content integrity; browser/device and Arduino hardware tests are separate.
 */
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const dataSource = await readFile(new URL("content.js", root), "utf8");
const context = { window: {} };
vm.runInNewContext(dataSource, context);
const data = context.window.PORTFOLIO_DATA;

assert.ok(data?.name, "Personal information must include a name.");
assert.ok(Array.isArray(data.projects), "Projects must be an array.");
assert.ok(Array.isArray(data.focus), "Skills must be an array.");

/** Match case explicitly: Windows can hide a filename mismatch that breaks on hosting. */
async function checkAsset(relativePath) {
  if (!relativePath || /^https?:\/\//i.test(relativePath)) return;
  assert.ok(!relativePath.includes(".."), `Asset must stay inside the portfolio: ${relativePath}`);

  let directory = root;
  const parts = relativePath.split("/");

  for (const [index, part] of parts.entries()) {
    const entries = await readdir(directory);
    assert.ok(entries.includes(part), `Missing asset or incorrect filename case: ${relativePath}`);
    directory = new URL(
      encodeURIComponent(part) + (index < parts.length - 1 ? "/" : ""),
      directory,
    );
  }
}

/** Public social/project destinations must be complete HTTP or HTTPS addresses. */
function checkWebsite(value) {
  if (!value) return;
  const url = new URL(value);
  assert.ok(["https:", "http:"].includes(url.protocol), `Unsupported website URL: ${value}`);
}

await checkAsset(data.profileImage);
await checkAsset(data.resume);
checkWebsite(data.github);
checkWebsite(data.linkedin);

const projectIds = new Set();
for (const project of data.projects) {
  assert.ok(
    project.id && !projectIds.has(project.id),
    `Duplicate or missing project id: ${project.id}`,
  );
  projectIds.add(project.id);
  assert.ok(
    project.title && project.imageAlt,
    `Missing project title or image description: ${project.id}`,
  );
  assert.ok(
    Array.isArray(project.details) && Array.isArray(project.stack),
    `Missing project lists: ${project.id}`,
  );
  await checkAsset(project.image);
  await checkAsset(project.sourceCode);
  await checkAsset(project.sourceDownload);
  checkWebsite(project.link);
}

// Decode only the entities used by the preview generator and compare with the real sketch.
const viewerUrl = new URL("projects/robotic-arm/index.html", root);
const viewer = await readFile(viewerUrl, "utf8");
const match = viewer.match(
  /<pre\b[^>]*class="source-code"[^>]*>\s*<code>([\s\S]*?)<\/code>\s*<\/pre>/,
);
assert.ok(match, "The source viewer must contain its code block.");
const displayedCode = match[1]
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&amp;/g, "&");
const sketch = await readFile(new URL("ROBOTIC_ARM_COLOR_SORTING.ino", viewerUrl), "utf8");
assert.equal(
  displayedCode.replace(/\r\n/g, "\n"),
  sketch.replace(/\r\n/g, "\n"),
  "Source viewer is stale. Run node scripts/update-source-preview.mjs.",
);

console.log(
  `Passed: ${data.projects.length} projects, local assets, website URLs, and source preview.`,
);
console.log(`Checked ${fileURLToPath(root)}`);
