import TaskCard from "../components/TaskCard";

const tasks = [
  { id: 34019, name: "Study React", done: false },
  { id: 34018, name: "Do assignment", done: true }
];

function Tasks() {
  return (
    <div>
      <h1>BIUST TASKS</h1>

      {tasks.length === 0 ? (
        <p>No tasks allocated yet</p>
      ) : (
     
       tasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))
      )}
    </div>
  );
}

export default Tasks;