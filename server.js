const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
let client;
let donorsCollection;

async function getCollection() {
  if (donorsCollection) return donorsCollection;
  
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      connectTimeoutMS: 10000,
      family: 4
    });
    await client.connect();
  }
  
  const db = client.db("BloodConnect");
  donorsCollection = db.collection("Donors");
  return donorsCollection;
}

// API Routes
app.post('/api/register', async (req, res) => {
  console.log("POST /api/register called");
  try {
    const col = await getCollection();
    const donor = req.body;
    donor.createdAt = new Date();
    const result = await col.insertOne(donor);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, error: error.message, details: "Check if MONGODB_URI is set and IP is whitelisted" });
  }
});

app.get('/api/donors', async (req, res) => {
  console.log("GET /api/donors called");
  try {
    const col = await getCollection();
    const { bloodGroup, state, district, locality } = req.query;
    let query = {};
    
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (state) query.state = state;
    if (district) query.district = district;
    if (locality) {
      query.locality = { $regex: locality, $options: 'i' };
    }

    const donors = await col.find(query).toArray();
    res.json(donors);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, error: error.message, details: "Check if MONGODB_URI is set and IP is whitelisted" });
  }
});

// For local testing
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Local server running on http://127.0.0.1:${PORT}`);
  });
}

module.exports = app;
