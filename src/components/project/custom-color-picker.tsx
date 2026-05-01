import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CustomColorPickerProps {
  open: boolean;
  anchorRect: DOMRect | null;
  anchorElement?: HTMLElement | null;
  initialColor: string;
  onApply: (nextColor: string) => void;
  onCancel: () => void;
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function toHexComponent(value: number) {
  return Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0");
}

function normalizeHex(input: string): string {
  const raw = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[\da-f]{3,4}$/.test(raw)) {
    const expanded = raw.split("").map((char) => `${char}${char}`).join("");
    return `#${expanded}`;
  }
  if (/^[\da-f]{6}([\da-f]{2})?$/.test(raw)) {
    return `#${raw}`;
  }
  return "";
}

function parseHexColor(input: string): RGBA | null {
  const normalized = normalizeHex(input);
  if (!normalized) {
    return null;
  }

  const hex = normalized.slice(1);
  const hasAlpha = hex.length === 8;
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const a = hasAlpha ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function rgbaToHex({ r, g, b, a }: RGBA) {
  const alpha = clamp(a, 0, 1);
  const base = `#${toHexComponent(r)}${toHexComponent(g)}${toHexComponent(b)}`;
  if (alpha >= 0.999) {
    return base;
  }
  return `${base}${toHexComponent(alpha * 255)}`;
}

function rgbToHsv({ r, g, b }: Pick<RGBA, "r" | "g" | "b">): HSV {
  const rr = clamp(r, 0, 255) / 255;
  const gg = clamp(g, 0, 255) / 255;
  const bb = clamp(b, 0, 255) / 255;

  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rr) {
      h = ((gg - bb) / delta) % 6;
    } else if (max === gg) {
      h = (bb - rr) / delta + 2;
    } else {
      h = (rr - gg) / delta + 4;
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;
  return { h, s, v };
}

function hsvToRgb({ h, s, v }: HSV): Pick<RGBA, "r" | "g" | "b"> {
  const hh = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = v - c;

  let rr = 0;
  let gg = 0;
  let bb = 0;

  if (hh < 60) {
    rr = c;
    gg = x;
  } else if (hh < 120) {
    rr = x;
    gg = c;
  } else if (hh < 180) {
    gg = c;
    bb = x;
  } else if (hh < 240) {
    gg = x;
    bb = c;
  } else if (hh < 300) {
    rr = x;
    bb = c;
  } else {
    rr = c;
    bb = x;
  }

  return {
    r: Math.round((rr + m) * 255),
    g: Math.round((gg + m) * 255),
    b: Math.round((bb + m) * 255),
  };
}

function rgbaToCss({ r, g, b, a }: RGBA) {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${clamp(a, 0, 1)})`;
}

export function CustomColorPicker({
  open,
  anchorRect,
  anchorElement,
  initialColor,
  onApply,
  onCancel,
}: CustomColorPickerProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const hueRef = useRef<HTMLDivElement | null>(null);
  const alphaRef = useRef<HTMLDivElement | null>(null);

  const [hsv, setHsv] = useState<HSV>({ h: 260, s: 0.38, v: 1 });
  const [alpha, setAlpha] = useState(1);
  const [hexInput, setHexInput] = useState("#a89eff");
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const parsed = parseHexColor(initialColor) || parseHexColor("#a89eff");
    if (!parsed) {
      return;
    }
    setHsv(rgbToHsv(parsed));
    setAlpha(parsed.a);
    setHexInput(rgbaToHex(parsed));
  }, [initialColor, open]);

  const rgba = useMemo(() => {
    const rgb = hsvToRgb(hsv);
    return { ...rgb, a: alpha };
  }, [alpha, hsv]);

  const hexValue = useMemo(() => rgbaToHex(rgba), [rgba]);
  const colorCss = useMemo(() => rgbaToCss(rgba), [rgba]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closestDialog = anchorElement?.closest('[role="dialog"]');
    setPortalContainer(closestDialog instanceof HTMLElement ? closestDialog : document.body);
  }, [anchorElement, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDownOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (target && popoverRef.current?.contains(target)) {
        return;
      }
      if (target && anchorElement?.contains(target)) {
        return;
      }
      onCancel();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handlePointerDownOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDownOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onCancel, open]);

  if (!open || !anchorRect) {
    return null;
  }

  const popoverWidth = 224;
  const popoverHeight = 300;
  const container = portalContainer ?? document.body;
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
      top = anchorRect.top - containerRect.top + container.scrollTop - popoverHeight - 8;
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

  const handleGradientPointer = (clientX: number, clientY: number) => {
    const rect = gradientRef.current?.getBoundingClientRect();
    if (!rect) return;
    const s = clamp((clientX - rect.left) / rect.width, 0, 1);
    const v = clamp(1 - (clientY - rect.top) / rect.height, 0, 1);
    setHsv((prev) => ({ ...prev, s, v }));
  };

  const handleHuePointer = (clientX: number) => {
    const rect = hueRef.current?.getBoundingClientRect();
    if (!rect) return;
    const h = clamp((clientX - rect.left) / rect.width, 0, 1) * 360;
    setHsv((prev) => ({ ...prev, h }));
  };

  const handleAlphaPointer = (clientX: number) => {
    const rect = alphaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nextAlpha = clamp((clientX - rect.left) / rect.width, 0, 1);
    setAlpha(nextAlpha);
  };

  const bindPointerDrag = (
    event: React.PointerEvent<HTMLElement>,
    onMove: (clientX: number, clientY: number) => void,
  ) => {
    event.preventDefault();
    onMove(event.clientX, event.clientY);

    const handleMove = (moveEvent: PointerEvent) => {
      onMove(moveEvent.clientX, moveEvent.clientY);
    };
    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  return createPortal(
    <div
      ref={popoverRef}
      className="cp-popover"
      style={{ top, left, position: useAbsolutePosition ? "absolute" : "fixed" }}
      role="dialog"
      aria-label="Color picker"
    >
      <div
        ref={gradientRef}
        className="cp-gradient-box"
        style={{ background: `hsl(${hsv.h} 100% 50%)` }}
        onPointerDown={(event) => bindPointerDrag(event, handleGradientPointer)}
      >
        <span
          className="cp-gradient-cursor"
          style={{
            left: `${hsv.s * 100}%`,
            top: `${(1 - hsv.v) * 100}%`,
          }}
        />
      </div>

      <div
        ref={hueRef}
        className="cp-hue-track"
        onPointerDown={(event) =>
          bindPointerDrag(event, (clientX) => handleHuePointer(clientX))
        }
      >
        <span
          className="cp-slider-thumb"
          style={{ left: `${(hsv.h / 360) * 100}%` }}
        />
      </div>

      <div
        ref={alphaRef}
        className="cp-alpha-track"
        onPointerDown={(event) =>
          bindPointerDrag(event, (clientX) => handleAlphaPointer(clientX))
        }
      >
        <span
          className="cp-alpha-fill"
          style={{
            background: `linear-gradient(to right, rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0), rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 1))`,
          }}
        />
        <span
          className="cp-slider-thumb"
          style={{ left: `${alpha * 100}%` }}
        />
      </div>

      <div className="cp-bottom-row">
        <span className="cp-preview" style={{ background: colorCss }} />
        <input
          className="cp-hex-input"
          value={hexInput}
          onChange={(event) => setHexInput(event.target.value)}
          onBlur={() => {
            const parsed = parseHexColor(hexInput);
            if (!parsed) {
              setHexInput(hexValue);
              return;
            }
            setHsv(rgbToHsv(parsed));
            setAlpha(parsed.a);
            setHexInput(rgbaToHex(parsed));
          }}
          spellCheck={false}
        />
      </div>

      <div className="cp-actions">
        <button
          type="button"
          className="cp-btn cp-btn-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="cp-btn cp-btn-apply"
          onClick={() => onApply(hexValue)}
        >
          Apply
        </button>
      </div>
    </div>,
    container,
  );
}
