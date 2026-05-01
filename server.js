require("dotenv").config();

const express = require("express");
const session = require("express-session");
const multer = require("multer");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { parseFile } = require("music-metadata");

const IS_API_ONLY_MODE = process.argv.includes("--api-only");

const PORT = Number(process.env.PORT || 3000);
const SESSION_SECRET = process.env.SESSION_SECRET || "studio-session-secret";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;
const SESSION_REMEMBER_ME_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 180;
const BCRYPT_COST = Math.max(8, Math.min(14, Number(process.env.BCRYPT_COST || 12)));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const FILES_DIR = path.join(DATA_DIR, "files");
const AUDIO_DIR = path.join(FILES_DIR, "audio");
const COVERS_DIR = path.join(FILES_DIR, "covers");
const PUBLIC_DIR = path.join(__dirname, "public");

const STATUS_OPTIONS = ["In Progress", "Mastering", "Done"];
const TRACK_STATUS_OPTIONS = ["Idea", "Demo", "Recording", "Mixing", "Mastering", "Done"];
const MOOD_TAG_OPTIONS = ["Dark", "Energetic", "Melancholic", "Hype", "Chill", "Aggressive", "Euphoric", "Nostalgic"];
const MUSICAL_KEYS = [
  "C Major", "C Minor",
  "C# Major", "C# Minor",
  "D Major", "D Minor",
  "D# Major", "D# Minor",
  "E Major", "E Minor",
  "F Major", "F Minor",
  "F# Major", "F# Minor",
  "G Major", "G Minor",
  "G# Major", "G# Minor",
  "A Major", "A Minor",
  "A# Major", "A# Minor",
  "B Major", "B Minor",
];
const ALLOWED_AUDIO_EXTENSIONS = new Set([".wav", ".mp3", ".flac"]);
const ALLOWED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const SHARE_ACCESS_OPTIONS = new Set(["view", "listen", "edit"]);
const MIME_BY_EXTENSION = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".flac": "audio/flac",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function sanitizeShareAccess(value) {
  if (SHARE_ACCESS_OPTIONS.has(value)) {
    return value;
  }

  return "listen";
}

function canShareListen(access) {
  return access === "listen" || access === "edit";
}

function canShareEdit(access) {
  return access === "edit";
}

function parseDuration(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function parseSize(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return Math.floor(parsed);
}

function parseReleaseDate(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const str = safeString(String(value), 30);
  if (!/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return null;
  }

  const parsed = new Date(str);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return str.slice(0, 10);
}

function parseCompletionPercent(value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(parsed)));
}

function parseStarRating(value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.max(0, Math.min(5, Math.round(parsed)));
}

function parseBpm(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 999) {
    return null;
  }

  return Math.round(parsed);
}

function parseTrackStatus(value) {
  const normalized = safeString(String(value || ""), 60).trim();
  if (!normalized) {
    return null;
  }

  const match = TRACK_STATUS_OPTIONS.find(
    (status) => status.toLowerCase() === normalized.toLowerCase(),
  );
  if (match) {
    return match;
  }

  return null;
}

function parseMoodTags(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((tag) => MOOD_TAG_OPTIONS.includes(tag))
    .slice(0, MOOD_TAG_OPTIONS.length);
}

function parseListenCount(value) {
  if (value === null || value === undefined) {
    return 0;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return Math.floor(parsed);
}

function parseLufsValue(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.round(parsed * 10) / 10;
}

const HEX_COLOR_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function parseColorPalette(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (color) =>
        typeof color === "string" && HEX_COLOR_RE.test(color.trim()),
    )
    .map((color) => color.trim().toLowerCase())
    .slice(0, 5);
}

const STREAMING_PLATFORMS = [
  "spotify",
  "appleMusic",
  "bandcamp",
  "tidal",
  "youtubeMusic",
  "soundCloud",
];

function parseStreamingChecklist(value) {
  const result = {};
  for (const key of STREAMING_PLATFORMS) {
    result[key] = false;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return result;
  }

  for (const key of STREAMING_PLATFORMS) {
    result[key] = Boolean(value[key]);
  }

  return result;
}

function safeUrl(value) {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim().slice(0, 600);
  if (!trimmed) {
    return "";
  }

  if (!/^https?:\/\//i.test(trimmed)) {
    return "";
  }

  return trimmed;
}

function parseMoodboardProvider(value) {
  const provider = safeString(String(value || ""), 40).toLowerCase();
  if (provider === "youtube" || provider === "soundcloud") {
    return provider;
  }

  return "";
}

function normalizeMoodboardItem(value, fallbackTimestamp) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const type = value.type === "reference" || value.type === "embed"
    ? value.type
    : "";
  if (!type) {
    return null;
  }

  const createdAt = safeString(value.createdAt, 80) || fallbackTimestamp;
  const base = {
    id: safeString(value.id, 100) || crypto.randomUUID(),
    type,
    createdAt,
    updatedAt: safeString(value.updatedAt, 80) || createdAt,
  };

  if (type === "reference") {
    const artist = safeString(value.artist, 140);
    const title = safeString(value.title, 180);
    const url = safeUrl(value.url);

    if (!artist && !title && !url) {
      return null;
    }

    return {
      ...base,
      artist,
      title,
      url,
    };
  }

  const url = safeUrl(value.url);
  if (!url) {
    return null;
  }

  return {
    ...base,
    url,
    provider: parseMoodboardProvider(value.provider),
  };
}

function parseMoodboardItems(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const timestamp = nowIso();
  return value
    .map((item) => normalizeMoodboardItem(item, timestamp))
    .filter((item) => item !== null)
    .slice(0, 100);
}

function sanitizeUsername(value) {
  const username = safeString(String(value || ""), 60);
  if (!/^[a-zA-Z0-9._-]{3,40}$/.test(username)) {
    return "";
  }

  return username;
}

function usernameKey(value) {
  return String(value || "").trim().toLowerCase();
}

function sanitizePassword(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.slice(0, 256);
}

function normalizeUser(user, fallbackTimestamp) {
  if (!user || typeof user !== "object") {
    return null;
  }

  const username = sanitizeUsername(user.username);
  const passwordHash = safeString(user.passwordHash, 200);
  if (!username || !passwordHash) {
    return null;
  }

  return {
    id: safeString(user.id, 100) || crypto.randomUUID(),
    username,
    passwordHash,
    createdAt: safeString(user.createdAt, 80) || fallbackTimestamp,
    isAdmin: Boolean(user.isAdmin),
  };
}

function toUserResponse(user) {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt,
    isAdmin: Boolean(user.isAdmin),
  };
}

async function extractDurationSeconds(absolutePath) {
  try {
    const metadata = await parseFile(absolutePath, { duration: true });
    return parseDuration(
      metadata && metadata.format && metadata.format.duration,
    );
  } catch (error) {
    return null;
  }
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function ensureAppFiles() {
  ensureDirectory(AUDIO_DIR);
  ensureDirectory(COVERS_DIR);

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ projects: [], users: [] }, null, 2));
  }
}

function safeString(value, maxLength = 3000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function safeStatus(value) {
  if (STATUS_OPTIONS.includes(value)) {
    return value;
  }

  return "In Progress";
}

function parseTrackNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return Math.floor(parsed);
}

function sanitizeTodoId(value) {
  return safeString(String(value || ""), 80);
}

function sanitizeTodoText(value) {
  return safeString(String(value || ""), 220);
}

function normalizeTodoItem(value) {
  if (typeof value === "string") {
    const todoText = sanitizeTodoText(value);
    if (!todoText) {
      return null;
    }

    return {
      id: crypto.randomUUID(),
      text: todoText,
      done: false,
    };
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const todoText = sanitizeTodoText(value.text);
  if (!todoText) {
    return null;
  }

  return {
    id: sanitizeTodoId(value.id) || crypto.randomUUID(),
    text: todoText,
    done: Boolean(value.done),
  };
}

function normalizeTodos(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => normalizeTodoItem(entry))
      .filter((entry) => entry !== null);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => normalizeTodoItem(line))
      .filter((entry) => entry !== null);
  }

  return [];
}

function nowIso() {
  return new Date().toISOString();
}

