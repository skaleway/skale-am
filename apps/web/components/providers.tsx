"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}

      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
            boxShadow: "0 0 0 1px var(--border)",
          },
        }}
      />
    </NextThemesProvider>
  );
}
