import StudyPlan from "../models/StudyPlan.js";

export const createStudyPlan = async (req, res) => {
  try {
    const { title, description, subject, dueDate, priority } = req.body;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({ error: "Please provide required fields" });
    }

    const studyPlan = await StudyPlan.create({
      userId: req.userId,
      title,
      description,
      subject,
      dueDate,
      priority,
    });

    res.status(201).json({
      message: "Study plan created",
      studyPlan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudyPlans = async (req, res) => {
  try {
    const studyPlans = await StudyPlan.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: studyPlans.length,
      studyPlans,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudyPlanById = async (req, res) => {
  try {
    const studyPlan = await StudyPlan.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!studyPlan) {
      return res.status(404).json({ error: "Study plan not found" });
    }

    res.status(200).json({ studyPlan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudyPlan = async (req, res) => {
  try {
    const { title, description, subject, dueDate, priority, status } = req.body;

    const studyPlan = await StudyPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description, subject, dueDate, priority, status },
      { new: true },
    );

    if (!studyPlan) {
      return res.status(404).json({ error: "Study plan not found" });
    }

    res.status(200).json({
      message: "Study plan updated",
      studyPlan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudyPlan = async (req, res) => {
  try {
    const studyPlan = await StudyPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!studyPlan) {
      return res.status(404).json({ error: "Study plan not found" });
    }

    res.status(200).json({ message: "Study plan deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTaskToStudyPlan = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const studyPlan = await StudyPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $push: { tasks: { title, completed: false } } },
      { new: true },
    );

    if (!studyPlan) {
      return res.status(404).json({ error: "Study plan not found" });
    }

    res.status(201).json({
      message: "Task added",
      studyPlan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;

    const studyPlan = await StudyPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId, "tasks._id": taskId },
      { $set: { "tasks.$.completed": completed } },
      { new: true },
    );

    if (!studyPlan) {
      return res.status(404).json({ error: "Study plan or task not found" });
    }

    res.status(200).json({
      message: "Task updated",
      studyPlan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
