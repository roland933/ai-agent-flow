
import {
  Activity,
  Bot,
  ClipboardList,
  LayoutDashboard,
  ScrollText,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, path: "/" },
  { label: "Agents", icon: Bot, path: "/agents" },
  { label: "Tasks", icon: ClipboardList, path: "/tasks" },
  { label: "Executions", icon: Activity, path: "/executions" },
  { label: "Logs", icon: ScrollText, path: "/logs" },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 ${
    isActive
      ? "border-emerald-400/20 bg-emerald-400/[0.10] text-emerald-300 shadow-[inset_3px_0_0_0_#34d399,0_0_24px_-12px_rgba(52,211,153,0.35)]"
      : "border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-slate-100"
  }`;

export default function AppSidebar() {
  return (
    <aside 
    className="relative flex min-h-screen w-64 shrink-0 flex-col overflow-hidden border-r border-white/[0.03] bg-[#111a22]/45 p-5 backdrop-blur-2xl">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-emerald-400/[0.07] blur-[90px]" />

      <div className="relative mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-gradient-to-br from-emerald-300/25 to-emerald-500/10 text-emerald-300 shadow-[0_0_24px_-8px_rgba(52,211,153,0.5)]">
          <Bot size={23} />
        </div>

        <div>
          <h1 className="font-semibold tracking-tight text-white">
            AgentFlow
          </h1>
          <p className="text-xs text-slate-500">AI Control Center</p>
        </div>
      </div>

      <p className="relative mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        Workspace
      </p>

      <nav className="relative space-y-1.5">
        {navigation.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className={linkClasses}
          >
            <Icon
              size={18}
              className="shrink-0 transition-transform duration-200 group-hover:scale-105"
            />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="relative mt-auto border-t border-white/[0.08] pt-4 hidden" >
        <NavLink to="/settings" className={linkClasses}>
          <Settings size={18} className="shrink-0" />
          <span>Settings</span>
        </NavLink>

        <div className="mt-4 rounded-xl border border-white/[0.09] bg-white/[0.035] p-3 shadow-inner shadow-white/[0.02]">
          <div className="mb-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-xs font-medium text-slate-200">
              Development Mode
            </p>
          </div>

          <p className="text-xs leading-relaxed text-slate-500">
            Using static demo data
          </p>
        </div>
      </div>
    </aside>
  );
}
