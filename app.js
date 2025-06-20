const express = require("express");
const Part = require("./model/part.js"); // Model
require("./db/conn.js"); // MongoDB connection
const upload = require("./middleware/uploads.js"); // Multer setup

const app = express();
const port = 3000;

app.use(express.json());

//just for fresh start
app.get("/", (req, res) => {
  res.send("Welcome to the Parts API!");
});

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// POST route: Add a new part
app.post("/parts", upload.single("image"), async (req, res) => {
  const { name, description, note, partNumber } = req.body;
  const imageUrl = req.file ? req.file.buffer.toString("base64") : null; // Get the image path from multer

  // // Validate required fields
  // if (!name || !description || !note || !partNumber) {
  //   return res.status(400).json({ error: "All fields are required" });
  // }

  try {
    const part = new Part({
      name,
      description,
      note,
      partNumber,
      image : imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await part.save();
    res.status(201).json(part);
  } catch (error) {
    console.error("Error saving part:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route: Fetch all parts
app.get("/parts", async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (error) {
    console.error("Error fetching parts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route: Fetch part by name (case-insensitive)
app.get("/parts/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const part = await Part.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }

    res.json(part);
  } catch (error) {
    console.error("Error retrieving part:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
