import mongoose from "mongoose";
import Task from "../models/Task.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Only these fields may be set from the request body (prevents mass-assignment)
const pickFields = (body) => {
  const { title, description, status, dueDate } = body;
  const data = {};
  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (status !== undefined) data.status = status;
  if (dueDate !== undefined) data.dueDate = dueDate || null;
  return data;
};

// GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ message: "Invalid task id" });
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/tasks
export const createTask = async (req, res) => {
  const data = pickFields(req.body);
  if (!data.title || !String(data.title).trim()) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const task = await Task.create(data);
    res.status(201).json(task);
  } catch (error) {
    const code = error.name === "ValidationError" ? 400 : 500;
    res.status(code).json({ message: error.message });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ message: "Invalid task id" });
  try {
    const task = await Task.findByIdAndUpdate(id, pickFields(req.body), {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    const code = error.name === "ValidationError" ? 400 : 500;
    res.status(code).json({ message: error.message });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ message: "Invalid task id" });
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
