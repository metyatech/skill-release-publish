---
name: release-publish
description: Use when preparing a release, publishing a package, bumping a version, or configuring public repository metadata. Also use when verifying a published package. Do not use for general development or non-release tasks.
---

# Release and publish workflow

## Public repository metadata

- For a public repository, the agent MUST set the GitHub
  Description, Topics, and Homepage fields.
- A public repository MUST contain: `.github/workflows/ci.yml`,
  issue templates, a PR template, `SECURITY.md`,
  `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `CHANGELOG.md`.
- CI MUST run the repository's standard lint, test, and build
  commands.

## Versioning and release flow

- The agent MUST update version metadata when release content
  changes and MUST keep the package version and the Git tag
  consistent.
- When asked to choose a version, the agent MUST decide it
  itself.
- When bumping a version, the agent MUST create the GitHub
  Release and publish the package in the same update.
- For npm publishing in metyatech-owned packages, the agent MUST
  execute `npm publish` directly. An automation token is
  configured.
- For other packages, the agent MUST ask the user to run
  `npm publish`.
- Before publishing, the agent MUST run required prep commands
  (`npm install`, `npm test`, `npm pack --dry-run`, etc.) and
  MUST proceed only when ready.
- If authentication fails during publish, the agent MUST ask the
  user to complete the publish step.
- The agent MUST run dependency security checks before release,
  MUST address critical issues, and MUST report results.

## Post-publish verification

After publishing, the agent MUST update any locally installed
copy to the newly published release and MUST verify the resolved
version. The agent MUST NOT report "done" until this verification
completes (or the user explicitly declines).

The agent MUST express the verification as explicit acceptance
criteria with outcomes (PASS / FAIL / N/A) and evidence:

- **AC1 (registry)** — verify the published version exists in
  the registry (e.g., `npm view <pkg> version`).
- **AC2 (fresh install)** — verify the latest package resolves
  and runs (e.g., `npx <pkg>@latest --version`).
- **AC3 (global update, if applicable)** — if the package is
  installed globally, update it to the published version and
  verify (e.g., `npm ls -g <pkg> --depth=0`,
  `npm i -g <pkg>@latest`, then `<cmd> --version`). If AC3 does
  not apply, the agent MUST mark it N/A and state the reason
  explicitly.

For npm CLIs:

- If installed globally: check `npm ls -g <pkg> --depth=0`,
  update via `npm i -g <pkg>@latest`, then verify with
  `<pkg> --version`.
- If not installed globally: skip the global update and verify
  availability via `npx <pkg>@latest --version` (or the
  ecosystem-equivalent).

## Standard repository topics

The agent MUST assign topics from the standard set below. Every
repository MUST have at least one standard topic when applicable.
A repository that does not match any standard topic MUST use
descriptive topics relevant to its domain.

- `agent-skill` — repository contains a `SKILL.md` (an
  installable agent skill).
- `agent-tool` — CLI tool or MCP server used by agents (e.g.,
  task-tracker, agents-mcp, compose-agentsmd).
- `agent-rule` — rule source or ruleset repository (e.g.,
  agent-rules).
- `unreal-engine` — Unreal Engine plugin or sample project.
- `qti` — QTI assessment ecosystem tool or library.
- `education` — course content, teaching materials, or
  student-facing platform.
- `docusaurus` — Docusaurus plugin or extension.

Additional descriptive topics (language, framework, domain
keywords) MAY be added freely alongside standard topics. The
agent MUST review and update the standard topic set when the
repository landscape changes materially. The agent MUST verify
topics are set as part of the new-repository compliance gate.

## Published artifact requirements

- The agent MUST populate package metadata (name, description,
  repository, issues, homepage, engines).
- The agent MUST validate executable entrypoints and required
  shebangs so installed commands work.
- If a repository represents a single tool or product, the agent
  MUST publish a single package (bundling related scripts).
