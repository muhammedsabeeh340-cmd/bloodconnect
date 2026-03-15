const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb://sabeeh:sabee%40006ggl@ac-0hth9jd-shard-00-00.4k548iy.mongodb.net:27017,ac-0hth9jd-shard-00-01.4k548iy.mongodb.net:27017,ac-0hth9jd-shard-00-02.4k548iy.mongodb.net:27017/?ssl=true&authSource=admin";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 10000,
  family: 4 // Force IPv4 to avoid DNS resolution issues in some environments
});

let db;
let donorsCollection;

async function connectDB() {
  console.log("⏳ Attempting to connect to MongoDB...");
  try {
    await client.connect();
    db = client.db("BloodConnect");
    donorsCollection = db.collection("Donors");
    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB connection error details:", error);
  }
}
connectDB();

// API Routes

// 1. Register a Donor
app.post('/api/register', async (req, res) => {
  try {
    const donor = req.body;
    donor.createdAt = new Date();
    const result = await donorsCollection.insertOne(donor);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Search Donors
app.get('/api/donors', async (req, res) => {
  try {
    const { bloodGroup, locality, state, district } = req.query;
    let query = {};
    
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (state) query.state = state;
    if (district) query.district = district;
    if (locality) {
      query.locality = { $regex: locality, $options: 'i' };
    }

    const donors = await donorsCollection.find(query).toArray();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});
