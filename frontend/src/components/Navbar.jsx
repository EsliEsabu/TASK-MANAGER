import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <h2>Task Manager</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/add">Add Task</Link></li>
            <li onClick={handleLogout}>Logout</li>
            <li style={{ marginTop: "20px", color: "yellow", fontSize: "0.9em" }}>
              Logged in as: {user.name}
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;