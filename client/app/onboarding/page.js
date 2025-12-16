"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, User, Briefcase, Heart, ArrowLeft, ArrowRight, Check } from "lucide-react";
import api from "@/utils/axios";
import { useToast } from "@/context/ToastContext";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { error, success} = useToast();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    phoneNumber: "",
    bio: "",
    linkedinUrl: "",
    branch: "",
    
    // Student specific
    graduationYear: "",
    interests: [],
    
    // Alumni specific
    currentCompany: "",
    passoutYear: "",
    experience: "",
    skills: [],
    city: "",
  });

  const totalSteps = 3;
  const role = session?.user?.role;

  // Branches available
  const branches = [
    "CSE",
    "CSCE", 
    "CSSE",
    "ECE",
    "EEE",
    "MECH",
    "CIVIL",
    "IT",
    "OTHER"
  ];

  // Domain/Skills options
  const domainOptions = [
    "WEB DEVELOPMENT",
    "MOBILE DEVELOPMENT",
    "DATA SCIENCE",
    "MACHINE LEARNING",
    "ARTIFICIAL INTELLIGENCE",
    "CYBER SECURITY",
    "CLOUD COMPUTING",
    "DEVOPS",
    "BLOCKCHAIN",
    "UI/UX DESIGN",
    "GAME DEVELOPMENT",
    "INTERNET OF THINGS",
    "SOFTWARE TESTING",
    "DATABASE MANAGEMENT",
    "BACKEND DEVELOPMENT",
    "FRONTEND DEVELOPMENT",
    "FULL STACK DEVELOPMENT",
    "ROBOTICS",
    "EMBEDDED SYSTEMS",
    "NETWORK ENGINEERING",
    "BUSINESS ANALYTICS",
    "PRODUCT MANAGEMENT",
    "DIGITAL MARKETING",
    "CONTENT WRITING"
  ];

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const current = prev[field] || [];
      const isSelected = current.includes(value);
      
      if (isSelected) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        // Limit: 5 for students (interests), 10 for alumni (skills)
        const limit = field === "interests" ? 5 : 10;
        if (current.length >= limit) return prev;
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Prepare data based on role
      const endpoint = role === "STUDENT" 
        ? "/student/profile"
        : "/alumni/profile";
      
      const payload = role === "STUDENT" 
        ? {
            phoneNumber: formData.phoneNumber,
            bio: formData.bio,
            linkedinUrl: formData.linkedinUrl,
            branch: formData.branch,
            graduationYear: parseInt(formData.graduationYear),
            interests: formData.interests,
          }
        : {
            phoneNumber: formData.phoneNumber,
            bio: formData.bio,
            linkedinUrl: formData.linkedinUrl,
            branch: formData.branch,
            currentCompany: formData.currentCompany,
            passoutYear: parseInt(formData.passoutYear),
            experience: parseFloat(formData.experience),
            skills: formData.skills,
            city: formData.city,
          };

      const response = await api.put(endpoint, payload);
      console.log(response)
      if (!response.data.success) {
        error("Failed to update profile");
      }

      success("Profile updated successfully");
      setTimeout(() => {
        // Redirect to dashboard
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.branch;
    }
    if (step === 2) {
      if (role === "STUDENT") {
        return formData.graduationYear;
      } else {
        return formData.currentCompany && formData.passoutYear && formData.experience;
      }
    }
    if (step === 3) {
      if (role === "STUDENT") {
        return formData.interests.length > 0;
      } else {
        return formData.skills.length > 0;
      }
    }
    return true;
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-8">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
            {step === 1 && <User className="w-8 h-8 text-green-600" />}
            {step === 2 && <Briefcase className="w-8 h-8 text-green-600" />}
            {step === 3 && <Heart className="w-8 h-8 text-green-600" />}
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-800">
            Complete Your Profile
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-2">
            {role === "STUDENT" 
              ? "Help us connect you with the right alumni mentors"
              : "Help students find you based on your expertise"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-neutral-400 mb-2">
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

        {/* Step Content */}
        <div className="min-h-[320px]">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  Phone Number <span className="text-neutral-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  Branch / Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => handleInputChange("branch", e.target.value)}
                  className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none bg-white"
                >
                  <option value="">Select your branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  LinkedIn Profile <span className="text-neutral-400">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                  className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  Bio <span className="text-neutral-400">(Optional)</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 h-28 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                  maxLength="500"
                  placeholder="Tell us a bit about yourself..."
                />
                <p className="text-xs text-neutral-400 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Role-specific Info */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              {role === "STUDENT" ? (
                <>
                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      Expected Graduation Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                      className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none bg-white"
                    >
                      <option value="">Select year</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      Current Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.currentCompany}
                      onChange={(e) => handleInputChange("currentCompany", e.target.value)}
                      className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      placeholder="e.g., Google, Microsoft, Infosys"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      Passout Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.passoutYear}
                      onChange={(e) => handleInputChange("passoutYear", e.target.value)}
                      className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none bg-white"
                    >
                      <option value="">Select year</option>
                      {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="50"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      placeholder="e.g., 3.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      City <span className="text-neutral-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="mt-1 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      placeholder="e.g., Bangalore, Hyderabad"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Interests/Skills */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  {role === "STUDENT" ? "Areas of Interest" : "Your Skills"} 
                  <span className="text-red-500"> *</span>
                </label>
                <p className="text-xs text-neutral-400 mb-4">
                  {role === "STUDENT" 
                    ? `Select up to 5 areas you're interested in (${formData.interests.length}/5 selected)`
                    : `Select up to 10 skills you have (${formData.skills.length}/10 selected)`
                  }
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {domainOptions.map((domain) => {
                  const field = role === "STUDENT" ? "interests" : "skills";
                  const isSelected = formData[field].includes(domain);
                  
                  return (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => toggleSelection(field, domain)}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between text-sm ${
                        isSelected
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700"
                      }`}
                    >
                      <span className="font-medium">{domain}</span>
                      {isSelected && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-10">
          {/* Back Button */}
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 text-sm text-neutral-500 disabled:opacity-40 disabled:cursor-not-allowed transition hover:text-neutral-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-4">
            {/* Skip Button (Student only) */}
            {role === "STUDENT" && (
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="text-sm text-neutral-500 hover:text-neutral-700 transition"
              >
                Skip for now
              </button>
            )}

            {/* Next/Finish Button */}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Finish</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f5f5f5;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d4d4;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a3a3a3;
        }
      `}</style>
    </div>
  );
}