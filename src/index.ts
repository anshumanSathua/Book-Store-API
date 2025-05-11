import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDb from "./config/db";

const PORT = process.env.PORT;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
