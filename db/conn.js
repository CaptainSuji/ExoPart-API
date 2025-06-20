const mongoose = require("mongoose");

const mongodb =
  "mongodb+srv://rajibmajhi547:NaiZIYi7cAOx8Xl1@cluster0.2fy1lsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose
  .connect(mongodb)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
