# Releasing skill-release-publish

This repository follows Semantic Versioning (SemVer) and uses Git tags and GitHub Releases for publication.

## Release workflow

1.  **Check verification:** Ensure all tests, linting, and formatting checks pass on the `main` branch.
2.  **Update CHANGELOG.md:** Add a new entry under `[Unreleased]` and update it to the target version and today's date.
3.  **Bump version:**
    *   If `package.json` exists, use `npm version patch|minor|major`.
    *   Otherwise, update version references manually.
4.  **Push changes:** Push the `main` branch and the new Git tag.
5.  **Create GitHub Release:** Use the GitHub CLI or website to create a release from the tag, including the changelog entries.
6.  **Verify publication:** If this is published to a registry (e.g., npm), verify the new version is available and resolves correctly.

## Verification gates

Every release must satisfy the following:
*   `compose-agentsmd --compose` was run and `AGENTS.md` is fresh.
*   Skill frontmatter and body meet `AGENTS.md` standards.
*   All automated tests pass.
*   Documentation matches behavior.
