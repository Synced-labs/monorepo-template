# Create Monorepo Template

A CLI tool to create a new monorepo project with Next.js frontend, Deno backend, and Firebase integration.

## Usage

```bash
# Using npx
npx @jagadhis/create-monorepo-template

# Using npm
npm create @jagadhis/monorepo-template

# Using bun
bunx @jagadhis/create-monorepo-template
```

## Features

- 🚀 Next.js frontend setup
- 🦕 Deno backend configuration
- 🔥 Firebase integration
- ⚙️ TypeScript configuration
- 📦 Shared packages structure
- 🛠️ ESLint and other development tools
- 🚢 Optional Helm charts for deployment

## Options

The CLI will prompt you for:
- Project name
- Firebase configuration
- Helm charts inclusion

## Project Structure

```
your-project/
├── apps/
│   ├── backend/      # Deno backend
│   └── frontend/     # Next.js frontend
├── packages/
│   ├── shared/       # Shared utilities
│   ├── ui/           # Shared UI components
│   └── config/       # Shared configurations
└── [Optional] helm/  # Deployment charts
```

## Development

After creation:
```bash
cd your-project
bun install
bun run dev
```

## License

MIT