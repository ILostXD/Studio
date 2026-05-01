import type { TodoItem } from "@/types/project";

export function buildLocalId(prefix: string): string {
  const randomPart = Math.random().toString(36).slice(2, 9);
  return `${prefix}-${Date.now()}-${randomPart}`;
}

export function sanitizeTodoText(value: string): string {
  return String(value || "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, 220);
}

export function normalizeTodoItem(
  value: TodoItem | string | null | undefined,
): TodoItem | null {
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

export function normalizeTodos(
  value: TodoItem[] | string | null | undefined,
): TodoItem[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => normalizeTodoItem(entry))
      .filter((entry): entry is TodoItem => entry !== null);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => normalizeTodoItem(line))
      .filter((entry): entry is TodoItem => entry !== null);
  }

  return [];
}
