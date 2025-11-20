import { createSlice } from "@reduxjs/toolkit";

const initialState = { todos: [] };
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTaskInput = action.payload.newTaskInput;
      if (!newTaskInput) return;
      state.todos.push({
        key:
          (state.todos.length > 0
            ? state.todos[state.todos.length - 1].key
            : 0) + 1,
        text: newTaskInput,
        description: "",
        done: false,
      });
      localStorage.setItem("tasks", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.key === action.payload.id) {
          todo.text = action.payload.newTask.text;
          todo.description = action.payload.newTask.description;
        }
        return todo;
      });
      localStorage.setItem("tasks", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.key !== action.payload.id
      );
      localStorage.setItem("tasks", JSON.stringify(state.todos));
    },
    getTodos: (state) => {
      state.todos = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    },
    doneTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.key === action.payload.id) {
          todo.done = !todo.done;
        }
        return todo;
      });
      localStorage.setItem("tasks", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, getTodos, doneTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
