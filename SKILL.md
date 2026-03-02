---
name: release-publish
description: Use when preparing a release, publishing a package, bumping a version, or configuring public repository metadata. Also use when verifying a published package. Do not use for general development or non-release tasks.
---

# Release and publish workflow

## Public repository metadata

- For public repos, set GitHub Description, Topics, and Homepage.
- Ensure required repo files exist: .github/workflows/ci.yml, issue templates, PR template, SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, CHANGELOG.md.
- Configure CI to run the repo's standard lint/test/build commands.

## Versioning and release flow

- Update version metadata when release content changes; keep package version and Git tag consistent.
- Create and push a release tag; create a GitHub Release based on CHANGELOG.
- If asked to choose a version, decide it yourself.
- When bumping a version, create the GitHub Release and publish the package in the same update.
- For npm publishing in metyatech-owned packages, execute `npm publish` directly (an automation token is configured).
- For other packages, ask the user to run npm publish.
- Before publishing, run required prep commands (e.g., npm install, npm test, npm pack --dry-run) and only proceed when ready.
- If authentication fails during publish, ask the user to complete the publish step.
- Run dependency security checks before release, address critical issues, and report results.

## Post-publish verification

After publishing, update any locally installed copy to the newly published release and verify the resolved version.

- Completion gate: do not report "done" until this verification is completed (or the user explicitly declines).
- Must be expressed as explicit Acceptance Criteria and reported with outcomes (PASS/FAIL/N/A) + evidence:
  - AC1 (registry): verify the published version exists in the registry (e.g., `npm view <pkg> version`).
  - AC2 (fresh install): verify the latest package resolves and runs (e.g., `npx <pkg>@latest --version`).
  - AC3 (global update, if applicable): if the package is installed globally, update it to the published version and verify (e.g., `npm ls -g <pkg> --depth=0`, `npm i -g <pkg>@latest`, then `<cmd> --version`).
  - If AC3 is not applicable (not installed globally) or cannot be performed, mark it N/A and state the reason explicitly.
- For npm CLIs:
  - If installed globally: check `npm ls -g <pkg> --depth=0`, update via `npm i -g <pkg>@latest` (or the published dist-tag), then verify with `<pkg> --version`.
  - If not installed globally: skip the global update, and verify availability via `npx <pkg>@latest --version` (or the ecosystem-equivalent).

## Standard repository topics

Assign topics from the standard set below. Every repo must have at least one standard topic when applicable; repos that do not match any standard topic use descriptive topics relevant to their domain.

- `agent-skill`: repo contains a SKILL.md (an installable agent skill).
- `agent-tool`: CLI tool or MCP server used by agents (e.g., task-tracker, agents-mcp, compose-agentsmd).
- `agent-rule`: rule source or ruleset repository (e.g., agent-rules).
- `unreal-engine`: Unreal Engine plugin or sample project.
- `qti`: QTI assessment ecosystem tool or library.
- `education`: course content, teaching materials, or student-facing platform.
- `docusaurus`: Docusaurus plugin or extension.

Additional descriptive topics (language, framework, domain keywords) may be added freely alongside standard topics. Review and update the standard topic set when the repository landscape changes materially (new domain clusters emerge or existing ones become obsolete). Verify topics are set as part of the new-repository compliance gate.

## Published artifact requirements

- Populate package metadata (name, description, repository, issues, homepage, engines).
- Validate executable entrypoints and required shebangs so installed commands work.
- If a repo represents a single tool/product, publish a single package (bundle related scripts).
