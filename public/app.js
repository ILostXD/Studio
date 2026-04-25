const appRoot = document.getElementById("app");
const playerElement = document.getElementById("player");
const waveformElement = document.getElementById("waveform");
const playerPlayButton = document.getElementById("player-play");
const playerPrevButton = document.getElementById("player-prev");
const playerNextButton = document.getElementById("player-next");
const playerCurrentTimeElement = document.getElementById("player-current-time");
const playerDurationElement = document.getElementById("player-duration");
const playerTitleElement = document.getElementById("player-track-title");
const playerSubtitleElement = document.getElementById("player-track-subtitle");
const playerCoverElement = document.getElementById("player-cover-art");
const playerVolumeInput = document.getElementById("player-volume");
const playerVolumeToggleButton = document.getElementById(
  "player-volume-toggle",
);
const playerAlbumTitleElement = document.getElementById("player-album-title");
const playerQueueBtn = document.getElementById("player-queue-btn");
const playerQueuePopover = document.getElementById("player-queue-popover");
const playerQueueList = document.getElementById("player-queue-list");
const playerShuffleBtn = document.getElementById("player-shuffle-btn");
const playerLoopBtn = document.getElementById("player-loop-btn");
const toastElement = document.getElementById("toast");

// Hidden audio element used to pre-buffer the next track in the background
// so that the browser cache serves it instantly when WaveSurfer loads it.
const preloadAudioEl = document.createElement("audio");
preloadAudioEl.preload = "auto";

const STATUS_OPTIONS = ["In Progress", "Mastering", "Done"];
const TRACK_STATUS_OPTIONS = ["Idea", "Demo", "Recording", "Mixing", "Mastering", "Done"];
const TRACK_STATUS_COLORS = {
  Idea: "#6e6e8a",
  Demo: "#4a9eff",
  Recording: "#ff8c42",
  Mixing: "#f5c518",
  Mastering: "#a89eff",
  Done: "#3ecf8e",
};
const MOOD_TAG_OPTIONS = ["Dark", "Energetic", "Melancholic", "Hype", "Chill", "Aggressive", "Euphoric", "Nostalgic"];
const MOOD_TAG_COLORS = {
  Dark: "#5a4a6e",
  Energetic: "#ff5e3a",
  Melancholic: "#4a7ebd",
  Hype: "#ff3cac",
  Chill: "#38b2ac",
  Aggressive: "#e53e3e",
  Euphoric: "#d69e2e",
  Nostalgic: "#744210",
};
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
const CAMELOT_MAP = {
  "C Major": "8B",  "C Minor": "5A",
  "C# Major": "3B", "C# Minor": "12A",
  "D Major": "10B", "D Minor": "7A",
  "D# Major": "5B", "D# Minor": "2A",
  "E Major": "12B", "E Minor": "9A",
  "F Major": "7B",  "F Minor": "4A",
  "F# Major": "2B", "F# Minor": "11A",
  "G Major": "9B",  "G Minor": "6A",
  "G# Major": "4B", "G# Minor": "1A",
  "A Major": "11B", "A Minor": "8A",
  "A# Major": "6B", "A# Minor": "3A",
  "B Major": "1B",  "B Minor": "10A",
};
// Colors follow the Camelot wheel spectrum (teal→green→yellow→orange→pink→purple→blue→teal)
const CAMELOT_COLORS = {
  "1A": "#3ecfb8", "1B": "#3abfaa",
  "2A": "#5dd87c", "2B": "#52cc6e",
  "3A": "#a0d84a", "3B": "#b4e040",
  "4A": "#e8d03a", "4B": "#f0c828",
  "5A": "#f0a030", "5B": "#e89020",
  "6A": "#e86040", "6B": "#e05038",
  "7A": "#e84878", "7B": "#d83868",
  "8A": "#c840c8", "8B": "#b830b8",
  "9A": "#9040e0", "9B": "#8030d0",
  "10A": "#5060e8", "10B": "#4050d8",
  "11A": "#3898d8", "11B": "#30a8e0",
  "12A": "#30bce0", "12B": "#30ccd4",
};
const SHARE_ACCESS_OPTIONS = [
  { value: "listen", label: "See + Listen" },
  { value: "view", label: "See Only" },
  { value: "edit", label: "See + Edit + Listen" },
];
const ICON_SVG = {
  back: '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path><path d="M9 12h11"></path></svg>',
  logout:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>',
  shuffle:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5"></path><path d="M4 20l6-6"></path><path d="M21 3l-7 7"></path><path d="M4 4l6 6"></path><path d="M14 14l7 7"></path><path d="M16 21h5v-5"></path></svg>',
  play: '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"></path></svg>',
  pause:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="5" width="4" height="14" rx="1" fill="currentColor"></rect><rect x="13" y="5" width="4" height="14" rx="1" fill="currentColor"></rect></svg>',
  more: '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.7" fill="currentColor"></circle><circle cx="12" cy="12" r="1.7" fill="currentColor"></circle><circle cx="18" cy="12" r="1.7" fill="currentColor"></circle></svg>',
  prev: '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM19 5l-9 7 9 7V5z" fill="currentColor"></path></svg>',
  next: '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM5 5l9 7-9 7V5z" fill="currentColor"></path></svg>',
  close:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>',
  trash:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>',
  plus: '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',
  check:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>',
  volume:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M18.8 6.2a9 9 0 0 1 0 11.6"></path></svg>',
  mute: '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4z" fill="currentColor"></path><path d="M22 9l-6 6"></path><path d="M16 9l6 6"></path></svg>',
  queue:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M3 11h18"></path><path d="M3 16h10"></path><polygon points="17,13 22,16 17,19" fill="currentColor" stroke="none"></polygon></svg>',
  repeat:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>',
  repeatOne:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path><text x="12" y="15" text-anchor="middle" font-size="7" font-weight="bold" fill="currentColor" stroke="none">1</text></svg>',
  link: '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
  notes:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 3 14 8 19 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="13" y2="17"></line></svg>',
  metadata:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"></path></svg>',
  sort:
    '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>',
};

const state = {
  authenticated: false,
  route: { type: "home" },
  projects: [],
  currentProject: null,
  sharedProject: null,
  player: {
    wavesurfer: null,
    queue: [],
    index: -1,
    track: null,
    autoplayOnReady: false,
    volume: 1,
    previousVolume: 1,
    loop: "none",
    shuffle: false,
  },
  trackMenu: {
    trackId: null,
    notes: "",
    lyrics: "",
    todos: [],
    versions: [],
    activeVersionId: null,
    bpm: null,
    key: null,
    trackStatus: null,
    moodTags: [],
    listenCount: 0,
    lufs: null,
    peakDb: null,
  },
  metadataPanel: {
    colorPalette: [],
  },
  homeSort: {
    key: "updatedAt",   // updatedAt | createdAt | title | artist | status | completionPercent | starRating | releaseDate | startDate
    dir: "desc",        // asc | desc
  },
};

let toastTimeoutId = null;

function icon(name) {
  return ICON_SVG[name] || "";
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeEditableText(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/\r/g, "")
    .trim();
}

function formatSeconds(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "0:00";
  }

  const seconds = Math.floor(totalSeconds);
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function formatRuntime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return "0m";
  }

  const rounded = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const seconds = rounded % 60;

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
  }

  return `${seconds}s`;
}

function formatFileSize(sizeBytes) {
  const parsed = Number(sizeBytes);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return "-";
  }

  const mbValue = parsed / (1024 * 1024);
  if (mbValue >= 1) {
    return `${mbValue.toFixed(1)} MB`;
  }

  const kbValue = parsed / 1024;
  return `${Math.max(1, Math.round(kbValue))} KB`;
}

function shareAccessLabel(access) {
  const value = String(access || "listen");
  const match = SHARE_ACCESS_OPTIONS.find((option) => option.value === value);
  return match ? match.label : "See + Listen";
}

function shareAccessOptionsHtml(selectedValue = "listen") {
  return SHARE_ACCESS_OPTIONS.map((option) => {
    const selected = option.value === selectedValue ? "selected" : "";
    return `<option value="${escapeHtml(option.value)}" ${selected}>${escapeHtml(option.label)}</option>`;
  }).join("");
}

function formatShortDate(value) {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function buildLocalId(prefix) {
  const randomPart = Math.random().toString(36).slice(2, 9);
  return `${prefix}-${Date.now()}-${randomPart}`;
}

// Sets text on a .marquee-wrap element and activates scrolling when the text
// overflows. Uses requestAnimationFrame so the DOM has been painted first.
function setMarqueeText(el, text) {
  if (!el) return;
  const inner = el.querySelector(".marquee-inner") || el;
  inner.textContent = text;
  el.classList.remove("is-scrolling");
  el.style.removeProperty("--marquee-offset");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      applyMarquee(el);
    });
  });
}

function applyMarquee(el) {
  if (!el) return;
  const inner = el.querySelector(".marquee-inner") || el;
  el.classList.remove("is-scrolling");
  el.style.removeProperty("--marquee-offset");
  const overflow = inner.scrollWidth - el.clientWidth;
  if (overflow > 2) {
    el.style.setProperty("--marquee-offset", `-${overflow}px`);
    el.classList.add("is-scrolling");
  }
}

function sanitizeTodoText(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, 220);
}

function normalizeTodoItem(value) {
  if (typeof value === "string") {
    const textValue = sanitizeTodoText(value);
    if (!textValue) {
      return null;
    }

    return {
      id: buildLocalId("todo"),
      text: textValue,
      done: false,
    };
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const textValue = sanitizeTodoText(value.text);
  if (!textValue) {
    return null;
  }

  const safeId = String(value.id || "")
    .trim()
    .slice(0, 80);
  return {
    id: safeId || buildLocalId("todo"),
    text: textValue,
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

function isShareRoute() {
  return state.route && state.route.type === "share";
}

function getShareToken() {
  return isShareRoute() ? state.route.token : null;
}

function getActiveProject() {
  if (isShareRoute()) {
    return state.sharedProject;
  }

  return state.currentProject;
}

function canCurrentViewEdit() {
  const project = getActiveProject();
  if (!project) {
    return false;
  }

  if (!isShareRoute()) {
    return true;
  }

  return Boolean(project.canEdit);
}

function canCurrentViewListen() {
  const project = getActiveProject();
  if (!project) {
    return false;
  }

  if (!isShareRoute()) {
    return true;
  }

  return Boolean(project.canListen);
}

function getActiveTrackVersion(track) {
  if (!track || !Array.isArray(track.versions) || !track.versions.length) {
    return null;
  }

  return (
    track.versions.find((version) => version.id === track.activeVersionId) ||
    track.versions[0]
  );
}

function getCurrentProjectTrack(trackId) {
  const activeProject = getActiveProject();
  const tracks =
    activeProject && Array.isArray(activeProject.tracks)
      ? activeProject.tracks
      : [];
  return tracks.find((track) => track.id === trackId) || null;
}

function shuffledCopy(items) {
  const values = [...items];
  for (let index = values.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
  }

  return values;
}

function showToast(message) {
  if (!toastElement) {
    return;
  }

  toastElement.textContent = message;
  toastElement.classList.remove("hidden");

  if (toastTimeoutId) {
    window.clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = window.setTimeout(() => {
    toastElement.classList.add("hidden");
  }, 2600);
}

function animatedClose(el, callback) {
  if (!el || el.classList.contains("hidden")) {
    if (callback) callback();
    return;
  }
  el.classList.add("is-closing");
  window.setTimeout(() => {
    el.classList.add("hidden");
    el.classList.remove("is-closing");
    if (callback) callback();
  }, 200);
}

function showConfirmDialog(message) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("confirm-dialog");
    const messageEl = document.getElementById("confirm-dialog-message");
    const okBtn = document.getElementById("confirm-dialog-ok");
    const cancelBtn = document.getElementById("confirm-dialog-cancel");

    messageEl.textContent = message;
    overlay.classList.remove("hidden");

    function cleanup() {
      animatedClose(overlay);
      okBtn.removeEventListener("click", onOk);
      cancelBtn.removeEventListener("click", onCancel);
    }

    function onOk() {
      cleanup();
      resolve(true);
    }

    function onCancel() {
      cleanup();
      resolve(false);
    }

    okBtn.addEventListener("click", onOk);
    cancelBtn.addEventListener("click", onCancel);
  });
}

async function apiRequest(url, options = {}) {
  const { method = "GET", body, allowUnauthorized = false } = options;
  const requestOptions = {
    method,
    credentials: "include",
    headers: {},
  };

  if (body instanceof FormData) {
    requestOptions.body = body;
  } else if (body !== undefined) {
    requestOptions.body = JSON.stringify(body);
    requestOptions.headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, requestOptions);
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => ({}))
    : await response.text();

  if (!response.ok) {
    if (response.status === 401 && !allowUnauthorized) {
      const authError = new Error("Authentication required");
      authError.code = "AUTH_REQUIRED";
      throw authError;
    }

    const requestError = new Error(
      payload && payload.error
        ? payload.error
        : `Request failed (${response.status})`,
    );
    requestError.code =
      response.status === 401 ? "AUTH_REQUIRED" : "REQUEST_FAILED";
    throw requestError;
  }

  return payload;
}

function getRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "share" && parts[1]) {
    return { type: "share", token: decodeURIComponent(parts[1]) };
  }

  if (parts[0] === "project" && parts[1]) {
    return { type: "project", projectId: decodeURIComponent(parts[1]) };
  }

  return { type: "home" };
}

function navigate(path) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }

  renderRoute();
}

function projectSummaryFromDetails(project) {
  return {
    id: project.id,
    title: project.title,
    artist: project.artist,
    description: project.description,
    status: project.status,
    coverUrl: project.coverUrl,
    trackCount: Array.isArray(project.tracks) ? project.tracks.length : 0,
    totalRuntimeSeconds: Number(project.totalRuntimeSeconds) || 0,
    shareUrl: project.shareUrl,
    shareLinks: Array.isArray(project.shareLinks) ? project.shareLinks : [],
    completionPercent: project.completionPercent || 0,
    starRating: project.starRating || 0,
    startDate: project.startDate || null,
    releaseDate: project.releaseDate || null,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

function mergeProjectSummary(projectDetails) {
  const summary = projectSummaryFromDetails(projectDetails);
  const existingIndex = state.projects.findIndex(
    (project) => project.id === summary.id,
  );

  if (existingIndex >= 0) {
    state.projects.splice(existingIndex, 1, summary);
    return;
  }

  state.projects.unshift(summary);
}

function removeProjectSummary(projectId) {
  state.projects = state.projects.filter((project) => project.id !== projectId);
}

async function copyToClipboard(text) {
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("Share link copied");
    return;
  } catch (error) {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showToast("Share link copied");
  }
}

function renderErrorState(message, showHomeButton = false) {
  appRoot.innerHTML = `
    <section class="view">
      <div class="empty-state">
        <h2>Studio</h2>
        <p>${escapeHtml(message || "Something went wrong")}</p>
        ${showHomeButton ? '<button id="error-home-button" class="primary-button" type="button">Back Home</button>' : ""}
      </div>
    </section>
  `;

  const button = document.getElementById("error-home-button");
  if (button) {
    button.addEventListener("click", () => navigate("/"));
  }
}

function ensurePlayableTrackSubtitle(track) {
  const values = [];
  if (
    track.trackNumber !== null &&
    track.trackNumber !== undefined &&
    track.trackNumber !== ""
  ) {
    values.push(`Track ${track.trackNumber}`);
  }

  if (track.notes) {
    values.push(String(track.notes).split("\n")[0].slice(0, 60));
  } else if (track.lyrics) {
    values.push(`Lyrics: ${String(track.lyrics).split("\n")[0].slice(0, 48)}`);
  } else if (track.originalName) {
    values.push(track.originalName);
  }

  return values.join(" | ");
}

function updatePlayerButtonState() {
  if (!state.player.wavesurfer || !playerPlayButton) {
    return;
  }

  const isPlaying = state.player.wavesurfer.isPlaying();
  playerPlayButton.innerHTML = isPlaying ? icon("pause") : icon("play");
  if (playerCoverElement) {
    playerCoverElement.classList.toggle("is-playing", isPlaying);
  }
}

function updatePlayerVolumeUi(volume) {
  if (playerVolumeInput) {
    playerVolumeInput.value = String(volume);
  }

  if (playerVolumeToggleButton) {
    playerVolumeToggleButton.innerHTML =
      volume > 0 ? icon("volume") : icon("mute");
  }
}

function updatePlayerLoopUi() {
  if (!playerLoopBtn) {
    return;
  }

  const mode = state.player.loop;
  if (mode === "one") {
    playerLoopBtn.innerHTML = icon("repeatOne");
    playerLoopBtn.classList.add("is-active");
    playerLoopBtn.title = "Loop: one";
  } else if (mode === "all") {
    playerLoopBtn.innerHTML = icon("repeat");
    playerLoopBtn.classList.add("is-active");
    playerLoopBtn.title = "Loop: all";
  } else {
    playerLoopBtn.innerHTML = icon("repeat");
    playerLoopBtn.classList.remove("is-active");
    playerLoopBtn.title = "Loop: off";
  }
}

function updatePlayerShuffleUi() {
  if (!playerShuffleBtn) {
    return;
  }

  playerShuffleBtn.classList.toggle("is-active", state.player.shuffle);
  playerShuffleBtn.title = state.player.shuffle
    ? "Shuffle: on"
    : "Shuffle: off";
}

function renderPlayerQueue() {
  if (!playerQueueList) {
    return;
  }

  const queue = state.player.queue || [];
  if (!queue.length) {
    playerQueueList.innerHTML =
      '<p class="player-queue-empty">No tracks in queue</p>';
    return;
  }

  playerQueueList.innerHTML = queue
    .map(
      (track, index) => `
    <button class="player-queue-item${index === state.player.index ? " is-active" : ""}" type="button" data-queue-index="${index}">
      <span class="player-queue-num">${index + 1}</span>
      <span class="player-queue-name">${escapeHtml(track.title || track.originalName || "Untitled")}</span>
    </button>
  `,
    )
    .join("");

  playerQueueList.querySelectorAll("[data-queue-index]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.queueIndex, 10);
      playTrackByIndex(idx);
      closeQueuePopover();
    });
  });
}

