
import type { ReactNode } from "react";
import { Bell } from "lucide-react";
import AppSidebar from "@/components/layout/AppSidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080d12] text-slate-100">
      {/* Background image */}
      <div
        className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="pointer-events-none fixed inset-0 bg-[#080d12]/65" />

      {/* Subtle emerald ambient lighting */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_70%_10%,rgba(16,185,129,0.12),transparent_45%)]" />

      <div className="relative flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-white/[0.05] bg-[#101820]/20 px-8 backdrop-blur-2xl">
            <button
              aria-label="Notifications"
              className="ml-auto rounded-xl border border-white/[0.09] bg-white/[0.035] p-2.5 text-slate-400 transition-all hover:border-emerald-400/20 hover:bg-emerald-400/[0.07] hover:text-emerald-300"
            >
              <Bell size={18} />
            </button>
          </header>

          <main className="relative p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
