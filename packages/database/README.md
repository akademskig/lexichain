# @repo/database

Shared database package for LexiChain using Prisma ORM.

## Usage

### In your app

```typescript
import { prisma } from "@repo/database";

// Use Prisma Client
const users = await prisma.user.findMany();
```

### Import types

```typescript
import { User, Deck, Card } from "@repo/database";
```

## Scripts

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes to database (dev)
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio

# Seed database
npm run db:seed
```

## Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/lexichain"
```

## Schema Location

`prisma/schema.prisma`

## Development

1. Edit the schema in `prisma/schema.prisma`
2. Run `npm run db:generate` to update the Prisma Client
3. Run `npm run db:migrate` to create migrations
4. Import and use in your apps via `@repo/database`