function writeDatabase(database) {
  fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2));
}

function sortTracks(tracks) {
  return [...tracks].sort((a, b) => {
    const aOrder = Number.isFinite(a.order) ? a.order : 0;
    const bOrder = Number.isFinite(b.order) ? b.order : 0;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return String(a.createdAt).localeCompare(String(b.createdAt));
  });
}

function sanitizeStoredPath(storedPath) {
  if (typeof storedPath !== "string") {
    return "";
  }

  return storedPath.replace(/\\/g, "/").slice(0, 600);
}

function normalizeTrackVersion(value, fallbackTimestamp) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const filePath = sanitizeStoredPath(value.filePath);
  if (!filePath) {
    return null;
  }

  const createdAt = safeString(value.createdAt, 80) || fallbackTimestamp;
  const updatedAt = safeString(value.updatedAt, 80) || createdAt;

  return {
    id: safeString(value.id, 100) || crypto.randomUUID(),
    filePath,
    originalName: safeString(value.originalName, 260),
    mimeType: safeString(value.mimeType, 120),
    durationSeconds: parseDuration(value.durationSeconds),
    sizeBytes: parseSize(value.sizeBytes),
    createdAt,
    updatedAt,
  };
}

function applyActiveTrackVersion(track) {
  const versions = Array.isArray(track.versions) ? track.versions : [];
  if (!versions.length) {
    track.filePath = "";
    track.originalName = "";
    track.mimeType = "";
    track.durationSeconds = null;
    track.sizeBytes = null;
    return;
  }

  const activeVersion =
    versions.find((version) => version.id === track.activeVersionId) ||
    versions[0];

  track.activeVersionId = activeVersion.id;
  track.filePath = activeVersion.filePath;
  track.originalName = activeVersion.originalName;
  track.mimeType = activeVersion.mimeType;
  track.durationSeconds = parseDuration(activeVersion.durationSeconds);
  track.sizeBytes = parseSize(activeVersion.sizeBytes);
}

function normalizeTrack(track, fallbackTimestamp) {
  let changed = false;
  const timestamp = safeString(track.createdAt, 80) || fallbackTimestamp;

  if (!Array.isArray(track.versions) || !track.versions.length) {
    const legacyVersion = normalizeTrackVersion(
      {
        id: crypto.randomUUID(),
        filePath: track.filePath,
        originalName: track.originalName,
        mimeType: track.mimeType,
        durationSeconds: track.durationSeconds,
        sizeBytes: track.sizeBytes,
        createdAt: track.createdAt,
        updatedAt: track.updatedAt,
      },
      timestamp,
    );

    track.versions = legacyVersion ? [legacyVersion] : [];
    changed = true;
  } else {
    const previousVersions = JSON.stringify(track.versions);
    const normalizedVersions = track.versions
      .map((version) => normalizeTrackVersion(version, timestamp))
      .filter((version) => version !== null);

    if (JSON.stringify(normalizedVersions) !== previousVersions) {
      changed = true;
    }

    track.versions = normalizedVersions;
  }

  if (!track.versions.length) {
    return changed;
  }

  const hasActiveVersion = track.versions.some(
    (version) => version.id === track.activeVersionId,
  );
  if (!hasActiveVersion) {
    track.activeVersionId = track.versions[0].id;
    changed = true;
  }

  const normalizedTodos = normalizeTodos(track.todos);
  if (JSON.stringify(normalizedTodos) !== JSON.stringify(track.todos || [])) {
    track.todos = normalizedTodos;
    changed = true;
  }

  if (!Array.isArray(track.todos)) {
    track.todos = [];
    changed = true;
  }

  if (typeof track.notes !== "string") {
    track.notes = safeString(track.notes, 4000);
    changed = true;
  }

  if (typeof track.lyrics !== "string") {
    track.lyrics = safeString(track.lyrics, 12000);
    changed = true;
  }

  if (!Number.isFinite(track.order)) {
    track.order = 0;
    changed = true;
  }

  // Phase 2 track-level metadata fields
  if (!Object.prototype.hasOwnProperty.call(track, "bpm")) {
    track.bpm = null;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(track, "key")) {
    track.key = null;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(track, "trackStatus")) {
    track.trackStatus = null;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(track, "moodTags")) {
    track.moodTags = [];
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(track, "listenCount")) {
    track.listenCount = 0;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(track, "lufs")) {
    track.lufs = null;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(track, "peakDb")) {
    track.peakDb = null;
    changed = true;
  }

  applyActiveTrackVersion(track);
  return changed;
}

function normalizeCoverVersion(value, fallbackTimestamp) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const filePath = sanitizeStoredPath(value.filePath);
  if (!filePath) {
    return null;
  }

  const createdAt = safeString(value.createdAt, 80) || fallbackTimestamp;
  const updatedAt = safeString(value.updatedAt, 80) || createdAt;

  return {
    id: safeString(value.id, 100) || crypto.randomUUID(),
    filePath,
    createdAt,
    updatedAt,
  };
}

function normalizeShareLink(value, fallbackTimestamp) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const token = safeString(value.token, 120);
  if (!token) {
    return null;
  }

  const createdAt = safeString(value.createdAt, 80) || fallbackTimestamp;
  const updatedAt = safeString(value.updatedAt, 80) || createdAt;

  return {
    id: safeString(value.id, 100) || crypto.randomUUID(),
    token,
    access: sanitizeShareAccess(value.access),
    createdAt,
    updatedAt,
  };
}

function normalizeProject(project) {
  let changed = false;
  const fallbackTimestamp = nowIso();

  if (!Array.isArray(project.tracks)) {
    project.tracks = [];
    changed = true;
  }

  project.tracks = project.tracks.filter(
    (track) => track && typeof track === "object",
  );
  project.tracks.forEach((track, index) => {
    const trackChanged = normalizeTrack(track, fallbackTimestamp);
    if (trackChanged) {
      changed = true;
    }

    if (!Number.isFinite(track.order)) {
      track.order = index;
      changed = true;
    }
  });

  const previousCoverVersions = JSON.stringify(project.coverVersions || []);
  const normalizedCoverVersions = Array.isArray(project.coverVersions)
    ? project.coverVersions
        .map((version) => normalizeCoverVersion(version, fallbackTimestamp))
        .filter((version) => version !== null)
    : [];

  if (JSON.stringify(normalizedCoverVersions) !== previousCoverVersions) {
    project.coverVersions = normalizedCoverVersions;
    changed = true;
  } else {
    project.coverVersions = normalizedCoverVersions;
  }

  if (!project.coverVersions.length && project.coverFile) {
    const legacyCover = normalizeCoverVersion(
      {
        id: crypto.randomUUID(),
        filePath: project.coverFile,
        createdAt: project.updatedAt || project.createdAt || fallbackTimestamp,
        updatedAt: project.updatedAt || project.createdAt || fallbackTimestamp,
      },
      fallbackTimestamp,
    );

    if (legacyCover) {
      project.coverVersions = [legacyCover];
      changed = true;
    }
  }

  if (
    project.coverVersions.length &&
    !project.coverVersions.some(
      (version) => version.id === project.activeCoverId,
    )
  ) {
    project.activeCoverId = project.coverVersions[0].id;
    changed = true;
  }

  const activeCover = project.coverVersions.find(
    (version) => version.id === project.activeCoverId,
  );
  const activeCoverPath = activeCover ? activeCover.filePath : null;
  if ((project.coverFile || null) !== (activeCoverPath || null)) {
    project.coverFile = activeCoverPath;
    changed = true;
  }

  let normalizedShareLinks = [];
  if (Array.isArray(project.shareLinks)) {
    normalizedShareLinks = project.shareLinks
      .map((link) => normalizeShareLink(link, fallbackTimestamp))
      .filter((link) => link !== null);
  }

  if (!normalizedShareLinks.length && project.shareToken) {
    const legacyShare = normalizeShareLink(
      {
        id: crypto.randomUUID(),
        token: project.shareToken,
        access: "listen",
        createdAt: project.updatedAt || project.createdAt || fallbackTimestamp,
        updatedAt: project.updatedAt || project.createdAt || fallbackTimestamp,
      },
      fallbackTimestamp,
    );

    if (legacyShare) {
      normalizedShareLinks.push(legacyShare);
    }
  }

  const previousShareLinks = JSON.stringify(project.shareLinks || []);
  if (JSON.stringify(normalizedShareLinks) !== previousShareLinks) {
    changed = true;
  }

  project.shareLinks = normalizedShareLinks;

  const firstShareToken = project.shareLinks.length
    ? project.shareLinks[0].token
    : null;
  if ((project.shareToken || null) !== firstShareToken) {
    project.shareToken = firstShareToken;
    changed = true;
  }

  // Phase 1 metadata fields — initialize with defaults if missing
  if (!Object.prototype.hasOwnProperty.call(project, "startDate")) {
    project.startDate = null;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(project, "releaseDate")) {
    project.releaseDate = null;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(project, "completionPercent")) {
    project.completionPercent = 0;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(project, "starRating")) {
    project.starRating = 0;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(project, "colorPalette")) {
    project.colorPalette = [];
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(project, "streamingChecklist")) {
    project.streamingChecklist = parseStreamingChecklist({});
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(project, "preSaveLink")) {
    project.preSaveLink = "";
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(project, "distributorNotes")) {
    project.distributorNotes = "";
    changed = true;
  }

  const previousMoodboardItems = JSON.stringify(project.moodboardItems || []);
  const normalizedMoodboardItems = parseMoodboardItems(project.moodboardItems);
  if (JSON.stringify(normalizedMoodboardItems) !== previousMoodboardItems) {
    changed = true;
  }
  project.moodboardItems = normalizedMoodboardItems;

  return changed;
}

