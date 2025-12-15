"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type, message, duration = 5000) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, type, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message, duration) => showToast("success", message, duration),
    [showToast]
  );

  const error = useCallback(
    (message, duration) => showToast("error", message, duration),
    [showToast]
  );

  const info = useCallback(
    (message, duration) => showToast("info", message, duration),
    [showToast]
  );

  const warning = useCallback(
    (message, duration) => showToast("warning", message, duration),
    [showToast]
  );

  const getToastStyles = (type) => {
    const styles = {
      success: {
        bg: "bg-green-50 border-green-500",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        text: "text-green-800",
      },
      error: {
        bg: "bg-red-50 border-red-500",
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        text: "text-red-800",
      },
      info: {
        bg: "bg-blue-50 border-blue-500",
        icon: <Info className="w-5 h-5 text-blue-500" />,
        text: "text-blue-800",
      },
      warning: {
        bg: "bg-yellow-50 border-yellow-500",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        text: "text-yellow-800",
      },
    };
    return styles[type];
  };

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => {
          const styles = getToastStyles(toast.type);
          return (
            <div
              key={toast.id}
              className={`${styles.bg} ${styles.text} border-l-4 rounded-lg shadow-lg p-4 min-w-[300px] max-w-md pointer-events-auto animate-slide-in`}
              style={{
                animation: "slideIn 0.3s ease-out",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">{styles.icon}</div>
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 hover:opacity-70 transition-opacity"
                  aria-label="Close toast"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
