"use server";

import { signIn, signOut } from "@/auth";

export async function loginWithGoogle(callbackUrl?: string) {
  await signIn("google", { redirectTo: callbackUrl || "/dashboard/student" });
}

export async function loginWithDevRole(role: "STUDENT" | "CORE" | "COUNSELLOR") {
  const roleEmails: Record<"STUDENT" | "CORE" | "COUNSELLOR", string> = {
    STUDENT: "student.sample@mec.ac.in",
    CORE: "core.fortitude@mec.ac.in",
    COUNSELLOR: "counsellor@mec.ac.in",
  };

  const targetDashboard: Record<"STUDENT" | "CORE" | "COUNSELLOR", string> = {
    STUDENT: "/dashboard/student",
    CORE: "/dashboard/core",
    COUNSELLOR: "/dashboard/counsellor",
  };

  const email = roleEmails[role];

  await signIn("dev-login", {
    email,
    role,
    redirectTo: targetDashboard[role],
  });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/login" });
}
