import axios from "axios";

// REACT_APP_BACKEND_URL = base URL of the backend, e.g. https://my-api.onrender.com
// (no trailing slash, no /api/tasks). Falls back to local backend in development.
const BASE_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000").replace(/\/+$/, "");
const API_URL = `${BASE_URL}/api/tasks`;

export const getTasks = () => axios.get(API_URL);
export const createTask = (taskData) => axios.post(API_URL, taskData);
export const updateTask = (id, taskData) => axios.put(`${API_URL}/${id}`, taskData);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
