import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>BIUST TASK-MANAGER APP</h1>
      <p>Organize your tasks efficiently.</p>
      {user ? (
        <Link to="/tasks" className="btn" style={{ width: "200px", marginTop: "20px" }}>
          Go to Tasks
        </Link>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <Link to="/login" className="btn" style={{ width: "200px", marginRight: "10px" }}>
            Login
          </Link>
          <Link to="/register" className="btn" style={{ width: "200px" }}>
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;