import React from "react";

function TaskItem({ task, onEdit, onDelete }) {
  return (
    <li className="task-item">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="meta">
        <span className={`badge ${task.status}`}>Status: {task.status}</span>
        {task.dueDate && <span>Due: {task.dueDate.slice(0, 10)}</span>}
      </div>
      <div className="row">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
