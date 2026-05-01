import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSession } from "@/hooks/use-session";

export function AuthGate() {
  const sessionQuery = useSession();

  if (sessionQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (!sessionQuery.data?.authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