function readDatabase() {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const fallbackTimestamp = nowIso();
    const database = {
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
      users: Array.isArray(parsed.users) ? parsed.users : [],
    };

    let changed = false;
    database.projects.forEach((project) => {
      if (normalizeProject(project)) {
        changed = true;
      }
    });

    const previousUsers = JSON.stringify(database.users);
    database.users = database.users
      .map((user) => normalizeUser(user, fallbackTimestamp))
      .filter((user) => user !== null);

    const usernames = new Set();
    const dedupedUsers = [];
    for (const user of database.users) {
      const key = usernameKey(user.username);
      if (usernames.has(key)) {
        changed = true;
        continue;
      }

      usernames.add(key);
      dedupedUsers.push(user);
    }
    database.users = dedupedUsers;

    if (database.users.length && !database.users.some((user) => user.isAdmin)) {
      database.users[0].isAdmin = true;
      changed = true;
    }

    if (JSON.stringify(database.users) !== previousUsers) {
      changed = true;
    }

    if (changed) {
      writeDatabase(database);
    }

    return database;
  } catch (error) {
    return { projects: [], users: [] };
  }
}

function findProjectById(database, projectId) {
  return database.projects.find((project) => project.id === projectId);
}

function findUserById(database, userId) {
  return (database.users || []).find((user) => user.id === userId) || null;
}

function findUserByUsername(database, username) {
  const key = usernameKey(username);
  return (
    (database.users || []).find((user) => usernameKey(user.username) === key) ||
    null
  );
}

function findProjectShareByToken(database, token) {
  for (const project of database.projects) {
    const shareLinks = Array.isArray(project.shareLinks)
      ? project.shareLinks
      : [];
    const shareLink = shareLinks.find((link) => link.token === token);
    if (shareLink) {
      return { project, shareLink };
    }
  }

  return { project: null, shareLink: null };
}

function getProjectRuntimeSeconds(project) {
  return sortTracks(project.tracks || []).reduce((total, track) => {
    const duration = parseDuration(track.durationSeconds);
    return total + (duration || 0);
  }, 0);
}

function getPrimaryShareLink(project) {
  const links = Array.isArray(project.shareLinks) ? project.shareLinks : [];
  if (!links.length) {
    return null;
  }

  return links[0];
}

function toShareLinkPayload(shareLink) {
  return {
    id: shareLink.id,
    access: sanitizeShareAccess(shareLink.access),
    shareUrl: `/share/${shareLink.token}`,
    createdAt: shareLink.createdAt,
    updatedAt: shareLink.updatedAt,
  };
}

function toTrackResponse(track, projectId, shareLink) {
  const versions = Array.isArray(track.versions) ? track.versions : [];
  const shareToken = shareLink ? shareLink.token : null;
  const access = shareLink ? sanitizeShareAccess(shareLink.access) : "edit";
  const canListen = !shareLink || canShareListen(access);

  return {
    id: track.id,
    title: track.title || "",
    trackNumber: track.trackNumber ?? null,
    notes: track.notes || "",
    lyrics: track.lyrics || "",
    todos: normalizeTodos(track.todos),
    originalName: track.originalName || "",
    durationSeconds: parseDuration(track.durationSeconds),
    sizeBytes: parseSize(track.sizeBytes),
    versionCount: versions.length,
    activeVersionId: track.activeVersionId || null,
    bpm: track.bpm ?? null,
    key: track.key || null,
    trackStatus: track.trackStatus || null,
    moodTags: Array.isArray(track.moodTags) ? track.moodTags : [],
    listenCount: parseListenCount(track.listenCount),
    lufs: parseLufsValue(track.lufs),
    peakDb: parseLufsValue(track.peakDb),
    versions: versions.map((version) => ({
      id: version.id,
      originalName: version.originalName || "",
      durationSeconds: parseDuration(version.durationSeconds),
      sizeBytes: parseSize(version.sizeBytes),
      createdAt: version.createdAt,
      updatedAt: version.updatedAt,
      audioUrl: canListen
        ? shareToken
          ? `/api/share/${shareToken}/tracks/${track.id}/versions/${version.id}/file`
          : `/api/projects/${projectId}/tracks/${track.id}/versions/${version.id}/file`
        : null,
    })),
    createdAt: track.createdAt,
    updatedAt: track.updatedAt,
    audioUrl: canListen
      ? shareToken
        ? `/api/share/${shareToken}/tracks/${track.id}/file`
        : `/api/projects/${projectId}/tracks/${track.id}/file`
      : null,
  };
}

