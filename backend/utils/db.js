import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './utils/postedMedia.db',
  driver: sqlite3.Database
});

export const initDb = async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posted_media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mobileAdId TEXT
    )
  `);
};

export const insertPostedMedia = async ({ mobileAdId }) => {
  const db = await dbPromise;
  await db.run(
    `INSERT INTO posted_media (mobileAdId)
     VALUES (?)`,
    mobileAdId,
  );
};

export const getPostedMedia = async () => {
  const db = await dbPromise;
  return db.all(`SELECT * FROM posted_media`);
};