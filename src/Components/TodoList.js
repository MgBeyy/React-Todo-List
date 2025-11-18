import Todo from "./Todo";

export default function TodoList({
  tasks,
  onDoneClick,
  onDeleteClick,
  onEditClick,
  filter,
}) {
  return (
    <div>
      {tasks.map((task) =>
        filter === "done" && !task.done ? null : filter === "todo" &&
          task.done ? null : (
          <Todo
            task={task}
            key={task.key}
            onDoneClick={onDoneClick}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
          />
        )
      )}
    </div>
  );
}
