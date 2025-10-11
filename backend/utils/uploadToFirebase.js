import admin from "firebase-admin";
import path from "path";

// Initialize Firebase Admin once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    storageBucket: "autohausmiftari-b0e2f.firebasestorage.app", // replace with your Firebase bucket name
  });
}

const bucket = admin.storage().bucket();

/**
 * Uploads a file buffer (from multer.memoryStorage) to Firebase Storage
 * and returns a public URL.
 *
 * @param {Buffer} buffer - File buffer from multer
 * @param {string} destination - Path in Firebase Storage (e.g. "uploads/img.jpg")
 * @param {string} contentType - File MIME type (e.g. "image/jpeg")
 * @returns {Promise<string>} Public URL
 */
export async function uploadBufferToFirebase(buffer, destination, contentType) {
  const file = bucket.file(destination);

  await file.save(buffer, {
    metadata: { contentType },
    resumable: false,
  });

  // Make the file public (or use signed URLs if you want it private)
  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${destination}`;
}
