// pages/api/process-image.js

import sharp from 'sharp';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Retrieve the image data from the request body
      const { imageData } = req.body;

      // Process the image using Sharp (example)
      const processedImage = await sharp(imageData)
        .resize({ width: 300, height: 200 })
        .toBuffer();

      // Return the processed image data
      res.status(200).json({ processedImage });
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Error processing image' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
