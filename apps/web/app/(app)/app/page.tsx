"use client";

import { useSession } from "@/context/session";
import { authClient } from "@skaleam/auth/auth-client";
import { LoadingButton } from "@skaleam/ui/components/loading-button";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      toast.success("Logged out successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center">
      <h1 className="text-2xl font-bold">Authenticated user page</h1>
      <div>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user.name}
        </p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
      <LoadingButton loading={isLoading} onClick={handleLogout}>
        Logout
      </LoadingButton>
    </div>
  );
};

export default Page;
