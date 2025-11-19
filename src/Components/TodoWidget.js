import TodoList from "./TodoList";
import {
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import EditTodoPopup from "./EditTodoPopup";
import DeleteTodoPopup from "./DeleteTodoPopup";
import { useState, useEffect, useReducer } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { useToast } from "../Contexts/ToastContext";
import todoReducer from "../Reducers/todoReducer";

export default function TodoWidget() {
  const { showToastBar } = useToast();
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskKey, setDeletingTaskKey] = useState(null);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
  const [newTaskInput, setnewTaskInput] = useState("");

  useEffect(() => {
    dispatch({ type: "get", payload: {} });
  }, []);
  const onDoneClick = (key) => {
    dispatch({ type: "done", payload: { key } });
    showToastBar("Successfully updated task");
  };

  const saveTaskUpdate = (id, newTask) => {
    dispatch({ type: "updated", payload: { id, newTask } });
    setEditPopup(false);
    setEditingTask(null);
    showToastBar("Successfully updated task");
  };

  const handleAddNewTask = () => {
    dispatch({ type: "added", payload: { newTaskInput } });
    setnewTaskInput("");
    showToastBar("Successfully added new task");
  };

  const deleteTask = (id) => {
    dispatch({ type: "deleted", payload: { id } });
    setDeletePopup(false);
    showToastBar("Successfully deleted task");
  };

  const onCloseEditClick = (key) => {
    setEditPopup(false);
  };

  const onCloseDeleteClick = (key) => {
    setDeletePopup(false);
  };

  return (
    <>
      {editPopup && (
        <EditTodoPopup
          task={editingTask}
          onClose={onCloseEditClick}
          onSave={saveTaskUpdate}
        />
      )}
      {deletePopup && (
        <DeleteTodoPopup
          onClose={onCloseDeleteClick}
          onSubmit={deleteTask}
          taskKey={deletingTaskKey}
        />
      )}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" gutterBottom style={{ textAlign: "center" }}>
          Todo List
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ToggleButtonGroup
            variant="outlined"
            exclusive
            value={taskFilter}
            color="primary"
            aria-label="Basic button group"
            onChange={(e) => {
              setTaskFilter(e.target.value);
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="done">Done</ToggleButton>
            <ToggleButton value="todo">Todo</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 16px 16px",
          }}
        >
          <TaskContext.Provider
            value={{
              onDoneClick,
              onDeleteClick: (key) => {
                setDeletePopup(true);
                setDeletingTaskKey(key);
              },
              onEditClick: (task) => {
                setEditingTask(task);
                setEditPopup(true);
              },
            }}
          >
            <TodoList filter={taskFilter} tasks={todos} />
          </TaskContext.Provider>
        </div>
        <div
          style={{
            padding: "16px",
            display: "flex",
            direction: "row",
            gap: "10px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Todo Title"
            variant="outlined"
            value={newTaskInput}
            style={{ width: "60%" }}
            onChange={(e) => setnewTaskInput(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ width: "40%" }}
            onClick={() => {
              handleAddNewTask();
            }}
            disabled={!newTaskInput}
          >
            Add new task
          </Button>
        </div>
      </div>
    </>
  );
}
