import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockLogs } from "@/features/logs/data/mock-logs";
import DataTable from "@/features/ui/table/DataTable";
import { logColumns } from "@/features/logs/columns/logColumns";
import { HeaderLayout } from "@/components/layout/HeaderLayout";

const logLevels = ["All", "Info", "Success", "Warning", "Error"] as const;

export default function LogsPage() {
  const [level, setLevel] =
    useState<(typeof logLevels)[number]>("All");

  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return mockLogs.filter((log) => {
      const matchesLevel = level === "All" || log.level === level;

      const matchesSearch =
        log.message.toLowerCase().includes(searchTerm) ||
        log.source.toLowerCase().includes(searchTerm);

      return matchesLevel && matchesSearch;
    });
  }, [level, search]);

  return (
    <DashboardLayout>

      <HeaderLayout title="Logs" subTitle="Review application events, warnings and errors." />


      <div className="flex flex-col gap-3 sm:flex-row mb-5">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search logs..."
          className="h-10 flex-1 rounded-md border bg-background px-3 text-sm"
        />

        <select
          value={level}
          onChange={(event) =>
            setLevel(event.target.value as (typeof logLevels)[number])
          }
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          {logLevels.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All levels" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <DataTable
          columns={logColumns}
          data={filteredLogs}
          getRowId={(log) => log.id}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredLogs.length} of {mockLogs.length} log entries
      </p>
   
    </DashboardLayout >
  );
}