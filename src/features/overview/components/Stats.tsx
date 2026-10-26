import StatCard from "./StatCard";

type StatsProps = {
    dashboardStats:[]
    totalCompletedTasks:number,
    runningAgents:number,
    totalAgents:number,

}

export function Stats({dashboardStats,totalAgents,runningAgents,totalCompletedTasks}:StatsProps) {

      const dynamicStats = dashboardStats.map((stat) => {
        switch (stat.title) {
          case "Total Agents":
            return {
              ...stat,
              value: String(totalAgents),
              change: "Currently configured",
            };
    
          case "Active Agents":
            return {
              ...stat,
              value: String(runningAgents),
              change: "Currently running agents",
            };
    
          case "Total Executions":
            return {
              ...stat,
              value: totalCompletedTasks.toLocaleString(),
              change: "Completed tasks",
            };
    
          default:
            return stat;
        }
      });

    return (
         <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dynamicStats.map((stat) => (
                  <StatCard key={stat.title} {...stat} />
                ))}
              </section>
    )

}