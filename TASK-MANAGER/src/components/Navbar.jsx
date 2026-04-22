import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/tasks"> Tasks</Link> | 
      <Link to="/add"> Add Task</Link>
    </nav>
  );
}

export default Navbar;