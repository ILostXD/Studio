import { FormEvent, useState } from "react";
import { ArrowLeft, LogOut, Trash2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TRACK_TAG_VISIBILITY_FIELDS } from "@/lib/constants";
import { useLogout, useSession } from "@/hooks/use-session";
import {
  useAccount,
  useCreateUser,
  useDeleteUser,
  useUpdateAccount,
  useUsers,
} from "@/hooks/use-account";
import { useUiSettingsStore } from "@/components/layout/ui-settings-provider";
import type { TrackTagVisibility } from "@/types/ui";
import { useConfirm } from "@/components/layout/confirm-provider";

export function SettingsPage() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const sessionQuery = useSession();
  const logoutMutation = useLogout();
  const accountQuery = useAccount();
  const updateAccountMutation = useUpdateAccount();
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();
  const isAdmin = Boolean(sessionQuery.data?.user?.isAdmin);
  const usersQuery = useUsers(isAdmin);
  const { trackTagVisibility, setTrackTagVisibility, resetTrackTagVisibility } =
    useUiSettingsStore();
  const [usernameInput, setUsernameInput] = useState("");
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState("");

  const updateField = (key: keyof TrackTagVisibility, checked: boolean) => {
    setTrackTagVisibility({
      ...trackTagVisibility,
      [key]: checked,
    });
  };

  const onLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not log out");
    }
  };

  const onChangeUsername = async (event: FormEvent) => {
    event.preventDefault();
    if (!usernameInput.trim()) {
      toast.error("Enter a username");
      return;
    }

    try {
      await updateAccountMutation.mutateAsync({
        username: usernameInput.trim(),
      });
      setUsernameInput("");
      toast.success("Username updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update username");
    }
  };

  const onChangePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput) {
      toast.error("Fill in all password fields");
      return;
    }

    try {
      await updateAccountMutation.mutateAsync({
        currentPassword: currentPasswordInput,
        newPassword: newPasswordInput,
        confirmPassword: confirmPasswordInput,
      });
      setCurrentPasswordInput("");
      setNewPasswordInput("");
      setConfirmPasswordInput("");
      toast.success("Password updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update password");
    }
  };

  const onCreateUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createUserMutation.mutateAsync({
        username: newUserUsername.trim(),
        password: newUserPassword,
        confirmPassword: newUserConfirmPassword,
      });
      setNewUserUsername("");
      setNewUserPassword("");
      setNewUserConfirmPassword("");
      toast.success("User account created");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create user");
    }
  };

  return (
    <section className="mx-auto flex min-h-0 w-full max-w-[1080px] flex-1 flex-col overflow-hidden">
      <header className="mb-6 flex items-center justify-between">
        <Button
          size="icon"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="h-9 w-9 rounded-full border-white/10 bg-[rgba(20,20,20,0.84)] text-[#e6e6e6] hover:bg-accent/15 [&>svg]:-translate-x-px"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          onClick={onLogout}
          aria-label="Log out"
          className="h-9 w-9 rounded-full border-white/10 bg-[rgba(20,20,20,0.84)] text-[#e6e6e6] hover:bg-accent/15"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </header>

      <section className="mx-auto flex min-h-0 w-full max-w-[760px] flex-1 flex-col gap-[14px] overflow-y-auto overflow-x-hidden pb-[170px] pr-1">
        <h1 className="text-[clamp(26px,4vw,34px)] font-bold">Settings</h1>
        <p className="text-sm text-muted">
          Choose which track tags are visible in project rows.
        </p>

        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.92)] p-[18px]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold">Track Tag Visibility</h2>
            <Button
              className="h-10 rounded-[10px] border-line bg-[#0b0b0b] px-4 text-sm"
              onClick={() => {
                resetTrackTagVisibility();
                toast.success("Tag visibility reset");
              }}
            >
              Reset Defaults
            </Button>
          </div>
          <div className="space-y-3">
            {TRACK_TAG_VISIBILITY_FIELDS.map((field) => (
              <label
                key={field.key}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5"
              >
                <span className="min-w-0">
                  <span className="block text-[13px] text-text">{field.label}</span>
                  <span className="block text-xs text-[#8e96a7]">{field.description}</span>
                </span>
                <Checkbox
                  checked={trackTagVisibility[field.key]}
                  onCheckedChange={(checked) => updateField(field.key, checked === true)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.92)] p-[18px]">
          <div className="mb-4">
            <h2 className="text-[15px] font-semibold">Account</h2>
            <p className="text-xs text-muted">
              Signed in as {accountQuery.data?.user?.username || sessionQuery.data?.user?.username || "user"}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <form
              className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-3"
              onSubmit={onChangeUsername}
            >
              <h3 className="text-sm font-semibold">Change Username</h3>
              <Input
                placeholder="New username"
                value={usernameInput}
                onChange={(event) => setUsernameInput(event.target.value)}
                className="h-10 border-line-bright bg-surface-2"
              />
              <Button type="submit" className="h-9 text-sm" disabled={updateAccountMutation.isPending}>
                Save Username
              </Button>
            </form>

            <form
              className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-3"
              onSubmit={onChangePassword}
            >
              <h3 className="text-sm font-semibold">Change Password</h3>
              <Input
                type="password"
                placeholder="Current password"
                value={currentPasswordInput}
                onChange={(event) => setCurrentPasswordInput(event.target.value)}
                className="h-10 border-line-bright bg-surface-2"
              />
              <Input
                type="password"
                placeholder="New password"
                value={newPasswordInput}
                onChange={(event) => setNewPasswordInput(event.target.value)}
                className="h-10 border-line-bright bg-surface-2"
              />
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPasswordInput}
                onChange={(event) => setConfirmPasswordInput(event.target.value)}
                className="h-10 border-line-bright bg-surface-2"
              />
              <Button type="submit" className="h-9 text-sm" disabled={updateAccountMutation.isPending}>
                Save Password
              </Button>
            </form>
          </div>
        </div>

        {isAdmin ? (
          <div className="rounded-2xl border border-white/10 bg-[rgba(12,12,14,0.92)] p-[18px]">
            <div className="mb-4">
              <h2 className="text-[15px] font-semibold">User Management</h2>
              <p className="text-xs text-muted">Create or delete user accounts.</p>
            </div>

            <form
              className="mb-4 grid gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 md:grid-cols-4"
              onSubmit={onCreateUser}
            >
              <Input
                placeholder="Username"
                value={newUserUsername}
                onChange={(event) => setNewUserUsername(event.target.value)}
                className="h-10 border-line-bright bg-surface-2"
              />
              <Input
                type="password"
                placeholder="Password"
                value={newUserPassword}
                onChange={(event) => setNewUserPassword(event.target.value)}
                className="h-10 border-line-bright bg-surface-2"
              />
              <Input
                type="password"
                placeholder="Confirm password"
                value={newUserConfirmPassword}
                onChange={(event) => setNewUserConfirmPassword(event.target.value)}
                className="h-10 border-line-bright bg-surface-2"
              />
              <Button type="submit" className="h-10 text-sm" disabled={createUserMutation.isPending}>
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </form>

            <div className="space-y-2">
              {(usersQuery.data?.users || []).map((user) => {
                const isCurrentUser = user.id === sessionQuery.data?.user?.id;
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-text">
                        {user.username}
                        {user.isAdmin ? " (Admin)" : ""}
                      </p>
                      <p className="text-xs text-muted">
                        Created {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="danger"
                      className="h-8 w-8 rounded-full"
                      disabled={isCurrentUser || deleteUserMutation.isPending}
                      onClick={async () => {
                        const ok = await confirm(
                          `Delete user "${user.username}"?`,
                          "Delete User",
                        );
                        if (!ok) return;
                        try {
                          await deleteUserMutation.mutateAsync(user.id);
                          toast.success("User deleted");
                        } catch (error) {
                          toast.error(error instanceof Error ? error.message : "Could not delete user");
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
              {!usersQuery.data?.users?.length ? (
                <p className="text-sm text-muted">No users found.</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
    </section>
  );
}
