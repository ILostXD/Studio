import { Outlet } from "react-router-dom";
import { PlayerBar } from "@/components/player/player-bar";

export function AppShell() {
  return (
    <>
      <main className="flex h-screen min-h-0 flex-col overflow-hidden px-[clamp(52px,11vw,168px)] pb-[58px] pt-[58px]">
        <Outlet />
      </main>
      <PlayerBar />
    </>
  );
}
