import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
const app: Application = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
