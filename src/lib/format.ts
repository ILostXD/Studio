import { SHARE_ACCESS_OPTIONS } from "@/lib/constants";
import type { ShareAccess } from "@/types/share";

export function clampNumber(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function formatSeconds(totalSeconds: number | null | undefined): string {
  if (!Number.isFinite(totalSeconds) || (totalSeconds as number) < 0) {
    return "0:00";
  }

  const seconds = Math.floor(totalSeconds as number);
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export function formatRuntime(totalSeconds: number | null | undefined): string {
  if (!Number.isFinite(totalSeconds) || (totalSeconds as number) <= 0) {
    return "0m";
  }

  const rounded = Math.max(0, Math.round(totalSeconds as number));
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

export function formatFileSize(sizeBytes: number | null | undefined): string {
  if (!Number.isFinite(sizeBytes) || (sizeBytes as number) <= 0) {
    return "-";
  }

  const mbValue = (sizeBytes as number) / (1024 * 1024);
  if (mbValue >= 1) {
    return `${mbValue.toFixed(1)} MB`;
  }

  const kbValue = (sizeBytes as number) / 1024;
  return `${Math.max(1, Math.round(kbValue))} KB`;
}

export function formatShortDate(value: string | null | undefined): string {
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

export function shareAccessLabel(access: ShareAccess | string | null | undefined): string {
  const value = String(access || "listen");
  const match = SHARE_ACCESS_OPTIONS.find((option) => option.value === value);
  return match ? match.label : "See + Listen";
}

export function buildDeadlineCountdown(releaseDate: string | null | undefined): {
  label: string;
  tone: "green" | "yellow" | "red" | "overdue";
} | null {
  if (!releaseDate) {
    return null;
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(`${releaseDate}T00:00:00`);
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      label: `${Math.abs(diffDays)} days overdue`,
      tone: "overdue",
    };
  }
  if (diffDays === 0) {
    return {
      label: "Release day!",
      tone: "red",
    };
  }

  if (diffDays > 30) {
    return {
      label: `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`,
      tone: "green",
    };
  }

  if (diffDays > 7) {
    return {
      label: `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`,
      tone: "yellow",
    };
  }

  return {
    label: `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`,
    tone: "red",
  };
}
