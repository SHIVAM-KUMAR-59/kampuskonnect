"use client";
import { ToastProvider } from "@/context/ToastContext";
import { SessionProvider } from "next-auth/react";

export default function OnboardingLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
        <ToastProvider>{children}</ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