function toProjectSummary(project) {
  const tracks = sortTracks(project.tracks || []);
  const primaryShare = getPrimaryShareLink(project);
  const activeCover = (project.coverVersions || []).find(
    (version) => version.id === project.activeCoverId,
  );

  return {
    id: project.id,
    title: project.title || "",
    artist: project.artist || "",
    description: project.description || "",
    status: project.status || "In Progress",
    coverUrl: activeCover ? `/api/projects/${project.id}/cover` : null,
    trackCount: tracks.length,
    totalRuntimeSeconds: getProjectRuntimeSeconds(project),
    shareUrl: primaryShare ? `/share/${primaryShare.token}` : null,
    shareLinks: (project.shareLinks || []).map(toShareLinkPayload),
    completionPercent: project.completionPercent || 0,
    starRating: project.starRating || 0,
    startDate: project.startDate || null,
    releaseDate: project.releaseDate || null,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

function toProjectDetails(project, shareLink = null) {
  const shareAccess = shareLink ? sanitizeShareAccess(shareLink.access) : null;
  const canListen = !shareLink || canShareListen(shareAccess);
  const canEdit = !shareLink || canShareEdit(shareAccess);
  const tracks = sortTracks(project.tracks || []).map((track) =>
    toTrackResponse(track, project.id, shareLink),
  );
  const activeCover = (project.coverVersions || []).find(
    (version) => version.id === project.activeCoverId,
  );
  const primaryShare = getPrimaryShareLink(project);

  return {
    id: project.id,
    title: project.title || "",
    artist: project.artist || "",
    description: project.description || "",
    status: project.status || "In Progress",
    coverUrl: activeCover
      ? shareLink
        ? `/api/share/${shareLink.token}/cover`
        : `/api/projects/${project.id}/cover`
      : null,
    coverVersions: (project.coverVersions || []).map((version) => ({
      id: version.id,
      createdAt: version.createdAt,
      updatedAt: version.updatedAt,
      coverUrl: shareLink
        ? `/api/share/${shareLink.token}/covers/${version.id}`
        : `/api/projects/${project.id}/covers/${version.id}`,
    })),
    activeCoverId: project.activeCoverId || null,
    shareUrl: primaryShare ? `/share/${primaryShare.token}` : null,
    shareLinks: shareLink
      ? []
      : (project.shareLinks || []).map(toShareLinkPayload),
    totalRuntimeSeconds: getProjectRuntimeSeconds(project),
    startDate: project.startDate || null,
    releaseDate: project.releaseDate || null,
    completionPercent: project.completionPercent || 0,
    starRating: project.starRating || 0,
    colorPalette: Array.isArray(project.colorPalette) ? project.colorPalette : [],
    streamingChecklist: project.streamingChecklist || parseStreamingChecklist({}),
    preSaveLink: project.preSaveLink || "",
    distributorNotes: project.distributorNotes || "",
    moodboardItems: Array.isArray(project.moodboardItems)
      ? project.moodboardItems
      : [],
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    tracks,
    readOnly: !canEdit,
    shareAccess,
    canListen,
    canEdit,
  };
}

async function hydrateProjectDurations(project) {
  let changed = false;
  const tracks = Array.isArray(project.tracks) ? project.tracks : [];

  for (const track of tracks) {
    const versions = Array.isArray(track.versions) ? track.versions : [];
    for (const version of versions) {
      if (parseDuration(version.durationSeconds) !== null) {
        continue;
      }

      try {
        const durationSeconds = await extractDurationSeconds(
          resolveStoredFile(version.filePath),
        );
        if (durationSeconds !== null) {
          version.durationSeconds = durationSeconds;
          changed = true;
        }
      } catch (error) {
        // Keep missing duration if metadata extraction fails.
      }
    }

    const previousDuration = parseDuration(track.durationSeconds);
    applyActiveTrackVersion(track);
    if (parseDuration(track.durationSeconds) !== previousDuration) {
      changed = true;
    }
  }

  if (changed) {
    project.updatedAt = nowIso();
  }

  return changed;
}

function resolveStoredFile(storedPath) {
  if (!storedPath || typeof storedPath !== "string") {
    throw new Error("Invalid stored path");
  }

  const normalized = storedPath.replace(/\\/g, "/");
  const absolutePath = path.resolve(FILES_DIR, normalized);
  const relativePath = path.relative(FILES_DIR, absolutePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error("Unsafe file path");
  }

  return absolutePath;
}

function deleteStoredFile(storedPath) {
  if (!storedPath) {
    return;
  }

  try {
    const absolutePath = resolveStoredFile(storedPath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    // Ignore file cleanup failures.
  }
}

function getMimeType(filePath, fallback) {
  if (fallback) {
    return fallback;
  }

  return (
    MIME_BY_EXTENSION[path.extname(filePath).toLowerCase()] ||
    "application/octet-stream"
  );
}

function streamFile(req, res, absolutePath, fallbackMimeType) {
  if (!fs.existsSync(absolutePath)) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  const stat = fs.statSync(absolutePath);
  const mimeType = getMimeType(absolutePath, fallbackMimeType);
  const rangeHeader = req.headers.range;

  if (!rangeHeader) {
    res.writeHead(200, {
      "Content-Type": mimeType,
      "Content-Length": stat.size,
      "Accept-Ranges": "bytes",
      "Cache-Control": "private, max-age=60",
    });

    fs.createReadStream(absolutePath).pipe(res);
    return;
  }

  const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
  if (!match) {
    res.status(416).set("Content-Range", `bytes */${stat.size}`).end();
    return;
  }

  let start = match[1] ? Number.parseInt(match[1], 10) : 0;
  let end = match[2] ? Number.parseInt(match[2], 10) : stat.size - 1;

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start > end ||
    end >= stat.size
  ) {
    res.status(416).set("Content-Range", `bytes */${stat.size}`).end();
    return;
  }

  const chunkSize = end - start + 1;
  res.writeHead(206, {
    "Content-Type": mimeType,
    "Content-Length": chunkSize,
    "Content-Range": `bytes ${start}-${end}/${stat.size}`,
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, max-age=60",
  });

  fs.createReadStream(absolutePath, { start, end }).pipe(res);
}

function makeStorage(directory) {
  return multer.diskStorage({
    destination: (_req, _file, callback) => {
      try {
        // Ensure runtime upload directories always exist, even if they were deleted while running.
        ensureDirectory(directory);
        callback(null, directory);
      } catch (error) {
        callback(error);
      }
    },
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${Date.now()}-${crypto.randomUUID()}${extension}`);
    },
  });
}

function createExtensionFilter(allowedExtensions, errorMessage) {
  return (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.has(extension)) {
      callback(new Error(errorMessage));
      return;
    }

    callback(null, true);
  };
}

ensureAppFiles();

const app = express();
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(express.json({ limit: "4mb" }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: SESSION_MAX_AGE_MS,
    },
  }),
);

function requireAuth(req, res, next) {
  if (!req.session || !req.session.authenticated || !req.session.userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const database = readDatabase();
  const user = findUserById(database, req.session.userId);
  if (!user) {
    req.session.destroy(() => {});
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  req.studioUser = user;
  next();
}

function requireAdmin(req, res, next) {
  if (!req.studioUser || !req.studioUser.isAdmin) {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  next();
}

function applyUserSession(req, user, options = {}) {
  const rememberMe = Boolean(options.rememberMe);
  req.session.authenticated = true;
  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.cookie.maxAge = rememberMe
    ? SESSION_REMEMBER_ME_MAX_AGE_MS
    : SESSION_MAX_AGE_MS;
}

function getSessionUser(req) {
  if (!req.session || !req.session.authenticated || !req.session.userId) {
    return null;
  }

  const database = readDatabase();
  return findUserById(database, req.session.userId);
}

function validatePasswordStrength(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (password.length > 200) {
    return "Password is too long";
  }

  return "";
}

const uploadTracks = multer({
  storage: makeStorage(AUDIO_DIR),
  limits: { fileSize: 1024 * 1024 * 1024 },
  fileFilter: createExtensionFilter(
    ALLOWED_AUDIO_EXTENSIONS,
    "Only WAV, MP3, and FLAC files are allowed",
  ),
});

const uploadCover = multer({
  storage: makeStorage(COVERS_DIR),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: createExtensionFilter(
    ALLOWED_IMAGE_EXTENSIONS,
    "Only JPG, PNG, and WEBP images are allowed",
  ),
});

app.get("/api/session", (req, res) => {
  const database = readDatabase();
  const user = getSessionUser(req);
  res.json({
    authenticated: Boolean(user),
    user: user ? toUserResponse(user) : null,
    needsSetup: !(database.users || []).length,
  });
});

app.post("/api/setup", async (req, res) => {
  const database = readDatabase();
  if ((database.users || []).length > 0) {
    res.status(409).json({ error: "Setup already completed" });
    return;
  }

  const username = sanitizeUsername(req.body && req.body.username);
  const password = sanitizePassword(req.body && req.body.password);
  const confirmPassword = sanitizePassword(req.body && req.body.confirmPassword);
  if (!username) {
    res.status(400).json({ error: "Username must be 3-40 characters and use letters, numbers, ., _, or -" });
    return;
  }

  const passwordError = validatePasswordStrength(password);
  if (passwordError) {
    res.status(400).json({ error: passwordError });
    return;
  }

  if (!confirmPassword || password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match" });
    return;
  }

  const timestamp = nowIso();
  const user = {
    id: crypto.randomUUID(),
    username,
    passwordHash: await bcrypt.hash(password, BCRYPT_COST),
    createdAt: timestamp,
    isAdmin: true,
  };
  database.users = [user];
  writeDatabase(database);

  req.session.regenerate((error) => {
    if (error) {
      res.status(500).json({ error: "Failed to create session" });
      return;
    }

    applyUserSession(req, user, { rememberMe: true });
    res.status(201).json({ ok: true, user: toUserResponse(user) });
  });
});

app.post("/api/login", async (req, res) => {
  const database = readDatabase();
  if (!(database.users || []).length) {
    res.status(409).json({ error: "No users found. Create the first account." });
    return;
  }

  const username = sanitizeUsername(req.body && req.body.username);
  const password = sanitizePassword(req.body && req.body.password);
  const rememberMe = Boolean(req.body && req.body.rememberMe);

  if (!username || !password) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const user = findUserByUsername(database, username);
  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  req.session.regenerate((error) => {
    if (error) {
      res.status(500).json({ error: "Failed to create session" });
      return;
    }

    applyUserSession(req, user, { rememberMe });
    res.json({ ok: true, user: toUserResponse(user) });
  });
});

app.post("/api/logout", requireAuth, (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).json({ error: "Failed to destroy session" });
      return;
    }

    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

app.get("/api/account", requireAuth, (req, res) => {
  res.json({ user: toUserResponse(req.studioUser) });
});

app.patch("/api/account", requireAuth, async (req, res) => {
  const database = readDatabase();
  const user = findUserById(database, req.studioUser.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  let changed = false;

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "username")) {
    const username = sanitizeUsername(req.body.username);
    if (!username) {
      res.status(400).json({ error: "Username must be 3-40 characters and use letters, numbers, ., _, or -" });
      return;
    }

    const existingUser = findUserByUsername(database, username);
    if (existingUser && existingUser.id !== user.id) {
      res.status(409).json({ error: "Username is already taken" });
      return;
    }

    if (user.username !== username) {
      user.username = username;
      changed = true;
    }
  }

  const hasPasswordChange =
    Object.prototype.hasOwnProperty.call(req.body || {}, "currentPassword") ||
    Object.prototype.hasOwnProperty.call(req.body || {}, "newPassword");
  if (hasPasswordChange) {
    const currentPassword = sanitizePassword(req.body && req.body.currentPassword);
    const newPassword = sanitizePassword(req.body && req.body.newPassword);
    const confirmPassword = sanitizePassword(req.body && req.body.confirmPassword);

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: "Current password and new password are required" });
      return;
    }

    const matches = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!matches) {
      res.status(401).json({ error: "Current password is incorrect" });
      return;
    }

    const passwordError = validatePasswordStrength(newPassword);
    if (passwordError) {
      res.status(400).json({ error: passwordError });
      return;
    }

    if (!confirmPassword || newPassword !== confirmPassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }

    user.passwordHash = await bcrypt.hash(newPassword, BCRYPT_COST);
    changed = true;
  }

  if (changed) {
    writeDatabase(database);
  }

  req.session.username = user.username;
  res.json({ user: toUserResponse(user) });
});

app.get("/api/users", requireAuth, requireAdmin, (req, res) => {
  const database = readDatabase();
  res.json({
    users: (database.users || []).map((user) => toUserResponse(user)),
  });
});

app.post("/api/users", requireAuth, requireAdmin, async (req, res) => {
  const database = readDatabase();
  const username = sanitizeUsername(req.body && req.body.username);
  const password = sanitizePassword(req.body && req.body.password);
  const confirmPassword = sanitizePassword(req.body && req.body.confirmPassword);

  if (!username) {
    res.status(400).json({ error: "Username must be 3-40 characters and use letters, numbers, ., _, or -" });
    return;
  }

  if (findUserByUsername(database, username)) {
    res.status(409).json({ error: "Username is already taken" });
    return;
  }

  const passwordError = validatePasswordStrength(password);
  if (passwordError) {
    res.status(400).json({ error: passwordError });
    return;
  }

  if (!confirmPassword || password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match" });
    return;
  }

  const user = {
    id: crypto.randomUUID(),
    username,
    passwordHash: await bcrypt.hash(password, BCRYPT_COST),
    createdAt: nowIso(),
    isAdmin: false,
  };
  database.users = Array.isArray(database.users) ? database.users : [];
  database.users.push(user);
  writeDatabase(database);
  res.status(201).json({ user: toUserResponse(user) });
});

app.delete("/api/users/:userId", requireAuth, requireAdmin, (req, res) => {
  if (req.params.userId === req.studioUser.id) {
    res.status(400).json({ error: "Admins cannot delete their own account" });
    return;
  }

  const database = readDatabase();
  const userIndex = (database.users || []).findIndex(
    (user) => user.id === req.params.userId,
  );
  if (userIndex < 0) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  database.users.splice(userIndex, 1);
  writeDatabase(database);
  res.json({ ok: true });
});

const projectsRouter = express.Router();
projectsRouter.use(requireAuth);

projectsRouter.get("/", async (_req, res) => {
  const database = readDatabase();
  let changed = false;
  for (const project of database.projects) {
    if (await hydrateProjectDurations(project)) {
      changed = true;
    }
  }

  if (changed) {
    writeDatabase(database);
  }

  const projects = [...database.projects]
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .map(toProjectSummary);

  res.json({ projects });
});

function findTrack(project, trackId) {
  return (project.tracks || []).find((candidate) => candidate.id === trackId);
}

function findTrackVersion(track, versionId) {
  return (track.versions || []).find((version) => version.id === versionId);
}

function findCoverVersion(project, coverId) {
  return (project.coverVersions || []).find(
    (version) => version.id === coverId,
  );
}

function removeTrackVersion(project, track, versionId, res) {
  const versions = Array.isArray(track.versions) ? track.versions : [];
  const versionIndex = versions.findIndex((version) => version.id === versionId);

  if (versionIndex < 0) {
    res.status(404).json({ error: "Track version not found" });
    return false;
  }

  if (versions.length <= 1) {
    res.status(400).json({ error: "Delete the track to remove its only version" });
    return false;
  }

  const [removedVersion] = versions.splice(versionIndex, 1);
  deleteStoredFile(removedVersion.filePath);

  track.versions = versions;
  if (track.activeVersionId === versionId) {
    track.activeVersionId = versions[0].id;
  }

  applyActiveTrackVersion(track);
  track.updatedAt = nowIso();
  project.updatedAt = track.updatedAt;
  return true;
}

function applyTrackFields(track, body, res) {
  if (Object.prototype.hasOwnProperty.call(body || {}, "title")) {
    track.title = safeString(body.title, 180);
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "notes")) {
    track.notes = safeString(body.notes, 4000);
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "lyrics")) {
    track.lyrics = safeString(body.lyrics, 12000);
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "todos")) {
    if (body.todos === "" || body.todos === null) {
      track.todos = [];
    } else if (Array.isArray(body.todos) || typeof body.todos === "string") {
      track.todos = normalizeTodos(body.todos);
    } else {
      res.status(400).json({ error: "todos must be a list or string" });
      return false;
    }
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "trackNumber")) {
    const parsedNumber = parseTrackNumber(body.trackNumber);
    if (
      body.trackNumber !== "" &&
      body.trackNumber !== null &&
      parsedNumber === null
    ) {
      res.status(400).json({ error: "trackNumber must be a number" });
      return false;
    }

    track.trackNumber = parsedNumber;
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "bpm")) {
    track.bpm = parseBpm(body.bpm);
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "key")) {
    const keyValue = safeString(String(body.key || ""), 40);
    track.key = MUSICAL_KEYS.includes(keyValue) ? keyValue : null;
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "trackStatus")) {
    track.trackStatus = parseTrackStatus(body.trackStatus);
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "moodTags")) {
    track.moodTags = parseMoodTags(body.moodTags);
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "lufs")) {
    track.lufs = parseLufsValue(body.lufs);
  }

  if (Object.prototype.hasOwnProperty.call(body || {}, "peakDb")) {
    track.peakDb = parseLufsValue(body.peakDb);
  }

  return true;
}

function requireSharePermission(shareLink, required, res) {
  const access = sanitizeShareAccess(shareLink.access);
  if (required === "listen" && !canShareListen(access)) {
    res.status(403).json({ error: "This share link does not allow playback" });
    return false;
  }

  if (required === "edit" && !canShareEdit(access)) {
    res.status(403).json({ error: "This share link does not allow editing" });
    return false;
  }

  return true;
}

function resolveShareRequest(req, res) {
  const database = readDatabase();
  const { project, shareLink } = findProjectShareByToken(
    database,
    req.params.token,
  );

  if (!project || !shareLink) {
    res.status(404).json({ error: "Share link not found" });
    return null;
  }

  return { database, project, shareLink };
}

projectsRouter.post("/", (req, res) => {
  const database = readDatabase();
  const timestamp = nowIso();

  const project = {
    id: crypto.randomUUID(),
    title: safeString(req.body && req.body.title, 140) || "Untitled Project",
    artist: safeString(req.body && req.body.artist, 140) || "Unknown Artist",
    description: safeString(req.body && req.body.description, 4000),
    status: safeStatus(req.body && req.body.status),
    coverFile: null,
    coverVersions: [],
    activeCoverId: null,
    shareToken: null,
    shareLinks: [],
    tracks: [],
    startDate: null,
    releaseDate: null,
    completionPercent: 0,
    starRating: 0,
    colorPalette: [],
    streamingChecklist: parseStreamingChecklist({}),
    preSaveLink: "",
    distributorNotes: "",
    moodboardItems: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  database.projects.unshift(project);
  writeDatabase(database);

  res.status(201).json({ project: toProjectDetails(project) });
});

projectsRouter.get("/:projectId", async (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  if (await hydrateProjectDurations(project)) {
    writeDatabase(database);
  }

  res.json({ project: toProjectDetails(project) });
});

projectsRouter.patch("/:projectId", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "title")) {
    project.title = safeString(req.body.title, 140) || "Untitled Project";
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "artist")) {
    project.artist = safeString(req.body.artist, 140) || "Unknown Artist";
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "description")) {
    project.description = safeString(req.body.description, 4000);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "status")) {
    project.status = safeStatus(req.body.status);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "releaseDate")) {
    project.releaseDate = parseReleaseDate(req.body.releaseDate);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "startDate")) {
    project.startDate = parseReleaseDate(req.body.startDate);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "completionPercent")) {
    project.completionPercent = parseCompletionPercent(req.body.completionPercent);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "starRating")) {
    project.starRating = parseStarRating(req.body.starRating);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "colorPalette")) {
    project.colorPalette = parseColorPalette(req.body.colorPalette);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "streamingChecklist")) {
    project.streamingChecklist = parseStreamingChecklist(req.body.streamingChecklist);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "preSaveLink")) {
    project.preSaveLink = safeUrl(req.body.preSaveLink);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "distributorNotes")) {
    project.distributorNotes = safeString(req.body.distributorNotes, 4000);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "moodboardItems")) {
    project.moodboardItems = parseMoodboardItems(req.body.moodboardItems);
  }

  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project) });
});

projectsRouter.delete("/:projectId", (req, res) => {
  const database = readDatabase();
  const projectIndex = database.projects.findIndex(
    (project) => project.id === req.params.projectId,
  );

  if (projectIndex < 0) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const [removedProject] = database.projects.splice(projectIndex, 1);

  (removedProject.coverVersions || []).forEach((coverVersion) => {
    deleteStoredFile(coverVersion.filePath);
  });

  (removedProject.tracks || []).forEach((track) => {
    (track.versions || []).forEach((version) => {
      deleteStoredFile(version.filePath);
    });
  });

  writeDatabase(database);
  res.json({ ok: true });
});

projectsRouter.post("/:projectId/share", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const timestamp = nowIso();
  const shareLink = {
    id: crypto.randomUUID(),
    token: crypto.randomBytes(9).toString("hex"),
    access: sanitizeShareAccess(req.body && req.body.access),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  project.shareLinks = Array.isArray(project.shareLinks)
    ? project.shareLinks
    : [];
  project.shareLinks.unshift(shareLink);
  project.shareToken = project.shareLinks[0].token;
  project.updatedAt = timestamp;
  writeDatabase(database);

  res.status(201).json({
    shareLink: toShareLinkPayload(shareLink),
    project: toProjectDetails(project),
  });
});

projectsRouter.delete("/:projectId/share/:shareId", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const shareLinks = Array.isArray(project.shareLinks)
    ? project.shareLinks
    : [];
  const shareIndex = shareLinks.findIndex(
    (link) => link.id === req.params.shareId,
  );
  if (shareIndex < 0) {
    res.status(404).json({ error: "Share link not found" });
    return;
  }

  shareLinks.splice(shareIndex, 1);
  project.shareLinks = shareLinks;
  project.shareToken = shareLinks.length ? shareLinks[0].token : null;
  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project) });
});

projectsRouter.post(
  "/:projectId/cover",
  uploadCover.single("cover"),
  (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Cover image is required" });
      return;
    }

    const database = readDatabase();
    const project = findProjectById(database, req.params.projectId);

    if (!project) {
      deleteStoredFile(path.posix.join("covers", req.file.filename));
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const timestamp = nowIso();
    const coverVersion = {
      id: crypto.randomUUID(),
      filePath: path.posix.join("covers", req.file.filename),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    project.coverVersions = Array.isArray(project.coverVersions)
      ? project.coverVersions
      : [];
    project.coverVersions.unshift(coverVersion);
    project.activeCoverId = coverVersion.id;
    project.coverFile = coverVersion.filePath;
    project.updatedAt = timestamp;
    writeDatabase(database);

    res.json({ project: toProjectDetails(project) });
  },
);

projectsRouter.post("/:projectId/covers/:coverId/select", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const coverVersion = findCoverVersion(project, req.params.coverId);
  if (!coverVersion) {
    res.status(404).json({ error: "Cover version not found" });
    return;
  }

  project.activeCoverId = coverVersion.id;
  project.coverFile = coverVersion.filePath;
  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project) });
});

projectsRouter.get("/:projectId/cover", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project || !project.coverFile) {
    res.status(404).json({ error: "Cover not found" });
    return;
  }

  streamFile(req, res, resolveStoredFile(project.coverFile));
});

projectsRouter.get("/:projectId/covers/:coverId", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const coverVersion = findCoverVersion(project, req.params.coverId);
  if (!coverVersion) {
    res.status(404).json({ error: "Cover version not found" });
    return;
  }

  streamFile(req, res, resolveStoredFile(coverVersion.filePath));
});

projectsRouter.delete("/:projectId/covers/:coverId", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const coverVersion = findCoverVersion(project, req.params.coverId);
  if (!coverVersion) {
    res.status(404).json({ error: "Cover version not found" });
    return;
  }

  deleteStoredFile(coverVersion.filePath);

  project.coverVersions = (project.coverVersions || []).filter(
    (v) => v.id !== req.params.coverId,
  );

  if (project.activeCoverId === req.params.coverId) {
    const remaining = (project.coverVersions || [])[0] || null;
    project.activeCoverId = remaining ? remaining.id : null;
    project.coverFile = remaining ? remaining.filePath : null;
  }

  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project) });
});

projectsRouter.post(
  "/:projectId/tracks",
  uploadTracks.array("tracks", 80),
  async (req, res) => {
    const files = req.files || [];
    if (!files.length) {
      res.status(400).json({ error: "Upload at least one track" });
      return;
    }

    const database = readDatabase();
    const project = findProjectById(database, req.params.projectId);

    if (!project) {
      files.forEach((file) => {
        deleteStoredFile(path.posix.join("audio", file.filename));
      });
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const timestamp = nowIso();
    const baseOrder = (project.tracks || []).length;

    const newTracks = await Promise.all(
      files.map(async (file, index) => {
        const storedPath = path.posix.join("audio", file.filename);
        const durationSeconds = await extractDurationSeconds(
          resolveStoredFile(storedPath),
        );
        const version = {
          id: crypto.randomUUID(),
          filePath: storedPath,
          originalName: safeString(file.originalname, 260),
          mimeType: safeString(file.mimetype || "", 120),
          durationSeconds,
          sizeBytes: parseSize(file.size),
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        return {
          id: crypto.randomUUID(),
          filePath: version.filePath,
          originalName: version.originalName,
          mimeType: version.mimeType,
          durationSeconds: version.durationSeconds,
          sizeBytes: version.sizeBytes,
          versions: [version],
          activeVersionId: version.id,
          title: "",
          trackNumber: null,
          notes: "",
          lyrics: "",
          todos: [],
          bpm: null,
          key: null,
          trackStatus: null,
          moodTags: [],
          listenCount: 0,
          lufs: null,
          peakDb: null,
          order: baseOrder + index,
          createdAt: timestamp,
          updatedAt: timestamp,
        };
      }),
    );

    project.tracks = [...(project.tracks || []), ...newTracks];
    project.updatedAt = timestamp;
    writeDatabase(database);

    res.status(201).json({ project: toProjectDetails(project) });
  },
);

projectsRouter.patch("/:projectId/tracks/reorder", (req, res) => {
  const trackIds = Array.isArray(req.body && req.body.trackIds)
    ? req.body.trackIds
    : null;
  if (!trackIds || !trackIds.length) {
    res.status(400).json({ error: "trackIds array is required" });
    return;
  }

  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const tracks = project.tracks || [];
  if (trackIds.length !== tracks.length) {
    res.status(400).json({ error: "trackIds length mismatch" });
    return;
  }

  const uniqueIds = new Set(trackIds);
  if (uniqueIds.size !== tracks.length) {
    res.status(400).json({ error: "trackIds must be unique" });
    return;
  }

  const byId = new Map(tracks.map((track) => [track.id, track]));
  if (!trackIds.every((id) => byId.has(id))) {
    res.status(400).json({ error: "trackIds contain unknown ids" });
    return;
  }

  trackIds.forEach((id, index) => {
    byId.get(id).order = index;
  });

  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project) });
});

projectsRouter.patch("/:projectId/tracks/:trackId", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const track = findTrack(project, req.params.trackId);
  if (!track) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  if (!applyTrackFields(track, req.body, res)) {
    return;
  }

  track.updatedAt = nowIso();
  project.updatedAt = track.updatedAt;
  writeDatabase(database);

  res.json({ project: toProjectDetails(project) });
});

projectsRouter.post("/:projectId/tracks/:trackId/play", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const track = findTrack(project, req.params.trackId);
  if (!track) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  track.listenCount = parseListenCount(track.listenCount) + 1;
  track.updatedAt = nowIso();
  project.updatedAt = track.updatedAt;
  writeDatabase(database);

  res.json({ listenCount: track.listenCount });
});

projectsRouter.post(
  "/:projectId/tracks/:trackId/versions",
  uploadTracks.single("track"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Track file is required" });
      return;
    }

    const database = readDatabase();
    const project = findProjectById(database, req.params.projectId);

    if (!project) {
      deleteStoredFile(path.posix.join("audio", req.file.filename));
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const track = findTrack(project, req.params.trackId);
    if (!track) {
      deleteStoredFile(path.posix.join("audio", req.file.filename));
      res.status(404).json({ error: "Track not found" });
      return;
    }

    const timestamp = nowIso();
    const storedPath = path.posix.join("audio", req.file.filename);
    const version = {
      id: crypto.randomUUID(),
      filePath: storedPath,
      originalName: safeString(req.file.originalname, 260),
      mimeType: safeString(req.file.mimetype || "", 120),
      durationSeconds: await extractDurationSeconds(
        resolveStoredFile(storedPath),
      ),
      sizeBytes: parseSize(req.file.size),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    track.versions = Array.isArray(track.versions) ? track.versions : [];
    track.versions.unshift(version);
    track.activeVersionId = version.id;
    applyActiveTrackVersion(track);
    track.updatedAt = timestamp;
    project.updatedAt = timestamp;
    writeDatabase(database);

    res.status(201).json({ project: toProjectDetails(project) });
  },
);

projectsRouter.post(
  "/:projectId/tracks/:trackId/versions/:versionId/select",
  (req, res) => {
    const database = readDatabase();
    const project = findProjectById(database, req.params.projectId);

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const track = findTrack(project, req.params.trackId);
    if (!track) {
      res.status(404).json({ error: "Track not found" });
      return;
    }

    const version = findTrackVersion(track, req.params.versionId);
    if (!version) {
      res.status(404).json({ error: "Track version not found" });
      return;
    }

    track.activeVersionId = version.id;
    applyActiveTrackVersion(track);
    track.updatedAt = nowIso();
    project.updatedAt = track.updatedAt;
    writeDatabase(database);

    res.json({ project: toProjectDetails(project) });
  },
);

projectsRouter.delete(
  "/:projectId/tracks/:trackId/versions/:versionId",
  (req, res) => {
    const database = readDatabase();
    const project = findProjectById(database, req.params.projectId);

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const track = findTrack(project, req.params.trackId);
    if (!track) {
      res.status(404).json({ error: "Track not found" });
      return;
    }

    if (!removeTrackVersion(project, track, req.params.versionId, res)) {
      return;
    }

    writeDatabase(database);
    res.json({ project: toProjectDetails(project) });
  },
);

projectsRouter.delete("/:projectId/tracks/:trackId", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const index = (project.tracks || []).findIndex(
    (candidate) => candidate.id === req.params.trackId,
  );
  if (index === -1) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  const [removed] = project.tracks.splice(index, 1);
  (removed.versions || []).forEach((version) => {
    deleteStoredFile(version.filePath);
  });

  project.tracks = sortTracks(project.tracks).map((track, order) => ({
    ...track,
    order,
  }));
  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project) });
});

projectsRouter.get("/:projectId/tracks/:trackId/file", (req, res) => {
  const database = readDatabase();
  const project = findProjectById(database, req.params.projectId);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const track = findTrack(project, req.params.trackId);
  if (!track || !track.filePath) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  streamFile(
    req,
    res,
    resolveStoredFile(track.filePath),
    track.mimeType || undefined,
  );
});

projectsRouter.get(
  "/:projectId/tracks/:trackId/versions/:versionId/file",
  (req, res) => {
    const database = readDatabase();
    const project = findProjectById(database, req.params.projectId);

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    const track = findTrack(project, req.params.trackId);
    if (!track) {
      res.status(404).json({ error: "Track not found" });
      return;
    }

    const version = findTrackVersion(track, req.params.versionId);
    if (!version) {
      res.status(404).json({ error: "Track version not found" });
      return;
    }

    streamFile(
      req,
      res,
      resolveStoredFile(version.filePath),
      version.mimeType || undefined,
    );
  },
);

app.use("/api/projects", projectsRouter);

app.get("/api/share/:token", async (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  if (await hydrateProjectDurations(context.project)) {
    writeDatabase(context.database);
  }

  res.json({ project: toProjectDetails(context.project, context.shareLink) });
});

app.patch("/api/share/:token/project", (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  const { database, project, shareLink } = context;
  if (!requireSharePermission(shareLink, "edit", res)) {
    return;
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "title")) {
    project.title = safeString(req.body.title, 140) || "Untitled Project";
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "artist")) {
    project.artist = safeString(req.body.artist, 140) || "Unknown Artist";
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "description")) {
    project.description = safeString(req.body.description, 4000);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "status")) {
    project.status = safeStatus(req.body.status);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "releaseDate")) {
    project.releaseDate = parseReleaseDate(req.body.releaseDate);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "startDate")) {
    project.startDate = parseReleaseDate(req.body.startDate);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "completionPercent")) {
    project.completionPercent = parseCompletionPercent(req.body.completionPercent);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "starRating")) {
    project.starRating = parseStarRating(req.body.starRating);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "colorPalette")) {
    project.colorPalette = parseColorPalette(req.body.colorPalette);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "streamingChecklist")) {
    project.streamingChecklist = parseStreamingChecklist(req.body.streamingChecklist);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "preSaveLink")) {
    project.preSaveLink = safeUrl(req.body.preSaveLink);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "distributorNotes")) {
    project.distributorNotes = safeString(req.body.distributorNotes, 4000);
  }

  if (Object.prototype.hasOwnProperty.call(req.body || {}, "moodboardItems")) {
    project.moodboardItems = parseMoodboardItems(req.body.moodboardItems);
  }

  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project, shareLink) });
});

app.patch("/api/share/:token/tracks/:trackId", (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  const { database, project, shareLink } = context;
  if (!requireSharePermission(shareLink, "edit", res)) {
    return;
  }

  const track = findTrack(project, req.params.trackId);
  if (!track) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  if (!applyTrackFields(track, req.body, res)) {
    return;
  }

  track.updatedAt = nowIso();
  project.updatedAt = track.updatedAt;
  writeDatabase(database);

  res.json({ project: toProjectDetails(project, shareLink) });
});

app.post("/api/share/:token/tracks/:trackId/play", (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  const { database, project, shareLink } = context;
  if (!requireSharePermission(shareLink, "listen", res)) {
    return;
  }

  const track = findTrack(project, req.params.trackId);
  if (!track) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  track.listenCount = parseListenCount(track.listenCount) + 1;
  track.updatedAt = nowIso();
  project.updatedAt = track.updatedAt;
  writeDatabase(database);

  res.json({ listenCount: track.listenCount });
});

app.delete("/api/share/:token/tracks/:trackId", (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  const { database, project, shareLink } = context;
  if (!requireSharePermission(shareLink, "edit", res)) {
    return;
  }

  const index = (project.tracks || []).findIndex(
    (candidate) => candidate.id === req.params.trackId,
  );
  if (index < 0) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  const [removedTrack] = project.tracks.splice(index, 1);
  (removedTrack.versions || []).forEach((version) => {
    deleteStoredFile(version.filePath);
  });

  project.tracks = sortTracks(project.tracks).map((track, order) => ({
    ...track,
    order,
  }));
  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project, shareLink) });
});

app.post("/api/share/:token/cover", uploadCover.single("cover"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Cover image is required" });
    return;
  }

  const context = resolveShareRequest(req, res);
  if (!context) {
    deleteStoredFile(path.posix.join("covers", req.file.filename));
    return;
  }

  const { database, project, shareLink } = context;
  if (!requireSharePermission(shareLink, "edit", res)) {
    deleteStoredFile(path.posix.join("covers", req.file.filename));
    return;
  }

  const timestamp = nowIso();
  const coverVersion = {
    id: crypto.randomUUID(),
    filePath: path.posix.join("covers", req.file.filename),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  project.coverVersions = Array.isArray(project.coverVersions)
    ? project.coverVersions
    : [];
  project.coverVersions.unshift(coverVersion);
  project.activeCoverId = coverVersion.id;
  project.coverFile = coverVersion.filePath;
  project.updatedAt = timestamp;
  writeDatabase(database);

  res.json({ project: toProjectDetails(project, shareLink) });
});

app.post("/api/share/:token/covers/:coverId/select", (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  const { database, project, shareLink } = context;
  if (!requireSharePermission(shareLink, "edit", res)) {
    return;
  }

  const coverVersion = findCoverVersion(project, req.params.coverId);
  if (!coverVersion) {
    res.status(404).json({ error: "Cover version not found" });
    return;
  }

  project.activeCoverId = coverVersion.id;
  project.coverFile = coverVersion.filePath;
  project.updatedAt = nowIso();
  writeDatabase(database);

  res.json({ project: toProjectDetails(project, shareLink) });
});

app.post(
  "/api/share/:token/tracks/:trackId/versions",
  uploadTracks.single("track"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Track file is required" });
      return;
    }

    const context = resolveShareRequest(req, res);
    if (!context) {
      deleteStoredFile(path.posix.join("audio", req.file.filename));
      return;
    }

    const { database, project, shareLink } = context;
    if (!requireSharePermission(shareLink, "edit", res)) {
      deleteStoredFile(path.posix.join("audio", req.file.filename));
      return;
    }

    const track = findTrack(project, req.params.trackId);
    if (!track) {
      deleteStoredFile(path.posix.join("audio", req.file.filename));
      res.status(404).json({ error: "Track not found" });
      return;
    }

    const timestamp = nowIso();
    const storedPath = path.posix.join("audio", req.file.filename);
    const version = {
      id: crypto.randomUUID(),
      filePath: storedPath,
      originalName: safeString(req.file.originalname, 260),
      mimeType: safeString(req.file.mimetype || "", 120),
      durationSeconds: await extractDurationSeconds(
        resolveStoredFile(storedPath),
      ),
      sizeBytes: parseSize(req.file.size),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    track.versions = Array.isArray(track.versions) ? track.versions : [];
    track.versions.unshift(version);
    track.activeVersionId = version.id;
    applyActiveTrackVersion(track);
    track.updatedAt = timestamp;
    project.updatedAt = timestamp;
    writeDatabase(database);

    res.status(201).json({ project: toProjectDetails(project, shareLink) });
  },
);

app.post(
  "/api/share/:token/tracks/:trackId/versions/:versionId/select",
  (req, res) => {
    const context = resolveShareRequest(req, res);
    if (!context) {
      return;
    }

    const { database, project, shareLink } = context;
    if (!requireSharePermission(shareLink, "edit", res)) {
      return;
    }

    const track = findTrack(project, req.params.trackId);
    if (!track) {
      res.status(404).json({ error: "Track not found" });
      return;
    }

    const version = findTrackVersion(track, req.params.versionId);
    if (!version) {
      res.status(404).json({ error: "Track version not found" });
      return;
    }

    track.activeVersionId = version.id;
    applyActiveTrackVersion(track);
    track.updatedAt = nowIso();
    project.updatedAt = track.updatedAt;
    writeDatabase(database);

    res.json({ project: toProjectDetails(project, shareLink) });
  },
);

app.delete(
  "/api/share/:token/tracks/:trackId/versions/:versionId",
  (req, res) => {
    const context = resolveShareRequest(req, res);
    if (!context) {
      return;
    }

    const { database, project, shareLink } = context;
    if (!requireSharePermission(shareLink, "edit", res)) {
      return;
    }

    const track = findTrack(project, req.params.trackId);
    if (!track) {
      res.status(404).json({ error: "Track not found" });
      return;
    }

    if (!removeTrackVersion(project, track, req.params.versionId, res)) {
      return;
    }

    writeDatabase(database);
    res.json({ project: toProjectDetails(project, shareLink) });
  },
);

app.get("/api/share/:token/cover", (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  if (!context.project.coverFile) {
    res.status(404).json({ error: "Cover not found" });
    return;
  }

  streamFile(req, res, resolveStoredFile(context.project.coverFile));
});

app.get("/api/share/:token/covers/:coverId", (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  const coverVersion = findCoverVersion(context.project, req.params.coverId);
  if (!coverVersion) {
    res.status(404).json({ error: "Cover version not found" });
    return;
  }

  streamFile(req, res, resolveStoredFile(coverVersion.filePath));
});

app.get("/api/share/:token/tracks/:trackId/file", (req, res) => {
  const context = resolveShareRequest(req, res);
  if (!context) {
    return;
  }

  if (!requireSharePermission(context.shareLink, "listen", res)) {
    return;
  }

  const track = findTrack(context.project, req.params.trackId);
  if (!track || !track.filePath) {
    res.status(404).json({ error: "Track not found" });
    return;
  }

  streamFile(
    req,
    res,
    resolveStoredFile(track.filePath),
    track.mimeType || undefined,
  );
});

app.get(
  "/api/share/:token/tracks/:trackId/versions/:versionId/file",
  (req, res) => {
    const context = resolveShareRequest(req, res);
    if (!context) {
      return;
    }

    if (!requireSharePermission(context.shareLink, "listen", res)) {
      return;
    }

    const track = findTrack(context.project, req.params.trackId);
    if (!track) {
      res.status(404).json({ error: "Track not found" });
      return;
    }

    const version = findTrackVersion(track, req.params.versionId);
    if (!version) {
      res.status(404).json({ error: "Track version not found" });
      return;
    }

    streamFile(
      req,
      res,
      resolveStoredFile(version.filePath),
      version.mimeType || undefined,
    );
  },
);

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    res.status(400).json({ error: error.message });
    return;
  }

  if (error) {
    res.status(400).json({ error: error.message || "Request failed" });
    return;
  }

  res.status(500).json({ error: "Unexpected server error" });
});

if (!IS_API_ONLY_MODE) {
  app.use(express.static(PUBLIC_DIR));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.sendFile(path.join(PUBLIC_DIR, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`[Studio] Running on port ${PORT}`);
  console.log(`[Studio] Data directory: ${DATA_DIR}`);
  if (IS_API_ONLY_MODE) {
    console.log("[Studio] API-only mode enabled (for Vite dev server)");
  }
});
