"use client";

import { useState } from "react";
import { UserCheck, Mail, Phone, Link2, Check } from "lucide-react";

interface CounsellorData {
  name: string;
  designation?: string | null;
  department?: string | null;
  phone?: string | null;
  email: string;
  linkedin?: string | null;
}

export default function CounsellorProfileEditor({ initialData }: { initialData: CounsellorData }) {
  const [formData, setFormData] = useState<CounsellorData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/counsellor/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccessMsg("Counsellor profile details updated successfully!");
      }
    } catch {
      setSuccessMsg("Failed to save profile. Please retry.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFA4A4]/40 text-rose-950">
          <UserCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#2D3748]">
            Edit Counsellor Profile Details
          </h2>
          <p className="text-xs text-slate-500">
            Updates reflected across Fortitude website and booking vouchers
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-[#E8E5D5] bg-[#FAF9F5] px-3.5 py-2 text-xs text-[#2D3748] focus:outline-none focus:border-[#BADFDB]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Designation / Role
            </label>
            <input
              type="text"
              value={formData.designation || ""}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              placeholder="Campus Counsellor & Well-Being Guide"
              className="w-full rounded-xl border border-[#E8E5D5] bg-[#FAF9F5] px-3.5 py-2 text-xs text-[#2D3748] focus:outline-none focus:border-[#BADFDB]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-[#E8E5D5] bg-[#FAF9F5] pl-9 pr-3.5 py-2 text-xs text-[#2D3748] focus:outline-none focus:border-[#BADFDB]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contact Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-[#E8E5D5] bg-[#FAF9F5] pl-9 pr-3.5 py-2 text-xs text-[#2D3748] focus:outline-none focus:border-[#BADFDB]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            LinkedIn Profile URL
          </label>
          <div className="relative">
            <Link2 className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={formData.linkedin || ""}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/babu-mathews"
              className="w-full rounded-xl border border-[#E8E5D5] bg-[#FAF9F5] pl-9 pr-3.5 py-2 text-xs text-[#2D3748] focus:outline-none focus:border-[#BADFDB]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-[#BADFDB] px-5 py-2.5 text-xs font-bold text-teal-950 hover:bg-[#a9d7d2] disabled:opacity-50 transition-colors"
          >
            {isSaving ? "Saving Profile..." : "Save Profile Details"}
          </button>
          {successMsg && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <Check className="h-4 w-4" />
              {successMsg}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
