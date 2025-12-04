"use client";

import { authClient } from "@skaleam/auth/auth-client";
import { Icons } from "@skaleam/ui/components/icons";
import { LoadingButton } from "@skaleam/ui/components/loading-button";
import { useState } from "react";
import { toast } from "sonner";
import { env } from "@skaleam/env/client";

const SocialButton = () => {
  console.log(env.NEXT_PUBLIC_BACKEND_URL);

  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_CALLBACK_URL,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton
      loading={isLoading}
      onClick={handleGoogleLogin}
      className="px-10"
      disabled={isLoading}
    >
      <Icons.google className="h-4 w-4" />
      Continue with Google
    </LoadingButton>
  );
};

export default SocialButton;
