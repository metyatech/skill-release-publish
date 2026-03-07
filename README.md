# skill-release-publish

Agent skill for preparing releases, publishing packages, and verifying published artifacts. Provides a structured workflow with post-publish verification gates.

## Supported Environments

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0

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

## Platform Specific Examples

### Node.js (npm)

- **Publishing**: `npm publish` (use automation token if available).
- **Verification**:
  - Registry check: `npm view <pkg> version`
  - Fresh install: `npx <pkg>@latest --version`
  - Global update: `npm i -g <pkg>@latest`

### GitHub

- **Metadata**: Set Description, Topics, Homepage.
- **Required Files**: `issue templates`, `PR template`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`.
- **Releases**: Create GitHub Release based on CHANGELOG.

## Development

This repository follows the [Agent Skills](https://agentskills.io) standard.

### Setup

```bash
git clone https://github.com/metyatech/skill-release-publish.git
cd skill-release-publish
npm install -g markdownlint-cli compose-agentsmd
```

### Linting

```bash
markdownlint "**/*.md" --ignore node_modules --ignore AGENTS.md
```

### Verify Rules

```bash
compose-agentsmd --compose
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute.

## Security

See [SECURITY.md](SECURITY.md) for our security policy.

## Releases

See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

MIT
