

import axios from 'axios';

const INSTAGRAM_API_URL = 'https://graph.facebook.com/v23.0';

export const postInstagramCarousel = async ({ imageUrls, caption }) => {
  const { LONG_LIVED_TOKEN, INSTAGRAM_ACCOUNT_ID } = process.env;

  if (!LONG_LIVED_TOKEN || !INSTAGRAM_ACCOUNT_ID) {
    console.error('❌ Missing required environment variables.');
    return;
  }


  try {
    // Step 1: Upload each image as a carousel item
    const children = [];
    for (const url of imageUrls) {
      const res = await axios.post(
        `${INSTAGRAM_API_URL}/${INSTAGRAM_ACCOUNT_ID}/media`,
        {
          image_url: url,
          is_carousel_item: true,
          access_token: LONG_LIVED_TOKEN,
        }
      );
      children.push(res.data.id);
    }

    // Step 2: Create a carousel container
    const containerRes = await axios.post(
      `${INSTAGRAM_API_URL}/${INSTAGRAM_ACCOUNT_ID}/media`,
      {
        media_type: 'CAROUSEL',
        children,
        caption,
        access_token: LONG_LIVED_TOKEN,
      }
    );

    // Step 3: Publish the carousel container
    const publishRes = await axios.post(
      `${INSTAGRAM_API_URL}/${INSTAGRAM_ACCOUNT_ID}/media_publish`,
      {
        creation_id: containerRes.data.id,
        access_token: LONG_LIVED_TOKEN,
      }
    );

    console.log('✅ Carousel post published:', publishRes.data);
    return publishRes.data;
  } catch (error) {
    console.error('❌ Failed to post carousel:', error.response?.data || error.message);
    throw error;
  }
};