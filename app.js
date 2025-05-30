import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const app = express();
const router = express.Router()

// Middleware
app.use(json());
app.use(cors());
app.use(express.static('public'))
app.use("/api", router)

// MongoDB Connection
connect(`mongodb://localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

import fs from 'fs';

// Mongo Schemas
fs.readdir("./models", (err, files) => {
  for (const file of files) {
    import(`./models/` + file)
  }
})

// API Routes
fs.readdir("./routes", async (err, files) => {
  for (const file of files) {
    router.use("/" + file.substring(0, file.length - 3), (await import(`./routes/` + file)).default)
  }
})


// Server Launch
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Server launched on http://localhost:${PORT}`));
