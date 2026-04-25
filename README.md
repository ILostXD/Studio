# Studio

Studio is a self-hosted private music workspace for tracking work-in-progress albums.

## Features

- Password-protected private app (single password via `APP_PASSWORD`)
- Session-based auth with cookies
- Project cards with cover art, artist, status, track count, and total runtime
- Track uploads for WAV, MP3, and FLAC
- Manual track metadata editing (title, notes, lyrics, todos)
- Track versioning with quick active-version switching
- Cover versioning with quick cover switcher thumbnails
- WaveSurfer.js waveform playback with persistent bottom player
- Drag-and-drop track reordering
- Share links (`/share/<token>`) with access types: See Only, See + Listen, See + Edit + Listen
- Share link management with create and delete controls
- Local filesystem storage for uploaded files and JSON metadata

## Quick Start (Docker)

1. Set environment variables in your shell or a `.env` file:

   - `APP_PASSWORD` (required in practice)
   - `PORT` (optional, default `3000`)
   - `SESSION_SECRET` (optional but recommended)

1. Run:

```bash
docker compose up -d
```

1. Open:

- `http://localhost:<PORT>` for the private app
- Share links are generated in each project

## Local Development (without Docker)

```bash
npm install
npm start
```

The app stores data under `./data` locally by default.
In Docker, data is stored in the mounted `./data` volume.

## Local Development with Vite (fast startup)

This runs the backend API and Vite dev server together.

1. Create/update `.env`:

```env
APP_PASSWORD=change-me
PORT=3000
SESSION_SECRET=change-this
```

1. Run:

```bash
npm install
npm run dev
```

1. Open:

- `http://localhost:5173` for Studio via Vite
- `http://localhost:3000` is API-only mode in this workflow
