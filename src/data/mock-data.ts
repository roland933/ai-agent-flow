
export const dashboardStats = [
  {
    title: "Total Agents",
    value: "12",
    change: "+2 this week",
    icon: "bot",
  },
  {
    title: "Active Tasks",
    value: "8",
    change: "3 running now",
    icon: "activity",
  },
  {
    title: "Success Rate",
    value: "94.8%",
    change: "+2.4% this month",
    icon: "check",
  },
  {
    title: "Total Executions",
    value: "1,284",
    change: "+18.2% this month",
    icon: "chart",
  },
];

export const agents = [
  {
    id: 1,
    name: "Research Agent",
    description: "Web research and information gathering",
    status: "Running",
    model: "GPT-4.1",
    tasksCompleted: 128,
  },
  {
    id: 2,
    name: "Code Assistant",
    description: "Code analysis and generation",
    status: "Idle",
    model: "GPT-4.1",
    tasksCompleted: 86,
  },
  {
    id: 3,
    name: "Data Analyst",
    description: "Data processing and reporting",
    status: "Running",
    model: "Claude",
    tasksCompleted: 54,
  },
  {
    id: 4,
    name: "Content Writer",
    description: "Content creation and summarization",
    status: "Error",
    model: "GPT-4.1",
    tasksCompleted: 42,
  },
];

export const weeklyExecutions = [
  { day: "Mon", executions: 42 },
  { day: "Tue", executions: 58 },
  { day: "Wed", executions: 47 },
  { day: "Thu", executions: 75 },
  { day: "Fri", executions: 63 },
  { day: "Sat", executions: 91 },
  { day: "Sun", executions: 68 },
];
