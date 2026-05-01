import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAutosave } from "@/hooks/use-autosave";

interface ProjectNotesDialogProps {
  open: boolean;
  notes: string;
  canEdit: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (description: string) => Promise<void>;
}

export function ProjectNotesDialog({
  open,
  notes,
  canEdit,
  onOpenChange,
  onSave,
}: ProjectNotesDialogProps) {
  const [value, setValue] = useState(notes || "");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setValue(notes || "");
    setDirty(false);
  }, [notes]);

  const payload = useMemo(() => value, [value]);

  const { flush } = useAutosave({
    value: payload,
    enabled: Boolean(open && canEdit && dirty),
    delayMs: 700,
    onSave: async (nextNotes) => {
      await onSave(nextNotes);
      setDirty(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Could not autosave notes");
    },
  });

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      onOpenChange(true);
      return;
    }

    if (!canEdit || !dirty) {
      onOpenChange(false);
      return;
    }

    void flush()
      .then(() => {
        onOpenChange(false);
      })
      .catch(() => {});
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="w-[min(520px,95vw)]">
        <DialogHeader>
          <DialogTitle>Project Notes</DialogTitle>
        </DialogHeader>
        <div className="p-5">
          <Textarea
            className="min-h-[160px] border-line-bright bg-surface-2 text-[13px]"
            value={value}
            disabled={!canEdit}
            placeholder="Project notes"
            onChange={(event) => {
              setValue(event.target.value);
              setDirty(true);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
