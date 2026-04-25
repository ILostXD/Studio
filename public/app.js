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

  await saveTrack(projectId, state.trackMenu.trackId, {
    notes: state.trackMenu.notes,
    lyrics: state.trackMenu.lyrics,
    todos: todosPayload,
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

function renderHomeView() {
  const cards = state.projects
    .map((project) => {
      const trackLabel =
        project.trackCount === 1
          ? "1 track"
          : `${project.trackCount || 0} tracks`;
      const runtimeLabel = formatRuntime(project.totalRuntimeSeconds || 0);
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
          </div>
        </article>
      `;
    })
    .join("");

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
        </div>

        <div class="track-badges">${badges.join("")}</div>
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
