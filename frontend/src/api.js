const API_BASE_URL = import.meta.env.VITE_API_URL || "https://localhost:5000";



const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
};



export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export const getMe = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(res);
};



export const getTasks = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(
    `${API_BASE_URL}/api/tasks${params ? `?${params}` : ""}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );
  return handleResponse(res);
};

export const getTask = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const createTask = async (taskData) => {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

export const updateTask = async (id, taskData) => {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(res);
};