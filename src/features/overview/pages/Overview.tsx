
import { useState } from "react";
import {  ArrowUpRight, LayoutDashboard } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskStatistics from "../components/TaskStatistics";
import RecentExecutions from "../components/RecentExecutions";
import CreateAgentDialog from "@/features/agents/components/CreateAgentDialog";

import { dashboardStats } from "../../agents/data/mock-data";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import { Stats } from "../components/Stats";
import DataTable from "@/features/ui/table/DataTable";
import { overviewAgentColumns } from "../columns/overviewAgentColumns";


export default function Overview() {
  const agents = useAgentStore((state) => state.agents);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();

  const totalAgents = agents.length;

  const runningAgents = agents.filter(
    (agent) => agent.status === "Running",
  ).length;

  const totalCompletedTasks = agents.reduce(
    (total, agent) => total + agent.tasksCompleted,
    0,
  );


  return (
    <DashboardLayout>

      <HeaderLayout 
          title="Overview" 
           icon={<LayoutDashboard />}
          subTitle="Monitor and manage your AI agents." />

        <Stats dashboardStats={dashboardStats} 
               totalAgents={totalAgents} 
               runningAgents={runningAgents} 
               totalCompletedTasks={totalCompletedTasks}
        />

      <section className="mt-8 overflow-hidden rounded-2xl  border border-white/5 px-5 py-5">
        <div className="flex items-center gap-1 text-md text-emerald-300 transition-colors hover:text-emerald-200 mb-5  px-5 py-0">
          <div>
            <h2 className="font-semibold">Your Agents</h2>
            <p className="mt-1 text-sm text-slate-300">
              Overview of your configured AI agents
            </p>
          </div>

          <button
            onClick={() => navigate("/agents")}
            className="ml-auto hover:cursor-pointer flex items-center gap-1 text-sm text-emerald-300 hover:text-emerald-200"
          >
            View all <ArrowUpRight size={15} />
          </button>
        </div>

     
   
         <div className="overflow-hidden rounded-b-2xl">
        <DataTable
          columns={overviewAgentColumns}
          data={agents}
          getRowId={(agent) => agent.id}
          onRowClick={(agent) => navigate(`/agents/${agent.id}`)}
        />
      </div>

       </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TaskStatistics />
        <RecentExecutions />
      </div>

      <CreateAgentDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </DashboardLayout>
  );
}
