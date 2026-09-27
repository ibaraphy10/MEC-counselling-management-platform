import Link from "next/link";
import { loginWithDevRole, loginWithGoogle } from "@/app/actions/auth";
import { ArrowLeft, GraduationCap, ShieldCheck, UserCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const initialRole = (params.role?.toUpperCase() as "STUDENT" | "COUNSELLOR" | "CORE") || "STUDENT";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FCF9EA] px-4 py-12 text-[#2D3748]">
      <div className="w-full max-w-md rounded-3xl bg-white border border-[#E8E5D5] p-8 shadow-xs">
        {/* Top return link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-950 mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Fortitude Home</span>
        </Link>

        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#BADFDB] text-teal-950 mb-3 shadow-2xs font-bold text-lg">
            F
          </div>
          <h1 className="text-2xl font-bold text-[#2D3748]">
            Login to Fortitude
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Choose your role to access your confidential workspace
          </p>
        </div>

        {/* Quick Role Access Buttons */}
        <div className="space-y-3 mb-6">
          <form
            action={async () => {
              "use server";
              await loginWithDevRole("STUDENT");
            }}
          >
            <button
              type="submit"
              className={`w-full flex items-center justify-between rounded-2xl border p-3.5 text-xs font-bold transition-all ${
                initialRole === "STUDENT"
                  ? "bg-[#BADFDB]/30 border-[#BADFDB] text-teal-950 ring-1 ring-[#BADFDB]"
                  : "bg-[#FCF9EA]/50 border-[#E8E5D5] text-slate-700 hover:bg-[#BADFDB]/20"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="h-4 w-4 text-teal-800" />
                <span>Student Login</span>
              </div>
              <span className="text-[10px] bg-white border border-[#E8E5D5] px-2 py-0.5 rounded-full text-slate-600">
                Continue →
              </span>
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await loginWithDevRole("COUNSELLOR");
            }}
          >
            <button
              type="submit"
              className={`w-full flex items-center justify-between rounded-2xl border p-3.5 text-xs font-bold transition-all ${
                initialRole === "COUNSELLOR"
                  ? "bg-[#FFA4A4]/25 border-[#FFA4A4] text-rose-950 ring-1 ring-[#FFA4A4]"
                  : "bg-[#FCF9EA]/50 border-[#E8E5D5] text-slate-700 hover:bg-[#FFA4A4]/20"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="h-4 w-4 text-rose-800" />
                <span>Counsellor Cabin Login</span>
              </div>
              <span className="text-[10px] bg-white border border-[#E8E5D5] px-2 py-0.5 rounded-full text-slate-600">
                Continue →
              </span>
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await loginWithDevRole("CORE");
            }}
          >
            <button
              type="submit"
              className={`w-full flex items-center justify-between rounded-2xl border p-3.5 text-xs font-bold transition-all ${
                initialRole === "CORE"
                  ? "bg-[#FFBDBD]/40 border-[#FFBDBD] text-slate-900 ring-1 ring-[#FFBDBD]"
                  : "bg-[#FCF9EA]/50 border-[#E8E5D5] text-slate-700 hover:bg-[#FFBDBD]/30"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-purple-800" />
                <span>Core Committee Login</span>
              </div>
              <span className="text-[10px] bg-white border border-[#E8E5D5] px-2 py-0.5 rounded-full text-slate-600">
                Continue →
              </span>
            </button>
          </form>
        </div>

        {/* MEC College Email Single Sign On */}
        <div className="relative my-6 text-center text-xs text-slate-400">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8E5D5]" />
          </div>
          <span className="relative bg-white px-3">or official college SSO</span>
        </div>

        <form
          action={async () => {
            "use server";
            await loginWithGoogle(params.callbackUrl);
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[#E8E5D5] bg-[#FAF9F5] py-3 text-xs font-bold text-slate-800 hover:bg-[#F2EFE0] transition-colors shadow-2xs"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with MEC Account</span>
          </button>
        </form>
      </div>
    </div>
  );
}
