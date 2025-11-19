export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTaskInput = action.payload.newTaskInput;
      if (!newTaskInput) return;
      const lastKey =
        currentTodos.length > 0 ? currentTodos[currentTodos.length - 1].key : 0;
      const newKey = lastKey + 1;
      const updatedTasks = [
        ...currentTodos,
        {
          key: newKey,
          text: newTaskInput,
          description: "",
          done: false,
        },
      ];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "updated": {
      const updatedTasks = currentTodos.map((todo) => {
        if (todo.key === action.payload.id) {
          return {
            ...todo,
            text: action.payload.newTask.text,
            description: action.payload.newTask.description,
          };
        }
        return todo;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "done": {
      const updatedTasks = currentTodos.map((task) =>
        task.key === action.payload.key ? { ...task, done: !task.done } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "deleted": {
      const updatedTasks = currentTodos.filter(
        (task) => task.key !== action.payload.id
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "get": {
      return JSON.parse(localStorage.getItem("tasks") ?? "[]");
    }
    default: {
      throw Error("Invalid action type" + action.type);
    }
  }
}
