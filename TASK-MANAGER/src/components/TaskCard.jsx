function TaskCard({ task }) {
  return (
    <div className="student-card">
      <h3>{task.name}</h3>
      <p>{task.done ? "Completed" : "Not Done"}</p>
    </div>
  );
}

export default TaskCard;