function closeQueuePopover() {
  if (playerQueuePopover) {
    playerQueuePopover.classList.remove("is-open");
    playerQueuePopover.setAttribute("aria-hidden", "true");
  }
}

function applyPlayerVolume(rawVolume) {
  const normalizedVolume = clampNumber(Number(rawVolume), 0, 1);
  state.player.volume = normalizedVolume;

  if (normalizedVolume > 0) {
    state.player.previousVolume = normalizedVolume;
  }

  if (state.player.wavesurfer) {
    state.player.wavesurfer.setVolume(normalizedVolume);
  }

  updatePlayerVolumeUi(normalizedVolume);
}

function setPlayerCoverArt() {
  if (!playerCoverElement) {
    return;
  }

  const activeProject =
    state.route.type === "share" ? state.sharedProject : state.currentProject;

  if (playerAlbumTitleElement) {
    setMarqueeText(
      playerAlbumTitleElement,
      activeProject && activeProject.title ? activeProject.title : "",
    );
  }

  if (activeProject && activeProject.coverUrl) {
    playerCoverElement.style.backgroundImage = `url("${activeProject.coverUrl}?v=${activeProject.activeCoverId || ""}")`;
    playerCoverElement.classList.add("has-image");
    playerCoverElement.textContent = "";
    return;
  }

  playerCoverElement.style.backgroundImage = "";
  playerCoverElement.classList.remove("has-image");

  const fallbackLetter =
    activeProject && activeProject.title
      ? String(activeProject.title).charAt(0).toUpperCase()
      : "S";
  playerCoverElement.textContent = fallbackLetter;
}

function highlightActiveTrackRows() {
  const activeTrackId = state.player.track ? state.player.track.id : null;
  const isPlaying = Boolean(
    state.player.wavesurfer && state.player.wavesurfer.isPlaying(),
  );

  const rows = appRoot.querySelectorAll(".track-row[data-track-id]");
  rows.forEach((row) => {
    const isActive = Boolean(
      activeTrackId && row.dataset.trackId === activeTrackId,
    );
    row.classList.toggle("is-active", isActive);

    // Swap the play/pause icon on the track's play button
    const playBtn = row.querySelector(".track-play-button");
    if (playBtn) {
      playBtn.innerHTML = isActive && isPlaying ? icon("pause") : icon("play");
      playBtn.title = isActive && isPlaying ? "Pause track" : "Play track";
    }
  });

  // Update the main play-all button
  const playAllButton = document.getElementById("play-all-button");
  if (playAllButton) {
    const projectTracks =
      (getActiveProject() && getActiveProject().tracks) || [];
    const projectIsActive = Boolean(
      activeTrackId && projectTracks.some((t) => t.id === activeTrackId),
    );
    playAllButton.innerHTML =
      projectIsActive && isPlaying ? icon("pause") : icon("play");
    playAllButton.title =
      projectIsActive && isPlaying ? "Pause" : "Play from start";
  }
}

function playTrackByIndex(index) {
  const queue = state.player.queue || [];
  if (!queue.length) {
    return;
  }

  let normalized = index;
  if (normalized < 0) {
    normalized = queue.length - 1;
  }
  if (normalized >= queue.length) {
    normalized = 0;
  }

  const nextTrack = queue[normalized];
  playTrack(nextTrack, queue, normalized);
}

function playNextTrack() {
  const queue = state.player.queue || [];
  if (state.player.shuffle && queue.length > 1) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * queue.length);
    } while (randomIndex === state.player.index);
    playTrackByIndex(randomIndex);
  } else {
    playTrackByIndex(state.player.index + 1);
  }
}

function playPreviousTrack() {
  if (!state.player.track) {
    return;
  }

  const currentTime = state.player.wavesurfer
    ? state.player.wavesurfer.getCurrentTime()
    : 0;

  // Under 2 seconds: go to previous track if one exists, otherwise pause
  if (currentTime < 2) {
    if (state.player.index <= 0) {
      if (state.player.wavesurfer) {
        state.player.wavesurfer.pause();
      }
      return;
    }
    playTrackByIndex(state.player.index - 1);
    return;
  }

  // 2 seconds or more: restart current track
  if (state.player.wavesurfer) {
    state.player.wavesurfer.seekTo(0);
  }
}

function preloadNextTrack() {
  const queue = state.player.queue || [];
  if (!queue.length) {
    return;
  }

  let nextIndex = -1;
  if (state.player.shuffle && queue.length > 1) {
    // Shuffle is unpredictable; preload the next sequential track as a
    // reasonable guess — better than nothing.
    nextIndex = (state.player.index + 1) % queue.length;
  } else {
    nextIndex = state.player.index + 1;
    if (nextIndex >= queue.length) {
      if (state.player.loop === "all") {
        nextIndex = 0;
      } else {
        return;
      }
    }
  }

  const nextTrack = queue[nextIndex];
  if (!nextTrack || !nextTrack.audioUrl) {
    return;
  }

  // Only start fetching if the URL actually changed
  if (preloadAudioEl.src !== nextTrack.audioUrl) {
    preloadAudioEl.src = nextTrack.audioUrl;
    preloadAudioEl.load();
  }
}

function playTrack(track, queue, index) {
  if (!state.player.wavesurfer || !track) {
    showToast("Waveform player is unavailable");
    return;
  }

  if (!track.audioUrl) {
    showToast("This link cannot play audio");
    return;
  }

  if (
    state.player.track &&
    state.player.track.id === track.id &&
    state.player.track.audioUrl === track.audioUrl
  ) {
    state.player.wavesurfer.playPause();
    return;
  }

  state.player.queue = queue;
  state.player.index = index;
  state.player.track = track;
  state.player.autoplayOnReady = true;

  // Increment listen count for this track (non-blocking)
  if (track.id && getActiveProject()) {
    incrementTrackPlayCount(track.id);
  }

  const trackDisplayTitle =
    track.title || track.originalName || "Untitled Track";
  document.title = trackDisplayTitle + " — Studio";
  setMarqueeText(playerTitleElement, trackDisplayTitle);
  setMarqueeText(playerSubtitleElement, ensurePlayableTrackSubtitle(track));
  playerCurrentTimeElement.textContent = "0:00";
  playerDurationElement.textContent = "0:00";

  setPlayerCoverArt();

  const isFirstShow = playerElement.classList.contains("hidden");
  playerElement.classList.remove("hidden");
  if (isFirstShow) {
    playerElement.classList.add("player-entering");
    window.setTimeout(
      () => playerElement.classList.remove("player-entering"),
      360,
    );
  }
  state.player.wavesurfer.load(track.audioUrl);

  highlightActiveTrackRows();
  updatePlayerButtonState();
}

function initializePlayer() {
  if (!window.WaveSurfer || !waveformElement) {
    showToast("Could not initialize waveform renderer");
    return;
  }

  const playerAudioEl = document.createElement("audio");
  playerAudioEl.preload = "auto";

  state.player.wavesurfer = WaveSurfer.create({
    container: waveformElement,
    media: playerAudioEl,
    waveColor: "rgba(255, 255, 255, 0.18)",
    progressColor: "#A89EFF",
    cursorColor: "#d9d4ff",
    barWidth: 1.2,
    barGap: 1.2,
    barRadius: 2,
    height: 30,
    normalize: true,
    hideScrollbar: true,
  });

  // Start audio as soon as the browser has buffered enough — do not wait for
  // the waveform decode (which can take several seconds for large files).
  playerAudioEl.addEventListener("canplay", () => {
    if (state.player.autoplayOnReady) {
      state.player.autoplayOnReady = false;
      playerAudioEl.volume = clampNumber(state.player.volume, 0, 1);
      playerAudioEl.play().catch(() => {});
      updatePlayerButtonState();
      // Start buffering the next track in the background immediately
      preloadNextTrack();
    }
  });

  playerPrevButton.innerHTML = icon("prev");
  playerNextButton.innerHTML = icon("next");
  playerPlayButton.innerHTML = icon("play");
  updatePlayerVolumeUi(state.player.volume);

  const syncPlayerTime = (seconds) => {
    playerCurrentTimeElement.textContent = formatSeconds(seconds);
  };

  state.player.wavesurfer.on("ready", () => {
    playerDurationElement.textContent = formatSeconds(
      state.player.wavesurfer.getDuration(),
    );
    // Fallback: canplay may not have fired yet (e.g. the file was already
    // fully cached and ready fired first).
    if (state.player.autoplayOnReady) {
      state.player.autoplayOnReady = false;
      state.player.wavesurfer.play().catch?.(() => {});
      preloadNextTrack();
    }
    applyPlayerVolume(state.player.volume);
    updatePlayerButtonState();
  });

  state.player.wavesurfer.on("audioprocess", () => {
    syncPlayerTime(state.player.wavesurfer.getCurrentTime());
  });

  state.player.wavesurfer.on("timeupdate", (currentTime) => {
    syncPlayerTime(currentTime);
  });

  state.player.wavesurfer.on("interaction", () => {
    syncPlayerTime(state.player.wavesurfer.getCurrentTime());
  });

  state.player.wavesurfer.on("play", () => {
    updatePlayerButtonState();
    highlightActiveTrackRows();
  });
  state.player.wavesurfer.on("pause", () => {
    updatePlayerButtonState();
    highlightActiveTrackRows();
  });
  state.player.wavesurfer.on("finish", () => {
    const loop = state.player.loop;
    if (loop === "one") {
      state.player.wavesurfer.seekTo(0);
      state.player.wavesurfer.play();
    } else if (loop === "all") {
      playNextTrack();
    } else {
      const nextIndex = state.player.index + 1;
      if (nextIndex < (state.player.queue || []).length) {
        playTrackByIndex(nextIndex);
      }
    }
  });

  state.player.wavesurfer.on("error", () => {
    showToast("Could not load track");
  });

  playerPlayButton.addEventListener("click", () => {
    if (!state.player.track) {
      const queue = state.player.queue || [];
      if (queue.length) {
        playTrack(queue[0], queue, 0);
      }
      return;
    }

    state.player.wavesurfer.playPause();
  });

  playerPrevButton.addEventListener("click", playPreviousTrack);
  playerNextButton.addEventListener("click", playNextTrack);

  if (playerVolumeInput) {
    playerVolumeInput.addEventListener("input", () => {
      applyPlayerVolume(playerVolumeInput.value);
    });
  }

  const playerVolumePopover = playerVolumeToggleButton
    ? playerVolumeToggleButton.nextElementSibling
    : null;

  if (playerVolumeToggleButton) {
    playerVolumeToggleButton.addEventListener("click", () => {
      // On touch devices: toggle the slider popover instead of muting
      if (window.matchMedia("(pointer: coarse)").matches) {
        if (playerVolumePopover) {
          playerVolumePopover.classList.toggle("is-open");
        }
        return;
      }

      if (state.player.volume <= 0.001) {
        applyPlayerVolume(state.player.previousVolume || 0.85);
        return;
      }

      state.player.previousVolume = state.player.volume;
      applyPlayerVolume(0);
    });
  }

  // Mouse wheel adjusts volume when hovering over the volume control
  const playerVolumeWrap = playerVolumeToggleButton
    ? playerVolumeToggleButton.closest(".player-volume")
    : null;
  if (playerVolumeWrap) {
    playerVolumeWrap.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const delta = event.deltaY < 0 ? 0.05 : -0.05;
        applyPlayerVolume(clampNumber(state.player.volume + delta, 0, 1));
      },
      { passive: false },
    );
  }

  // Close volume popover when clicking outside (touch devices)
  document.addEventListener("click", (event) => {
    if (
      playerVolumePopover &&
      playerVolumePopover.classList.contains("is-open") &&
      !playerVolumePopover.contains(event.target) &&
      event.target !== playerVolumeToggleButton
    ) {
      playerVolumePopover.classList.remove("is-open");
    }
  });

  if (playerShuffleBtn) {
    playerShuffleBtn.innerHTML = icon("shuffle");
    updatePlayerShuffleUi();
    playerShuffleBtn.addEventListener("click", () => {
      state.player.shuffle = !state.player.shuffle;
      updatePlayerShuffleUi();
    });
  }

  if (playerLoopBtn) {
    updatePlayerLoopUi();
    playerLoopBtn.addEventListener("click", () => {
      const modes = ["none", "all", "one"];
      const currentIndex = modes.indexOf(state.player.loop);
      state.player.loop = modes[(currentIndex + 1) % modes.length];
      updatePlayerLoopUi();
    });
  }

  if (playerQueueBtn) {
    playerQueueBtn.innerHTML = icon("queue");
    playerQueueBtn.addEventListener("click", () => {
      const isOpen = playerQueuePopover.classList.contains("is-open");
      if (isOpen) {
        closeQueuePopover();
      } else {
        renderPlayerQueue();
        playerQueuePopover.classList.add("is-open");
        playerQueuePopover.setAttribute("aria-hidden", "false");
      }
    });
  }

  document.addEventListener("click", (event) => {
    if (
      playerQueuePopover &&
      playerQueuePopover.classList.contains("is-open") &&
      !playerQueuePopover.contains(event.target) &&
      event.target !== playerQueueBtn
    ) {
      closeQueuePopover();
    }
  });
}

async function incrementTrackPlayCount(trackId) {
  try {
    const endpoint = isShareRoute()
      ? `/api/share/${encodeURIComponent(getShareToken())}/tracks/${encodeURIComponent(trackId)}/play`
      : `/api/projects/${encodeURIComponent(getActiveProject().id)}/tracks/${encodeURIComponent(trackId)}/play`;
    const payload = await apiRequest(endpoint, { method: "POST" });
    // Update listen count in local state
    const activeProject = getActiveProject();
    if (activeProject && Array.isArray(activeProject.tracks)) {
      const track = activeProject.tracks.find((t) => t.id === trackId);
      if (track) {
        track.listenCount = payload.listenCount;
      }
    }
    // If track menu is open for this track, refresh its count
    if (state.trackMenu.trackId === trackId) {
      state.trackMenu.listenCount = payload.listenCount;
      const listenCountEl = document.getElementById("track-listen-count");
      if (listenCountEl) {
        listenCountEl.textContent = `Played ${payload.listenCount} time${payload.listenCount !== 1 ? "s" : ""}`;
      }
    }
  } catch (_error) {
    // Non-critical — ignore failures silently
  }
}

