
import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import { mockLogs } from "@/features/logs/data/mock-logs";
import DataTable from "@/features/ui/table/DataTable";
import { logColumns } from "@/features/logs/columns/logColumns";
import { FilterBox } from "@/features/ui/filter-box/FilterBox";
import { SearchInput } from "@/features/ui/input/SearchInput";
import Select from "@/features/ui/select/Select";
import { TableToolbar } from "@/features/ui/table/TableToolbar";
import { ScrollText } from "lucide-react";

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

  const handleResetFilters = () => {
    setSearch("");
    setLevel("All");
  };

  return (
    <DashboardLayout>
      <HeaderLayout
        title="Logs"
        icon={<ScrollText />}
        subTitle="Review application events, warnings and errors."
      />

      <FilterBox onReset={handleResetFilters}>
        <SearchInput
          label="Search"
          placeholder="Search logs"
          value={search}
          onChange={setSearch}
        />

        <Select
          label="Level"
          value={level}
          onChange={(value) =>
            setLevel(value as (typeof logLevels)[number])
          }
          options={logLevels.map((item) => ({
            label: item === "All" ? "All levels" : item,
            value: item,
          }))}
        />
      </FilterBox>

      <TableToolbar
        filteredCount={filteredLogs.length}
        totalCount={mockLogs.length}
        itemName="log entries"
      />

      <DataTable
        columns={logColumns}
        data={filteredLogs}
        getRowId={(log) => log.id}
      />
    </DashboardLayout>
  );
}
