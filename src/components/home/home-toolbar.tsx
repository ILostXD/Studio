import { ArrowUpDown, Plus, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HOME_SORT_OPTIONS } from "@/lib/constants";
import type { HomeSort, HomeSortDirection, HomeSortKey } from "@/lib/project-sorting";

interface HomeToolbarProps {
  sort: HomeSort;
  onSortChange: (key: HomeSortKey, defaultDir: HomeSortDirection) => void;
  onCreateProject: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export function HomeToolbar({
  sort,
  onSortChange,
  onCreateProject,
  onOpenSettings,
  onLogout,
}: HomeToolbarProps) {
  const activeSortOption = HOME_SORT_OPTIONS.find((option) => option.key === sort.key);

  return (
    <>
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[clamp(26px,5vw,42px)] font-bold leading-none tracking-[0.04em]">Studio</h1>
          <p className="mt-0.5 text-sm text-muted">Private workspace for works in progress</p>
        </div>
        <div className="inline-flex items-center gap-2.5">
          <Button
            size="icon"
            className="h-9 w-9 rounded-full border-white/10 bg-[rgba(20,20,20,0.84)] text-[#e6e6e6] hover:bg-accent/15"
            onClick={onOpenSettings}
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            className="h-9 rounded-full border-line bg-transparent px-3.5 text-[15px] hover:bg-accent/10 hover:text-accent"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </header>

      <section className="mb-[18px] flex items-center gap-2.5">
        <Button variant="primary" className="h-9 rounded-[10px] px-4 text-[13px]" onClick={onCreateProject}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-9 rounded-[10px] px-3 text-[13px]">
              <ArrowUpDown className="h-4 w-4" />
              {activeSortOption?.label || "Sort"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[180px] rounded-xl border-line bg-[rgba(10,10,12,0.98)] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
          >
            {HOME_SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.key}
                onClick={() => onSortChange(option.key, option.dir)}
                className="rounded-[7px] border border-transparent px-[11px] py-2 text-[13px] text-[#c5cad7] hover:border-accent/30 hover:bg-accent/10 focus:border-accent/30 focus:bg-accent/10"
              >
                {option.label}
                {sort.key === option.key ? (sort.dir === "asc" ? " ↑" : " ↓") : ""}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </>
  );
}
