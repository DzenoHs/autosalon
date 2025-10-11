import cron from 'node-cron';
import { refreshAccessToken } from './refreshToken.js';
import { checkCarsAndPostToInstagram } from './postToInstagramCheck.js';

// Every day at 10:00 AM (you can run daily, it will skip if not needed)
cron.schedule('0 10 * * *', () => {
  console.log('🔁 Checking token status...');
  refreshAccessToken();
});

cron.schedule('0 * * * *', () => {
  console.log('Check mobile.de to post new cars to instagram')
  // checkCarsAndPostToInstagram()
})

// Optional immediate check on app start
refreshAccessToken();