"use client";
import { ToastProvider } from "@/context/ToastContext";
import { Suspense } from "react";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
        <ToastProvider>{children}</ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}
