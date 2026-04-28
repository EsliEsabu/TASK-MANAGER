function TaskCard({ task, onToggle }) {
  const isCompleted = task.status === "completed";

  return (
    <div className={`task-card ${isCompleted ? "completed" : ""}`}>
      <div className="task-header">
        <h3 style={isCompleted ? { textDecoration: "line-through", color: "#888" } : {}}>
          {task.title}
          {isCompleted && <span className="checkmark">✓</span>}
        </h3>
        <button 
          className="toggle-button"
          onClick={() => onToggle(task.id, task.status)}
        >
          {isCompleted ? "Mark Pending" : "Mark Completed"}
        </button>
      </div>
      <p style={isCompleted ? { textDecoration: "line-through", color: "#888" } : {}}>
        {task.description}
      </p>
      <div className="task-details">
        <span><strong>Status:</strong> {task.status}</span>
        <span><strong>Priority:</strong> {task.priority}</span>
        {task.due_date && <span><strong>Due:</strong> {new Date(task.due_date).toLocaleDateString()}</span>}
      </div>
    </div>
  );
}

export default TaskCard;
