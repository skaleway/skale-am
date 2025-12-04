import { auth } from "@skaleam/auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import React, { type ReactNode } from "react";
import { SessionProvider } from "@/context/session";

const AfterAuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  return <SessionProvider value={session}>{children}</SessionProvider>;
};

export default AfterAuthLayout;
