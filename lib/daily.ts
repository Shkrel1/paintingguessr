// EST = UTC-5. All daily challenges reset at midnight EST.
const EST_OFFSET_HOURS = -5;

function getESTDate(date: Date = new Date()): Date {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + EST_OFFSET_HOURS * 3600000);
}

function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getDailySeed(date: Date): number {
  const dateStr = formatDateStr(getESTDate(date)) + '_v2';
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function getTodayDateString(): string {
  return formatDateStr(getESTDate());
}

export function getTimeUntilNextDaily(): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const est = getESTDate(now);
  // Next midnight EST
  const tomorrowEST = new Date(est);
  tomorrowEST.setDate(tomorrowEST.getDate() + 1);
  tomorrowEST.setHours(0, 0, 0, 0);
  // Convert back: diff in ms between the two EST times
  const diffMs = tomorrowEST.getTime() - est.getTime();
  return {
    hours: Math.floor(diffMs / (1000 * 60 * 60)),
    minutes: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diffMs % (1000 * 60)) / 1000),
  };
}
