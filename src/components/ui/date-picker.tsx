import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function parseIsoDate(value: string | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function toIsoDate(value: Date): string {
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
}

function startOfMonth(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), 1);
}

function isSameDay(left: Date | null, right: Date | null): boolean {
  if (!left || !right) {
    return false;
  }

  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatDateLabel(value: Date): string {
  return value.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DatePicker({
  value,
  onChange,
  disabled = false,
  placeholder = "Set date...",
  className,
}: DatePickerProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(parseIsoDate(value) ?? new Date()),
  );

  const selectedDate = useMemo(() => parseIsoDate(value), [value]);
  const today = useMemo(() => {
    const next = new Date();
    return new Date(next.getFullYear(), next.getMonth(), next.getDate());
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const nextBase = parseIsoDate(value) ?? new Date();
    setViewMonth(startOfMonth(nextBase));
  }, [open, value]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closestDialog = triggerRef.current?.closest('[role="dialog"]');
    setPortalContainer(closestDialog instanceof HTMLElement ? closestDialog : document.body);

    const updateAnchor = () => {
      if (!triggerRef.current) {
        return;
      }
      setAnchorRect(triggerRef.current.getBoundingClientRect());
    };

    updateAnchor();
    window.addEventListener("resize", updateAnchor);
    window.addEventListener("scroll", updateAnchor, true);

    return () => {
      window.removeEventListener("resize", updateAnchor);
      window.removeEventListener("scroll", updateAnchor, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }
      if (popoverRef.current?.contains(target) || triggerRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const firstWeekday = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const totalDays = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const monthLabel = viewMonth.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const cells: Array<{ day: number | null; date: Date | null }> = [];
  for (let blankIndex = 0; blankIndex < firstWeekday; blankIndex += 1) {
    cells.push({ day: null, date: null });
  }
  for (let day = 1; day <= totalDays; day += 1) {
    cells.push({
      day,
      date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
    });
  }

  let popover: React.ReactNode = null;
  const container = portalContainer ?? document.body;
  if (open && anchorRect) {
    const popoverWidth = 248;
    const popoverHeight = 310;
    const useAbsolutePosition = container !== document.body;
    let left: number;
    let top: number;

    if (useAbsolutePosition) {
      const containerRect = container.getBoundingClientRect();
      left = anchorRect.left - containerRect.left + container.scrollLeft;
      top = anchorRect.bottom - containerRect.top + container.scrollTop + 8;

      const minLeft = container.scrollLeft + 8;
      const maxLeft = container.scrollLeft + container.clientWidth - popoverWidth - 8;
      left = clamp(left, minLeft, Math.max(minLeft, maxLeft));

      const minTop = container.scrollTop + 8;
      const maxTop = container.scrollTop + container.clientHeight - popoverHeight - 8;
      if (top > maxTop) {
        top =
          anchorRect.top - containerRect.top + container.scrollTop - popoverHeight - 8;
      }
      top = clamp(top, minTop, Math.max(minTop, maxTop));
    } else {
      left = anchorRect.left;
      top = anchorRect.bottom + 8;

      if (left + popoverWidth > window.innerWidth - 8) {
        left = window.innerWidth - popoverWidth - 8;
      }
      left = Math.max(8, left);

      if (top + popoverHeight > window.innerHeight - 8) {
        top = anchorRect.top - popoverHeight - 8;
      }
      top = Math.max(8, top);
    }

    popover = createPortal(
      <div
        ref={popoverRef}
        className="dp-popover"
        style={{ top, left, position: useAbsolutePosition ? "absolute" : "fixed" }}
      >
        <div className="dp-header">
          <button
            type="button"
            className="dp-nav-btn"
            onClick={() =>
              setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
            }
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="dp-month-label">{monthLabel}</div>
          <button
            type="button"
            className="dp-nav-btn"
            onClick={() =>
              setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
            }
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="dp-day-names">
          {WEEKDAY_LABELS.map((label) => (
            <div key={label} className="dp-day-name">
              {label}
            </div>
          ))}
        </div>

        <div className="dp-grid">
          {cells.map((cell, index) => {
            if (!cell.date || !cell.day) {
              return (
                <div key={`blank-${index}`} className="dp-cell dp-blank">
                  &nbsp;
                </div>
              );
            }

            const isToday = isSameDay(cell.date, today);
            const isSelected = isSameDay(cell.date, selectedDate);

            return (
              <button
                key={toIsoDate(cell.date)}
                type="button"
                className={cn(
                  "dp-cell dp-day",
                  isToday && "dp-today",
                  isSelected && "dp-selected",
                )}
                onClick={() => {
                  onChange(toIsoDate(cell.date as Date));
                  setOpen(false);
                }}
              >
                {cell.day}
              </button>
            );
          })}
        </div>

        <div className="dp-footer">
          <button
            type="button"
            className="dp-clear-btn"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            Clear
          </button>
          <button
            type="button"
            className="dp-today-btn"
            onClick={() => {
              onChange(toIsoDate(today));
              setViewMonth(startOfMonth(today));
              setOpen(false);
            }}
          >
            Today
          </button>
        </div>
      </div>,
      container,
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "dp-trigger-btn w-full",
          !selectedDate && "dp-trigger-btn-empty",
          open && "dp-open",
          disabled && "dp-trigger-btn--readonly",
          className,
        )}
        onClick={() => {
          if (!disabled) {
            setOpen((prev) => !prev);
          }
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="dp-trigger-text">
          {selectedDate ? formatDateLabel(selectedDate) : placeholder}
        </span>
        <CalendarDays className="dp-trigger-icon" />
      </button>
      {popover}
    </>
  );
}
