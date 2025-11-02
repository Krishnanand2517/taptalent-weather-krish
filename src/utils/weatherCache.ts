const CACHE_TTL = 60 * 1000; // 1 minute

interface CachedItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_KEY = "weatherCache";

function getCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveCache(cache: Record<string, CachedItem<any>>) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

export function getCachedWeather<T>(key: string): T | null {
  const cache = getCache();
  const entry = cache[key];
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  return null;
}

export function setCachedWeather<T>(key: string, data: T) {
  const cache = getCache();
  cache[key] = { data, timestamp: Date.now() };
  saveCache(cache);
}

export function clearExpiredCache() {
  const cache = getCache();
  const now = Date.now();
  let changed = false;

  for (const key in cache) {
    if (now - cache[key].timestamp >= CACHE_TTL) {
      delete cache[key];
      changed = true;
    }
  }

  if (changed) saveCache(cache);
}
