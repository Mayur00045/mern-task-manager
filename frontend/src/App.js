import React, { useState, useEffect, useCallback } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Could not load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch once on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const run = async (action) => {
    try {
      await action();
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleAddTask = (taskData) => run(() => createTask(taskData));

  const handleUpdateTask = (id, taskData) =>
    run(async () => {
      await updateTask(id, taskData);
      setEditingTask(null);
    });

  const handleDeleteTask = (id) => {
    if (!window.confirm("Delete this task?")) return;
    if (editingTask && editingTask._id === id) setEditingTask(null);
    run(() => deleteTask(id));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {error && <div className="error">{error}</div>}

      <TaskForm
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialData={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
      )}
    </div>
  );
}

export default App;
