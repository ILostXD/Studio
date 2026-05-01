import { buildLocalId } from "@/lib/todos";
import type { MoodboardItem } from "@/types/project";

export function normalizeUrl(value: string): string {
  const trimmed = String(value || "").trim();
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) {
    return "";
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    return "";
  }
}

export function buildSoundCloudEmbedUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23a89eff&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`;
}

export function parseMoodboardEmbed(urlValue: string): {
  provider: "youtube" | "soundcloud";
  embedUrl: string;
} | null {
  const normalized = normalizeUrl(urlValue);
  if (!normalized) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./i, "").toLowerCase();
  let youtubeId = "";

  if (host === "youtu.be") {
    youtubeId = parsed.pathname.split("/").filter(Boolean)[0] || "";
  } else if (host === "youtube.com" || host.endsWith(".youtube.com")) {
    if (parsed.pathname === "/watch") {
      youtubeId = parsed.searchParams.get("v") || "";
    } else {
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(parts[0])) {
        youtubeId = parts[1] || "";
      }
    }
  }

  if (/^[a-zA-Z0-9_-]{6,}$/.test(youtubeId)) {
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    };
  }

  if (host === "w.soundcloud.com") {
    const nestedUrl = normalizeUrl(parsed.searchParams.get("url") || "");
    if (nestedUrl) {
      return {
        provider: "soundcloud",
        embedUrl: buildSoundCloudEmbedUrl(nestedUrl),
      };
    }
  }

  if (host === "soundcloud.com" || host.endsWith(".soundcloud.com")) {
    return {
      provider: "soundcloud",
      embedUrl: buildSoundCloudEmbedUrl(normalized),
    };
  }

  return null;
}

export function buildMoodboardItem(
  type: MoodboardItem["type"],
  fields: Partial<MoodboardItem>,
): MoodboardItem {
  const timestamp = new Date().toISOString();
  return {
    id: buildLocalId(type),
    type,
    createdAt: timestamp,
    updatedAt: timestamp,
    ...fields,
  } as MoodboardItem;
}
