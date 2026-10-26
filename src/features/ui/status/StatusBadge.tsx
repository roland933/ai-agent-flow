import { statusConfig, type Status } from "./status-config";

type StatusBadgeProps = {
  status: Status;
  showIcon?: boolean;
};

export default function StatusBadge({
  status,
  showIcon = true,
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.classes}`}
    >
      {showIcon && <Icon size={13} strokeWidth={1.8} />}
      {config.label}
    </span>
  );
}