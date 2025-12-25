"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, User, Briefcase, Heart, ArrowLeft, ArrowRight, Check, Sparkles, ChevronDown } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Common
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

  const [isSelectOpen, setIsSelectOpen] = useState({
    branch: false,
    graduationYear: false,
    passoutYear: false,
  });

  const role = session?.user?.role;
  const isStudent = role === "STUDENT";
  const totalSteps = 3;

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
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cyber Security",
    "Cloud Computing",
    "DevOps",
    "Blockchain",
    "UI/UX Design",
    "Game Development",
    "Internet of Things",
    "Software Testing",
    "Database Management",
    "Backend Development",
    "Frontend Development",
    "Full Stack Development",
    "Robotics",
    "Embedded Systems",
    "Network Engineering",
    "Business Analytics",
    "Product Management",
    "Digital Marketing",
    "Content Writing"
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
        const limit = field === "interests" ? 5 : 10;
        if (current.length >= limit) return prev;
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const canProceed = () => {
    if (step === 1) {
      // Students can proceed with just branch, Alumni need more
      if (isStudent) {
        return formData.branch;
      }
      return formData.branch && formData.phoneNumber;
    }
    if (step === 2) {
      if (isStudent) {
        return formData.graduationYear;
      }
      // Alumni: currentCompany, passoutYear, experience are required
      return formData.currentCompany && formData.passoutYear && formData.experience;
    }
    if (step === 3) {
      // Students can skip this, Alumni need at least 1 skill
      if (isStudent) {
        return true; // Students can proceed even with 0 interests
      }
      return formData.skills.length > 0;
    }
    return true;
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-12 h-12 mx-auto bg-green-600/20 rounded-full animate-ping" />
          </div>
          <p className="text-neutral-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-emerald-50 px-4 py-8">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-6 sm:p-8 md:p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/30 transform transition-transform hover:scale-105">
              {step === 1 && <User className="w-10 h-10 text-white" />}
              {step === 2 && <Briefcase className="w-10 h-10 text-white" />}
              {step === 3 && <Heart className="w-10 h-10 text-white" />}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Welcome Aboard!
              </h1>
            </div>
            <p className="text-base sm:text-lg text-neutral-600 mt-2 leading-relaxed">
              {isStudent 
                ? "Let's set up your profile to connect with amazing alumni"
                : "Help students discover your expertise and experience"}
            </p>
            {isStudent && (
              <p className="text-sm text-neutral-500 mt-2 italic">
                You can skip any step and complete it later
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center text-sm font-medium text-neutral-500 mb-3">
              <span>Step {step} of {totalSteps}</span>
              <span className="text-green-600">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2.5 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-green-500 to-emerald-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[380px]">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-neutral-800 mb-2">Basic Information</h2>
                  <p className="text-sm text-neutral-500">Tell us about yourself</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Branch / Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.branch}
                      onChange={(e) => handleInputChange("branch", e.target.value)}
                      onFocus={() => setIsSelectOpen(prev => ({ ...prev, branch: true }))}
                      onBlur={() => setIsSelectOpen(prev => ({ ...prev, branch: false }))}
                      className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all appearance-none bg-white text-neutral-800 font-medium cursor-pointer"
                    >
                      <option value="">Select your branch</option>
                      {branches.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                    <ChevronDown 
                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none transition-transform duration-200`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number {!isStudent && <span className="text-red-500">*</span>}
                    {isStudent && <span className="text-neutral-400 font-normal">(Optional)</span>}
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                    placeholder="Enter your phone number"
                    maxLength="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    LinkedIn Profile {!isStudent && <span className="text-red-500">*</span>}
                    {isStudent && <span className="text-neutral-400 font-normal">(Optional)</span>}
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                    className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Bio <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 h-32 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all resize-none"
                    maxLength="200"
                    placeholder="Tell us a bit about yourself..."
                  />
                  <p className="text-xs text-neutral-400 mt-2 text-right">
                    {formData.bio.length}/200 characters
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Role-specific Info */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-neutral-800 mb-2">
                    {isStudent ? "Academic Details" : "Professional Details"}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {isStudent ? "Share your academic information" : "Tell us about your career"}
                  </p>
                </div>

                {isStudent ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Expected Graduation Year <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.graduationYear}
                          onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                          onFocus={() => setIsSelectOpen(prev => ({ ...prev, graduationYear: true }))}
                          onBlur={() => setIsSelectOpen(prev => ({ ...prev, graduationYear: false }))}
                          className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all appearance-none bg-white text-neutral-800 font-medium cursor-pointer"
                        >
                          <option value="">Select year</option>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <ChevronDown 
                          className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none transition-transform duration-200 ${
                            isSelectOpen.graduationYear ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Current Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.currentCompany}
                        onChange={(e) => handleInputChange("currentCompany", e.target.value)}
                        className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                        placeholder="e.g., Google, Microsoft, Infosys"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Passout Year <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.passoutYear}
                          onChange={(e) => handleInputChange("passoutYear", e.target.value)}
                          onFocus={() => setIsSelectOpen(prev => ({ ...prev, passoutYear: true }))}
                          onBlur={() => setIsSelectOpen(prev => ({ ...prev, passoutYear: false }))}
                          className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all appearance-none bg-white text-neutral-800 font-medium cursor-pointer"
                        >
                          <option value="">Select year</option>
                          {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <ChevronDown 
                          className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none transition-transform duration-200 ${
                            isSelectOpen.passoutYear ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="50"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                        placeholder="e.g., 3.5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        City <span className="text-neutral-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full border-2 border-neutral-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
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
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-neutral-800 mb-2">
                    {isStudent ? "Areas of Interest" : "Your Expertise"}
                  </h2>
                  <p className="text-sm text-neutral-500 mb-2">
                    {isStudent 
                      ? "Select domains you're passionate about"
                      : "Showcase your professional skills"
                    }
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                    <span className="text-sm font-medium text-green-700">
                      {isStudent 
                        ? `${formData.interests.length}/5 selected`
                        : `${formData.skills.length}/10 selected`
                      }
                    </span>
                  </div>
                  {!isStudent && formData.skills.length === 0 && (
                    <p className="text-xs text-red-500 mt-2">Please select at least 1 skill</p>
                  )}
                </div>

                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
                  {domainOptions.map((domain) => {
                    const field = isStudent ? "interests" : "skills";
                    const isSelected = formData[field].includes(domain);
                    
                    return (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => toggleSelection(field, domain)}
                        className={`w-full px-5 py-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between text-sm font-medium group ${
                          isSelected
                            ? "border-green-500 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 shadow-sm"
                            : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700 hover:shadow-sm"
                        }`}
                      >
                        <span className={isSelected ? "font-semibold" : ""}>{domain}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected 
                            ? "border-green-500 bg-green-500" 
                            : "border-neutral-300 group-hover:border-green-300"
                        }`}>
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t-2 border-neutral-100">
            {/* Back Button */}
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-sm font-medium text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-3">
              {/* Skip Button (Student only) */}
              {isStudent && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-sm font-medium text-neutral-500 hover:text-neutral-700 transition px-4 py-2 rounded-lg hover:bg-neutral-100"
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
                  className="flex items-center gap-2 bg-linear-to-r from-green-600 to-emerald-600 text-white px-7 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/30 disabled:shadow-none font-medium"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className="flex items-center gap-2 bg-linear-to-r from-green-600 to-emerald-600 text-white px-7 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/30 disabled:shadow-none font-medium min-w-[140px] justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Complete</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f5f5f5;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }
      `}</style>
    </div>
  );
}