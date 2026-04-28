import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For now, we assume a token exists if we were to have a login system.
    // If you have a token, it should be retrieved from localStorage or context.
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        alert("Task added successfully!");
        navigate("/tasks");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to add task"}`);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="add-task-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Add New Task</h2>

        <label>Task Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={task.description}
          onChange={handleChange}
        ></textarea>

        <label>Due Date</label>
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
        />

        <label>Priority</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Status</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
