"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeClosed, KeyRound, Mail } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { success, error } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
  const err = searchParams.get("error");
  if (err) {
    error(decodeURIComponent(err));
  }
}, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      isSignup: false,
    });

    if (res?.error) {
      error(res.error || "Login failed. Please try again.");
      setLoading(false);
    } else {
      success("Logged in successfully!");
      setInterval(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  const handleGoogleSignIn = async (provider, type) => {
    setGoogleLoading(type);

    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (err) {
      error("Google sign-in failed. Please try again.");
      setGoogleLoading(null);
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* LEFT IMAGE PANEL */}
      <div className="w-1/2 relative hidden md:block">
        <Image src="/login-bg.jpg" alt="Campus" fill className="object-cover" />
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          {/* LOGO */}
          <div className="flex justify-center mb-4">
            <Image src="/kiit-logo.png" width={240} height={64} alt="KIIT Logo" />
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-semibold text-center text-neutral-800">Welcome Back</h1>
          <p className="text-center text-neutral-500 mb-6">Login to continue</p>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* EMAIL INPUT */}
            <div>
              <label className="text-sm text-neutral-600">Email Address</label>
              <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                <Mail className="text-neutral-500 h-4 w-4" />
                <input
                  type="email"
                  className="w-full focus:outline-none"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="text-sm text-neutral-600">Password</label>
              <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                <KeyRound className="text-neutral-500 h-4 w-4" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordVisible && (
                  <Eye
                    onClick={() => setPasswordVisible(false)}
                    className="text-neutral-500 h-5 w-5 cursor-pointer"
                  />
                )}
                {!passwordVisible && (
                  <EyeClosed
                    onClick={() => setPasswordVisible(true)}
                    className="text-neutral-500 h-5 w-5 cursor-pointer"
                  />
                )}
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-green-600 text-sm mt-1">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* SIGNUP LINK */}
          <p className="text-center text-sm text-neutral-600 mt-4">
            Don’t have an account?{" "}
            <a href="/auth/signup" className="text-green-600 font-medium">
              Sign Up
            </a>
          </p>
          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={() => handleGoogleSignIn("google-login", "login")}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading === "login" ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                Connecting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
