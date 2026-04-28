import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          setError("Failed to fetch tasks. Please ensure you are logged in.");
        }
      } catch (err) {
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const groupTasksByStatus = () => {
    const grouped = {
      "in progress": [],
      pending: [],
      completed: []
    };
    tasks.forEach(task => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });
    return grouped;
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        console.error("Failed to update task status");
      }
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const groupedTasks = groupTasksByStatus();

  return (
    <div className="tasks-page">
      <h1>Your Tasks</h1>
      <div className="task-sections">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => (
          statusTasks.length > 0 && (
            <div key={status} className="task-section">
              <h2 className="section-title">{status.charAt(0).toUpperCase() + status.slice(1)} Tasks</h2>
              <div className="task-list">
                {statusTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onToggle={handleToggleStatus} />
                ))}
              </div>
            </div>
          )
        ))}
        {tasks.length === 0 && <p>No tasks found. Add some!</p>}
      </div>
    </div>
  );
}

export default Tasks;
