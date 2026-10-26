export function formatDuration(durationMs: number | null) {
  if (durationMs === null) {
    return "—";
  }

  if (durationMs < 1000) {
    return `${durationMs} ms`;
  }

  const totalSeconds = Math.floor(durationMs / 1000);

  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}

export function formatDate(date: string | null) {
  if (date === null) {
    return "Not started";
  }

  return new Date(date).toLocaleString();
}