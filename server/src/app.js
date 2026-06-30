import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import studyPlanRoutes from "./routes/studyPlanRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "StudySync API is running...",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/study-plans", studyPlanRoutes);

export default app;
