# Portfolio Monorepo

## Requirements

- Node.js >= 20
- pnpm >= 9

## Setup

\```bash

# Install pnpm globally first

npm install -g pnpm

# Then install dependencies

pnpm install

# Run dev

pnpm dev
\```

## Apps

- `apps/web` — public portfolio site (port 3000)
- `apps/admin` — admin panel (port 3002)

## API

Separate repo: `portfolio-api` — NestJS + PostgreSQL + Docker
