# Environment Variables Setup

## Quick Start

A `.env.local` file has been created in the root directory with default development settings.

## Database Setup

### Option 1: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL** (if not already installed):

   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib

   # macOS
   brew install postgresql@15
   brew services start postgresql@15
   ```

2. **Create the database**:

   ```bash
   # Connect to PostgreSQL
   sudo -u postgres psql

   # Create database and user
   CREATE DATABASE lexichain;
   CREATE USER postgres WITH PASSWORD 'postgres';
   GRANT ALL PRIVILEGES ON DATABASE lexichain TO postgres;
   \q
   ```

3. **Your `.env.local` is already configured** with:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lexichain"
   ```

### Option 2: Docker PostgreSQL (Easiest)

Run PostgreSQL in a Docker container:

```bash
docker run --name lexichain-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=lexichain \
  -p 5432:5432 \
  -d postgres:15
```

### Option 3: Cloud Database (Production-like)

Use a cloud provider like:

- **Supabase** (free tier, PostgreSQL)
- **Neon** (serverless PostgreSQL)
- **Railway** (easy deployment)

Update `DATABASE_URL` in `.env.local` with your connection string.

## Initialize Database

Once PostgreSQL is running:

```bash
# Generate Prisma Client
cd packages/database
npm run db:generate

# Push schema to database (for development)
npm run db:push

# OR create a migration (for production)
npm run db:migrate

# Seed with sample data
npm run db:seed
```

## Verify Setup

```bash
# Open Prisma Studio to view your database
cd packages/database
npm run db:studio
```

This will open a web interface at `http://localhost:5555` where you can view and edit your data.

## Environment Variables Explained

### Required for Development

```env
# Database connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth.js (for authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-for-development"
```

### Optional (Add Later)

```env
# WalletConnect (for Web3 wallet connection)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="get-from-walletconnect.com"

# Ethereum Attestation Service
NEXT_PUBLIC_EAS_CONTRACT_ADDRESS="eas-contract-address"
NEXT_PUBLIC_EAS_SCHEMA_UID="your-schema-uid"

# Pinata (for IPFS storage)
PINATA_API_KEY="your-api-key"
PINATA_API_SECRET="your-api-secret"
PINATA_JWT="your-jwt-token"
```

## Troubleshooting

### "Connection refused" error

PostgreSQL is not running. Start it:

```bash
# Ubuntu/Debian
sudo systemctl start postgresql

# macOS
brew services start postgresql@15

# Docker
docker start lexichain-postgres
```

### "Database does not exist" error

Create the database:

```bash
createdb lexichain
```

### "Role does not exist" error

Create the PostgreSQL user:

```bash
sudo -u postgres createuser -s postgres
```

### Reset database

```bash
cd packages/database
npm run db:push -- --force-reset
npm run db:seed
```

## Files Created

- ✅ `.env.local` - Your local environment variables (gitignored)
- ✅ `.env.example` - Template for other developers
- ✅ `.env` - Also created for Prisma compatibility

## Next Steps

1. ✅ Environment variables configured
2. ⏳ Start PostgreSQL
3. ⏳ Run `npm run db:push` to create tables
4. ⏳ Run `npm run db:seed` to add sample data
5. ⏳ Start building the UI!

## Security Notes

- ⚠️ Never commit `.env.local` or `.env` to git
- ⚠️ Change `NEXTAUTH_SECRET` in production (use: `openssl rand -base64 32`)
- ⚠️ Use strong database passwords in production
- ⚠️ Keep API keys and secrets secure
