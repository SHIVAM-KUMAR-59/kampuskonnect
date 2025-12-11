"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* LEFT IMAGE PANEL */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/login-bg.jpg"
          alt="Campus"
          fill
          className="object-cover"
        />
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="w-full md:w-1/2 bg-[#F8F9F8] flex items-center justify-center px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

          {/* LOGO */}
          <div className="flex justify-center mb-4">
            <Image
              src="/kiit-logo.webp"
              width={340}
              height={180}
              alt="KIIT Logo"
            />
          </div>

          {/* TITLE */}
          <h1 className="mt-4 text-2xl font-semibold text-center text-neutral-800">
            Welcome Back
          </h1>
          <p className="text-center text-neutral-500 mb-6">
            Login to continue
          </p>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL INPUT */}
            <div>
              <label className="text-sm text-neutral-600">Email Address</label>
              <input
                type="email"
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="text-sm text-neutral-600">Password</label>
              <input
                type="password"
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end">
                <a href="#" className="text-green-600 text-sm mt-1">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

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

        </div>
      </div>
    </div>
  );
}