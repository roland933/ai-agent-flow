
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
  <div className="min-h-screen bg-[#0B0D12] text-[#F1F2F7]">
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="min-w-0 flex-1">
       

        <main className="relative p-8">
          {children}
        </main>
      </div>
    </div>
  </div>
);
}