function detectBpm(mono, sampleRate) {
  // Downsample to ~11025 Hz for faster processing
  const factor = Math.max(1, Math.round(sampleRate / 11025));
  const dsLen = Math.floor(mono.length / factor);
  const actualSr = sampleRate / factor;

  const ds = new Float32Array(dsLen);
  for (let i = 0; i < dsLen; i++) ds[i] = mono[i * factor];

  // Energy envelope in ~23ms frames
  const frameSize = Math.max(1, Math.round(actualSr / 44));
  const numFrames = Math.floor(dsLen / frameSize);
  if (numFrames < 4) return null;

  const energy = new Float32Array(numFrames);
  for (let f = 0; f < numFrames; f++) {
    let e = 0;
    for (let i = 0; i < frameSize; i++) {
      const s = ds[f * frameSize + i] || 0;
      e += s * s;
    }
    energy[f] = e / frameSize;
  }

  // Half-wave rectified energy difference (onset strength)
  const onset = new Float32Array(numFrames);
  for (let f = 1; f < numFrames; f++) {
    onset[f] = Math.max(0, energy[f] - energy[f - 1]);
  }

  // Autocorrelation over 50–200 BPM range
  const fps = actualSr / frameSize;
  const minLag = Math.max(1, Math.round((fps * 60) / 200));
  const maxLag = Math.round((fps * 60) / 50);
  const n = numFrames;

  let bestLag = minLag;
  let bestCorr = -Infinity;
  for (let lag = minLag; lag <= maxLag; lag++) {
    let corr = 0;
    for (let i = 0; i < n - lag; i++) corr += onset[i] * onset[i + lag];
    if (corr > bestCorr) { bestCorr = corr; bestLag = lag; }
  }

  let bpm = Math.round((60 * fps) / bestLag);
  // Octave correction: keep in 60–180 range
  while (bpm > 180) bpm = Math.round(bpm / 2);
  while (bpm < 60) bpm = Math.round(bpm * 2);
  return bpm;
}

function detectKey(mono, sampleRate) {
  const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const chroma = new Float32Array(12);

  // Analyse at most 30 seconds
  const maxSamples = Math.min(mono.length, sampleRate * 30);
  const blockSize = 8192;

  // Goertzel-based chroma: sum energy at each pitch class across 4 octaves (C2–B5)
  for (let pc = 0; pc < 12; pc++) {
    for (let octave = 2; octave <= 5; octave++) {
      const midiNote = 36 + pc + (octave - 2) * 12; // C2=36
      const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
      if (freq >= sampleRate / 2 || freq < 20) continue;

      const coeff = 2 * Math.cos((2 * Math.PI * freq) / sampleRate);
      let totalEnergy = 0;
      let blockCount = 0;

      for (let start = 0; start + blockSize <= maxSamples; start += blockSize) {
        let s1 = 0, s2 = 0;
        for (let i = 0; i < blockSize; i++) {
          const s0 = mono[start + i] + coeff * s1 - s2;
          s2 = s1;
          s1 = s0;
        }
        totalEnergy += s1 * s1 + s2 * s2 - coeff * s1 * s2;
        blockCount++;
      }
      chroma[pc] += blockCount > 0 ? totalEnergy / blockCount : 0;
    }
  }

  // Normalize
  const maxC = Math.max(...chroma);
  if (maxC > 0) for (let i = 0; i < 12; i++) chroma[i] /= maxC;

  // Krumhansl-Schmuckler key profiles
  const MAJ = [6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88];
  const MIN = [6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17];

  function pearson(profile, shift) {
    let ma = 0, mb = 0;
    for (let i = 0; i < 12; i++) { ma += chroma[i]; mb += profile[(i + shift) % 12]; }
    ma /= 12; mb /= 12;
    let num = 0, da = 0, db = 0;
    for (let i = 0; i < 12; i++) {
      const ai = chroma[i] - ma;
      const bi = profile[(i + shift) % 12] - mb;
      num += ai * bi; da += ai * ai; db += bi * bi;
    }
    return da * db > 0 ? num / Math.sqrt(da * db) : 0;
  }

  let bestKey = null;
  let bestCorr = -Infinity;
  for (let root = 0; root < 12; root++) {
    const mj = pearson(MAJ, root);
    const mn = pearson(MIN, root);
    if (mj > bestCorr) { bestCorr = mj; bestKey = NOTE_NAMES[root] + " Major"; }
    if (mn > bestCorr) { bestCorr = mn; bestKey = NOTE_NAMES[root] + " Minor"; }
  }
  return bestKey;
}

async function analyzeAudio(audioUrl) {
  const response = await fetch(audioUrl, { credentials: "include" });
  if (!response.ok) throw new Error("Could not fetch audio file for analysis");

  const arrayBuffer = await response.arrayBuffer();
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let audioBuffer;
  try {
    audioBuffer = await new Promise((resolve, reject) => {
      audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
    });
  } finally {
    audioCtx.close();
  }

  const numChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;

  // Build mono mix + compute LUFS/peak simultaneously
  const mono = new Float32Array(length);
  let sumMeanSquare = 0;
  let peak = 0;

  for (let c = 0; c < numChannels; c++) {
    const data = audioBuffer.getChannelData(c);
    let channelSumSq = 0;
    for (let i = 0; i < length; i++) {
      const s = data[i];
      mono[i] += s;
      const a = s < 0 ? -s : s;
      if (a > peak) peak = a;
      channelSumSq += s * s;
    }
    sumMeanSquare += channelSumSq / length;
  }
  for (let i = 0; i < length; i++) mono[i] /= numChannels;

  const lufs = sumMeanSquare > 0
    ? Math.round((-0.691 + 10 * Math.log10(sumMeanSquare)) * 10) / 10
    : null;
  const peakDb = peak > 0 ? Math.round(20 * Math.log10(peak) * 10) / 10 : null;
  const bpm = detectBpm(mono, audioBuffer.sampleRate);
  const key = detectKey(mono, audioBuffer.sampleRate);

  return { lufs, peakDb, bpm, key };
}

async function autoAnalyzeTrack(trackId, audioUrl) {
  if (state.trackMenu.trackId !== trackId) return;
  const analyzeBtn = document.getElementById("track-lufs-analyze");
  if (analyzeBtn) { analyzeBtn.disabled = true; analyzeBtn.textContent = "Detecting…"; }
  try {
    const result = await analyzeAudio(audioUrl);
    if (state.trackMenu.trackId !== trackId) return; // Menu closed during analysis
    state.trackMenu.lufs = result.lufs;
    state.trackMenu.peakDb = result.peakDb;
    if (state.trackMenu.bpm === null) state.trackMenu.bpm = result.bpm;
    if (state.trackMenu.key === null) state.trackMenu.key = result.key;
    renderTrackMenuPhase2();
  } catch (_e) {
    // Silent fail — user can still click Analyze manually
  } finally {
    if (state.trackMenu.trackId === trackId) {
      const btn = document.getElementById("track-lufs-analyze");
      if (btn) btn.disabled = false;
      renderLufsDisplay();
    }
  }
}

async function fetchProjects() {
  const payload = await apiRequest("/api/projects");
  state.projects = payload.projects || [];
}

async function fetchProject(projectId) {
  const payload = await apiRequest(
    `/api/projects/${encodeURIComponent(projectId)}`,
  );
  state.currentProject = payload.project;
  mergeProjectSummary(payload.project);
}

function updateActiveProjectFromPayload(projectPayload) {
  if (isShareRoute()) {
    state.sharedProject = projectPayload;
  }

  state.currentProject = projectPayload;
  mergeProjectSummary(projectPayload);
}

async function saveProject(fields) {
  const project = getActiveProject();
  if (!project) {
    return;
  }

  const endpoint = isShareRoute()
    ? `/api/share/${encodeURIComponent(getShareToken())}/project`
    : `/api/projects/${encodeURIComponent(project.id)}`;
  const payload = await apiRequest(endpoint, {
    method: "PATCH",
    body: fields,
  });

  updateActiveProjectFromPayload(payload.project);
}

async function saveTrack(projectId, trackId, fields) {
  const endpoint = isShareRoute()
    ? `/api/share/${encodeURIComponent(getShareToken())}/tracks/${encodeURIComponent(trackId)}`
    : `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}`;
  const payload = await apiRequest(endpoint, {
    method: "PATCH",
    body: fields,
  });

  updateActiveProjectFromPayload(payload.project);
}

async function uploadTrackVersion(projectId, trackId, file) {
  const formData = new FormData();
  formData.append("track", file);

  const endpoint = isShareRoute()
    ? `/api/share/${encodeURIComponent(getShareToken())}/tracks/${encodeURIComponent(trackId)}/versions`
    : `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}/versions`;
  const payload = await apiRequest(endpoint, {
    method: "POST",
    body: formData,
  });

  updateActiveProjectFromPayload(payload.project);
}

async function selectTrackVersion(projectId, trackId, versionId) {
  const endpoint = isShareRoute()
    ? `/api/share/${encodeURIComponent(getShareToken())}/tracks/${encodeURIComponent(trackId)}/versions/${encodeURIComponent(versionId)}/select`
    : `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}/versions/${encodeURIComponent(versionId)}/select`;
  const payload = await apiRequest(endpoint, {
    method: "POST",
  });

  updateActiveProjectFromPayload(payload.project);
}

async function deleteCoverVersion(projectId, coverId) {
  const endpoint = `/api/projects/${encodeURIComponent(projectId)}/covers/${encodeURIComponent(coverId)}`;
  const payload = await apiRequest(endpoint, { method: "DELETE" });
  updateActiveProjectFromPayload(payload.project);
}

async function uploadCoverVersion(projectId, file) {
  const formData = new FormData();
  formData.append("cover", file);

  const endpoint = isShareRoute()
    ? `/api/share/${encodeURIComponent(getShareToken())}/cover`
    : `/api/projects/${encodeURIComponent(projectId)}/cover`;
  const payload = await apiRequest(endpoint, {
    method: "POST",
    body: formData,
  });

  updateActiveProjectFromPayload(payload.project);
}

async function selectCoverVersion(projectId, coverId) {
  const endpoint = isShareRoute()
    ? `/api/share/${encodeURIComponent(getShareToken())}/covers/${encodeURIComponent(coverId)}/select`
    : `/api/projects/${encodeURIComponent(projectId)}/covers/${encodeURIComponent(coverId)}/select`;
  const payload = await apiRequest(endpoint, {
    method: "POST",
  });

  updateActiveProjectFromPayload(payload.project);
}

function closeTrackMenu() {
  const overlay = document.getElementById("track-menu-overlay");
  if (overlay) {
    animatedClose(overlay);
    overlay.setAttribute("aria-hidden", "true");
  }

  state.trackMenu = {
    trackId: null,
    notes: "",
    lyrics: "",
    todos: [],
    versions: [],
    activeVersionId: null,
    bpm: null,
    key: null,
    trackStatus: null,
    moodTags: [],
    listenCount: 0,
    lufs: null,
    peakDb: null,
  };
}

function renderTrackMenuTodos() {
  const todoListElement = document.getElementById("track-todo-list");
  if (!todoListElement) {
    return;
  }

  const canEdit = canCurrentViewEdit();

  const todos = state.trackMenu.todos || [];
  if (!todos.length) {
    todoListElement.innerHTML = '<p class="todo-empty">No todos yet.</p>';
    return;
  }

  todoListElement.innerHTML = todos
    .map((todo, index) => {
      return `
        <div class="todo-row ${todo.done ? "done" : ""}" data-todo-row="${index}">
          <label class="todo-toggle" aria-label="Toggle todo">
            <input type="checkbox" data-todo-toggle="${index}" ${todo.done ? "checked" : ""} ${canEdit ? "" : "disabled"} />
            <span>${icon("check")}</span>
          </label>
          <input
            class="todo-text-input"
            type="text"
            value="${escapeHtml(todo.text)}"
            maxlength="220"
            data-todo-text="${index}"
            ${canEdit ? "" : "disabled"}
          />
          <button
            class="icon-button todo-remove-button"
            type="button"
            aria-label="Remove todo"
            data-todo-remove="${index}"
            ${canEdit ? "" : "disabled"}
          >${icon("close")}</button>
        </div>
      `;
    })
    .join("");

  if (!canEdit) {
    return;
  }

  todoListElement.querySelectorAll("[data-todo-toggle]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const todoIndex = Number.parseInt(checkbox.dataset.todoToggle, 10);
      if (!Number.isFinite(todoIndex) || !state.trackMenu.todos[todoIndex]) {
        return;
      }

      state.trackMenu.todos[todoIndex].done = checkbox.checked;
      renderTrackMenuTodos();
    });
  });

  todoListElement.querySelectorAll("[data-todo-text]").forEach((input) => {
    input.addEventListener("input", () => {
      const todoIndex = Number.parseInt(input.dataset.todoText, 10);
      if (!Number.isFinite(todoIndex) || !state.trackMenu.todos[todoIndex]) {
        return;
      }

      state.trackMenu.todos[todoIndex].text = sanitizeTodoText(input.value);
    });
  });

  todoListElement.querySelectorAll("[data-todo-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const todoIndex = Number.parseInt(button.dataset.todoRemove, 10);
      if (!Number.isFinite(todoIndex)) {
        return;
      }

      state.trackMenu.todos.splice(todoIndex, 1);
      renderTrackMenuTodos();
    });
  });
}

function renderTrackMenuVersions() {
  const versionsElement = document.getElementById("track-version-list");
  if (!versionsElement) {
    return;
  }

  const canEdit = canCurrentViewEdit();

  const versions = Array.isArray(state.trackMenu.versions)
    ? state.trackMenu.versions
    : [];
  if (!versions.length) {
    versionsElement.innerHTML = '<p class="todo-empty">No versions yet.</p>';
    return;
  }

  versionsElement.innerHTML = versions
    .map((version) => {
      const isActive = version.id === state.trackMenu.activeVersionId;
      const chips = [];
      if (Number.isFinite(version.durationSeconds)) {
        chips.push(formatSeconds(version.durationSeconds));
      }
      if (Number.isFinite(version.sizeBytes)) {
        chips.push(formatFileSize(version.sizeBytes));
      }

      return `
        <div class="version-row ${isActive ? "active" : ""}" data-version-row="${escapeHtml(version.id)}">
          <div class="version-main">
            <div class="version-title">${escapeHtml(version.originalName || "Untitled version")}</div>
            <div class="version-meta">${escapeHtml(chips.join(" • ") || "No metadata")}</div>
          </div>
          <button class="secondary-button version-use-button" type="button" data-version-select="${escapeHtml(version.id)}" ${canEdit ? "" : "disabled"}>${isActive ? "Active" : "Use"}</button>
        </div>
      `;
    })
    .join("");

  if (!canEdit) {
    return;
  }

  versionsElement
    .querySelectorAll("[data-version-select]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const versionId = button.dataset.versionSelect;
        if (!versionId || !state.trackMenu.trackId) {
          return;
        }

        const activeProject = getActiveProject();
        if (!activeProject) {
          return;
        }

        try {
          await selectTrackVersion(
            activeProject.id,
            state.trackMenu.trackId,
            versionId,
          );

          const refreshedTrack = getCurrentProjectTrack(
            state.trackMenu.trackId,
          );
          if (refreshedTrack) {
            state.trackMenu.versions = Array.isArray(refreshedTrack.versions)
              ? [...refreshedTrack.versions]
              : [];
            state.trackMenu.activeVersionId =
              refreshedTrack.activeVersionId || null;
          }

          if (
            state.player.track &&
            state.player.track.id === state.trackMenu.trackId &&
            refreshedTrack
          ) {
            const queue =
              (getActiveProject() && getActiveProject().tracks) || [];
            const index = queue.findIndex(
              (track) => track.id === refreshedTrack.id,
            );
            if (index >= 0) {
              playTrack(queue[index], queue, index);
            }
          }

          renderProjectView();
          openTrackMenu(state.trackMenu.trackId);
          showToast("Switched track version");
        } catch (error) {
          showToast(error.message || "Could not switch version");
        }
      });
    });
}

function addTrackMenuTodo() {
  const input = document.getElementById("track-todo-input");
  if (!input) {
    return;
  }

  const todoText = sanitizeTodoText(input.value);
  if (!todoText) {
    return;
  }

  state.trackMenu.todos.push({
    id: buildLocalId("todo"),
    text: todoText,
    done: false,
  });

  input.value = "";
  renderTrackMenuTodos();
}

