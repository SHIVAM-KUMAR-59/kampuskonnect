"use client";

import Image from "next/image";
import { useState } from "react";
import { GraduationCap, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupRolePage() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!role) return;
    router.push(`/auth/signup/details?role=${role}`);
  };

  return (
    <div className="w-full min-h-screen flex overflow-hidden">
      {/* LEFT IMAGE PANEL */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/login-bg.jpg"
          alt="Campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-6">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

          {/* LOGO */}
          <div className="flex justify-center mb-5">
            <Image
              src="/kiit-logo.png"
              width={240}
              height={64}
              alt="KIIT Logo"
              className="object-contain"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-semibold text-center text-neutral-800">
            Create your account
          </h1>
          <p className="text-center text-neutral-500 mt-1 mb-6">
            Select how you are associated with KIIT
          </p>

          {/* ROLE SELECTION */}
          <div className="space-y-4">
            {/* STUDENT */}
            <button
              onClick={() => setRole("student")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition
                ${role === "student"
                  ? "border-green-600 bg-green-50"
                  : "border-neutral-200 hover:border-green-400"
                }`}
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
                <GraduationCap />
              </div>
              <div className="text-left">
                <p className="font-medium text-neutral-800">Student</p>
                <p className="text-sm text-neutral-500">
                  Currently studying at KIIT
                </p>
              </div>
            </button>

            {/* ALUMNI */}
            <button
              onClick={() => setRole("alumni")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition
                ${role === "alumni"
                  ? "border-green-600 bg-green-50"
                  : "border-neutral-200 hover:border-green-400"
                }`}
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
                <User />
              </div>
              <div className="text-left">
                <p className="font-medium text-neutral-800">Alumni</p>
                <p className="text-sm text-neutral-500">
                  Graduated from KIIT
                </p>
              </div>
            </button>
          </div>

          {/* CONTINUE BUTTON */}
          <button
            onClick={handleContinue}
            disabled={!role}
            className={`w-full mt-6 py-3 rounded-xl text-white font-medium transition
              ${role
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-300 cursor-not-allowed"
              }`}
          >
            Continue
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-neutral-600 mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-green-600 font-medium">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}