// Convert timestamp to relative time (e.g., "2m ago")
export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diffSec = Math.floor((now - timestamp * 1000) / 1000);

  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
};