function openTrackMenu(trackId) {
  const track = getCurrentProjectTrack(trackId);
  if (!track) {
    return;
  }

  state.trackMenu.trackId = track.id;
  state.trackMenu.notes = String(track.notes || "");
  state.trackMenu.lyrics = String(track.lyrics || "");
  state.trackMenu.todos = normalizeTodos(track.todos);
  state.trackMenu.versions = Array.isArray(track.versions)
    ? [...track.versions]
    : [];
  state.trackMenu.activeVersionId = track.activeVersionId || null;
  state.trackMenu.bpm = track.bpm ?? null;
  state.trackMenu.key = track.key || null;
  state.trackMenu.trackStatus = track.trackStatus || null;
  state.trackMenu.moodTags = Array.isArray(track.moodTags) ? [...track.moodTags] : [];
  state.trackMenu.listenCount = track.listenCount || 0;
  state.trackMenu.lufs = track.lufs ?? null;
  state.trackMenu.peakDb = track.peakDb ?? null;

  const titleElement = document.getElementById("track-menu-title");
  const subtitleElement = document.getElementById("track-menu-subtitle");
  const notesInput = document.getElementById("track-menu-notes");
  const lyricsInput = document.getElementById("track-menu-lyrics");
  const todoInput = document.getElementById("track-todo-input");
  const overlay = document.getElementById("track-menu-overlay");

  if (
    !overlay ||
    !titleElement ||
    !subtitleElement ||
    !notesInput ||
    !lyricsInput
  ) {
    return;
  }

  const subtitleParts = [];
  if (
    track.trackNumber !== null &&
    track.trackNumber !== undefined &&
    track.trackNumber !== ""
  ) {
    subtitleParts.push(`Track ${track.trackNumber}`);
  }
  if (track.originalName) {
    subtitleParts.push(track.originalName);
  }
  if (track.versionCount > 1) {
    subtitleParts.push(`${track.versionCount} versions`);
  }

  titleElement.textContent =
    track.title || track.originalName || "Untitled track";
  subtitleElement.textContent = subtitleParts.join(" | ");
  notesInput.value = state.trackMenu.notes;
  lyricsInput.value = state.trackMenu.lyrics;
  if (todoInput) {
    todoInput.value = "";
  }

  overlay.classList.remove("hidden", "is-closing");
  overlay.setAttribute("aria-hidden", "false");
  renderTrackMenuTodos();
  renderTrackMenuVersions();
  renderTrackMenuPhase2();

  // Auto-detect for tracks that haven't been analyzed yet
  if (canCurrentViewEdit() && track.audioUrl && track.bpm === null && track.key === null && track.lufs === null) {
    setTimeout(() => autoAnalyzeTrack(track.id, track.audioUrl), 300);
  }
}

async function saveTrackMenu(projectId) {
  if (!state.trackMenu.trackId) {
    return;
  }

  const notesInput = document.getElementById("track-menu-notes");
  const lyricsInput = document.getElementById("track-menu-lyrics");

  state.trackMenu.notes = String(notesInput ? notesInput.value : "").slice(
    0,
    4000,
  );
  state.trackMenu.lyrics = String(lyricsInput ? lyricsInput.value : "").slice(
    0,
    12000,
  );

  const todosPayload = (state.trackMenu.todos || [])
    .map((todo) => normalizeTodoItem(todo))
    .filter((todo) => todo !== null);

  // Read Phase 2 fields from UI
  const bpmInput = document.getElementById("track-bpm-input");
  const keySelect = document.getElementById("track-key-select");
  const trackStatusSelect = document.getElementById("track-status-select");

  const bpmValue = bpmInput ? (bpmInput.value !== "" ? Number(bpmInput.value) : null) : state.trackMenu.bpm;
  const keyValue = keySelect ? (keySelect.value || null) : state.trackMenu.key;
  const trackStatusValue = trackStatusSelect ? (trackStatusSelect.value || null) : state.trackMenu.trackStatus;

  await saveTrack(projectId, state.trackMenu.trackId, {
    notes: state.trackMenu.notes,
    lyrics: state.trackMenu.lyrics,
    todos: todosPayload,
    bpm: bpmValue,
    key: keyValue,
    trackStatus: trackStatusValue,
    moodTags: state.trackMenu.moodTags,
    lufs: state.trackMenu.lufs,
    peakDb: state.trackMenu.peakDb,
  });

  showToast("Track details saved");
  closeTrackMenu();
  renderProjectView();
}

async function deleteTrackFromMenu(projectId) {
  if (!state.trackMenu.trackId) {
    return;
  }

  if (!(await showConfirmDialog("Delete this track from the project?"))) {
    return;
  }

  const endpoint = isShareRoute()
    ? `/api/share/${encodeURIComponent(getShareToken())}/tracks/${encodeURIComponent(state.trackMenu.trackId)}`
    : `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(state.trackMenu.trackId)}`;
  const payload = await apiRequest(endpoint, {
    method: "DELETE",
  });

  updateActiveProjectFromPayload(payload.project);
  closeTrackMenu();
  renderProjectView();
}

function renderTrackMenuPhase2() {
  const canEdit = canCurrentViewEdit();

  // BPM
  const bpmInput = document.getElementById("track-bpm-input");
  if (bpmInput) {
    bpmInput.value = state.trackMenu.bpm !== null ? String(state.trackMenu.bpm) : "";
    bpmInput.disabled = !canEdit;
  }

  // Key
  const keySelect = document.getElementById("track-key-select");
  if (keySelect) {
    keySelect.value = state.trackMenu.key || "";
    keySelect.disabled = !canEdit;
  }
  const camelotBadgeEl = document.getElementById("track-camelot-badge");
  if (camelotBadgeEl) {
    const code = state.trackMenu.key ? CAMELOT_MAP[state.trackMenu.key] : null;
    const color = code ? (CAMELOT_COLORS[code] || "#888") : null;
    if (code && color) {
      camelotBadgeEl.textContent = code;
      camelotBadgeEl.style.cssText = `background:${color}26;color:${color};border-color:${color}55`;
      camelotBadgeEl.hidden = false;
    } else {
      camelotBadgeEl.hidden = true;
    }
  }

  // Status
  const trackStatusSelect = document.getElementById("track-status-select");
  if (trackStatusSelect) {
    trackStatusSelect.value = state.trackMenu.trackStatus || "";
    trackStatusSelect.disabled = !canEdit;
    updateTrackStatusSelectColor(trackStatusSelect);
  }

  // Mood tags
  const moodWrap = document.getElementById("track-mood-tags");
  if (moodWrap) {
    renderMoodTags(moodWrap, canEdit);
  }

  // Listen count
  const listenCountEl = document.getElementById("track-listen-count");
  if (listenCountEl) {
    const count = state.trackMenu.listenCount || 0;
    listenCountEl.textContent = `Played ${count} time${count !== 1 ? "s" : ""}`;
  }

  // LUFS display
  renderLufsDisplay();
}

function updateTrackStatusSelectColor(selectEl) {
  if (!selectEl) return;
  const val = selectEl.value;
  const color = val ? (TRACK_STATUS_COLORS[val] || "") : "";
  selectEl.style.borderColor = color ? color + "88" : "";
  selectEl.style.color = color || "";
  selectEl.style.boxShadow = color ? `0 0 0 1px ${color}44` : "";
}

function camelotBadgeHtml(key) {
  if (!key) return "";
  const code = CAMELOT_MAP[key];
  if (!code) return "";
  const color = CAMELOT_COLORS[code] || "#888";
  return `<span class="camelot-badge" style="background:${color}26;color:${color};border-color:${color}55">${escapeHtml(code)}</span>`;
}

function renderMoodTags(container, canEdit) {
  const activeTags = state.trackMenu.moodTags || [];
  container.innerHTML = MOOD_TAG_OPTIONS.map((tag) => {
    const isActive = activeTags.includes(tag);
    const color = MOOD_TAG_COLORS[tag] || "#555";
    const activeStyle = isActive
      ? `background:${color}33;border-color:${color};color:${color}`
      : "";
    return `<button
      class="mood-chip${isActive ? " active" : ""}"
      type="button"
      data-mood="${escapeHtml(tag)}"
      style="${activeStyle}"
      ${canEdit ? "" : "disabled"}
    >${escapeHtml(tag)}</button>`;
  }).join("");

  if (!canEdit) return;

  container.querySelectorAll("[data-mood]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.mood;
      const idx = state.trackMenu.moodTags.indexOf(tag);
      if (idx >= 0) {
        state.trackMenu.moodTags.splice(idx, 1);
      } else {
        state.trackMenu.moodTags.push(tag);
      }
      renderMoodTags(container, canEdit);
    });
  });
}

function renderLufsDisplay() {
  const lufsDisplay = document.getElementById("track-lufs-display");
  const lufsAnalyzeBtn = document.getElementById("track-lufs-analyze");
  if (!lufsDisplay) return;

  const lufs = state.trackMenu.lufs;
  const peakDb = state.trackMenu.peakDb;

  if (lufs !== null || peakDb !== null) {
    lufsDisplay.innerHTML = [
      lufs !== null ? `<span class="lufs-value"><span class="lufs-label">LUFS</span> ${lufs} dBFS</span>` : "",
      peakDb !== null ? `<span class="lufs-value"><span class="lufs-label">Peak</span> ${peakDb} dBFS</span>` : "",
    ].filter(Boolean).join("");
  } else {
    lufsDisplay.innerHTML = '<span class="lufs-empty">Not analyzed</span>';
  }

  if (lufsAnalyzeBtn) {
    lufsAnalyzeBtn.textContent = lufs !== null ? "Re-analyze" : "Analyze";
  }
}

function bindTrackMenuInteractions(projectId, options = {}) {
  const { canEdit = false } = options;
  const overlay = document.getElementById("track-menu-overlay");
  const closeButton = document.getElementById("track-menu-close");
  const saveButton = document.getElementById("track-menu-save");
  const deleteButton = document.getElementById("track-menu-delete");
  const playButton = document.getElementById("track-menu-play");
  const todoAddButton = document.getElementById("track-todo-add");
  const todoInput = document.getElementById("track-todo-input");
  const versionAddButton = document.getElementById("track-version-add");
  const versionInput = document.getElementById("track-version-input");

  appRoot.querySelectorAll("[data-track-menu]").forEach((button) => {
    button.addEventListener("click", () => {
      openTrackMenu(button.dataset.trackMenu);
    });
  });

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeTrackMenu();
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeTrackMenu();
    });
  }

  if (saveButton) {
    saveButton.addEventListener("click", async () => {
      if (!canEdit) {
        return;
      }

      try {
        await saveTrackMenu(projectId);
      } catch (error) {
        showToast(error.message || "Could not save track details");
      }
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
      if (!canEdit) {
        return;
      }

      try {
        await deleteTrackFromMenu(projectId);
      } catch (error) {
        showToast(error.message || "Could not delete track");
      }
    });
  }

  if (playButton) {
    playButton.addEventListener("click", () => {
      if (!state.trackMenu.trackId) {
        return;
      }

      if (!canCurrentViewListen()) {
        showToast("This share link cannot play audio");
        return;
      }

      const activeProject = getActiveProject();
      const queue = (activeProject && activeProject.tracks) || [];
      const index = queue.findIndex(
        (track) => track.id === state.trackMenu.trackId,
      );
      if (index < 0) {
        return;
      }

      playTrack(queue[index], queue, index);
    });
  }

  if (todoAddButton) {
    todoAddButton.addEventListener("click", () => {
      if (!canEdit) {
        return;
      }
      addTrackMenuTodo();
    });
  }

  if (todoInput) {
    todoInput.addEventListener("keydown", (event) => {
      if (!canEdit) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        addTrackMenuTodo();
      }
    });
  }

  if (versionAddButton && versionInput) {
    versionAddButton.addEventListener("click", () => {
      if (!canEdit || !state.trackMenu.trackId) {
        return;
      }
      versionInput.click();
    });

    versionInput.addEventListener("change", async () => {
      if (!canEdit || !state.trackMenu.trackId) {
        return;
      }

      const file = versionInput.files && versionInput.files[0];
      if (!file) {
        return;
      }

      try {
        await uploadTrackVersion(projectId, state.trackMenu.trackId, file);
        const refreshedTrack = getCurrentProjectTrack(state.trackMenu.trackId);
        if (refreshedTrack) {
          state.trackMenu.versions = Array.isArray(refreshedTrack.versions)
            ? [...refreshedTrack.versions]
            : [];
          state.trackMenu.activeVersionId =
            refreshedTrack.activeVersionId || null;
        }
        versionInput.value = "";
        renderProjectView();
        openTrackMenu(state.trackMenu.trackId);
        showToast("Track version uploaded");
      } catch (error) {
        showToast(error.message || "Could not upload version");
      }
    });
  }

  // Audio analyze button (BPM + Key + Loudness)
  const lufsAnalyzeBtn = document.getElementById("track-lufs-analyze");
  if (lufsAnalyzeBtn) {
    lufsAnalyzeBtn.addEventListener("click", async () => {
      const track = getCurrentProjectTrack(state.trackMenu.trackId);
      if (!track || !track.audioUrl) {
        showToast("No audio file available to analyze");
        return;
      }

      lufsAnalyzeBtn.disabled = true;
      lufsAnalyzeBtn.textContent = "Analyzing…";

      try {
        const result = await analyzeAudio(track.audioUrl);
        state.trackMenu.lufs = result.lufs;
        state.trackMenu.peakDb = result.peakDb;
        state.trackMenu.bpm = result.bpm ?? state.trackMenu.bpm;
        state.trackMenu.key = result.key ?? state.trackMenu.key;
        renderTrackMenuPhase2();
        showToast("Audio analysis complete");
      } catch (error) {
        showToast(error.message || "Analysis failed");
      } finally {
        const btn = document.getElementById("track-lufs-analyze");
        if (btn) btn.disabled = false;
        renderLufsDisplay();
      }
    });
  }

  // Track status color update on change
  const trackStatusSelect = document.getElementById("track-status-select");
  if (trackStatusSelect && canEdit) {
    trackStatusSelect.addEventListener("change", () => {
      updateTrackStatusSelectColor(trackStatusSelect);
    });
  }

  // Camelot badge live update on key change
  const trackKeySelect = document.getElementById("track-key-select");
  if (trackKeySelect) {
    trackKeySelect.addEventListener("change", () => {
      const camelotBadgeEl = document.getElementById("track-camelot-badge");
      if (!camelotBadgeEl) return;
      const code = trackKeySelect.value ? CAMELOT_MAP[trackKeySelect.value] : null;
      const color = code ? (CAMELOT_COLORS[code] || "#888") : null;
      if (code && color) {
        camelotBadgeEl.textContent = code;
        camelotBadgeEl.style.cssText = `background:${color}26;color:${color};border-color:${color}55`;
        camelotBadgeEl.hidden = false;
      } else {
        camelotBadgeEl.hidden = true;
      }
    });
  }
}

function bindEditable(element, saveHandler, options = {}) {
  if (!element) {
    return;
  }

  const { singleLine = false } = options;

  element.addEventListener("focus", () => {
    element.dataset.beforeEdit = sanitizeEditableText(element.innerText);
  });

  if (singleLine) {
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        element.blur();
      }
    });
  }

  element.addEventListener("blur", async () => {
    const before = element.dataset.beforeEdit || "";
    const after = sanitizeEditableText(element.innerText);

    if (before === after) {
      return;
    }

    try {
      await saveHandler(after);
      renderProjectView();
    } catch (error) {
      showToast(error.message || "Failed to save changes");
      element.innerText = before;
    }
  });
}

function cardCoverHtml(project) {
  if (!project.coverUrl) {
    return "";
  }

  return `<img src="${escapeHtml(project.coverUrl)}" alt="Cover image" loading="lazy" />`;
}

