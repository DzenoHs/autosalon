import { checkCarsAndPostToInstagram } from "../utils/postToInstagramCheck.js";

export const cron = () => {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }
  console.log("Running crone job for instagram posts")
  checkCarsAndPostToInstagram()

}
