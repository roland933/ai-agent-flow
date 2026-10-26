
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Overview from "@/features/overview/pages/Overview";
import AgentDetails from "@/features/agents/pages/AgentDetails";
import AgentsPage from "@/features/agents/pages/AgentsPage";
import TasksPage from "@/features/tasks/pages/TasksPage";
import ExecutionsPage from "@/features/executions/pages/ExecutionsPage";
import LogsPage from "@/features/logs/pages/LogsPage";


export default function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/:agentId" element={<AgentDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/executions" element={<ExecutionsPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </BrowserRouter>
   
  );
}
