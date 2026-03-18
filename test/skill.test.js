import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";

test("SKILL.md should follow Agent Skills open standard", () => {
  const content = fs.readFileSync("SKILL.md", "utf8");
  const lines = content.split("\n");

  // Check frontmatter
  assert.strictEqual(lines[0].trim(), "---", "Frontmatter should start with ---");

  let endFrontmatterIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      endFrontmatterIndex = i;
      break;
    }
  }

  assert.ok(endFrontmatterIndex > 0, "Frontmatter should end with ---");

  const frontmatter = lines.slice(1, endFrontmatterIndex).join("\n");

  assert.ok(frontmatter.includes("name:"), "Frontmatter should include name:");
  assert.ok(frontmatter.includes("description:"), "Frontmatter should include description:");

  const nameMatch = frontmatter.match(/name:\s*(.+)/);
  const descMatch = frontmatter.match(/description:\s*(.+)/);

  assert.ok(nameMatch && nameMatch[1].trim(), "name should not be empty");
  assert.ok(descMatch && descMatch[1].trim(), "description should not be empty");
});
