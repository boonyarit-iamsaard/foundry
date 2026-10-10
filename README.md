# Hi, I'm Boonyarit Iamsa-ard

A **Full-Stack Developer** passionate about building modern web applications with a focus on scalable architectures and maintainable codebases.

## Development

This site uses Node.js 24 and pnpm 11. If you use `nvm`, run:

```sh
nvm use
```

Install dependencies:

```sh
pnpm install
```

Create a local environment file before type-checking or building:

```sh
cp .env.example .env
```

For CI-equivalent local values, use:

```sh
cp .env.ci.example .env
```

## Verification

Run everything the CI checks run, in one command:

```sh
pnpm run ci
```

Generate content types before running static analysis directly:

```sh
pnpm exec velite build --clean
pnpm run static-analysis
```

Other useful checks:

```sh
pnpm peers check
pnpm run build
pnpm run security:audit
```

To run the reusable GitHub Actions checks locally with `act`:

```sh
act workflow_call -W .github/workflows/checks.yml
```

### SonarQube

Run a one-off SonarQube scan of `src/` with Docker:

```sh
pnpm sonar:scan
```

The scan starts a throwaway SonarQube Community Build stack on a free loopback port. It analyzes the code and writes the issues and security hotspots to `.sonar-reports/issues.json` and `.sonar-reports/issues.md`. Then it removes every container, volume and network it created, even when the scan fails or you interrupt it. The reports are Git-ignored. No credentials are saved.

| Flag             | Effect                                                                               |
| ---------------- | ------------------------------------------------------------------------------------ |
| `--keep`         | Leave SonarQube running and print its URL and admin password; the reports link to it |
| `--purge-images` | Also remove the SonarQube and scanner images, which the next scan downloads again    |

`pnpm sonar:clean` removes a kept or abandoned stack without scanning and also accepts `--purge-images`.

## Supply Chain

Dependency install policy lives in `pnpm-workspace.yaml`:

- `minimumReleaseAge` delays newly published package versions before install.
- `onlyBuiltDependencies` and `allowBuilds` restrict install scripts to approved native/build tooling.
- `overrides.postcss` pins `postcss` to a patched version until upstream dependencies resolve to it naturally.
