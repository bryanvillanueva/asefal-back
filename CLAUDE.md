# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Backend API for ASEFAL (football tournament management system) built with Express.js and Sequelize ORM. The system manages tournaments, teams, players, matches, and live match events for a football league.

## Commands

### Development
```bash
npm run dev          # Start development server with nodemon (auto-reload)
npm start            # Start production server
```

### Database Management
```bash
# Sequelize CLI commands
npx sequelize-cli db:migrate              # Run pending migrations
npx sequelize-cli db:migrate:undo         # Rollback last migration
npx sequelize-cli db:seed:all             # Run all seeders
npx sequelize-cli db:seed:undo:all        # Rollback all seeders

# Generate new resources
npx sequelize-cli model:generate --name ModelName --attributes field1:type,field2:type
npx sequelize-cli migration:generate --name migration-name
npx sequelize-cli seed:generate --name seed-name
```

## Architecture

### Database Configuration Issue
**CRITICAL**: There's a mismatch in the database configuration:
- [config/config.js](config/config.js) exports configuration (currently in use)
- [models/index.js](models/index.js:9) attempts to load `config/config.json` which doesn't exist

This will cause the application to crash when trying to use Sequelize models. Either:
1. Update [models/index.js](models/index.js:9) to require `config.js` instead of `config.json`, OR
2. Create a `config/config.json` file

### Database Connection
- Uses MySQL with SSL (required in production on Railway)
- Configuration supports both development and production environments
- Connection details loaded from environment variables:
  - `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`, `DB_PORT`
  - `NODE_ENV` to switch between development/production configs
  - `PORT` for the Express server (defaults to 4000)

### Project Structure
```
site-back/
├── config/
│   └── config.js          # Sequelize database configuration
├── models/
│   ├── index.js           # Sequelize model loader
│   └── user.js            # User model (nombre, email, password, rol)
├── migrations/            # Database schema migrations
├── seeders/              # Database seed data (includes admin user)
├── context/
│   └── info-asefal.txt   # Full project specification document
└── index.js              # Express app entry point
```

### Planned Architecture (from spec)
Based on [context/info-asefal.txt](context/info-asefal.txt), the system should include:

**Key Models** (most not yet implemented):
- `roles`: User permission management (ADMIN, DELEGADO, PLANILLERO)
- `usuarios` (users): Currently partially implemented as User model
- `torneos`: Tournament editions
- `categorias`: Age divisions (2010, 2012, etc.)
- `sedes`: Match venues
- `clubes`: Football clubs
- `equipos`: Team instances (club + category)
- `jugadores`: Player biographical data
- `inscripciones`: Player-team registrations
- `partidos`: Matches and fixtures
- `eventos_partido`: Live match events (goals, cards, substitutions)

**Planned Features**:
- JWT authentication with role-based access control
- File uploads (player photos, club logos) - consider Cloudinary/AWS S3
- Password hashing with bcryptjs
- Input validation (express-validator or zod)
- CORS configuration for frontend domain

### Current State
- Basic Express server with CORS and Helmet middleware
- Single User model with basic fields
- One migration for Users table
- Admin user seeder (⚠️ password not hashed)

## Deployment

- Target platform: Railway (https://asefal-back-production.up.railway.app)
- **Important**: No `.env` file in production - all environment variables configured in Railway dashboard
- SSL connection to database is required in production

## Security Notes

- Admin seeder ([seeders/20251207175443-admin-user.js](seeders/20251207175443-admin-user.js:8)) contains plain-text password - must be hashed before production use
- JWT secret (`JWT_SECRET`) should be set in environment variables
- Implement password hashing with bcryptjs for all user creation/updates
- Configure CORS to only allow frontend domain in production
