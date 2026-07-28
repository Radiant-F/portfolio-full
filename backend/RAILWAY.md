# Railway Deployment Guide

This guide covers deploying the Portfolio CMS backend to Railway's free tier.

## Prerequisites

1. Railway account (free tier)
2. Railway CLI installed locally (optional but recommended)
3. GitHub repository connected to Railway (recommended for auto-deploy)

## Quick Start

### Option 1: Deploy via Railway Dashboard (Recommended)

1. Go to [railway.com](https://railway.com)
2. Create a new project or use existing
3. Click "Deploy" and select "GitHub" (if repo is connected) or "Deploy from URL"
4. Railway will auto-detect the Dockerfile and configure the service

### Option 2: Deploy via CLI

```bash
# Install Railway CLI
curl -fsSL https://railway.app/install.sh | bash

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

## Configuration

### Required Environment Variables

Railway will automatically provide:

- `DATABASE_URL` - PostgreSQL connection string (Railway provides a free PostgreSQL database)

### Optional Environment Variables

Set these in the Railway dashboard under "Variables":

- `DEFAULT_USER_USERNAME` - Admin username for seeding demo data
- `DEFAULT_USER_PASSPHRASE` - Admin password for seeding demo data
- `SEED_ON_BOOT` - Set to `true` to seed demo data on startup (default: `false`)

### Adding PostgreSQL Database (Free Tier)

1. In Railway dashboard, click "Add Plugin"
2. Select "PostgreSQL"
3. Choose "Free" plan
4. Railway will automatically set `DATABASE_URL` environment variable

## Deployment Settings

### Build Settings
- **Dockerfile**: Auto-detected
- **Build Command**: None (Railway auto-builds from Dockerfile)
- **Start Command**: `bun run src/index.ts` (configured in railway.json)

### Service Settings
- **Port**: 10000 (configured in Dockerfile and railway.json)
- **Health Check**: `GET /` (root endpoint returns "Hey there, cutie.")

## Free Tier Limits

Railway Free Tier includes:
- $5 monthly credits
- 500 hours of runtime (roughly 21 days of continuous uptime)
- 1GB PostgreSQL database
- 1GB persistent storage

## Database Migrations

Migrations run automatically on startup via `migrateDatabase()` in `src/index.ts`.

To create new migrations locally:
```bash
bun run db:generate  # Generate migration from schema changes
bun run db:push      # Apply migrations to local dev database
```

The migration files in `drizzle/` will be applied automatically in Railway.

## Environment-Specific Configuration

### Production (Railway)
- Migrations run on boot
- Database URL from `DATABASE_URL` env var
- Default user seeding controlled by `SEED_ON_BOOT`

### Development (Local)
- Uses local PostgreSQL or Docker container
- Set `SEED_ON_BOOT=true` to seed demo data

## Troubleshooting

### Database Connection Issues
1. Check `DATABASE_URL` is set in Variables tab
2. Verify PostgreSQL plugin is enabled
3. Check logs for connection errors

### Build Failures
1. Check Dockerfile syntax
2. Ensure `bun.lock` is committed
3. Check Railway build logs for details

### Port Issues
The app uses `PORT` environment variable (Railway sets this automatically). The Dockerfile exposes port 10000, but the app will use the `PORT` env var if set.

## Local Development

For local development with similar setup:

```bash
# Use Railway's PostgreSQL locally
railway down  # Stops Railway services
# Or use Docker for local PostgreSQL
docker run -p 5432:5432 -e POSTGRES_DB=portfolio postgres:15
```

## Migration from Render

If migrating from Render:

1. Export your Render PostgreSQL database
2. Create new PostgreSQL database on Railway
3. Import data to Railway database
4. Update DNS records to point to Railway
5. Destroy Render service

## Useful Railway Commands

```bash
# View logs
railway logs

# Open project in browser
railway open

# SSH into service
railway ssh

# View environment variables
railway variables

# Set environment variable
railway variables set KEY=value
```

## Additional Resources

- [Railway Documentation](https://docs.railway.com)
- [Railway PostgreSQL Guide](https://docs.railway.com/guides/databases)
- [Railway Deployment Guide](https://docs.railway.com/guides/deploy-docker)
- [Railway Free Tier](https://docs.railway.com/pricing/plans)