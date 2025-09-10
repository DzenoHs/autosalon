const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS_PER_WINDOW = 50;

export function checkRateLimit(clientIP) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, []);
  }

  const clientRequests = requestCounts.get(clientIP);
  const recentRequests = clientRequests.filter(timestamp => timestamp > windowStart);
  requestCounts.set(clientIP, recentRequests);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recentRequests.push(now);
  requestCounts.set(clientIP, recentRequests);
  return true;
}