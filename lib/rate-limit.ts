type RateLimitOptions = {
  intervalMs: number;
  max: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, options: RateLimitOptions) {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const next = { count: 1, resetAt: now + options.intervalMs };
    buckets.set(key, next);
    return { success: true, remaining: options.max - 1, resetAt: next.resetAt };
  }

  if (existing.count >= options.max) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return {
    success: true,
    remaining: Math.max(0, options.max - existing.count),
    resetAt: existing.resetAt
  };
}

export function clientKey(headersList: Headers, action: string, userId?: string | null) {
  const forwardedFor = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headersList.get("x-real-ip");
  return `${action}:${userId ?? forwardedFor ?? realIp ?? "anonymous"}`;
}
