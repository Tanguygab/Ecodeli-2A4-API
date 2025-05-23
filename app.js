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

// API Routes
async function useRoute(route) {
  router.use("/" + route, (await import(`./routes/${route}.js`)).default)
}

useRoute("auth")
useRoute("users")
useRoute("contracts")
useRoute("proofs")
useRoute("bills")
useRoute("services")
useRoute("meetings")
useRoute("products")
useRoute("warehouses")
useRoute("deliveries")

// Server Launch
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Server launched on http://localhost:${PORT}`));
