import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "@/components/layout/app-providers";
import { App } from "@/app";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
