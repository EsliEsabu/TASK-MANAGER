import { useState } from "react";

function AddTask() {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task) {
      alert("Enter a task");
      return;
    }

    console.log("Task:", task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      <input
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

export default AddTask;