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

## Supply Chain

Dependency install policy lives in `pnpm-workspace.yaml`:

- `minimumReleaseAge` delays newly published package versions before install.
- `onlyBuiltDependencies` and `allowBuilds` restrict install scripts to approved native/build tooling.
- `overrides.postcss` pins `postcss` to a patched version until upstream dependencies resolve to it naturally.
