# Docker Setup for LexiChain

## PostgreSQL in Docker

We use Docker Compose to run PostgreSQL in a container for development.

## Quick Start

### 1. Start PostgreSQL

```bash
docker-compose up -d
```

This will:

- Download PostgreSQL 15 Alpine image (if not already downloaded)
- Create a container named `lexichain-postgres`
- Start PostgreSQL on port 5432
- Create a database named `lexichain`
- Create a volume for persistent data

### 2. Check Status

```bash
# Check if container is running
docker-compose ps

# View logs
docker-compose logs postgres

# Follow logs
docker-compose logs -f postgres
```

### 3. Initialize Database

```bash
# Push schema to database
cd packages/database
npm run db:push

# Seed with sample data
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio
```

## Common Commands

### Start/Stop

```bash
# Start PostgreSQL
docker-compose up -d

# Stop PostgreSQL
docker-compose down

# Stop and remove volumes (⚠️ deletes all data)
docker-compose down -v
```

### Database Management

```bash
# Connect to PostgreSQL CLI
docker exec -it lexichain-postgres psql -U postgres -d lexichain

# Backup database
docker exec lexichain-postgres pg_dump -U postgres lexichain > backup.sql

# Restore database
docker exec -i lexichain-postgres psql -U postgres lexichain < backup.sql

# Reset database
docker-compose down -v
docker-compose up -d
cd packages/database && npm run db:push && npm run db:seed
```

### Troubleshooting

**Port already in use:**

```bash
# Check what's using port 5432
lsof -i :5432

# Stop local PostgreSQL if running
sudo systemctl stop postgresql
```

**Container won't start:**

```bash
# View detailed logs
docker-compose logs postgres

# Remove and recreate
docker-compose down
docker-compose up -d
```

**Connection refused:**

```bash
# Wait for PostgreSQL to be ready
docker-compose logs -f postgres
# Look for: "database system is ready to accept connections"
```

## Configuration

### Environment Variables

The `.env.local` file is already configured:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lexichain"
```

### Docker Compose Details

- **Image**: `postgres:15-alpine` (lightweight)
- **Port**: `5432` (mapped to host)
- **User**: `postgres`
- **Password**: `postgres`
- **Database**: `lexichain`
- **Volume**: `postgres_data` (persistent storage)

### Health Check

The container includes a health check that runs every 10 seconds to ensure PostgreSQL is ready.

## Development Workflow

1. **Start database:**

   ```bash
   docker-compose up -d
   ```

2. **Update schema:**

   ```bash
   cd packages/database
   npm run db:push
   ```

3. **Seed data:**

   ```bash
   npm run db:seed
   ```

4. **Start dev server:**

   ```bash
   cd ../..
   npm run dev
   ```

5. **Stop database when done:**
   ```bash
   docker-compose down
   ```

## Data Persistence

Data is stored in a Docker volume named `postgres_data`. This means:

- ✅ Data persists between container restarts
- ✅ Data survives `docker-compose down`
- ❌ Data is deleted with `docker-compose down -v`

## Production Notes

For production, use a managed database service:

- **Supabase** (PostgreSQL with additional features)
- **Neon** (Serverless PostgreSQL)
- **Railway** (Easy deployment)
- **AWS RDS** (Managed PostgreSQL)
- **DigitalOcean Managed Databases**

Update `DATABASE_URL` in production environment variables.

## Next Steps

1. ✅ Docker Compose file created
2. ⏳ Run `docker-compose up -d`
3. ⏳ Run `npm run db:push` in packages/database
4. ⏳ Run `npm run db:seed` to add sample data
5. ⏳ Start building! 🚀
