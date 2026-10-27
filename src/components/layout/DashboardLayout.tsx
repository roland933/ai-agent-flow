
import type { ReactNode } from "react";
import { Bell, Search } from "lucide-react";
import AppSidebar from "@/components/layout/AppSidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080d12] text-slate-100">
      {/* Ambient background lighting */}
    
{/* Ambient glass background */}
<div className="pointer-events-none fixed inset-0 overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: `
        radial-gradient(ellipse at 72% 12%, rgba(16, 185, 129, 0.20), transparent 35%),
        radial-gradient(ellipse at 15% 45%, rgba(20, 184, 166, 0.14), transparent 32%),
        radial-gradient(ellipse at 75% 85%, rgba(52, 211, 153, 0.10), transparent 35%),
        linear-gradient(135deg, #080d12 0%, #0c151b 48%, #080d12 100%)
      `,
    }}
  />

  <div className="absolute -right-32 -top-40 h-[650px] w-[650px] rounded-full border border-emerald-200/[0.07] bg-emerald-400/[0.035] blur-[2px]" />

  <div className="absolute -left-48 top-[35%] h-[600px] w-[600px] rounded-full bg-teal-400/[0.09] blur-[130px]" />

  <div className="absolute bottom-[-350px] right-[15%] h-[650px] w-[650px] rounded-full bg-emerald-500/[0.10] blur-[150px]" />
</div>


      <div className="relative flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-white/[0.025] bg-[#101820]/5 px-8 backdrop-blur-2xl">
            

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