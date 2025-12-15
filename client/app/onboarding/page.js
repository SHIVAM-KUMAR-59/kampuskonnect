"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "alumni"; // default alumni

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-800 text-center">
            Complete Your Profile
          </h1>
          <p className="text-sm text-neutral-500 text-center mt-1">
            Help us personalise your experience
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-neutral-400 mb-2">
            <span>Step {step}</span>
            <span>{totalSteps} steps</span>
          </div>
          <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-sm text-neutral-600">Full Name</label>
              <input
                className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-600">
                Department / Branch
              </label>
              <input
                className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Computer Science & Engineering"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="space-y-5">
            {role === "student" ? (
              <>
                <div>
                  <label className="text-sm text-neutral-600">Course</label>
                  <input
                    className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. B.Tech CSE"
                  />
                </div>

                <div>
                  <label className="text-sm text-neutral-600">Current Year</label>
                  <input
                    className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. 3rd Year"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm text-neutral-600">
                    Current Role
                  </label>
                  <input
                    className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. Software Engineer"
                  />
                </div>

                <div>
                  <label className="text-sm text-neutral-600">
                    Organization
                  </label>
                  <input
                    className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. Google, Infosys"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div>
            <label className="text-sm text-neutral-600">
              Areas of Interest
            </label>
            <textarea
              className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 h-28 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="AI, Web Development, Finance, Research, Higher Studies..."
            />
            <p className="text-xs text-neutral-400 mt-2">
              This helps us suggest better connections and opportunities
            </p>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="flex justify-between items-center mt-10">
          {/* BACK */}
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="text-sm text-neutral-500 disabled:opacity-40"
          >
            Back
          </button>

          <div className="flex items-center gap-4">
            {/* SKIP — STUDENT ONLY */}
            {role === "student" && (
              <button
                onClick={() => router.push("/dashboard")}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                Skip for now
              </button>
            )}

            {/* NEXT / FINISH */}
            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition"
              >
                Finish
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
