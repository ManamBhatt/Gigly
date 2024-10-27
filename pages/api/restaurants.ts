// pages/api/restaurants.js

export default function handler(req, res) {
    // Mock data for restaurants
    const restaurants = [
      {
        id: 1,
        name: "The Melodic Bistro",
        image: "/tmb.png",
        location: "123 Harmony Street, Musicville",
        phone: "+1 (555) 123-4567",
        email: "contact@melodicbistro.com",
        description: "A cozy bistro with live jazz performances every evening.",
        availableSlots: [
          { date: "2023-06-15", slots: ["7:00 PM", "8:30 PM"] },
          { date: "2023-06-16", slots: ["6:30 PM", "8:00 PM", "9:30 PM"] },
          { date: "2023-06-17", slots: ["7:30 PM", "9:00 PM"] },
        ],
      },
      {
        id: 2,
        name: "Rhythm & Bites",
        image: "/Rnb.png",
        location: "456 Beat Avenue, Groovetown",
        phone: "+1 (555) 987-6543",
        email: "info@rhythmandbites.com",
        description: "An eclectic eatery featuring indie bands and fusion cuisine.",
        availableSlots: [
          { date: "2023-06-15", slots: ["6:00 PM", "8:00 PM"] },
          { date: "2023-06-16", slots: ["7:00 PM", "9:00 PM"] },
        ],
      },
    ];
  
    res.status(200).json(restaurants);
  }
  