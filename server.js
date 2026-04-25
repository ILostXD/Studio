require("dotenv").config();

const express = require("express");
const session = require("express-session");
const multer = require("multer");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { parseFile } = require("music-metadata");

const IS_API_ONLY_MODE = process.argv.includes("--api-only");

const PORT = Number(process.env.PORT || 3000);
const APP_PASSWORD = process.env.APP_PASSWORD || "studio";
const SESSION_SECRET = process.env.SESSION_SECRET || "studio-session-secret";
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const FILES_DIR = path.join(DATA_DIR, "files");
const AUDIO_DIR = path.join(FILES_DIR, "audio");
const COVERS_DIR = path.join(FILES_DIR, "covers");
const PUBLIC_DIR = path.join(__dirname, "public");

const STATUS_OPTIONS = ["In Progress", "Mastering", "Done"];
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
    fs.writeFileSync(DB_FILE, JSON.stringify({ projects: [] }, null, 2));
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

  return changed;
}

function readDatabase() {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const database = {
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
    };

    let changed = false;
    database.projects.forEach((project) => {
      if (normalizeProject(project)) {
        changed = true;
      }
    });

    if (changed) {
      writeDatabase(database);
    }

    return database;
  } catch (error) {
    return { projects: [] };
  }
}

function findProjectById(database, projectId) {
  return database.projects.find((project) => project.id === projectId);
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
      callback(null, directory);
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
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    next();
    return;
  }

  res.status(401).json({ error: "Authentication required" });
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
  res.json({
    authenticated: Boolean(req.session && req.session.authenticated),
  });
});

app.post("/api/login", (req, res) => {
  const suppliedPassword = safeString(req.body && req.body.password, 300);

  if (!suppliedPassword || suppliedPassword !== APP_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  req.session.regenerate((error) => {
    if (error) {
      res.status(500).json({ error: "Failed to create session" });
      return;
    }

    req.session.authenticated = true;
    res.json({ ok: true });
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

if (!process.env.APP_PASSWORD) {
  console.warn(
    "[Studio] APP_PASSWORD is not set. Using default password 'studio'.",
  );
}

app.listen(PORT, () => {
  console.log(`[Studio] Running on port ${PORT}`);
  console.log(`[Studio] Data directory: ${DATA_DIR}`);
  if (IS_API_ONLY_MODE) {
    console.log("[Studio] API-only mode enabled (for Vite dev server)");
  }
});
