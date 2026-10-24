
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AgentProvider } from "@/context/AgentContext";
import Overview from "@/pages/Overview";
import AgentDetails from "@/pages/AgentDetails";
import AgentsPage from "@/pages/AgentsPage";

export default function App() {
  return (
    <AgentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/:agentId" element={<AgentDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AgentProvider>
  );
}
