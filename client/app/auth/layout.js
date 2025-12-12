'use client'
import { ToastProvider } from "@/context/ToastContext";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
        {children}
        </ToastProvider>
        </body>
    </html>
  );
}
