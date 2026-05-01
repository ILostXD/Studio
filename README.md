# Studio

Studio is a self-hosted private music workspace for managing work-in-progress albums, track versions, creative notes, and share links.

## Server Deployment Guide

For Ubuntu server + Docker deployment (including mergeFS data path setup), see:

- [SERVER_SETUP.md](./SERVER_SETUP.md)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [NPM Scripts](#npm-scripts)
- [How Data Is Stored](#how-data-is-stored)
- [Share Access Modes](#share-access-modes)
- [Frontend Build Notes](#frontend-build-notes)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

Studio is designed for producers, artists, and collaborators who want a private, self-hosted place to:

- Upload and organize projects
- Keep multiple versions of each track
- Track status, key, BPM, loudness, notes, and todos
- Manage cover versions
- Build moodboards and inspiration references
- Share project views with different access levels

It uses a lightweight backend with JSON + filesystem storage so it is easy to run without external services.

## Features

- Private account system with bcrypt password hashing
- First-run admin bootstrap flow
- Session-based authentication with cookies
- Home library with sortable project cards
- Project page with editable title/artist/status
- Track uploads (`.wav`, `.mp3`, `.flac`)
- Track versioning and active-version switching
- Cover versioning and active-cover switching
- WaveSurfer.js mini player with queue, shuffle, loop, and volume controls
- Per-track metadata:
  - BPM, key, Camelot tag
  - status and mood tags
  - LUFS and peak values
  - notes, lyrics, todos
- Project metadata dialogs:
  - start/release dates
  - completion percent
  - star rating
  - color palette and moodboard
  - streaming checklist and distributor notes
- Share links with access levels:
  - `view` (See Only)
  - `listen` (See + Listen)
  - `edit` (See + Edit + Listen)
- Autosave-driven editing UX across major dialogs/sheets

## Tech Stack

- Frontend:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Radix UI primitives
  - TanStack Query
  - WaveSurfer.js
- Backend:
  - Node.js + Express
  - express-session
  - multer (uploads)
  - bcrypt
  - music-metadata
- Storage:
  - JSON database file
  - Local filesystem for audio/covers

## Project Structure

```text
.
|- src/                      # React app source
|  |- components/            # UI + feature components
|  |- hooks/                 # React hooks (player, autosave, data hooks)
|  |- pages/                 # Route-level pages
|  |- lib/                   # Utilities, constants, mappers
|  `- types/                 # Shared TS types
|- static/                   # Static assets copied by Vite
|- public/                   # Built frontend output (served by Express)
|- data/                     # Runtime data (db + uploaded files)
|- server.js                 # Express API + file serving
|- docker-compose.yml        # Docker setup
|- Dockerfile                # Container image build
|- SERVER_SETUP.md           # Ubuntu server deployment guide
`- index.html                # Vite source HTML template
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Optional: Docker + Docker Compose

### Option A: Local Dev (Vite + API, recommended for coding)

```bash
npm install
npm run dev
```

This starts:

- API server in `--api-only` mode on `http://localhost:3000`
- Vite dev server on `http://localhost:5173`

### Option B: Local App Run (single server)

```bash
npm install
npm run build:web
npm start
```

This runs Express on `PORT` and serves built frontend files from `public/`.

### Option C: Docker Compose

```bash
docker compose up -d --build
```

Then open:

- `http://localhost:<PORT>`

If you changed frontend source and want those changes included in the image, build web assets before creating the image:

```bash
npm run build:web
docker compose up -d --build
```

## Environment Variables

Use `.env` (or your shell environment).

| Variable | Default | Used By | Notes |
|---|---|---|---|
| `PORT` | `3000` | API + app server | HTTP port Express listens on |
| `SESSION_SECRET` | `studio-session-secret` | API | Change in production |
| `BCRYPT_COST` | `12` | API | Password hash cost (8-14 allowed by server) |
| `DATA_DIR` | `./data` | API | Absolute/relative path for db + files |
| `DATA_PATH` | `./data` | Docker Compose | Host path mounted into container as `/data` |
| `APP_PASSWORD` | `studio` | Docker Compose env only | Currently not used by app logic |

Example `.env`:

```env
PORT=3000
SESSION_SECRET=change-this
BCRYPT_COST=12
```

## NPM Scripts

| Script | What it does |
|---|---|
| `npm start` | Runs Express server (`server.js`) |
| `npm run dev` | Runs API + Vite dev servers in parallel |
| `npm run dev:api` | Runs API only (`node server.js --api-only`) |
| `npm run dev:web` | Runs Vite dev server |
| `npm run build:web` | Builds frontend into `public/` |
| `npm run preview:web` | Serves built frontend preview with Vite |
| `npm run typecheck` | Runs TypeScript checks (`tsc --noEmit`) |

## How Data Is Stored

By default, runtime data is under `./data`:

- `data/db.json` - JSON database (users, projects, tracks, metadata)
- `data/files/audio/` - uploaded audio and track versions
- `data/files/covers/` - uploaded cover versions

In Docker, the container uses `/data` and Compose maps that to `DATA_PATH` on the host.

## Share Access Modes

Studio supports link-based share sessions:

- `view` - See only
- `listen` - See + listen
- `edit` - See + edit + listen

These permissions are enforced by API routes under `/api/share/:token/...`.

## Frontend Build Notes

There are intentionally two `index.html` files in this setup:

- Root `index.html` is the Vite source template used during development/build.
- `public/index.html` is generated build output served by Express in non-API-only mode.

`legacy-styles.css` is not part of runtime imports; it is a legacy reference stylesheet used during style migration/matching work.

## Troubleshooting

- App loads but styles/scripts look stale:
  - Run `npm run build:web` again and restart the server/container.
- Upload errors or missing files:
  - Verify `DATA_DIR`/`DATA_PATH` exists and is writable.
- Session/login issues:
  - Confirm `SESSION_SECRET` is set consistently across restarts.
- Vite works but direct Express run looks different:
  - Vite serves live source; Express serves built `public/` output.
- Docker build runs but app looks outdated:
  - Rebuild frontend artifacts before `docker compose up --build`.

## License

MIT. See [LICENSE](./LICENSE).
