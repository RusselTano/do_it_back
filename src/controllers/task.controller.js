import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, completed, dueDate } = req.body;

    const existingTask = await Task.findOne({ title });
    if (existingTask) res.json({ message: "Tache existe deja" });

    const task = await Task.create({ title, description, completed, dueDate });

    res.json({ success: true, data: task });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    if (tasks.length === 0) {
      return res.json({ success: false, message: "Aucune tache trouvee" });
    }

    res.json({ success: true, data: tasks });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Tâche non trouvée" });
    }

    res.json({ success: true, data: task });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
