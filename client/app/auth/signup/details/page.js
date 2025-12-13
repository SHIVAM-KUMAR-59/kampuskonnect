"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const KIIT_DOMAIN = "@kiit.ac.in";

export default function SignupDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role"); // student | alumni

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!role) router.push("/auth/signup");
  }, [role, router]);

  const isStudentEmailValid = (email) =>
    email.toLowerCase().endsWith(KIIT_DOMAIN);

  const handleContinue = () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (role === "student" && !isStudentEmailValid(email)) {
      setError("Please use your KIIT university email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    router.push(
      `/auth/signup/profile?role=${role}&email=${encodeURIComponent(email)}`
    );
  };

  return (
    <div className="w-full min-h-screen flex overflow-hidden">
      {/* LEFT IMAGE */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/login-bg.jpg"
          alt="Campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-6">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

          {/* SMALL, SUBTLE LOGO */}
          <div className="flex justify-center mb-3">
            <Image
              src="/kiit-logo.png"
              width={240}
              height={64}
              alt="KIIT Logo"
              className="object-contain opacity-90"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-semibold text-center text-neutral-800">
            Create your account
          </h1>
          <p className="text-center text-neutral-500 mt-1 mb-5">
            {role === "student"
              ? "Use your KIIT email to continue"
              : "Enter your account details"}
          </p>

          {/* FORM */}
          <div className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm text-neutral-600">
                Email Address
              </label>
              <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                <Mail className="h-4 w-4 text-neutral-500" />
                <input
                  type="email"
                  className="w-full focus:outline-none"
                  placeholder={
                    role === "student"
                      ? "example@kiit.ac.in"
                      : "example@gmail.com"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {role === "student" && email && !isStudentEmailValid(email) && (
                <p className="text-red-500 text-xs mt-1">
                  Only @kiit.ac.in email is allowed for students
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-neutral-600">Password</label>
              <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                <Lock className="h-4 w-4 text-neutral-500" />
                <input
                  type="password"
                  className="w-full focus:outline-none"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm text-neutral-600">
                Confirm Password
              </label>
              <div className="flex items-center gap-2 border border-neutral-300 px-4 py-3 rounded-xl">
                <Lock className="h-4 w-4 text-neutral-500" />
                <input
                  type="password"
                  className="w-full focus:outline-none"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* CONTINUE */}
            <button
              onClick={handleContinue}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              Continue
            </button>
          </div>

          {/* BACK */}
          <p className="text-center text-sm text-neutral-600 mt-4">
            <button
              onClick={() => router.back()}
              className="text-green-600 font-medium"
            >
              Go back
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
