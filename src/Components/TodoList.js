import Todo from "./Todo";

export default function TodoList({ tasks, filter }) {
  return (
    <div>
      {tasks.map((task) =>
        filter === "done" && !task.done ? null : filter === "todo" &&
          task.done ? null : (
          <Todo task={task} />
        )
      )}
    </div>
  );
}
