
import {
  Bot,
  ClipboardList,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, path: "/" },
  { label: "Agents", icon: Bot, path: "/agents" },
  { label: "Tasks", icon: ClipboardList, path: "/tasks" },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 ${
    isActive
      ? "border-[#8B7CF6]/20 bg-[#8B7CF6]/10 text-[#A99FFF] shadow-[inset_3px_0_0_0_#8B7CF6]"
      : "border-transparent text-[#9299AA] hover:border-[#252B38] hover:bg-[#151923] hover:text-[#F1F2F7]"
  }`;

export default function AppSidebar() {
  return (
    <aside className="relative flex min-h-screen w-64 shrink-0 flex-col border-r border-[#252B38] bg-[#10131B] p-5">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8B7CF6]/20 bg-[#8B7CF6]/10 text-[#A99FFF]">
          <Bot size={23} />
        </div>

        <div>
          <h1 className="font-semibold tracking-tight text-[#F1F2F7]">
            AgentFlow
          </h1>
          <p className="text-xs text-[#9299AA]">AI Workflow Platform</p>
        </div>
      </div>

      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#626A7C]">
        Workspace
      </p>

      <nav className="space-y-1.5">
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

      <div className="mt-auto hidden border-t border-[#252B38] pt-4">
        <NavLink to="/settings" className={linkClasses}>
          <Settings size={18} className="shrink-0" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