function buildCardStarsHtml(rating) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="card-star${i < filled ? " filled" : ""}" aria-hidden="true">★</span>`,
  ).join("");
}

function buildDeadlineCountdownHtml(releaseDate) {
  if (!releaseDate) return "";

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(releaseDate + "T00:00:00");
  const diffMs = target - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `<span class="countdown-overdue">${Math.abs(diffDays)} days overdue</span>`;
  }
  if (diffDays === 0) {
    return `<span class="countdown-red">Release day!</span>`;
  }

  let cls;
  if (diffDays > 30) {
    cls = "countdown-green";
  } else if (diffDays > 7) {
    cls = "countdown-yellow";
  } else {
    cls = "countdown-red";
  }

  return `<span class="${cls}">${diffDays} day${diffDays !== 1 ? "s" : ""} remaining</span>`;
}

function buildColorPaletteSwatchesHtml(colors) {
  if (!Array.isArray(colors) || !colors.length) return "";
  return colors
    .map(
      (color) =>
        `<span class="project-palette-swatch" style="background:${escapeHtml(color)}" title="${escapeHtml(color)}"></span>`,
    )
    .join("");
}

// ─── Custom Date Picker ────────────────────────────────────────────────────
// DatePicker.open(anchorEl, initialValue, onChange, opts)
//   anchorEl     – element to position next to
//   initialValue – "YYYY-MM-DD" or null
//   onChange     – callback(valueStr)  valueStr = "YYYY-MM-DD" or ""
//   opts         – { label }

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

class DatePicker {
  static _instance = null;

  static open(anchorEl, initialValue, onChange, opts = {}) {
    DatePicker.close();
    const picker = new DatePicker(anchorEl, initialValue, onChange, opts);
    DatePicker._instance = picker;
    picker._mount();
  }

  static close() {
    if (DatePicker._instance) {
      DatePicker._instance._destroy();
      DatePicker._instance = null;
    }
  }

  constructor(anchorEl, initialValue, onChange, opts) {
    this._anchor = anchorEl;
    this._onChange = onChange;
    this._label = opts.label || "";

    // parse initial date or default to today
    const parsed = DatePicker._parseValue(initialValue);
    const ref = parsed || new Date();
    this._year  = ref.getFullYear();
    this._month = ref.getMonth();   // 0-based
    this._day   = parsed ? ref.getDate() : null;

    this._el = null;
    this._boundKeydown      = this._onKeydown.bind(this);
    this._boundOutsideClick = this._onOutsideClick.bind(this);
  }

  // ── public ────────────────────────────────────────────────────────────────

  _mount() {
    const el = document.createElement("div");
    el.className = "dp-popover";
    document.body.appendChild(el);
    this._el = el;
    this._render();
    this._position();
    this._anchor.classList.add("dp-open");
    document.addEventListener("keydown", this._boundKeydown);
    setTimeout(() => document.addEventListener("pointerdown", this._boundOutsideClick), 0);
  }

  _render() {
    const el = this._el;
    const y = this._year;
    const m = this._month;

    const firstDay = new Date(y, m, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // Build day cells
    let cells = "";
    for (let i = 0; i < firstDay; i++) {
      cells += `<span class="dp-cell dp-blank"></span>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = (this._day === d);
      const today = new Date();
      const isToday = (today.getFullYear() === y && today.getMonth() === m && today.getDate() === d);
      cells += `<button class="dp-cell dp-day${isSelected ? " dp-selected" : ""}${isToday ? " dp-today" : ""}" type="button" data-day="${d}">${d}</button>`;
    }

    el.innerHTML = `
      <div class="dp-header">
        <button class="dp-nav-btn" type="button" data-dp-prev aria-label="Previous month">‹</button>
        <span class="dp-month-label">${MONTH_NAMES[m]} ${y}</span>
        <button class="dp-nav-btn" type="button" data-dp-next aria-label="Next month">›</button>
      </div>
      <div class="dp-day-names">
        ${DAY_NAMES.map((n) => `<span class="dp-day-name">${n}</span>`).join("")}
      </div>
      <div class="dp-grid">${cells}</div>
      <div class="dp-footer">
        ${this._day !== null ? `<button class="dp-clear-btn" type="button">Clear</button>` : ""}
        <button class="dp-today-btn" type="button">Today</button>
      </div>
    `;

    this._bindEvents();
  }

  _bindEvents() {
    const el = this._el;

    el.querySelector("[data-dp-prev]").addEventListener("click", () => {
      this._month--;
      if (this._month < 0) { this._month = 11; this._year--; }
      this._render();
    });

    el.querySelector("[data-dp-next]").addEventListener("click", () => {
      this._month++;
      if (this._month > 11) { this._month = 0; this._year++; }
      this._render();
    });

    el.querySelectorAll(".dp-day").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._day = Number(btn.dataset.day);
        this._commitAndClose();
      });
    });

    const clearBtn = el.querySelector(".dp-clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this._day = null;
        if (this._onChange) this._onChange("");
        DatePicker.close();
      });
    }

    el.querySelector(".dp-today-btn").addEventListener("click", () => {
      const t = new Date();
      this._year  = t.getFullYear();
      this._month = t.getMonth();
      this._day   = t.getDate();
      this._commitAndClose();
    });
  }

  _commitAndClose() {
    if (this._day !== null && this._onChange) {
      const mm = String(this._month + 1).padStart(2, "0");
      const dd = String(this._day).padStart(2, "0");
      this._onChange(`${this._year}-${mm}-${dd}`);
    }
    DatePicker.close();
  }

  _position() {
    const el = this._el;
    const rect = this._anchor.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pw = el.offsetWidth || 240;
    const ph = el.offsetHeight || 300;

    let top  = rect.bottom + 8;
    let left = rect.left;

    if (top + ph > vh - 12) top = rect.top - ph - 8;
    if (left + pw > vw - 12) left = vw - pw - 12;
    if (left < 8) left = 8;

    el.style.top  = top  + "px";
    el.style.left = left + "px";
  }

  _onKeydown(e) {
    if (e.key === "Escape") DatePicker.close();
  }

  _onOutsideClick(e) {
    if (this._el && !this._el.contains(e.target) && e.target !== this._anchor) {
      DatePicker.close();
    }
  }

  _destroy() {
    document.removeEventListener("keydown", this._boundKeydown);
    document.removeEventListener("pointerdown", this._boundOutsideClick);
    if (this._anchor) this._anchor.classList.remove("dp-open");
    if (this._el && this._el.parentNode) this._el.parentNode.removeChild(this._el);
    this._el = null;
  }

  // ── helpers ───────────────────────────────────────────────────────────────

  static _parseValue(value) {
    if (!value) return null;
    const d = new Date(value + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }

  static formatDisplay(value) {
    const d = DatePicker._parseValue(value);
    if (!d) return "Set date…";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }
}
// ─── end DatePicker ────────────────────────────────────────────────────────

// ─── Custom Color Picker ───────────────────────────────────────────────────
class ColorPicker {
  // Public API: ColorPicker.open(anchorEl, initialHex, onApply)
  //   anchorEl  – element to position next to
  //   initialHex – "#rrggbb" string
  //   onApply   – callback(hex)

  static _instance = null;

  static open(anchorEl, initialHex, onApply) {
    ColorPicker.close(); // close any existing picker
    const picker = new ColorPicker(anchorEl, initialHex, onApply);
    ColorPicker._instance = picker;
    picker._mount();
  }

  static close() {
    if (ColorPicker._instance) {
      ColorPicker._instance._destroy();
      ColorPicker._instance = null;
    }
  }

  constructor(anchorEl, initialHex, onApply) {
    this._anchor = anchorEl;
    this._onApply = onApply;
    // Parse initial hex to HSV
    const { h, s, v } = ColorPicker._hexToHsv(initialHex || "#a89eff");
    this._h = h; // 0–360
    this._s = s; // 0–1
    this._v = v; // 0–1
    this._el = null;
    this._draggingGradient = false;
    this._draggingHue = false;
    this._boundKeydown = this._onKeydown.bind(this);
    this._boundOutsideClick = this._onOutsideClick.bind(this);
  }

  _mount() {
    const el = document.createElement("div");
    el.className = "cp-popover";
    el.innerHTML = this._buildHtml();
    document.body.appendChild(el);
    this._el = el;

    this._position();
    this._update();
    this._bindEvents();

    // mark anchor
    this._anchor.classList.add("cp-open");

    document.addEventListener("keydown", this._boundKeydown);
    // defer outside-click so the opening click doesn't immediately close it
    setTimeout(() => document.addEventListener("pointerdown", this._boundOutsideClick), 0);
  }

  _buildHtml() {
    return `
      <div class="cp-gradient-box">
        <div class="cp-gradient-cursor"></div>
      </div>
      <div class="cp-hue-track">
        <div class="cp-slider-thumb"></div>
      </div>
      <div class="cp-bottom-row">
        <div class="cp-preview"></div>
        <input class="cp-hex-input" type="text" maxlength="7" spellcheck="false" value="" />
      </div>
      <div class="cp-actions">
        <button class="cp-btn cp-btn-cancel" type="button">Cancel</button>
        <button class="cp-btn cp-btn-apply" type="button">Apply</button>
      </div>
    `;
  }

  _position() {
    const el = this._el;
    const rect = this._anchor.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pw = el.offsetWidth || 224;
    const ph = el.offsetHeight || 300;

    let top = rect.bottom + 8;
    let left = rect.left;

    // flip up if no room below
    if (top + ph > vh - 12) top = rect.top - ph - 8;
    // clamp horizontally
    if (left + pw > vw - 12) left = vw - pw - 12;
    if (left < 8) left = 8;

    el.style.top = top + "px";
    el.style.left = left + "px";
  }

  _update() {
    const el = this._el;
    if (!el) return;

    const hex = ColorPicker._hsvToHex(this._h, this._s, this._v);
    const hueHex = ColorPicker._hsvToHex(this._h, 1, 1);

    // gradient box background = pure hue
    const gradBox = el.querySelector(".cp-gradient-box");
    gradBox.style.background = hueHex;

    // cursor position
    const cursor = el.querySelector(".cp-gradient-cursor");
    cursor.style.left = (this._s * 100) + "%";
    cursor.style.top = ((1 - this._v) * 100) + "%";

    // hue thumb
    const hueThumb = el.querySelector(".cp-hue-track .cp-slider-thumb");
    hueThumb.style.left = (this._h / 360 * 100) + "%";

    // preview + hex input
    el.querySelector(".cp-preview").style.background = hex;
    const hexInput = el.querySelector(".cp-hex-input");
    if (document.activeElement !== hexInput) {
      hexInput.value = hex.toUpperCase();
    }
  }

  _bindEvents() {
    const el = this._el;
    const gradBox = el.querySelector(".cp-gradient-box");
    const hueTrack = el.querySelector(".cp-hue-track");
    const hexInput = el.querySelector(".cp-hex-input");

    // gradient box — pointer drag
    gradBox.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this._draggingGradient = true;
      gradBox.setPointerCapture(e.pointerId);
      this._updateFromGradientEvent(e, gradBox);
    });
    gradBox.addEventListener("pointermove", (e) => {
      if (!this._draggingGradient) return;
      this._updateFromGradientEvent(e, gradBox);
    });
    gradBox.addEventListener("pointerup", () => { this._draggingGradient = false; });

    // hue track — pointer drag
    hueTrack.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this._draggingHue = true;
      hueTrack.setPointerCapture(e.pointerId);
      this._updateFromHueEvent(e, hueTrack);
    });
    hueTrack.addEventListener("pointermove", (e) => {
      if (!this._draggingHue) return;
      this._updateFromHueEvent(e, hueTrack);
    });
    hueTrack.addEventListener("pointerup", () => { this._draggingHue = false; });

    // hex input
    hexInput.addEventListener("input", () => {
      const raw = hexInput.value.trim();
      const cleaned = raw.startsWith("#") ? raw : "#" + raw;
      if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
        const { h, s, v } = ColorPicker._hexToHsv(cleaned);
        this._h = h; this._s = s; this._v = v;
        this._update();
      }
    });

    // buttons
    el.querySelector(".cp-btn-apply").addEventListener("click", () => {
      this._apply();
    });
    el.querySelector(".cp-btn-cancel").addEventListener("click", () => {
      ColorPicker.close();
    });
  }

  _updateFromGradientEvent(e, gradBox) {
    const rect = gradBox.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    this._s = x;
    this._v = 1 - y;
    this._update();
  }

  _updateFromHueEvent(e, hueTrack) {
    const rect = hueTrack.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this._h = x * 360;
    this._update();
  }

  _apply() {
    const hex = ColorPicker._hsvToHex(this._h, this._s, this._v);
    if (this._onApply) this._onApply(hex);
    ColorPicker.close();
  }

  _onKeydown(e) {
    if (e.key === "Escape") { ColorPicker.close(); }
    if (e.key === "Enter") { this._apply(); }
  }

  _onOutsideClick(e) {
    if (this._el && !this._el.contains(e.target) && e.target !== this._anchor) {
      ColorPicker.close();
    }
  }

  _destroy() {
    document.removeEventListener("keydown", this._boundKeydown);
    document.removeEventListener("pointerdown", this._boundOutsideClick);
    if (this._anchor) this._anchor.classList.remove("cp-open");
    if (this._el && this._el.parentNode) this._el.parentNode.removeChild(this._el);
    this._el = null;
  }

  // ── Color math helpers ────────────────────────────────────────────────────

  static _hexToHsv(hex) {
    // hex → rgb → hsv
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const v = max;
    const s = max === 0 ? 0 : d / max;
    let h = 0;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: h * 360, s, v };
  }

  static _hsvToHex(h, s, v) {
    // hsv → rgb → hex
    const i = Math.floor((h / 60) % 6);
    const f = h / 60 - Math.floor(h / 60);
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r, g, b;
    switch (i) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      default: r = v; g = p; b = q; break;
    }
    const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
    return "#" + toHex(r) + toHex(g) + toHex(b);
  }
}
// ─── end ColorPicker ────────────────────────────────────────────────────────

function buildColorPalettePickerHtml(colors, canEdit) {
  const swatches = colors
    .map(
      (color, index) => `
      <div class="palette-swatch-wrap">
        <div class="palette-swatch" style="background:${escapeHtml(color)}" data-palette-index="${index}" role="button" tabindex="0" aria-label="Edit color ${index + 1}: ${escapeHtml(color)}"></div>
        ${canEdit ? `<button class="palette-remove-btn" type="button" data-palette-remove="${index}" aria-label="Remove color">×</button>` : ""}
      </div>
    `,
    )
    .join("");

  const addBtn =
    canEdit && colors.length < 5
      ? `<button id="palette-add-btn" class="palette-add-btn" type="button" aria-label="Add color">+</button>`
      : "";

  return swatches + addBtn;
}

// Sort options available on the home page
const HOME_SORT_OPTIONS = [
  { key: "updatedAt",        label: "Last Modified",    dir: "desc" },
  { key: "createdAt",        label: "Date Created",     dir: "desc" },
  { key: "title",            label: "Title A→Z",        dir: "asc"  },
  { key: "artist",           label: "Artist A→Z",       dir: "asc"  },
  { key: "status",           label: "Status",           dir: "asc"  },
  { key: "completionPercent",label: "% Complete",       dir: "desc" },
  { key: "starRating",       label: "Star Rating",      dir: "desc" },
  { key: "releaseDate",      label: "Release Date",     dir: "asc"  },
  { key: "startDate",        label: "Start Date",       dir: "asc"  },
];

function sortedProjects() {
  const { key, dir } = state.homeSort;
  const list = [...state.projects];
  list.sort((a, b) => {
    let av = a[key];
    let bv = b[key];

    // treat null / undefined / "" as sort-last regardless of direction
    const aNull = av == null || av === "";
    const bNull = bv == null || bv === "";
    if (aNull && bNull) return 0;
    if (aNull) return 1;
    if (bNull) return -1;

    // numeric
    if (typeof av === "number" && typeof bv === "number") {
      return dir === "asc" ? av - bv : bv - av;
    }
    // string / date (ISO strings sort lexicographically correctly)
    av = String(av).toLowerCase();
    bv = String(bv).toLowerCase();
    if (av < bv) return dir === "asc" ? -1 : 1;
    if (av > bv) return dir === "asc" ? 1 : -1;
    return 0;
  });
  return list;
}

