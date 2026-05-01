import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfirmProvider } from "@/components/layout/confirm-provider";
import { UiSettingsProvider } from "@/components/layout/ui-settings-provider";
import { PlayerProvider } from "@/hooks/use-player";
import { queryClient } from "@/lib/query-client";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>
        <ConfirmProvider>
          <UiSettingsProvider>
            <PlayerProvider>
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  className:
                    "!border !border-line !bg-surface !text-text",
                }}
              />
            </PlayerProvider>
          </UiSettingsProvider>
        </ConfirmProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
