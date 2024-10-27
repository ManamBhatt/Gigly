// pages/api/addArtist.js
import { db } from '../../firebase'; // Ensure the path is correct based on your directory structure
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const artistData = req.body; // Get artist data from the request body
      const docRef = await addDoc(collection(db, 'artists'), artistData);
      res.status(200).json({ id: docRef.id, message: 'Artist added successfully!' });
    } catch (error) {
      console.error('Error adding artist: ', error);
      res.status(500).json({ error: 'Failed to add artist' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
