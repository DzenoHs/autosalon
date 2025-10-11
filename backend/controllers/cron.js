import { checkCarsAndPostToInstagram } from "../utils/postToInstagramCheck.js";

export const cron = (req, res) => {
  const token = req.get('Authorization'); // ili req.headers['authorization']

  if (token !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send('Unauthorized');
  }

  console.log("Running cron job for Instagram posts");

  // Pokreće funkciju, ali ne čekamo njen rezultat
  checkCarsAndPostToInstagram();

  // Odmah vraćamo odgovor
  res.json({ status: 'ok', message: 'Cron job started' });
};
