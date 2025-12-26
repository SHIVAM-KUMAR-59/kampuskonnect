"use client";

import { useState, useEffect } from "react";
import { Mail, Briefcase, Linkedin, Users, GraduationCap, Loader2, XCircle } from "lucide-react";
import api from "@/utils/axios";
import PageIntro from "@/component/PageIntro";
import SectionCard from "@/component/SectionCard";
import { Input, Textarea } from "@/component/ui/Input";
import Image from "next/image";
import { ProfileSkeleton } from "@/component/skeleton/Profile";
import PrimaryButton from "@/component/PrimaryButton";
import { domainOptions } from "@/utils/constants";
import { useToast } from "@/context/ToastContext";
import { getAvatar, getVerificationStatus } from "@/utils/util";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

      const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data.user);
        setForm(res.data.user);
        setSkills(res.data.user.skills);
        console.log(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchUser();
  }, []);

  const isAlumni = user?.role === "ALUMNI";

  const isFormChanged = (original, updated) => {
  return JSON.stringify(original) !== JSON.stringify(updated);
};

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addSkill = () => {
    if (!selectedSkill || skills.includes(selectedSkill) || skills.length >= 10) {
      error(`You cannot add more that 10 ${isAlumni ? "skills" : "interests"}`);
      return;
    }

    setSkills((prev) => [...prev, selectedSkill]);
    setSelectedSkill("");
  };

  const removeSkill = (skill) => {
    if (skills.length === 1) {
      error(`You must have at least 1 ${isAlumni ? "skill" : "interest"}`);
      return;
    } // minimum 1 skill
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    try {
      setSaving(true)
      if (!isFormChanged(user, form)) {
        error("No changes made");
        return
      }
      await api.put(`${isAlumni ? "/alumni" : "/student"}/profile`, form);
      success("Profile updated successfully");
      fetchUser();
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
      error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ProfileSkeleton />;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <XCircle className="w-12 h-12 text-red-500" />
      </div>
    );
  }

  return (
    <>
      <PageIntro
        title={<>
            <span className="flex flex-col md:flex-row md:items-center gap-3">Hello, {user.name.split(" ")[0]} {getVerificationStatus(user.verificationStatus)}</span>
          </>}
        subtitle="Manage, update, and personalize your profile."
      />

      <SectionCard>
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        {/* Avatar */}
        <div className="flex items-center gap-6 mt-3">
          {!user.profileImage ? (
            <Image
              src={user.profileImage}
              alt="avatar"
              width={96}
              height={96}
              className="rounded-full border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-50 text-green-700 border border-green-500" >
              <p className="text-center text-2xl font-bold">{getAvatar(user.name)}</p>
            </div>
          )}
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Input label="Email" value={form.email} icon={<Mail size={16} />} disabled />

          <Textarea
            label="Bio"
            value={form.bio || ""}
            onChange={(e) => handleChange("bio", e.target.value)}
          />

          {isAlumni && (
            <>
              <Input
                label="Current Company"
                icon={<Briefcase size={16} />}
                value={form.currentCompany || ""}
                onChange={(e) => handleChange("currentCompany", e.target.value)}
              />

              <Input
                label="Experience (years)"
                value={form.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
              />
            </>
          )}

          <Input
            label="LinkedIn URL"
            icon={<Linkedin size={16} />}
            value={form.linkedinUrl || ""}
            onChange={(e) => handleChange("linkedinUrl", e.target.value)}
          />

          <Input
            label={isAlumni ? "Passout Year" : "Current Year"}
            icon={<GraduationCap size={16} />}
            value={isAlumni ? form.passoutYear : form.currentYear}
            onChange={(e) => handleChange(isAlumni ? "passoutYear" : "currentYear", e.target.value)}
          />
        </div>

        {/* Meta */}
        <div className="mt-6 text-sm text-gray-600 flex flex-wrap gap-6">

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">{isAlumni ? "Skills" : "Interests"} (min 1, max 10)</label>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-green-600 hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            {skills.length < 10 && (
              <div className="flex gap-2">
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a skill</option>
                  {domainOptions
                    .filter((opt) => !skills.includes(opt))
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>

                <button
                  type="button"
                  onClick={addSkill}
                  disabled={!selectedSkill}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500">{skills.length}/10 skills selected</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 md:flex-row justify-between items-center mt-10">
          <button className="w-full md:w-fit px-6 py-3 rounded-xl border border-red-600 text-red-600 font-medium hover:bg-red-100 hover:cursor-pointer transition-all duration-200">
            Delete account
          </button>

          <PrimaryButton
            onClick={handleSave}
            disabled={saving}
            text={
              saving ? (
                <p className="flex items-center gap-2">
                  Saving... <Loader2 className="w-4 h-4 animate-spin" />
                </p>
              ) : (
                "Save Changes"
              )
            }
            classname={"w-full md:w-fit px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200"}
          />
        </div>
      </SectionCard>
    </>
  );
}
