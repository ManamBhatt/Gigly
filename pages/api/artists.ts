// pages/api/artists.js
import { db } from '../../firebase'; // Ensure the path is correct based on your directory structure
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    const artistsCollection = collection(db, 'artists'); // Change 'artists' to your Firestore collection name
    const snapshot = await getDocs(artistsCollection);
    const artists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(artists);
  } catch (error) {
    console.error("Error fetching artists: ", error);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
}
