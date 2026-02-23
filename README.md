# skill-release-publish

Agent skill for preparing releases, publishing packages, and verifying published artifacts. Provides a structured workflow with post-publish verification gates.

## What it covers

- Public repository metadata setup (Description, Topics, Homepage, required files)
- Versioning and release flow (SemVer, Git tags, GitHub Releases)
- Post-publish verification (registry, fresh install, global update)
- Published artifact requirements (metadata, entrypoints)

## Installation

```sh
npx skills add metyatech/skill-release-publish
```

## Usage

### Claude Code

```text
/release-publish
```

### Codex

```text
$release-publish
```

## License

MIT
