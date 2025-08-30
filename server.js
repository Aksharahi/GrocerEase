const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ✅ Serve your project.html file directly
app.use(express.static(__dirname));

// Mock JSON dataset
const shops = [
  {
    name: "Big Bazaar",
    location: "Mysore",
    items: [
      { name: "rice", price: 55 },
      { name: "sugar", price: 40 }
    ]
  },
  {
    name: "D-Mart",
    location: "Mysore",
    items: [
      { name: "rice", price: 52 },
      { name: "sugar", price: 42 }
    ]
  },
  {
    name: "Vishal Mega Mart",
    location: "Bangalore",
    items: [
      { name: "rice", price: 50 },
      { name: "sugar", price: 41 }
    ]
  }
];

// API route: /grocery/search?item=rice&city=Mysore
app.get("/grocery/search", (req, res) => {
  const item = req.query.item?.toLowerCase();
  const city = req.query.city?.toLowerCase();

  if (!item || !city) {
    return res.status(400).json({ error: "Please provide item and city" });
  }

  const results = shops
    .filter(shop => shop.location.toLowerCase() === city)
    .map(shop => {
      const found = shop.items.find(i => i.name.toLowerCase() === item);
      return found ? { shop: shop.name, price: found.price } : null;
    })
    .filter(r => r !== null);

  // ✅ If no results found, return "Item not available"
  if (results.length === 0) {
    return res.json({ message: `Item '${item}' not available in ${city}` });
  }

  res.json(results);
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`✅ Open http://localhost:${port}/project.html`);
});
