
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { weeklyExecutions } from "../../data/mock-data"

export default function TaskStatistics() {
  return (
    <section className="rounded-xl border border-slate-800/80 bg-[#101827] p-5">
      <div className="mb-6">
        <h2 className="font-semibold text-white">Task Statistics</h2>
        <p className="mt-1 text-xs text-slate-500">
          Execution activity over the last 7 days
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyExecutions}>
            <CartesianGrid
              stroke="#263247"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={30}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#101827",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />

            <Bar
              dataKey="executions"
              fill="#8b5cf6"
              radius={[5, 5, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
