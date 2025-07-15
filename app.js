import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";

const app = express();
const router = express.Router()


app.use(json());
app.use(cors());
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use("/api", router)

connect(`mongodb://db:${process.env.DB_PORT}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("✅ MongoDB connected")

   
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`🌐 Server launched on http://localhost:${PORT}`));

  })
  .catch(err => console.error("❌ MongoDB Error:", err));

import fs from 'fs';


fs.readdir("./models", (err, files) => {
  for (const file of files) {
    import(`./models/` + file)
  }
})


fs.readdir("./routes", async (err, files) => {
  for (const file of files) {
    router.use("/" + file.substring(0, file.length - 3), (await import(`./routes/` + file)).default)
  }
})
