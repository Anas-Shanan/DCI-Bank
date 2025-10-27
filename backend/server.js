import express from "express";
import connectDB from "./libs/dbConnect.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL // Will be set in Render
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/users", userRouter);

// Health check route for Render
app.get("/", (req, res) => {
  res.json({
    message: "DCI Bank API is running!",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Bind to all interfaces for Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
