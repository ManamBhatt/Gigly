// pages/test-api.js
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";

export default function TestAPI() {
  const [apiData, setApiData] = useState([]);
  const [firebaseData, setFirebaseData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from local API
  const fetchApiData = async () => {
    try {
      const response = await axios.get("/api/restaurants");
      setApiData(response.data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  // Fetch data from Firebase
  const fetchFirebaseData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      const restaurants = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirebaseData(restaurants);
    } catch (error) {
      console.error("Error fetching Firebase data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
    fetchFirebaseData();
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">API & Firebase Test Page</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2">API Data</h2>
          {apiData.length > 0 ? (
            <ul className="mb-6">
              {apiData.map((restaurant) => (
                <li key={restaurant.id}>
                  <p><strong>Name:</strong> {restaurant.name}</p>
                  <p><strong>Description:</strong> {restaurant.description}</p>
                  <p><strong>Location:</strong> {restaurant.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available from API.</p>
          )}

          <h2 className="text-2xl font-semibold mb-2">Firebase Data</h2>
          {firebaseData.length > 0 ? (
            <ul>
              {firebaseData.map((restaurant) => (
                <li key={restaurant.id}>
                  <p><strong>Name:</strong> {restaurant.name}</p>
                  <p><strong>Description:</strong> {restaurant.description}</p>
                  <p><strong>Location:</strong> {restaurant.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available from Firebase.</p>
          )}
        </>
      )}
    </div>
  );
}
