import { useState } from "react";
import "./style.css";

function App() {
  const [task, setTask] = useState({
    name: "",
    id: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted:", task);
    alert("Task added successfully!");
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>MOKWESO TASK-MANAGER</h2>
        <ul>
          <li>Dashboard</li>
          <li>Task List</li>
          <li>In Progress</li>
        </ul>
      </aside>

      <main className="main-content">
        <form className="task-form" onSubmit={handleSubmit}>
          <h2>Add New Task</h2>

          <label>Task Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter title"
            value={task.name}
            onChange={handleChange}
          />

          <label>Task ID</label>
          <input
            type="text"
            name="id"
            placeholder="Enter task id"
            value={task.id}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={task.description}
            onChange={handleChange}
          ></textarea>

          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={task.startDate}
            onChange={handleChange}
          />

          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={task.endDate}
            onChange={handleChange}
          />

          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit">Add</button>
        </form>
      </main>
    </div>
  );
}

export default App;