function renderHomeView() {
  const sorted = sortedProjects();
  const activeSortOption = HOME_SORT_OPTIONS.find((o) => o.key === state.homeSort.key);
  const activeSortLabel = activeSortOption ? activeSortOption.label : "Sort";

  const cards = sorted
    .map((project) => {
      const trackLabel =
        project.trackCount === 1
          ? "1 track"
          : `${project.trackCount || 0} tracks`;
      const runtimeLabel = formatRuntime(project.totalRuntimeSeconds || 0);
      const completionPercent = project.completionPercent || 0;
      const starRating = project.starRating || 0;
      return `
        <article class="project-card" data-open-project="${escapeHtml(project.id)}">
          <div class="card-cover">
            ${cardCoverHtml(project)}
            <span class="status-pill">${escapeHtml(project.status || "In Progress")}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${escapeHtml(project.title || "Untitled Project")}</h3>
            <p class="card-artist">${escapeHtml(project.artist || "Unknown Artist")}</p>
            <p class="card-meta">${escapeHtml(`${trackLabel} • ${runtimeLabel}`)}</p>
            ${starRating > 0 ? `<div class="card-rating">${buildCardStarsHtml(starRating)}</div>` : ""}
          </div>
          ${completionPercent > 0 ? `<div class="card-progress-wrap"><div class="card-progress-bar" style="width:${completionPercent}%"></div></div>` : ""}
        </article>
      `;
    })
    .join("");

  const sortMenuItems = HOME_SORT_OPTIONS.map((opt) => {
    const isActive = opt.key === state.homeSort.key;
    return `<button class="sort-menu-item${isActive ? " sort-menu-item--active" : ""}" type="button" data-sort-key="${opt.key}" data-sort-dir="${opt.dir}">${opt.label}${isActive ? (state.homeSort.dir === "asc" ? " ↑" : " ↓") : ""}</button>`;
  }).join("");

  appRoot.innerHTML = `
    <section class="view home-view">
      <header class="topbar">
        <div>
          <h1 class="brand">Studio</h1>
          <p class="brand-sub">Private workspace for works in progress</p>
        </div>
        <button id="logout-button" class="text-button" type="button">Logout</button>
      </header>

      <section class="home-actions">
        <button id="create-project-button" class="primary-button" type="button">New Project</button>
        <div class="sort-wrap">
          <button id="sort-button" class="sort-button" type="button" aria-haspopup="true" aria-expanded="false">
            ${icon("sort")} ${escapeHtml(activeSortLabel)}
          </button>
          <div id="sort-menu" class="sort-menu hidden">
            ${sortMenuItems}
          </div>
        </div>
      </section>

      <section class="project-grid">
        ${cards || '<div class="empty-state">No projects yet. Create one to start uploading tracks.</div>'}
      </section>
    </section>
  `;

  document
    .getElementById("logout-button")
    .addEventListener("click", async () => {
      try {
        await apiRequest("/api/logout", { method: "POST" });
        state.authenticated = false;
        state.currentProject = null;
        navigate("/");
      } catch (error) {
        showToast(error.message || "Could not log out");
      }
    });

  document
    .getElementById("create-project-button")
    .addEventListener("click", async () => {
      try {
        const payload = await apiRequest("/api/projects", {
          method: "POST",
          body: {
            title: "Untitled Project",
            artist: "Unknown Artist",
            description: "",
            status: "In Progress",
          },
        });

        state.currentProject = payload.project;
        mergeProjectSummary(payload.project);
        navigate(`/project/${payload.project.id}`);
      } catch (error) {
        showToast(error.message || "Failed to create project");
      }
    });

  // Sort button + menu
  const sortBtn  = document.getElementById("sort-button");
  const sortMenu = document.getElementById("sort-menu");

  sortBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !sortMenu.classList.contains("hidden");
    sortMenu.classList.toggle("hidden", isOpen);
    sortBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  sortMenu.querySelectorAll(".sort-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      const newKey = item.dataset.sortKey;
      const defaultDir = item.dataset.sortDir;
      if (state.homeSort.key === newKey) {
        // same key → flip direction
        state.homeSort.dir = state.homeSort.dir === "asc" ? "desc" : "asc";
      } else {
        state.homeSort.key = newKey;
        state.homeSort.dir = defaultDir;
      }
      renderHomeView();
    });
  });

  // close sort menu on outside click
  document.addEventListener("click", function closeSortMenu(e) {
    if (!sortBtn.contains(e.target)) {
      sortMenu.classList.add("hidden");
      sortBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", closeSortMenu);
    }
  });

  appRoot.querySelectorAll("[data-open-project]").forEach((card) => {
    card.addEventListener("click", () => {
      navigate(`/project/${card.dataset.openProject}`);
    });
  });

  highlightActiveTrackRows();
}

function projectTrackHtml(track, listIndex) {
  const canEdit = canCurrentViewEdit();
  const canReorder = canEdit && !isShareRoute();
  const canListen = canCurrentViewListen();
  const createdOn = formatShortDate(track.createdAt) || "No date";
  const todos = normalizeTodos(track.todos);
  const openTodoCount = todos.filter((todo) => !todo.done).length;
  const activeVersion = getActiveTrackVersion(track);
  const badges = [];

  if (track.versionCount > 1) {
    badges.push(`<span class="track-badge">v${track.versionCount}</span>`);
  }
  if (activeVersion && activeVersion.originalName) {
    badges.push(
      `<span class="track-badge track-badge-filename marquee-wrap"><span class="marquee-inner">${escapeHtml(activeVersion.originalName)}</span></span>`,
    );
  }

  if (track.notes) {
    badges.push('<span class="track-badge">Notes</span>');
  }
  if (track.lyrics) {
    badges.push('<span class="track-badge">Lyrics</span>');
  }
  if (todos.length) {
    badges.push(
      `<span class="track-badge">Todos ${openTodoCount}/${todos.length}</span>`,
    );
  }

  // Phase 2 inline badges
  const trackStatusColor = track.trackStatus ? (TRACK_STATUS_COLORS[track.trackStatus] || "") : "";
  const trackStatusBadge = track.trackStatus
    ? `<span class="track-status-pill" style="background:${trackStatusColor}22;color:${trackStatusColor};border-color:${trackStatusColor}55">${escapeHtml(track.trackStatus)}</span>`
    : "";

  const moodChipsHtml = Array.isArray(track.moodTags) && track.moodTags.length
    ? track.moodTags.map((tag) => {
        const c = MOOD_TAG_COLORS[tag] || "#555";
        return `<span class="track-mood-chip" style="background:${c}22;color:${c};border-color:${c}55">${escapeHtml(tag)}</span>`;
      }).join("")
    : "";

  const inlineMeta = [];
  if (track.bpm) inlineMeta.push(`<span class="track-inline-meta">${escapeHtml(String(track.bpm))} BPM</span>`);
  if (track.key) inlineMeta.push(`${camelotBadgeHtml(track.key)}<span class="track-inline-meta">${escapeHtml(track.key)}</span>`);
  if (track.listenCount) inlineMeta.push(`<span class="track-inline-meta">${escapeHtml(String(track.listenCount))} plays</span>`);

  return `
    <article class="track-row" data-track-id="${escapeHtml(track.id)}" draggable="${canReorder ? "true" : "false"}">
      <div class="track-index drag-handle" title="Drag to reorder">${listIndex + 1}</div>
      <div class="track-main">
        <div class="track-line">
          <div
            class="editable track-title-editable"
            contenteditable="${canEdit ? "true" : "false"}"
            spellcheck="false"
            data-track-id="${escapeHtml(track.id)}"
            data-track-field="title"
            data-placeholder="Untitled track"
          >${escapeHtml(track.title || "")}</div>
        </div>

        <div class="track-meta-line">
          <span class="track-date">${escapeHtml(createdOn)}</span>
          <span class="track-file-name">${escapeHtml(track.originalName || activeVersion?.originalName || "")}</span>
          ${inlineMeta.join("")}
        </div>

        ${moodChipsHtml ? `<div class="track-mood-chips-row">${moodChipsHtml}</div>` : ""}

        <div class="track-bottom-row">
          <div class="track-badges">${badges.join("")}</div>
          ${trackStatusBadge}
        </div>
      </div>
      <button class="icon-button track-play-button" type="button" data-play-track="${escapeHtml(track.id)}" title="Play track" ${canListen ? "" : "disabled"}>${icon("play")}</button>
      <button class="icon-button track-menu-button" type="button" data-track-menu="${escapeHtml(track.id)}" title="Track options">${icon("more")}</button>
    </article>
  `;
}

function statusOptionsHtml(status) {
  return STATUS_OPTIONS.map((option) => {
    const selected = option === status ? "selected" : "";
    return `<option value="${escapeHtml(option)}" ${selected}>${escapeHtml(option)}</option>`;
  }).join("");
}

