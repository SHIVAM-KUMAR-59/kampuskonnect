"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { UserRound, Mail, Lock, Eye, EyeClosed, Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/context/ToastContext";
import PrimaryButton from "@/component/PrimaryButton";
export default function SignupDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role"); // "student" | "alumni"

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { error, success } = useToast();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (!role) router.push("/auth/signup");
  }, [role, router]);

  const handleAlumniContinue = async () => {
    setLoading(true);
    try {
      setError("");

      if (!email || !password || !confirmPassword) {
        error("All fields are required.");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const res = await signIn("credentials", {
        name,
        email,
        password,
        role: "ALUMNI",
        isSignup: true,
        redirect: false,
      });

      if (res?.error) {
        error(res.error || "Login failed. Please try again.");
        setLoading(false);
      } else {
        success("Signup successfull! Redirecting to onboarding...");
        setInterval(() => {
          window.location.href = "/onboarding";
        }, 1000);
      }
    } catch (err) {
      error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      await signIn("google-register-" + role, { callbackUrl: "/onboarding" });
    } catch (err) {
      error("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex overflow-hidden">
      {/* LEFT IMAGE */}
      <div className="w-1/2 relative hidden md:block">
        <Image src="/login-bg.jpg" alt="Campus" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-6">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          {/* LOGO */}
          <div className="flex justify-center mb-3">
            <Image
              src="/kiit-logo.png"
              width={220}
              height={56}
              alt="KIIT Logo"
              className="object-contain opacity-90"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-semibold text-center text-neutral-800">
            Create your account
          </h1>
          <p className="text-center text-neutral-500 mt-1 mb-6">
            {role === "student" ? "Sign in using your KIIT Google account" : "Sign up as an alumni"}
          </p>

          {role === "student" && (
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              >
                {googleLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                    Redirecting...
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

              <p className="text-xs text-center text-neutral-500">
                Only <span className="font-medium">@kiit.ac.in</span> accounts are allowed
              </p>
            </div>
          )}

          {role === "alumni" && (
            <div className="space-y-4">
              {/* NAME */}
              <div>
                <label className="text-sm text-neutral-600">Full Name</label>
                <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                  <UserRound className="h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    className="w-full focus:outline-none"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/* EMAIL */}
              <div>
                <label className="text-sm text-neutral-600">Email Address</label>
                <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                  <Mail className="h-4 w-4 text-neutral-500" />
                  <input
                    type="email"
                    className="w-full focus:outline-none"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm text-neutral-600">Password</label>
                <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                  <Lock className="h-4 w-4 text-neutral-500" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="w-full focus:outline-none"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordVisible ? (
                    <Eye
                      onClick={() => setPasswordVisible(false)}
                      className="h-5 w-5 text-neutral-500 cursor-pointer"
                    />
                  ) : (
                    <EyeClosed
                      onClick={() => setPasswordVisible(true)}
                      className="h-5 w-5 text-neutral-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-sm text-neutral-600">Confirm Password</label>
                <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                  <Lock className="h-4 w-4 text-neutral-500" />
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className="w-full focus:outline-none"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPasswordVisible ? (
                    <Eye
                      onClick={() => setConfirmPasswordVisible(false)}
                      className="h-5 w-5 text-neutral-500 cursor-pointer"
                    />
                  ) : (
                    <EyeClosed
                      onClick={() => setConfirmPasswordVisible(true)}
                      className="h-5 w-5 text-neutral-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              {passwordError && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* CONTINUE */}
              <PrimaryButton
                disabled={loading || googleLoading}
                classname={"w-full py-3"}
                text={
                  loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" /> <span>Registering user...</span>
                    </>
                  ) : (
                    "Continue"
                  )
                }
                onClick={handleAlumniContinue}
              />

              {/* DIVIDER */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">or continue with</span>
                </div>
              </div>

              {/* GOOGLE */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              >
                {googleLoading ? (
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
          )}

          {/* BACK */}
          <p className="text-center text-sm text-neutral-600 mt-6">
            <button onClick={() => router.back()} className="text-green-600 font-medium">
              Go back
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
