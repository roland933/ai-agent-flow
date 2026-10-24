
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
  `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
    isActive
      ? "bg-violet-600/15 text-violet-300"
      : "text-slate-400 hover:bg-slate-800 hover:text-white"
  }`;

export default function AppSidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-[#0d1423] p-5">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
          <Bot size={23} />
        </div>

        <div>
          <h1 className="font-semibold text-white">AgentFlow</h1>
          <p className="text-xs text-slate-500">AI Control Center</p>
        </div>
      </div>

      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Workspace
      </p>

      <nav className="space-y-1">
        {navigation.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className={linkClasses}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-4">
        <NavLink
          to="/settings"
          className={linkClasses}
        >
          <Settings size={18} />
          Settings
        </NavLink>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
          <p className="text-sm font-medium text-white">
            Development Mode
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Using static demo data
          </p>
        </div>
      </div>
    </aside>
  );
}
