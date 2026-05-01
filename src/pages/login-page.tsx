import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin, useSession, useSetupFirstUser } from "@/hooks/use-session";

export function LoginPage() {
  const navigate = useNavigate();
  const sessionQuery = useSession();
  const loginMutation = useLogin();
  const setupMutation = useSetupFirstUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (sessionQuery.data?.authenticated) {
      navigate("/");
    }
  }, [navigate, sessionQuery.data?.authenticated]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const needsSetup = Boolean(sessionQuery.data?.needsSetup);

    try {
      if (needsSetup) {
        await setupMutation.mutateAsync({
          username,
          password,
          confirmPassword,
        });
      } else {
        await loginMutation.mutateAsync({
          username,
          password,
          rememberMe,
        });
      }

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : needsSetup
            ? "Account setup failed"
            : "Login failed";
      toast.error(message);
    }
  };

  const needsSetup = Boolean(sessionQuery.data?.needsSetup);

  return (
    <section className="grid min-h-screen place-items-center px-5">
      <Card className="w-full max-w-[420px] rounded-[18px] border-line bg-[rgba(4,4,4,0.96)] px-6 pb-6 pt-5 shadow-none">
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="text-[32px] font-bold leading-none tracking-[0.01em]">Studio</CardTitle>
          <CardDescription>
            {needsSetup
              ? "Create the first admin account to initialize Studio."
              : "Enter your username and password to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <form className="space-y-[10px]" onSubmit={onSubmit}>
            <Input
              type="text"
              required
              autoComplete={needsSetup ? "username" : "username"}
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="h-11 border-line bg-[#0c0c0c] px-3 text-base"
            />
            <Input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 border-line bg-[#0c0c0c] px-3 text-base"
            />
            {needsSetup ? (
              <Input
                type="password"
                required
                autoComplete="new-password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="h-11 border-line bg-[#0c0c0c] px-3 text-base"
              />
            ) : (
              <label className="flex items-center gap-2 text-sm text-muted/90">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <span>Remember me</span>
              </label>
            )}
            <Button
              variant="primary"
              className="h-11 w-full rounded-[10px] text-base"
              disabled={loginMutation.isPending || setupMutation.isPending}
            >
              {needsSetup
                ? setupMutation.isPending
                  ? "Creating account..."
                  : "Create Admin Account"
                : loginMutation.isPending
                  ? "Signing in..."
                  : "Unlock"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
