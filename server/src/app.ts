import { config } from "dotenv";
import http from "http";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

config();

const app = express();
const httpServer = http.createServer(app);

//Middleware
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/posts",postRoutes);
// app.use("/api/comments",commentRoutes);

//Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

//Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
