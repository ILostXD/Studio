import { useCallback, useEffect, useRef } from "react";

interface UseAutosaveOptions<T> {
  value: T;
  enabled: boolean;
  delayMs?: number;
  onSave: (value: T) => Promise<void> | void;
  onError?: (error: unknown) => void;
}

interface UseAutosaveResult {
  flush: () => Promise<void>;
}

export function useAutosave<T>({
  value,
  enabled,
  delayMs = 700,
  onSave,
  onError,
}: UseAutosaveOptions<T>): UseAutosaveResult {
  const latestValueRef = useRef(value);
  const latestKeyRef = useRef(JSON.stringify(value));
  const lastSavedKeyRef = useRef<string | null>(null);
  const inFlightPromiseRef = useRef<Promise<void> | null>(null);
  const flushPromiseRef = useRef<Promise<void> | null>(null);
  const timerRef = useRef<number | null>(null);
  const wasEnabledRef = useRef(enabled);
  const onSaveRef = useRef(onSave);
  const onErrorRef = useRef(onError);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    latestValueRef.current = value;
    latestKeyRef.current = JSON.stringify(value);
  }, [value]);

  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const persistLatest = useCallback(async () => {
    while (lastSavedKeyRef.current !== latestKeyRef.current) {
      const snapshotKey = latestKeyRef.current;
      const snapshotValue = latestValueRef.current;
      const savePromise = Promise.resolve(onSaveRef.current(snapshotValue));
      inFlightPromiseRef.current = savePromise;

      try {
        await savePromise;
        lastSavedKeyRef.current = snapshotKey;
      } catch (error) {
        onErrorRef.current?.(error);
        throw error;
      } finally {
        if (inFlightPromiseRef.current === savePromise) {
          inFlightPromiseRef.current = null;
        }
      }
    }
  }, []);

  const flush = useCallback(async () => {
    clearTimer();

    if (flushPromiseRef.current) {
      return flushPromiseRef.current;
    }

    const run = async () => {
      if (inFlightPromiseRef.current) {
        try {
          await inFlightPromiseRef.current;
        } catch {
          // ignore here; persistLatest handles reporting + retrying current snapshot
        }
      }
      await persistLatest();
    };

    const nextPromise = run().finally(() => {
      if (flushPromiseRef.current === nextPromise) {
        flushPromiseRef.current = null;
      }
    });
    flushPromiseRef.current = nextPromise;
    return nextPromise;
  }, [clearTimer, persistLatest]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (lastSavedKeyRef.current === latestKeyRef.current) {
      return;
    }

    clearTimer();
    timerRef.current = window.setTimeout(() => {
      void flush().catch(() => {});
    }, delayMs);

    return clearTimer;
  }, [clearTimer, delayMs, enabled, flush, value]);

  useEffect(() => {
    const wasEnabled = wasEnabledRef.current;
    wasEnabledRef.current = enabled;

    if (!wasEnabled || enabled) {
      return;
    }

    void flush().catch(() => {});
  }, [enabled, flush]);

  useEffect(() => {
    const flushIfPending = () => {
      if (!enabledRef.current) {
        return;
      }
      void flush().catch(() => {});
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushIfPending();
      }
    };

    window.addEventListener("pagehide", flushIfPending);
    window.addEventListener("beforeunload", flushIfPending);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("pagehide", flushIfPending);
      window.removeEventListener("beforeunload", flushIfPending);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [flush]);

  return { flush };
}
