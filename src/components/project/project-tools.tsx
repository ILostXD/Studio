import { MoreHorizontal, Link2, Notebook, SlidersHorizontal, Palette, Upload, Users, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_OPTIONS } from "@/lib/constants";

interface ProjectToolsProps {
  canEdit: boolean;
  showOwnerActions: boolean;
  status: string;
  onStatusChange: (status: string) => void;
  onUploadTracks: () => void;
  onOpenNotes: () => void;
  onOpenShare: () => void;
  onOpenMetadata: () => void;
  onOpenMoodboard: () => void;
}

export function ProjectTools({
  canEdit,
  showOwnerActions,
  status,
  onStatusChange,
  onUploadTracks,
  onOpenNotes,
  onOpenShare,
  onOpenMetadata,
  onOpenMoodboard,
}: ProjectToolsProps) {
  return (
    <section className="project-tools flex flex-wrap items-center justify-between gap-3">
      <Button
        variant="default"
        disabled={!canEdit}
        onClick={onUploadTracks}
        className="h-10 min-h-10 rounded-[10px] border-white/10 bg-white/[0.06] px-3 text-sm text-[#ececec] hover:bg-accent/10"
      >
        + Add tracks
      </Button>

      <div className="flex flex-1 flex-wrap items-center justify-end gap-2.5">
        <Select value={status} onValueChange={onStatusChange} disabled={!canEdit}>
          <SelectTrigger className="h-10 w-[132px] rounded-[10px] border-line bg-[#0b0b0b] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-line bg-[rgba(10,10,12,0.98)]">
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="h-10 rounded-[10px] px-4 text-sm" onClick={onOpenNotes}>
          <Notebook className="h-4 w-4" />
          Notes
        </Button>

        {showOwnerActions ? (
          <Button className="h-10 rounded-[10px] px-4 text-sm" onClick={onOpenShare}>
            <Link2 className="h-4 w-4" />
            Share
          </Button>
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-10 rounded-[10px] px-4 text-sm">
              <MoreHorizontal className="h-4 w-4" />
              More
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-line bg-[rgba(10,10,12,0.98)]">
            <DropdownMenuItem onClick={onOpenMetadata}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Metadata
            </DropdownMenuItem>
            {showOwnerActions ? (
              <DropdownMenuItem onClick={onOpenMoodboard}>
                <Palette className="mr-2 h-4 w-4" />
                Moodboard
              </DropdownMenuItem>
            ) : null}
            {showOwnerActions ? (
              <DropdownMenuItem onClick={() => toast.info("Export will be added in a later phase")}>
                <Upload className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
            ) : null}
            {showOwnerActions ? (
              <DropdownMenuItem
                onClick={() => toast.info("Collaborators will be added in a later phase")}
              >
                <Users className="mr-2 h-4 w-4" />
                Collaborators
              </DropdownMenuItem>
            ) : null}
            {showOwnerActions ? (
              <DropdownMenuItem onClick={() => toast.info("Analytics will be added in a later phase")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