function renderProjectView() {
  const project = getActiveProject();
  if (!project) {
    renderErrorState("Project not found", true);
    return;
  }

  // Sync working color palette from project
  state.metadataPanel.colorPalette = Array.isArray(project.colorPalette)
    ? [...project.colorPalette]
    : [];

  const canEdit = canCurrentViewEdit();
  const canListen = canCurrentViewListen();
  const showOwnerShareManager = !isShareRoute();

  const tracks = project.tracks || [];
  const tracksHtml = tracks
    .map((track, index) => projectTrackHtml(track, index))
    .join("");
  const trackCountLabel =
    tracks.length === 1 ? "1 track" : `${tracks.length} tracks`;
  const runtimeLabel = formatRuntime(project.totalRuntimeSeconds || 0);
  const shareLinks = Array.isArray(project.shareLinks)
    ? project.shareLinks
    : [];
  const coverVersions = Array.isArray(project.coverVersions)
    ? project.coverVersions
    : [];

  const coverVersionsHtml = coverVersions
    .map((version) => {
      const isActive = version.id === project.activeCoverId;
      return `
        <div class="cover-thumb-wrap">
          <button
            class="cover-switcher-thumb ${isActive ? "active" : ""}"
            type="button"
            data-cover-version="${escapeHtml(version.id)}"
            title="Switch cover"
          >
            <img src="${escapeHtml(version.coverUrl)}" alt="Cover version" loading="lazy" />
          </button>
          ${canEdit ? `<button class="cover-thumb-delete" type="button" data-delete-cover="${escapeHtml(version.id)}" title="Delete cover" aria-label="Delete cover">${icon("close")}</button>` : ""}
        </div>
      `;
    })
    .join("");

  const shareLinksHtml = shareLinks
    .map((link) => {
      const absoluteUrl = `${window.location.origin}${link.shareUrl}`;
      return `
        <div class="share-link-item">
          <span class="share-link-type">${escapeHtml(shareAccessLabel(link.access))}</span>
          <input class="share-link-input" type="text" readonly value="${escapeHtml(absoluteUrl)}" />
          <button class="secondary-button" type="button" data-copy-share="${escapeHtml(link.shareUrl)}">Copy</button>
          <button class="secondary-button" type="button" data-delete-share="${escapeHtml(link.id)}">Delete</button>
        </div>
      `;
    })
    .join("");

  appRoot.innerHTML = `
    <section class="view project-view">
      <header class="project-chrome">
          <button id="back-home-button" class="circle-button" type="button" aria-label="Back to library">${icon("back")}</button>
        <div class="chrome-actions">
            ${showOwnerShareManager ? `<button id="delete-project-button" class="circle-button danger" type="button" aria-label="Delete project" title="Delete project">${icon("trash")}</button><button id="logout-button" class="circle-button" type="button" aria-label="Log out">${icon("logout")}</button>` : ""}
        </div>
      </header>

      <section class="project-stage">
        <div class="cover-stack">
          <button id="cover-button" class="cover-editor stage-cover" type="button" aria-label="Upload cover image">
            ${project.coverUrl ? `<img src="${escapeHtml(project.coverUrl)}?v=${escapeHtml(project.activeCoverId || "")}" alt="Project cover" />` : "Click to upload cover"}
          </button>
          <div class="cover-switcher-wrap">
            <p class="cover-switcher-label">Cover Versions</p>
            <div id="cover-switcher" class="cover-switcher">
              ${coverVersionsHtml || '<p class="todo-empty">No cover versions yet.</p>'}
            </div>
          </div>
        </div>

        <div class="project-column">
          <div class="project-head">
            <div class="project-headings">
              <h1 id="project-title" class="editable heading-editable" contenteditable="${canEdit ? "true" : "false"}" spellcheck="false" data-placeholder="Project title">${escapeHtml(project.title || "")}</h1>

              <div class="project-stats-row">
                <p id="project-artist" class="editable subheading-editable" contenteditable="${canEdit ? "true" : "false"}" spellcheck="false" data-placeholder="Artist">${escapeHtml(project.artist || "")}</p>
                  <span class="stats-dot">&middot;</span>
                <span class="project-track-count">${escapeHtml(trackCountLabel)}</span>
                  <span class="stats-dot">&middot;</span>
                <span class="project-runtime">${escapeHtml(runtimeLabel)}</span>
              </div>

              ${
                (project.colorPalette && project.colorPalette.length) ||
                project.releaseDate
                  ? `<div class="project-meta-chips">
                      ${project.colorPalette && project.colorPalette.length ? `<div class="project-palette-row">${buildColorPaletteSwatchesHtml(project.colorPalette)}</div>` : ""}
                      ${project.releaseDate ? `<div class="project-deadline-chip">${buildDeadlineCountdownHtml(project.releaseDate)}</div>` : ""}
                    </div>`
                  : ""
              }
            </div>

            <div class="project-main-controls">
              <button id="shuffle-tracks-button" class="icon-button ghost-control" type="button" title="Shuffle queue">${icon("shuffle")}</button>
              <button id="play-all-button" class="icon-button play-main-control" type="button" title="Play from start" ${canListen ? "" : "disabled"}>${icon("play")}</button>
            </div>
          </div>

          <div class="project-tools">
            <button id="upload-tracks-button" class="add-tracks-button" type="button" ${canEdit ? "" : "disabled"}>+ Add tracks</button>

            <div class="project-secondary-controls">
              <select id="project-status" class="project-status-select" title="Status" aria-label="Status" ${canEdit ? "" : "disabled"}>${statusOptionsHtml(project.status)}</select>
              <button id="open-metadata-button" class="secondary-button panel-trigger-btn" type="button">${icon("metadata")} Metadata</button>
              <button id="open-notes-button" class="secondary-button panel-trigger-btn" type="button">${icon("notes")} Notes</button>
              ${showOwnerShareManager ? `<button id="open-share-button" class="secondary-button panel-trigger-btn" type="button">${icon("link")} Share</button>` : ""}
            </div>
          </div>

          <section class="tracks-panel">
            <div class="tracks-toolbar">
              <h2>Tracklist</h2>
            </div>

            <input id="cover-input" type="file" hidden accept=".jpg,.jpeg,.png,.webp" />
            <input id="track-input" type="file" hidden multiple accept=".wav,.mp3,.flac" />

            <div id="tracks-list" class="tracks-list">
              ${tracksHtml || '<div class="empty-state">No tracks uploaded yet. Add WAV, MP3, or FLAC files.</div>'}
            </div>
          </section>
        </div>
      </section>

      <div id="track-menu-overlay" class="track-menu-overlay hidden" aria-hidden="true">
        <section class="track-menu-sheet" role="dialog" aria-modal="true" aria-label="Track details">
          <header class="track-menu-header">
            <div class="track-menu-headings">
              <h3 id="track-menu-title">Track details</h3>
              <p id="track-menu-subtitle"></p>
            </div>
            <button id="track-menu-close" class="circle-button track-menu-close" type="button" aria-label="Close track details">${icon("close")}</button>
          </header>

          <div class="track-menu-actions">
            <button id="track-menu-play" class="secondary-button track-menu-play" type="button" ${canListen ? "" : "disabled"}>${icon("play")} Play</button>
            <button id="track-menu-save" class="primary-button" type="button" ${canEdit ? "" : "disabled"}>Save</button>
          </div>

          <div class="track-menu-field">
            <div class="track-menu-todo-head">
              <label>Versions</label>
              <button id="track-version-add" class="secondary-button track-menu-todo-add" type="button" ${canEdit ? "" : "disabled"}>${icon("plus")} Upload</button>
            </div>
            <input id="track-version-input" type="file" hidden accept=".wav,.mp3,.flac" />
            <div id="track-version-list" class="track-version-list"></div>
          </div>

          <div class="track-menu-field track-meta-row">
            <div class="track-meta-col">
              <label for="track-bpm-input">BPM</label>
              <input id="track-bpm-input" class="track-num-input" type="number" min="1" max="999" placeholder="—" ${canEdit ? "" : "disabled"} />
            </div>
            <div class="track-meta-col">
              <label for="track-key-select">Key</label>
              <div class="track-key-row">
                <select id="track-key-select" class="track-key-select" ${canEdit ? "" : "disabled"}>
                  <option value="">—</option>
                  ${MUSICAL_KEYS.map((k) => `<option value="${escapeHtml(k)}">${escapeHtml(k)}</option>`).join("")}
                </select>
                <span id="track-camelot-badge" class="camelot-badge" hidden></span>
              </div>
            </div>
          </div>

          <div class="track-menu-field track-meta-row">
            <div class="track-meta-col">
              <label for="track-status-select">Status</label>
              <select id="track-status-select" class="track-status-select" ${canEdit ? "" : "disabled"}>
                <option value="">—</option>
                ${TRACK_STATUS_OPTIONS.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("")}
              </select>
            </div>
            <div class="track-meta-col track-meta-col-wide">
              <label>Play Count</label>
              <span id="track-listen-count" class="track-listen-count">Played 0 times</span>
            </div>
          </div>

          <div class="track-menu-field">
            <label>Mood Tags</label>
            <div id="track-mood-tags" class="mood-tags-wrap"></div>
          </div>

          <div class="track-menu-field">
            <div class="track-menu-todo-head">
              <label>Analysis</label>
              <button id="track-lufs-analyze" class="secondary-button track-menu-todo-add" type="button" ${canEdit ? "" : "disabled"}>Analyze</button>
            </div>
            <div id="track-lufs-display" class="lufs-display"></div>
          </div>

          <div class="track-menu-field">
            <label for="track-menu-notes">Notes</label>
            <textarea id="track-menu-notes" class="track-menu-notes" placeholder="Session notes" ${canEdit ? "" : "disabled"}></textarea>
          </div>

          <div class="track-menu-field">
            <label for="track-menu-lyrics">Lyrics</label>
            <textarea id="track-menu-lyrics" class="track-menu-lyrics" placeholder="Lyrics with line breaks" ${canEdit ? "" : "disabled"}></textarea>
          </div>

          <div class="track-menu-field">
            <div class="track-menu-todo-head">
              <label for="track-todo-input">Todos</label>
              <button id="track-todo-add" class="secondary-button track-menu-todo-add" type="button" ${canEdit ? "" : "disabled"}>${icon("plus")} Add</button>
            </div>

            <div class="track-menu-todo-add-row">
              <input id="track-todo-input" type="text" placeholder="Add todo item" maxlength="220" ${canEdit ? "" : "disabled"} />
            </div>

            <div id="track-todo-list" class="track-menu-todo-list"></div>
          </div>

          <footer class="track-menu-footer">
            <button id="track-menu-delete" class="secondary-button track-menu-delete" type="button" ${canEdit ? "" : "disabled"}>${icon("trash")} Delete Track</button>
          </footer>
        </section>
      </div>

      <div id="notes-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Project notes">
        <div class="panel-sheet">
          <header class="panel-header">
            <h3>Project Notes</h3>
            <button id="notes-panel-close" class="circle-button" type="button" aria-label="Close notes">${icon("close")}</button>
          </header>
          <div class="panel-body">
            <div class="project-notes-shell">
              <div id="project-description" class="editable description-editable" contenteditable="${canEdit ? "true" : "false"}" spellcheck="true" data-placeholder="Project notes">${escapeHtml(project.description || "")}</div>
            </div>
          </div>
        </div>
      </div>

      ${
        showOwnerShareManager
          ? `
      <div id="share-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Share project">
        <div class="panel-sheet">
          <header class="panel-header">
            <h3>Share Project</h3>
            <button id="share-panel-close" class="circle-button" type="button" aria-label="Close share">${icon("close")}</button>
          </header>
          <div class="panel-body">
            <div class="share-manager">
              <div class="share-create-row">
                <label for="share-access-select">Share Access</label>
                <select id="share-access-select" class="project-status-select">${shareAccessOptionsHtml("listen")}</select>
                <button id="share-create-button" class="secondary-button" type="button">Create Share Link</button>
              </div>
              <div id="share-links-list" class="share-links-list">
                ${shareLinksHtml || '<p class="todo-empty">No share links yet.</p>'}
              </div>
            </div>
          </div>
        </div>
      </div>
      `
          : ""
      }

      <div id="metadata-panel" class="panel-overlay hidden" role="dialog" aria-modal="true" aria-label="Project metadata">
        <div class="panel-sheet panel-sheet-wide">
          <header class="panel-header">
            <h3>Metadata</h3>
            <button id="metadata-panel-close" class="circle-button" type="button" aria-label="Close metadata">${icon("close")}</button>
          </header>
          <div class="panel-body">

            <div class="meta-section meta-dates-row">
              <div class="meta-date-field">
                <label class="meta-section-label">Start Date</label>
                <button id="meta-start-date-btn" class="dp-trigger-btn${canEdit ? "" : " dp-trigger-btn--readonly"}" type="button" data-value="${escapeHtml(project.startDate || "")}" ${canEdit ? "" : "disabled"}>
                  ${DatePicker.formatDisplay(project.startDate)}
                </button>
              </div>
              <div class="meta-date-field">
                <label class="meta-section-label">Release Date</label>
                <button id="meta-release-date-btn" class="dp-trigger-btn${canEdit ? "" : " dp-trigger-btn--readonly"}" type="button" data-value="${escapeHtml(project.releaseDate || "")}" ${canEdit ? "" : "disabled"}>
                  ${DatePicker.formatDisplay(project.releaseDate)}
                </button>
                <div id="meta-deadline-countdown" class="deadline-countdown${project.releaseDate ? "" : " hidden"}">${project.releaseDate ? buildDeadlineCountdownHtml(project.releaseDate) : ""}</div>
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Completion — <span id="meta-completion-display">${project.completionPercent || 0}%</span></label>
              <div class="completion-track">
                <input type="range" id="meta-completion-range" min="0" max="100" value="${project.completionPercent || 0}" ${canEdit ? "" : "disabled"} />
                <input type="number" id="meta-completion-num" class="metadata-num-input" min="0" max="100" value="${project.completionPercent || 0}" ${canEdit ? "" : "disabled"} />
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Rating</label>
              <div id="meta-star-rating" class="star-rating-widget" data-rating="${project.starRating || 0}">
                ${[1, 2, 3, 4, 5].map((n) => `<button class="star-btn${n <= (project.starRating || 0) ? " active" : ""}" type="button" data-star="${n}" aria-label="${n} star${n > 1 ? "s" : ""}" ${canEdit ? "" : "disabled"}>★</button>`).join("")}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Color Palette</label>
              <div id="meta-color-palette" class="color-palette-row">
                ${buildColorPalettePickerHtml(state.metadataPanel.colorPalette, canEdit)}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label">Streaming Platforms</label>
              <div class="streaming-checklist">
                ${[
                  { key: "spotify", label: "Spotify" },
                  { key: "appleMusic", label: "Apple Music" },
                  { key: "bandcamp", label: "Bandcamp" },
                  { key: "tidal", label: "Tidal" },
                  { key: "youtubeMusic", label: "YouTube Music" },
                  { key: "soundCloud", label: "SoundCloud" },
                ]
                  .map(
                    ({ key, label }) => `
                  <label class="stream-check-row">
                    <input type="checkbox" class="stream-checkbox" data-platform="${escapeHtml(key)}" ${(project.streamingChecklist || {})[key] ? "checked" : ""} ${canEdit ? "" : "disabled"} />
                    <span>${escapeHtml(label)}</span>
                  </label>
                `,
                  )
                  .join("")}
              </div>
            </div>

            <div class="meta-section">
              <label class="meta-section-label" for="meta-presave-link">Pre-Save Link</label>
              <input type="url" id="meta-presave-link" class="metadata-url-input" placeholder="https://..." value="${escapeHtml(project.preSaveLink || "")}" ${canEdit ? "" : "disabled"} />
              ${project.preSaveLink ? `<a href="${escapeHtml(project.preSaveLink)}" target="_blank" rel="noopener noreferrer" class="presave-link-preview">Open link ↗</a>` : ""}
            </div>

            <div class="meta-section">
              <label class="meta-section-label" for="meta-distributor-notes">Distributor Notes</label>
              <textarea id="meta-distributor-notes" class="metadata-textarea" placeholder="DistroKid / TuneCore details, ISRC codes, release admin notes…" ${canEdit ? "" : "disabled"}>${escapeHtml(project.distributorNotes || "")}</textarea>
            </div>

            ${canEdit ? `<div class="metadata-actions"><button id="metadata-save" class="primary-button" type="button">Save Metadata</button></div>` : ""}

          </div>
        </div>
      </div>
    </section>
  `;

  bindProjectViewInteractions();
  highlightActiveTrackRows();

  // Measure filename badge marquees after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      appRoot
        .querySelectorAll(".track-badge.marquee-wrap")
        .forEach(applyMarquee);
    });
  });
}

function bindMetadataPanelInteractions(projectId, canEdit) {
  const panel = document.getElementById("metadata-panel");
  const closeBtn = document.getElementById("metadata-panel-close");
  const openBtn = document.getElementById("open-metadata-button");
  const completionRange = document.getElementById("meta-completion-range");
  const completionNum = document.getElementById("meta-completion-num");
  const completionDisplay = document.getElementById("meta-completion-display");
  const starWidget = document.getElementById("meta-star-rating");
  const colorPaletteEl = document.getElementById("meta-color-palette");
  const saveBtn = document.getElementById("metadata-save");

  if (!panel) return;

  function closePanel() {
    ColorPicker.close();
    DatePicker.close();
    animatedClose(panel);
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      panel.classList.remove("hidden");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closePanel);
  }

  panel.addEventListener("click", (event) => {
    if (event.target === panel) closePanel();
  });

  if (!canEdit) return;

  // Date picker buttons
  function bindDateBtn(btnId, onCommit) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("click", () => {
      DatePicker.open(btn, btn.dataset.value || "", (val) => {
        btn.dataset.value = val;
        btn.textContent = DatePicker.formatDisplay(val);
        onCommit(val);
      });
    });
  }

  // Deadline countdown live update
  function updateDeadlineCountdown(val) {
    const countdownEl = document.getElementById("meta-deadline-countdown");
    if (!countdownEl) return;
    if (!val) {
      countdownEl.classList.add("hidden");
      countdownEl.innerHTML = "";
      return;
    }
    countdownEl.classList.remove("hidden");
    countdownEl.innerHTML = buildDeadlineCountdownHtml(val);
  }

  bindDateBtn("meta-start-date-btn", () => {});
  bindDateBtn("meta-release-date-btn", updateDeadlineCountdown);

  // Completion slider ↔ number input sync
  if (completionRange && completionNum && completionDisplay) {
    completionRange.addEventListener("input", () => {
      completionNum.value = completionRange.value;
      completionDisplay.textContent = completionRange.value + "%";
    });
    completionNum.addEventListener("input", () => {
      const clamped = Math.max(
        0,
        Math.min(100, Math.round(Number(completionNum.value) || 0)),
      );
      completionRange.value = clamped;
      completionDisplay.textContent = clamped + "%";
    });
  }

  // Star rating
  if (starWidget) {
    starWidget.querySelectorAll(".star-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const starVal = Number(btn.dataset.star);
        const current = Number(starWidget.dataset.rating) || 0;
        const newRating = starVal === current ? 0 : starVal;
        starWidget.dataset.rating = newRating;
        starWidget
          .querySelectorAll(".star-btn")
          .forEach((s, i) => s.classList.toggle("active", i + 1 <= newRating));
      });
    });
  }

  // Color palette
  function rebuildColorPalette() {
    if (!colorPaletteEl) return;
    colorPaletteEl.innerHTML = buildColorPalettePickerHtml(
      state.metadataPanel.colorPalette,
      canEdit,
    );
    bindColorPaletteEvents();
  }

  function bindColorPaletteEvents() {
    if (!colorPaletteEl) return;

    // swatch click → open custom color picker
    colorPaletteEl.querySelectorAll(".palette-swatch[data-palette-index]").forEach((swatch) => {
      const openPicker = () => {
        if (!canEdit) return;
        const idx = Number(swatch.dataset.paletteIndex);
        const currentColor = state.metadataPanel.colorPalette[idx] || "#a89eff";
        ColorPicker.open(swatch, currentColor, (hex) => {
          state.metadataPanel.colorPalette[idx] = hex;
          swatch.style.background = hex;
          swatch.setAttribute("aria-label", `Edit color ${idx + 1}: ${hex}`);
        });
      };
      swatch.addEventListener("click", openPicker);
      swatch.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); }
      });
    });

    colorPaletteEl.querySelectorAll("[data-palette-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.paletteRemove);
        if (Number.isFinite(idx)) {
          ColorPicker.close();
          state.metadataPanel.colorPalette.splice(idx, 1);
          rebuildColorPalette();
        }
      });
    });

    const addBtn = document.getElementById("palette-add-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        if (state.metadataPanel.colorPalette.length < 5) {
          state.metadataPanel.colorPalette.push("#a89eff");
          rebuildColorPalette();
        }
      });
    }
  }

  bindColorPaletteEvents();

  // Save
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const startDateVal   = document.getElementById("meta-start-date-btn")?.dataset.value   || "";
      const releaseDateVal = document.getElementById("meta-release-date-btn")?.dataset.value || "";
      const completionVal = completionRange
        ? Math.max(0, Math.min(100, Math.round(Number(completionRange.value) || 0)))
        : 0;
      const starVal = starWidget ? Number(starWidget.dataset.rating) || 0 : 0;
      const preSaveVal =
        document.getElementById("meta-presave-link")?.value || "";
      const distributorVal =
        document.getElementById("meta-distributor-notes")?.value || "";

      const streamingChecklist = {};
      document.querySelectorAll(".stream-checkbox").forEach((cb) => {
        streamingChecklist[cb.dataset.platform] = cb.checked;
      });

      try {
        await saveProject({
          startDate: startDateVal || null,
          releaseDate: releaseDateVal || null,
          completionPercent: completionVal,
          starRating: starVal,
          colorPalette: [...state.metadataPanel.colorPalette],
          streamingChecklist,
          preSaveLink: preSaveVal,
          distributorNotes: distributorVal,
        });
        showToast("Metadata saved");
        closePanel();
        renderProjectView();
      } catch (error) {
        showToast(error.message || "Could not save metadata");
      }
    });
  }
}

