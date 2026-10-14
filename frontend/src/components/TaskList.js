import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
