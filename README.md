# felixfong227.me

My personal website. Built with Astro + Tailwind, runs on Bun.

## Setup

```sh
bun install
```

For dev with HTTPS via Portless (install once: `npm install -g portless`):

```sh
bun run dev          # https://felixfong227.localhost
bun run dev:plain    # http://localhost:4321 (no Portless)
```

## Build & preview

```sh
bun run build
bun run preview
```

## Tests

```sh
bun run test:install   # first time only
bun run test
```
