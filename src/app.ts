import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import authorRoutes from "./routes/authorRoutes";
import genreRoutes from "./routes/genreRoutes";
import bookRoutes from "./routes/bookRoutes";
import orderRoutes from "./routes/OrderRoutes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerConfig";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  })
);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("📚 Book Store API is running!");
});

export default app;
