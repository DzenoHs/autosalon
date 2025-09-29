import axios from 'axios';
import fs from 'fs';

const ENV_PATH = '.env';
const EXPIRY_THRESHOLD_DAYS = 5;

function getDaysUntilExpiration(dateStr) {
  const expiresAt = new Date(dateStr);
  const now = new Date();
  const diffMs = expiresAt - now;
  return diffMs / (1000 * 60 * 60 * 24); // days
}

function updateEnvVariable(key, value) {
  const lines = fs.readFileSync(ENV_PATH, 'utf8').split('\n');
  const updated = lines.map(line =>
    line.startsWith(`${key}=`) ? `${key}=${value}` : line
  );
  const keys = updated.map(line => line.split('=')[0]);
  if (!keys.includes(key)) updated.push(`${key}=${value}`);
  fs.writeFileSync(ENV_PATH, updated.join('\n'), 'utf8');
}

export const refreshAccessToken = async () => {
  const { APP_ID, APP_SECRET, LONG_LIVED_TOKEN, LONG_LIVED_TOKEN_EXPIRES_AT } = process.env;

  const daysLeft = getDaysUntilExpiration(LONG_LIVED_TOKEN_EXPIRES_AT);
  console.log(`🧪 Token expires in ${daysLeft.toFixed(2)} days`);

  if (daysLeft > EXPIRY_THRESHOLD_DAYS) {
    console.log('✅ Token is still valid. No refresh needed.');
    return;
  }

  const url = `https://graph.facebook.com/v23.0/oauth/access_token` +
    `?grant_type=fb_exchange_token` +
    `&client_id=${APP_ID}` +
    `&client_secret=${APP_SECRET}` +
    `&fb_exchange_token=${LONG_LIVED_TOKEN}`;

  try {
    const res = await axios.get(url);
    const { access_token, expires_in } = res.data;

    const newExpiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    updateEnvVariable('LONG_LIVED_TOKEN', access_token);
    updateEnvVariable('LONG_LIVED_TOKEN_EXPIRES_AT', newExpiresAt);

    console.log('✅ Token refreshed and .env updated');
    console.log('🔒 New token:', access_token);
    console.log('📅 New expiration:', newExpiresAt);
  } catch (err) {
    console.error('❌ Failed to refresh token:', err.response?.data || err.message);
  }
};