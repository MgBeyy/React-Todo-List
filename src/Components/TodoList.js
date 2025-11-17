import Todo from "./Todo";

export default function TodoList() {
  return (
    <div>
      <ul>
        <Todo text="Task 1" />
        <Todo text="Task 2" />
        <Todo text="Task 3" />
        <Todo text="Task 4" />
        <Todo text="Task 5" />
        <Todo text="Task 6" />
      </ul>
    </div>
  );
}
