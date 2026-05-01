import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SHARE_ACCESS_OPTIONS } from "@/lib/constants";
import { shareAccessLabel } from "@/lib/format";
import { useRuntimeUtils } from "@/hooks/use-runtime-utils";
import type { ProjectDetails } from "@/types/project";
import type { ShareAccess } from "@/types/share";

interface ShareDialogProps {
  open: boolean;
  project: ProjectDetails;
  onOpenChange: (open: boolean) => void;
  onCreateShare: (access: ShareAccess) => Promise<string | null>;
  onDeleteShare: (shareId: string) => Promise<void>;
}

export function ShareDialog({
  open,
  project,
  onOpenChange,
  onCreateShare,
  onDeleteShare,
}: ShareDialogProps) {
  const [access, setAccess] = useState<ShareAccess>("listen");
  const runtime = useRuntimeUtils();

  const links = useMemo(() => project.shareLinks || [], [project.shareLinks]);

  const copyLink = async (shareUrl: string) => {
    const absoluteUrl = `${runtime.getOrigin()}${shareUrl}`;
    try {
      await runtime.copyToClipboard(absoluteUrl);
      toast.success("Share link copied");
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(520px,95vw)]">
        <DialogHeader>
          <DialogTitle>Share Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-5">
          <div className="grid items-center gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <p className="text-sm text-[#8f96a7]">Share Access</p>
            <Select value={access} onValueChange={(value) => setAccess(value as ShareAccess)}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SHARE_ACCESS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={async () => {
                try {
                  const createdPath = await onCreateShare(access);
                  if (createdPath) {
                    await copyLink(createdPath);
                  }
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Could not create share link");
                }
              }}
              className="h-10 px-4"
            >
              Create Share Link
            </Button>
          </div>

          <div className="space-y-2">
            {links.length ? (
              links.map((link) => {
                const absoluteUrl = `${runtime.getOrigin()}${link.shareUrl}`;
                return (
                  <div
                    key={link.id}
                    className="grid gap-2 md:grid-cols-[84px_1fr_auto_auto]"
                  >
                    <p className="self-center rounded-full border border-white/15 bg-white/[0.02] px-2 py-1 text-xs text-muted">
                      {shareAccessLabel(link.access)}
                    </p>
                    <Input readOnly value={absoluteUrl} className="h-10 font-mono text-[13px]" />
                    <Button className="h-10 px-4" onClick={() => copyLink(link.shareUrl)}>
                      Copy
                    </Button>
                    <Button
                      className="h-10 px-4"
                      onClick={async () => {
                        try {
                          await onDeleteShare(link.id);
                          toast.success("Share link deleted");
                        } catch (error) {
                          toast.error(error instanceof Error ? error.message : "Could not delete share link");
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted">No share links yet.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
