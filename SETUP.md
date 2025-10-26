# LexiChain Development Setup

## Prerequisites

- Node.js >= 18 (currently using v22.20.0 ✅)
- npm 10.9.3 ✅
- PostgreSQL (for database)
- Git

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lexichain"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Blockchain / Web3
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=""
NEXT_PUBLIC_CHAIN_ID="11155111"
NEXT_PUBLIC_EAS_CONTRACT_ADDRESS=""
NEXT_PUBLIC_EAS_SCHEMA_UID=""

# IPFS Storage
PINATA_API_KEY=""
PINATA_API_SECRET=""
PINATA_JWT=""

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Install PostgreSQL if not already installed
# Create database
createdb lexichain

# Run Prisma migrations (once Prisma is set up)
npx prisma migrate dev
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at:

- Web app: http://localhost:3000
- Docs: http://localhost:3001

## Project Structure

```
lexichain/
├── apps/
│   ├── web/          # Main Next.js application
│   └── docs/         # Documentation site
├── packages/
│   ├── ui/           # Shared UI components
│   ├── eslint-config/
│   └── typescript-config/
├── prisma/           # Database schema (to be added)
└── package.json
```

## Tech Stack

### Core

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Monorepo**: Turborepo
- **Styling**: Tailwind CSS (to be added)

### Database & Backend

- **Database**: PostgreSQL
- **ORM**: Prisma (to be added)
- **API**: Next.js API Routes / tRPC (to be added)

### Authentication

- **Auth**: NextAuth.js (to be added)
- **Passkeys**: SimpleWebAuthn (to be added)
- **Web3**: WalletConnect / RainbowKit (to be added)

### Blockchain

- **Attestations**: Ethereum Attestation Service (EAS)
- **Blockchain Library**: Viem / Ethers.js (to be added)
- **Gasless Transactions**: Gelato / Biconomy (to be added)

### Storage

- **IPFS**: Pinata or Web3.Storage (to be added)

### UI/UX

- **Components**: Radix UI / shadcn/ui (to be added)
- **Animations**: Framer Motion (to be added)
- **Icons**: Lucide React (to be added)

## Development Commands

```bash
# Run all apps in development mode
npm run dev

# Build all apps
npm run build

# Lint all code
npm run lint

# Format code
npm run format

# Type check
npm run check-types

# Run specific app
npm run dev --filter=web
npm run dev --filter=docs
```

## Next Steps

1. ✅ Environment setup complete
2. 🔄 Install core dependencies
3. ⏳ Set up Prisma and database schema
4. ⏳ Configure Tailwind CSS with neon theme
5. ⏳ Build authentication system
6. ⏳ Implement flashcard system
7. ⏳ Add blockchain integration
8. ⏳ IPFS publishing

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turborepo.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [EAS Documentation](https://docs.attest.sh/)
- [IPFS Documentation](https://docs.ipfs.tech/)

## Troubleshooting

### Port already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database connection issues

```bash
# Check PostgreSQL is running
pg_isready

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Clear Next.js cache

```bash
rm -rf .next
npm run dev
```
