# Skaleam

Talent Development OS for companies.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS
- **Backend**: Elysia (Bun), TypeScript
- **Database**: PostgreSQL 16, Drizzle ORM
- **Auth**: Better Auth
- **Monorepo**: Turborepo, pnpm

## Project Structure

```
skale-am/
├── apps/
│   ├── api/          # Elysia API server (port 3001)
│   └── web/          # Next.js frontend (port 3000)
├── packages/
│   ├── auth/         # Authentication utilities
│   ├── db/           # Database schema & migrations
│   ├── env/          # Environment validation
│   ├── ui/           # Shared UI components
│   └── ...
├── scripts/
│   └── run-dev.sh    # Development setup script
└── docker-compose.yml
```

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Bun](https://bun.sh/) v1.0+
- [pnpm](https://pnpm.io/) v10+
- [Docker](https://www.docker.com/)

## Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd skale-am
```

### 2. Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://skaleam:skaleam@localhost:5438/skaleam

# Authentication
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3001

# OAuth (Google)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# URLs
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
TRUSTED_ORIGINS=http://localhost:3000,http://localhost:3001

# Email (Resend)
EMAIL_FROM=noreply@yourdomain.com
RESEND_API_KEY=your-resend-api-key
```

### 3. Run the setup script

```bash
./scripts/run-dev.sh
```

This will:

1. Install dependencies (`pnpm install`)
2. Build all packages
3. Start Docker services (PostgreSQL)
4. Run database migrations
5. Start development servers

### Manual Setup

If you prefer to run steps manually:

```bash
# Install dependencies
pnpm install

# Start database
docker compose up -d

# Build packages
pnpm --filter './packages/*' build

# Run migrations
cd packages/db
pnpm db:generate
pnpm db:migrate
pnpm db:push
cd ../..

# Start development
pnpm dev
```

## Development

### Running the development servers

```bash
pnpm dev
```

This starts:

- **API**: http://localhost:3001
- **Web**: http://localhost:3000

### Database commands

```bash
cd packages/db

# Generate migration files
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Push schema directly (dev only)
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @skaleam/db build
```

### Linting

```bash
pnpm lint
```

## Docker

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f db
```
