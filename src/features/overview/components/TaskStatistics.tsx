
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { weeklyExecutions } from "../../agents/data/mock-data";

export default function TaskStatistics() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-400/[0.06] blur-[80px]" />

      <div className="relative mb-6">
        <h2 className="font-semibold text-slate-100">Task Statistics</h2>
        <p className="mt-1 text-xs text-slate-400">
          Execution activity over the last 7 days
        </p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyExecutions}>
            <CartesianGrid
              stroke="rgba(148, 163, 184, 0.12)"
              strokeDasharray="3 5"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              fontSize={12}
            />

            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              fontSize={12}
              width={30}
            />

            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.035)" }}
              contentStyle={{
                backgroundColor: "rgba(15, 23, 30, 0.94)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "12px",
                color: "#f1f5f9",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25)",
              }}
              labelStyle={{ color: "#cbd5e1" }}
            />

            <Bar
              dataKey="executions"
              fill="#34d399"
              radius={[5, 5, 0, 0]}
              maxBarSize={36}
              activeBar={{ fill: "#6ee7b7" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