function bindProjectViewInteractions() {
  const project = getActiveProject();
  if (!project) {
    return;
  }

  const canEdit = canCurrentViewEdit();
  const canListen = canCurrentViewListen();
  const showOwnerShareManager = !isShareRoute();

  document.getElementById("back-home-button").addEventListener("click", () => {
    navigate("/");
  });

  const notesPanel = document.getElementById("notes-panel");
  const notesPanelClose = document.getElementById("notes-panel-close");
  const openNotesButton = document.getElementById("open-notes-button");

  if (openNotesButton && notesPanel) {
    openNotesButton.addEventListener("click", () => {
      notesPanel.classList.remove("hidden");
    });
  }

  if (notesPanelClose && notesPanel) {
    notesPanelClose.addEventListener("click", () => {
      animatedClose(notesPanel);
    });
  }

  if (notesPanel) {
    notesPanel.addEventListener("click", (event) => {
      if (event.target === notesPanel) {
        animatedClose(notesPanel);
      }
    });
  }

  const sharePanel = document.getElementById("share-panel");
  const sharePanelClose = document.getElementById("share-panel-close");
  const openShareButton = document.getElementById("open-share-button");

  if (openShareButton && sharePanel) {
    openShareButton.addEventListener("click", () => {
      sharePanel.classList.remove("hidden");
    });
  }

  if (sharePanelClose && sharePanel) {
    sharePanelClose.addEventListener("click", () => {
      animatedClose(sharePanel);
    });
  }

  if (sharePanel) {
    sharePanel.addEventListener("click", (event) => {
      if (event.target === sharePanel) {
        animatedClose(sharePanel);
      }
    });
  }

  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await apiRequest("/api/logout", { method: "POST" });
        state.authenticated = false;
        state.currentProject = null;
        navigate("/");
      } catch (error) {
        showToast(error.message || "Could not log out");
      }
    });
  }

  const deleteProjectButton = document.getElementById("delete-project-button");
  if (deleteProjectButton) {
    deleteProjectButton.addEventListener("click", async () => {
      const projectName = project.title || "this project";
      if (
        !(await showConfirmDialog(
          `Delete "${projectName}" and all its tracks/covers?`,
        ))
      ) {
        return;
      }

      try {
        await apiRequest(`/api/projects/${encodeURIComponent(project.id)}`, {
          method: "DELETE",
        });

        removeProjectSummary(project.id);
        state.currentProject = null;

        if (state.player.wavesurfer) {
          state.player.wavesurfer.stop();
        }
        state.player.queue = [];
        state.player.index = -1;
        state.player.track = null;
        state.player.autoplayOnReady = false;
        playerElement.classList.add("hidden");
        document.title = "Studio";
        setMarqueeText(playerTitleElement, "No track loaded");
        setMarqueeText(playerSubtitleElement, "");
        playerCurrentTimeElement.textContent = "0:00";
        playerDurationElement.textContent = "0:00";

        navigate("/");
        showToast("Project deleted");
      } catch (error) {
        showToast(error.message || "Could not delete project");
      }
    });
  }

  if (canEdit) {
    bindEditable(
      document.getElementById("project-title"),
      async (value) => {
        await saveProject({ title: value || "Untitled Project" });
      },
      { singleLine: true },
    );

    bindEditable(
      document.getElementById("project-artist"),
      async (value) => {
        await saveProject({ artist: value || "Unknown Artist" });
      },
      { singleLine: true },
    );

    bindEditable(
      document.getElementById("project-description"),
      async (value) => {
        await saveProject({ description: value });
      },
    );
  }

  const statusSelect = document.getElementById("project-status");
  if (statusSelect && canEdit) {
    statusSelect.addEventListener("change", async () => {
      try {
        await saveProject({ status: statusSelect.value });
        renderProjectView();
      } catch (error) {
        showToast(error.message || "Failed to save status");
      }
    });
  }

  const coverInput = document.getElementById("cover-input");
  document.getElementById("cover-button").addEventListener("click", () => {
    if (!canEdit) {
      return;
    }
    coverInput.click();
  });

  coverInput.addEventListener("change", async () => {
    if (!canEdit) {
      return;
    }

    if (!coverInput.files || !coverInput.files[0]) {
      return;
    }

    try {
      await uploadCoverVersion(project.id, coverInput.files[0]);
      renderProjectView();
      showToast("Cover version uploaded");
    } catch (error) {
      showToast(error.message || "Cover upload failed");
    }
  });

  appRoot.querySelectorAll("[data-cover-version]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!canEdit) {
        return;
      }

      const coverId = button.dataset.coverVersion;
      if (!coverId) {
        return;
      }

      try {
        await selectCoverVersion(project.id, coverId);
        renderProjectView();
      } catch (error) {
        showToast(error.message || "Could not switch cover");
      }
    });
  });

  if (canEdit) {
    appRoot.querySelectorAll("[data-delete-cover]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();
        const coverId = button.dataset.deleteCover;
        if (!coverId) {
          return;
        }

        try {
          await deleteCoverVersion(project.id, coverId);
          renderProjectView();
          showToast("Cover deleted");
        } catch (error) {
          showToast(error.message || "Could not delete cover");
        }
      });
    });
  }

  const trackInput = document.getElementById("track-input");
  document
    .getElementById("upload-tracks-button")
    .addEventListener("click", () => {
      if (!canEdit) {
        return;
      }
      trackInput.click();
    });

  const playAllButton = document.getElementById("play-all-button");
  if (playAllButton) {
    playAllButton.addEventListener("click", () => {
      if (!canListen) {
        showToast("This share link cannot play audio");
        return;
      }

      const activeProject = getActiveProject();
      const queue = (activeProject && activeProject.tracks) || [];
      if (!queue.length) {
        showToast("No tracks available");
        return;
      }

      // If this project is already active, toggle play/pause
      const activeTrackId = state.player.track ? state.player.track.id : null;
      const projectIsActive = Boolean(
        activeTrackId && queue.some((t) => t.id === activeTrackId),
      );
      if (projectIsActive && state.player.wavesurfer) {
        state.player.wavesurfer.playPause();
        return;
      }

      playTrack(queue[0], queue, 0);
    });
  }

  const shuffleTracksButton = document.getElementById("shuffle-tracks-button");
  if (shuffleTracksButton) {
    shuffleTracksButton.addEventListener("click", () => {
      if (!canListen) {
        showToast("This share link cannot play audio");
        return;
      }

      const activeProject = getActiveProject();
      const queue = (activeProject && activeProject.tracks) || [];
      if (!queue.length) {
        showToast("No tracks available");
        return;
      }

      const shuffledQueue = shuffledCopy(queue);
      playTrack(shuffledQueue[0], shuffledQueue, 0);
      showToast("Shuffle queue ready");
    });
  }

  trackInput.addEventListener("change", async () => {
    if (!canEdit || isShareRoute()) {
      return;
    }

    const files = Array.from(trackInput.files || []);
    if (!files.length) {
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("tracks", file);
    });

    try {
      const payload = await apiRequest(
        `/api/projects/${encodeURIComponent(project.id)}/tracks`,
        {
          method: "POST",
          body: formData,
        },
      );
      updateActiveProjectFromPayload(payload.project);
      renderProjectView();
      showToast("Tracks uploaded");
    } catch (error) {
      showToast(error.message || "Track upload failed");
    }
  });

  if (showOwnerShareManager) {
    const shareCreateButton = document.getElementById("share-create-button");
    const shareAccessSelect = document.getElementById("share-access-select");

    if (shareCreateButton && shareAccessSelect) {
      shareCreateButton.addEventListener("click", async () => {
        try {
          const payload = await apiRequest(
            `/api/projects/${encodeURIComponent(project.id)}/share`,
            {
              method: "POST",
              body: { access: shareAccessSelect.value },
            },
          );

          updateActiveProjectFromPayload(payload.project);
          renderProjectView();
          if (payload.shareLink && payload.shareLink.shareUrl) {
            await copyToClipboard(
              `${window.location.origin}${payload.shareLink.shareUrl}`,
            );
          }
        } catch (error) {
          showToast(error.message || "Could not create share link");
        }
      });
    }

    appRoot.querySelectorAll("[data-copy-share]").forEach((button) => {
      button.addEventListener("click", async () => {
        const sharePath = button.dataset.copyShare;
        if (!sharePath) {
          return;
        }

        await copyToClipboard(`${window.location.origin}${sharePath}`);
      });
    });

    appRoot.querySelectorAll("[data-delete-share]").forEach((button) => {
      button.addEventListener("click", async () => {
        const shareId = button.dataset.deleteShare;
        if (!shareId) {
          return;
        }

        try {
          const payload = await apiRequest(
            `/api/projects/${encodeURIComponent(project.id)}/share/${encodeURIComponent(shareId)}`,
            {
              method: "DELETE",
            },
          );
          updateActiveProjectFromPayload(payload.project);
          renderProjectView();
          showToast("Share link deleted");
        } catch (error) {
          showToast(error.message || "Could not delete share link");
        }
      });
    });
  }

  appRoot.querySelectorAll("[data-play-track]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!canListen) {
        showToast("This share link cannot play audio");
        return;
      }

      const trackId = button.dataset.playTrack;
      const activeProject = getActiveProject();
      const queue = (activeProject && activeProject.tracks) || [];
      const index = queue.findIndex((track) => track.id === trackId);
      if (index < 0) {
        return;
      }
      playTrack(queue[index], queue, index);
    });
  });

  if (canEdit) {
    appRoot.querySelectorAll("[data-track-field]").forEach((editable) => {
      const field = editable.dataset.trackField;
      const trackId = editable.dataset.trackId;
      bindEditable(
        editable,
        async (value) => {
          await saveTrack(project.id, trackId, { [field]: value });
        },
        { singleLine: true },
      );
    });
  }

  bindTrackMenuInteractions(project.id, { canEdit });

  bindMetadataPanelInteractions(project.id, canEdit);

  if (!isShareRoute() && canEdit) {
    bindTrackDragAndDrop(project.id);
  }
}

function bindTrackDragAndDrop(projectId) {
  const rows = Array.from(
    appRoot.querySelectorAll(".track-row[data-track-id]"),
  );
  if (!rows.length) {
    return;
  }

  let draggedTrackId = null;

  rows.forEach((row) => {
    row.addEventListener("dragstart", (event) => {
      draggedTrackId = row.dataset.trackId;
      row.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
    });

    row.addEventListener("dragend", () => {
      draggedTrackId = null;
      row.classList.remove("dragging");
      rows.forEach((candidate) => candidate.classList.remove("drag-target"));
    });

    row.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (draggedTrackId && draggedTrackId !== row.dataset.trackId) {
        row.classList.add("drag-target");
      }
    });

    row.addEventListener("dragleave", () => {
      row.classList.remove("drag-target");
    });

    row.addEventListener("drop", async (event) => {
      event.preventDefault();
      row.classList.remove("drag-target");

      if (!draggedTrackId) {
        return;
      }

      const targetTrackId = row.dataset.trackId;
      if (draggedTrackId === targetTrackId) {
        return;
      }

      const activeProject = getActiveProject();
      const currentTracks = [
        ...((activeProject && activeProject.tracks) || []),
      ];
      const sourceIndex = currentTracks.findIndex(
        (track) => track.id === draggedTrackId,
      );
      const targetIndex = currentTracks.findIndex(
        (track) => track.id === targetTrackId,
      );

      if (sourceIndex < 0 || targetIndex < 0) {
        return;
      }

      const [movedTrack] = currentTracks.splice(sourceIndex, 1);
      currentTracks.splice(targetIndex, 0, movedTrack);

      const trackIds = currentTracks.map((track) => track.id);

      try {
        const payload = await apiRequest(
          `/api/projects/${encodeURIComponent(projectId)}/tracks/reorder`,
          {
            method: "PATCH",
            body: { trackIds },
          },
        );

        updateActiveProjectFromPayload(payload.project);
        renderProjectView();
      } catch (error) {
        showToast(error.message || "Failed to reorder tracks");
      }
    });
  });
}

function renderSharedView() {
  const project = state.sharedProject;
  if (!project) {
    renderErrorState("Shared project not found", true);
    return;
  }

  const canListen = Boolean(project.canListen);

  if (!canListen && playerElement) {
    playerElement.classList.add("hidden");
  }

  const tracks = project.tracks || [];
  const tracksHtml = tracks
    .map((track, index) => {
      const sharedTrackNumber =
        track.trackNumber === null || track.trackNumber === undefined
          ? "-"
          : escapeHtml(track.trackNumber);
      const sharedTodos = normalizeTodos(track.todos);
      const openTodos = sharedTodos.filter((todo) => !todo.done).length;
      const todoSummary = sharedTodos.length
        ? `${openTodos} open / ${sharedTodos.length} total`
        : "-";

      return `
        <article class="track-row readonly shared-track-row" data-track-id="${escapeHtml(track.id)}">
          <div class="track-index">${index + 1}</div>
          <button class="icon-button track-play-button" type="button" data-share-play-track="${escapeHtml(track.id)}" aria-label="Play track" ${canListen ? "" : "disabled"}>${icon("play")}</button>
          <div class="track-main">
            <div class="track-line">
              <div class="readonly-text shared-track-title">${escapeHtml(track.title || "Untitled track")}</div>
            </div>

            <div class="track-meta-line">
              <span class="track-number-chip"># ${sharedTrackNumber}</span>
              <span class="track-date">${escapeHtml(formatShortDate(track.createdAt) || "No date")}</span>
              <span class="track-file-name">${escapeHtml(track.originalName || "")}</span>
            </div>

            <div class="track-aux-grid readonly-aux-grid">
              <div class="track-aux-field">
                <span class="track-aux-label">Notes</span>
                <div class="track-aux-static">${escapeHtml(track.notes || "-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Lyrics</span>
                <div class="track-aux-static">${escapeHtml(track.lyrics || "-")}</div>
              </div>
              <div class="track-aux-field">
                <span class="track-aux-label">Todos</span>
                <div class="track-aux-static">${escapeHtml(todoSummary)}</div>
              </div>
            </div>
          </div>
          <div class="track-menu-placeholder"></div>
        </article>
      `;
    })
    .join("");

  appRoot.innerHTML = `
    <section class="view share-view">
      <header class="topbar">
        <div>
          <h1 class="brand">${escapeHtml(project.title || "Shared Project")}</h1>
          <p class="brand-sub">by ${escapeHtml(project.artist || "Unknown Artist")} • ${escapeHtml(shareAccessLabel(project.shareAccess))}</p>
        </div>
        <button id="open-studio-button" class="text-button" type="button">Open Studio</button>
      </header>

      <section class="project-hero readonly">
        <div class="cover-editor">
          ${project.coverUrl ? `<img src="${escapeHtml(project.coverUrl)}" alt="Project cover" />` : "No cover"}
        </div>

        <div class="project-meta">
          <p class="readonly-text">Status: ${escapeHtml(project.status || "In Progress")}</p>
          <div class="description-editable">${escapeHtml(project.description || "")}</div>
        </div>
      </section>

      <section class="tracks-panel">
        <div class="tracks-toolbar">
          <h2>Tracks</h2>
        </div>
        ${canListen ? "" : '<p class="todo-empty">This link can view project data but cannot play audio.</p>'}
        <div class="tracks-list">
          ${tracksHtml || '<div class="empty-state">No tracks available.</div>'}
        </div>
      </section>
    </section>
  `;

  document
    .getElementById("open-studio-button")
    .addEventListener("click", () => {
      navigate("/");
    });

  if (canListen) {
    appRoot.querySelectorAll("[data-share-play-track]").forEach((button) => {
      button.addEventListener("click", () => {
        const trackId = button.dataset.sharePlayTrack;
        const queue = state.sharedProject.tracks || [];
        const index = queue.findIndex((track) => track.id === trackId);
        if (index < 0) {
          return;
        }
        playTrack(queue[index], queue, index);
      });
    });
  }

  highlightActiveTrackRows();
}

function renderLoginView() {
  appRoot.innerHTML = `
    <section class="view login-view">
      <div class="login-card">
        <h1>Studio</h1>
        <p>Enter your app password to continue.</p>
        <form id="login-form">
          <input id="password-input" type="password" required autocomplete="current-password" placeholder="Password" />
          <button class="primary-button" type="submit">Unlock</button>
        </form>
      </div>
    </section>
  `;

  const form = document.getElementById("login-form");
  const passwordInput = document.getElementById("password-input");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await apiRequest("/api/login", {
        method: "POST",
        body: { password: passwordInput.value },
        allowUnauthorized: true,
      });

      state.authenticated = true;
      passwordInput.value = "";
      renderRoute();
    } catch (error) {
      showToast(error.message || "Login failed");
    }
  });
}

async function renderShareRoute(token) {
  if (!token) {
    renderErrorState("Invalid share token", true);
    return;
  }

  try {
    const payload = await apiRequest(
      `/api/share/${encodeURIComponent(token)}`,
      { allowUnauthorized: true },
    );
    state.sharedProject = payload.project;
    state.currentProject = payload.project;

    if (payload.project && payload.project.canEdit) {
      renderProjectView();
      return;
    }

    renderSharedView();
  } catch (error) {
    renderErrorState(error.message || "Share link not found", true);
  }
}

async function renderRoute() {
  const route = getRoute();
  state.route = route;

  if (route.type === "share") {
    await renderShareRoute(route.token);
    return;
  }

  try {
    const session = await apiRequest("/api/session", {
      allowUnauthorized: true,
    });
    state.authenticated = Boolean(session.authenticated);
  } catch (error) {
    renderErrorState("Could not connect to the Studio server");
    return;
  }

  if (!state.authenticated) {
    renderLoginView();
    return;
  }

  if (route.type === "project") {
    try {
      await fetchProject(route.projectId);
      renderProjectView();
    } catch (error) {
      if (error.code === "AUTH_REQUIRED") {
        renderLoginView();
        return;
      }
      renderErrorState(error.message || "Project not found", true);
    }
    return;
  }

  try {
    await fetchProjects();
    renderHomeView();
  } catch (error) {
    if (error.code === "AUTH_REQUIRED") {
      renderLoginView();
      return;
    }
    renderErrorState(error.message || "Could not load projects");
  }
}

function startApp() {
  initializePlayer();
  window.addEventListener("popstate", () => {
    renderRoute();
  });

  renderRoute();
}

startApp();
