import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGate } from "@/components/layout/auth-gate";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { ProjectPage } from "@/pages/project-page";
import { SettingsPage } from "@/pages/settings-page";
import { SharedPage } from "@/pages/shared-page";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppShell />}>
          <Route path="/share/:token" element={<SharedPage />} />
          <Route element={<AuthGate />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
