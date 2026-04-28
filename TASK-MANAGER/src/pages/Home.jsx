import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const tasks = await response.json();
          const newStats = {
            total: tasks.length,
            pending: tasks.filter(t => t.status === "pending").length,
            inProgress: tasks.filter(t => t.status === "in progress").length,
            completed: tasks.filter(t => t.status === "completed").length
          };
          setStats(newStats);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number" style={{color: "#ffc107"}}>{stats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number" style={{color: "#17a2b8"}}>{stats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number" style={{color: "#28a745"}}>{stats.completed}</p>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/tasks" className="btn">View All Tasks</Link>
        <Link to="/add" className="btn btn-primary">Add New Task</Link>
      </div>
    </div>
  );
}

export default Home;
