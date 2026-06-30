import express from "express";
import {
  createStudyPlan,
  getStudyPlans,
  getStudyPlanById,
  updateStudyPlan,
  deleteStudyPlan,
  addTaskToStudyPlan,
  updateTask,
} from "../controllers/studyPlanController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Protect all routes with auth middleware
router.use(auth);

router.post("/", createStudyPlan);
router.get("/", getStudyPlans);
router.get("/:id", getStudyPlanById);
router.put("/:id", updateStudyPlan);
router.delete("/:id", deleteStudyPlan);

// Task routes
router.post("/:id/tasks", addTaskToStudyPlan);
router.put("/:id/tasks/:taskId", updateTask);

export default router;
