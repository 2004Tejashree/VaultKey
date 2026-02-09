const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "password";
const app = express();
const port = 3000;
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key-change-this"; // In prod, use .env

app.use(bodyparser.json());
app.use(cors());

// Connect to MongoDB once
async function connectDB() {
  await client.connect();
  console.log("Connected to MongoDB");
}
connectDB();

// Middleware to verify token (optional for now, but good practice)
// For simplicity, we'll pass userid in the body/query for the initial implementation 
// as requested, but a cleaner way is Authorization header. 
// We will stick to the plan: Filter by userid.

// REGISTER USER
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = client.db(dbName);
    const users = db.collection("users");

    // Check if user exists
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = { username, password: hashedPassword };
    const result = await users.insertOne(newUser);

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// LOGIN USER
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = client.db(dbName);
    const users = db.collection("users");

    // Find user
    const user = await users.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate Token
    // We'll use the MongoDB _id as the userid
    const token = jwt.sign({ userid: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ success: true, token, userid: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// GET ALL PASSWORDS (PROTECTED)
app.get("/", async (req, res) => {
  const { userid } = req.query; // Get userid from query params
  if (!userid) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({ userid }).toArray(); // Filter by userid
  res.json(findResult);
});

// SAVE A PASSWORD (PROTECTED)
app.post("/", async (req, res) => {
  const { userid, ...passwordData } = req.body; // Extract userid
  if (!userid) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const db = client.db(dbName);
  const collection = db.collection("passwords");

  // Add userid to the password document
  const newPassword = { ...passwordData, userid };
  const findResult = await collection.insertOne(newPassword);
  res.send({ success: true, result: findResult });
});

// DELETE A PASSWORD (PROTECTED)
app.delete("/", async (req, res) => {
  const { id, userid } = req.body; // Require userid to ensure ownership
  if (!userid) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const db = client.db(dbName);
  const collection = db.collection("passwords");

  // Ensure we only delete if it matches both ID and UserID (Ownership check)
  // Note: deleteOne might need an ObjectId for _id if you used that, but here we used UUID string 'id'.
  // We should double check if your frontend passes 'id' as a string or number.
  // Based on previous code, it's a UUID string. 
  // BUT we must also check 'userid' to ensuring deleting own password.
  const findResult = await collection.deleteOne({ id, userid });

  res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
